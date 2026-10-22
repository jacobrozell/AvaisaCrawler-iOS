import AuthenticationServices
import CryptoKit
import SwiftUI
import UserNotifications
import WebKit

final class WebBox: ObservableObject {
    weak var webView: WKWebView?
    func eval(_ source: String) {
        webView?.evaluateJavaScript(source, completionHandler: nil)
    }
}

struct ShellView: View {
    @Environment(\.scenePhase) private var scenePhase
    @StateObject private var box = WebBox()

    var body: some View {
        WebShell(box: box)
            .ignoresSafeArea()
            .onAppear {
                UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound]) { _, _ in }
            }
            .onChange(of: scenePhase) { _, phase in
                if phase == .background {
                    box.eval("window.__echoBackground&&window.__echoBackground()")
                } else if phase == .active {
                    box.eval("window.__echoForeground&&window.__echoForeground()")
                }
            }
    }
}

struct WebShell: UIViewRepresentable {
    @ObservedObject var box: WebBox

    func makeCoordinator() -> Bridge { Bridge() }

    func makeUIView(context: Context) -> WKWebView {
        let controller = WKUserContentController()
        if let json = Self.firebaseJSON() {
            let script = WKUserScript(source: "window.__ECHO_FIREBASE__ = \(json);", injectionTime: .atDocumentStart, forMainFrameOnly: true)
            controller.addUserScript(script)
        }
        controller.add(context.coordinator, name: "echo")
        let config = WKWebViewConfiguration()
        config.userContentController = controller
        let root = Self.webRoot()
        if let root {
            config.setURLSchemeHandler(BundleFiles(root: root), forURLScheme: "echo")
        }
        let web = WKWebView(frame: .zero, configuration: config)
        web.isOpaque = false
        web.backgroundColor = UIColor(red: 0.08, green: 0.06, blue: 0.05, alpha: 1)
        web.scrollView.isScrollEnabled = false
        web.scrollView.bounces = false
        web.scrollView.contentInsetAdjustmentBehavior = .never
        web.isInspectable = true
        context.coordinator.webView = web
        box.webView = web
        if root != nil, let url = URL(string: "echo://app/index.html") {
            web.load(URLRequest(url: url))
        } else {
            web.loadHTMLString("<p style=\"color:#f3eadf;font-family:sans-serif;padding:24px\">The game files are not in the app. From EchoShafts run npm run ios:web, then rebuild.</p>", baseURL: nil)
        }
        return web
    }

    /// The built client, kept as a folder so index.html can see assets/.
    private static func webRoot() -> URL? {
        let candidates = [
            Bundle.main.resourceURL?.appendingPathComponent("Web"),
            Bundle.main.bundleURL.appendingPathComponent("Web"),
        ]
        return candidates.compactMap { $0 }.first {
            FileManager.default.fileExists(atPath: $0.appendingPathComponent("index.html").path)
        }
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {
        context.coordinator.webView = uiView
        box.webView = uiView
    }

    /// Optional. The file is gitignored and is not required to play.
    private static func firebaseJSON() -> String? {
        guard let url = Bundle.main.url(forResource: "GoogleService-Info", withExtension: "plist"),
              let dict = NSDictionary(contentsOf: url),
              let apiKey = dict["API_KEY"] as? String,
              let project = dict["PROJECT_ID"] as? String,
              let appId = dict["GOOGLE_APP_ID"] as? String,
              let data = try? JSONSerialization.data(withJSONObject: [
                  "apiKey": apiKey,
                  "authDomain": "\(project).firebaseapp.com",
                  "projectId": project,
                  "appId": appId,
              ]),
              let text = String(data: data, encoding: .utf8) else { return nil }
        return text
    }
}

final class BundleFiles: NSObject, WKURLSchemeHandler {
    let root: URL
    private var stopped = Set<ObjectIdentifier>()

    init(root: URL) {
        self.root = root
    }

    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        let key = ObjectIdentifier(urlSchemeTask)
        let path = (urlSchemeTask.request.url?.path ?? "/index.html")
        let relative = path == "/" ? "index.html" : String(path.dropFirst())
        let file = root.appendingPathComponent(relative).standardizedFileURL
        guard file.path.hasPrefix(root.standardizedFileURL.path),
              let data = try? Data(contentsOf: file) else {
            urlSchemeTask.didFailWithError(URLError(.fileDoesNotExist))
            return
        }
        if stopped.contains(key) { return }
        let mime = Self.mime(file.pathExtension)
        let response = HTTPURLResponse(url: urlSchemeTask.request.url!, statusCode: 200, httpVersion: "HTTP/1.1", headerFields: [
            "Content-Type": mime,
            "Content-Length": String(data.count),
            "Access-Control-Allow-Origin": "*",
        ])!
        urlSchemeTask.didReceive(response)
        urlSchemeTask.didReceive(data)
        if !stopped.contains(key) { urlSchemeTask.didFinish() }
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {
        stopped.insert(ObjectIdentifier(urlSchemeTask))
    }

    private static func mime(_ ext: String) -> String {
        switch ext {
        case "html": return "text/html"
        case "js": return "text/javascript"
        case "css": return "text/css"
        case "json": return "application/json"
        default: return "application/octet-stream"
        }
    }
}

final class Bridge: NSObject, WKScriptMessageHandler, ASAuthorizationControllerDelegate, ASAuthorizationControllerPresentationContextProviding {
    weak var webView: WKWebView?
    private var rawNonce = ""
    private var auth: ASAuthorizationController?
    private let haptic = UIImpactFeedbackGenerator(style: .light)

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let body = message.body as? [String: Any], let type = body["type"] as? String else { return }
        switch type {
        case "haptic":
            haptic.impactOccurred()
        case "apple":
            startApple()
        case "notify":
            schedule(inMs: body["inMs"] as? Double ?? 0)
        case "cancel-notify":
            UNUserNotificationCenter.current().removePendingNotificationRequests(withIdentifiers: ["night-shift"])
        default:
            break
        }
    }

    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        webView?.window ?? ASPresentationAnchor()
    }

    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        guard let credential = authorization.credential as? ASAuthorizationAppleIDCredential,
              let tokenData = credential.identityToken,
              let token = String(data: tokenData, encoding: .utf8),
              let data = try? JSONSerialization.data(withJSONObject: ["idToken": token, "rawNonce": rawNonce]),
              let text = String(data: data, encoding: .utf8) else { return }
        webView?.evaluateJavaScript("window.__echoApple && window.__echoApple(\(text))", completionHandler: nil)
    }

    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {}

    private func startApple() {
        let raw = randomNonce()
        rawNonce = raw
        let request = ASAuthorizationAppleIDProvider().createRequest()
        request.requestedScopes = []
        request.nonce = sha256(raw)
        let controller = ASAuthorizationController(authorizationRequests: [request])
        controller.delegate = self
        controller.presentationContextProvider = self
        auth = controller
        controller.performRequests()
    }

    private func schedule(inMs: Double) {
        let seconds = max(1, inMs / 1000)
        let content = UNMutableNotificationContent()
        content.title = "Night shift"
        content.body = "The night shift is full."
        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: seconds, repeats: false)
        let request = UNNotificationRequest(identifier: "night-shift", content: content, trigger: trigger)
        UNUserNotificationCenter.current().removePendingNotificationRequests(withIdentifiers: ["night-shift"])
        UNUserNotificationCenter.current().add(request)
    }

    private func randomNonce(length: Int = 32) -> String {
        var bytes = [UInt8](repeating: 0, count: length)
        _ = SecRandomCopyBytes(kSecRandomDefault, length, &bytes)
        return Data(bytes).base64EncodedString()
    }

    private func sha256(_ text: String) -> String {
        SHA256.hash(data: Data(text.utf8)).map { String(format: "%02x", $0) }.joined()
    }
}
