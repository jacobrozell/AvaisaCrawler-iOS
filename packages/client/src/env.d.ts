/// <reference types="vite/client" />

export interface EchoFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
}

declare global {
  interface Window {
    __ECHO_FIREBASE__?: EchoFirebaseConfig;
    __echoApple?: (cred: { idToken: string; rawNonce: string }) => void;
    __echoBackground?: () => void;
    __echoForeground?: () => void;
    webkit?: { messageHandlers?: { echo?: { postMessage: (msg: unknown) => void } } };
  }
}

export {};
