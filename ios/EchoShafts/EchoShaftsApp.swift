import SwiftUI

@main
struct EchoShaftsApp: App {
    var body: some Scene {
        WindowGroup {
            ShellView()
                .statusBarHidden(true)
                .persistentSystemOverlays(.hidden)
        }
    }
}
