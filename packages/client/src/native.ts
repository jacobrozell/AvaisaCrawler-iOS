// Thin shell hooks. The browser vibrates. The iOS shell does the rest.

export type NativeMsg =
  | { type: 'haptic' }
  | { type: 'apple' }
  | { type: 'notify'; inMs: number }
  | { type: 'cancel-notify' };

export function postNative(msg: NativeMsg): boolean {
  const bridge = window.webkit?.messageHandlers?.echo;
  if (!bridge) return false;
  bridge.postMessage(msg);
  return true;
}

export function haptic(): void {
  if (postNative({ type: 'haptic' })) return;
  navigator.vibrate?.(12);
}

export function askAppleSignIn(): void {
  postNative({ type: 'apple' });
}

export function scheduleNight(inMs: number): void {
  if (postNative({ type: 'notify', inMs })) return;
  if (inMs < 1000 || typeof Notification === 'undefined') return;
  if (Notification.permission === 'granted') {
    window.setTimeout(() => {
      new Notification('Night shift', { body: 'The night shift is full.' });
    }, inMs);
  }
}

export function cancelNight(): void {
  postNative({ type: 'cancel-notify' });
}

export function requestNotifyPermission(): void {
  if (typeof Notification === 'undefined' || Notification.permission !== 'default') return;
  void Notification.requestPermission();
}
