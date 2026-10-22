// Firebase is identity, the season clock, and the board. Missing config is offline play.

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, OAuthProvider, onAuthStateChanged, signInWithCredential, signOut, type Auth, type User } from 'firebase/auth';
import { collection, getDocs, getFirestore, limit, orderBy, query, type Firestore } from 'firebase/firestore';
import { getFunctions, httpsCallable, type Functions } from 'firebase/functions';
import type { Replay } from '@echo/game';

export interface BoardRow {
  name: string;
  depth: number;
  ticks: number;
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: 'offline' | 'unsigned' | 'version' | 'season' | 'closed' | 'mismatch' | 'worse' | 'name' | 'later' };

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let functions: Functions | null = null;
let user: User | null = null;

export function firebaseReady(): boolean {
  return !!app;
}

export function currentUser(): User | null {
  return user;
}

export function bootFirebase(): boolean {
  const cfg = window.__ECHO_FIREBASE__;
  if (!cfg?.apiKey || !cfg.projectId || !cfg.appId) return false;
  app = initializeApp(cfg);
  auth = getAuth(app);
  db = getFirestore(app);
  functions = getFunctions(app);
  onAuthStateChanged(auth, (next) => {
    user = next;
  });
  window.__echoApple = (cred) => {
    void signInApple(cred.idToken, cred.rawNonce);
  };
  return true;
}

export function onSignedIn(fn: (user: User | null) => void): void {
  if (!auth) return;
  onAuthStateChanged(auth, fn);
}

async function signInApple(idToken: string, rawNonce: string): Promise<void> {
  if (!auth) return;
  const provider = new OAuthProvider('apple.com');
  const credential = provider.credential({ idToken, rawNonce });
  await signInWithCredential(auth, credential);
}

export async function signOutBoard(): Promise<void> {
  if (auth) await signOut(auth);
}

export interface SeasonFetch {
  id: string;
  endsAt: number;
  mutator: boolean;
}

export async function fetchSeason(): Promise<SeasonFetch | null> {
  if (!db) return null;
  try {
    const snap = await getDocs(query(collection(db, 'meta'), limit(5)));
    const row = snap.docs.find((d) => d.id === 'season')?.data();
    if (!row || typeof row.id !== 'string' || typeof row.endsAt !== 'number') return null;
    return { id: row.id, endsAt: row.endsAt, mutator: !!row.mutator };
  } catch {
    return null;
  }
}

export async function fetchBoard(seasonId: string): Promise<BoardRow[] | null> {
  if (!db) return null;
  try {
    const q = query(collection(db, 'seasons', seasonId, 'board'), orderBy('depth', 'desc'), orderBy('ticks', 'asc'), limit(40));
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => d.data())
      .filter((row) => typeof row.depth === 'number' && typeof row.ticks === 'number')
      .map((row) => ({ name: String(row.name || 'Warden'), depth: row.depth as number, ticks: row.ticks as number }));
  } catch {
    return null;
  }
}

export async function submitReplay(replay: Replay, name: string): Promise<SubmitResult> {
  if (!functions || !auth?.currentUser) return { ok: false, reason: auth ? 'unsigned' : 'offline' };
  try {
    const call = httpsCallable(functions, 'submitScore');
    const res = await call({ replay, name });
    const data = res.data as { ok?: boolean; reason?: string };
    if (data.ok) return { ok: true };
    const reason = data.reason;
    if (reason === 'version' || reason === 'season' || reason === 'closed' || reason === 'mismatch' || reason === 'worse' || reason === 'name') {
      return { ok: false, reason };
    }
    return { ok: false, reason: 'later' };
  } catch {
    return { ok: false, reason: 'later' };
  }
}

export async function pushBoardName(name: string): Promise<void> {
  if (!functions || !auth?.currentUser) return;
  const call = httpsCallable(functions, 'setBoardName');
  try {
    await call({ name });
  } catch {
    /* The next clear still carries the name. */
  }
}

export async function deleteAccount(): Promise<string | null> {
  if (!functions || !auth?.currentUser) return 'Sign in first.';
  try {
    const call = httpsCallable(functions, 'deleteAccount');
    await call({});
    await signOut(auth);
    return null;
  } catch {
    return 'The account is still there. Try again when the board can be reached.';
  }
}
