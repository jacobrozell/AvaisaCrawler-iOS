# Echo Shafts

A solo Flesh-Warden game. The phone runs the TypeScript sim. Firebase is identity, the season clock, and a verified leaderboard. The sim is not ported to Swift.

One save. The loadout is the build: weapon, plate, three artifacts, one charm. Camp is a yard: the shaft, a buyer, a forge, a chest, and the rank board. A season is eight weeks. There is no battle pass, stamina, or paid power.

## Play in the browser

```bash
npm install
npm run dev
```

Open the printed local URL and turn the window sideways. The camp and the shaft are laid out for a phone in landscape: safe areas, thumb zones, 44px targets, and a handedness flip.

```bash
npm test
npm run balance
```

The `echo-shafts` MCP plays that same sim: `look`, `walk` to a stall, `act`, `fight`, and `play`. It is registered for this workspace. Reload MCP servers after the first checkout.

`npm run balance` runs three Surface loadouts in sim time. Relic clears are the fast end of a few minutes. Company-issue Ulric, with no artifact buttons, dies if it stands in a pack.

## Firebase

Auth is Sign in with Apple, and only to post a score. Clients cannot write scores. `firestore.rules` denies those writes. `functions/src/index.ts` replays the sim and writes one board doc per player per season when the clear matches and beats the stored row.

Do not commit `GoogleService-Info.plist` or `firebase-config.json`.

Publish `meta/season` with `{ id, endsAt, mutator }` from the Admin SDK. Offline play keeps the last fetch. With no fetch, the binary's season window is used.

```bash
npm run build -w @echo/functions
```

## iOS shell

The app is a WKWebView around the same client. Signing team is `7JT2JB89AV`.

```bash
npm run ios:web
cd ios && xcodegen generate
```

Open `ios/EchoShafts.xcodeproj`. The shell passes haptics, a local night-shift notification, background (a ranked run fails), and the Sign in with Apple token into the page. If `GoogleService-Info.plist` is in the app target it is injected at launch. Leave it out of git. Camp, the shaft, and the tutorial run without it. Rank says the result will post later.
