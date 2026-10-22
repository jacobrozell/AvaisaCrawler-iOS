// Scores are written here, after the same TypeScript sim accepts the replay.
// Clients cannot write the board.

import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { CONTENT_VERSION, acceptSubmission, validBoardName, type Replay } from '@echo/game';

initializeApp();
const db = getFirestore();

interface SeasonDoc {
  id: string;
  endsAt: number;
}

async function publishedSeason(): Promise<SeasonDoc> {
  const snap = await db.doc('meta/season').get();
  const data = snap.data();
  if (!data || typeof data.id !== 'string' || typeof data.endsAt !== 'number') {
    throw new HttpsError('failed-precondition', 'No season is published.');
  }
  return { id: data.id, endsAt: data.endsAt };
}

function asReplay(raw: unknown): Replay | null {
  if (!raw || typeof raw !== 'object') return null;
  const row = raw as Replay;
  if (typeof row.seed !== 'number' || typeof row.contentVersion !== 'number') return null;
  if (typeof row.seasonId !== 'string' || typeof row.depth !== 'number' || typeof row.ticks !== 'number') return null;
  if (typeof row.pressure !== 'number' || typeof row.mutator !== 'boolean') return null;
  if (!Array.isArray(row.inputs) || !row.warden) return null;
  return row;
}

export const submitScore = onCall(async (req) => {
  if (!req.auth) throw new HttpsError('unauthenticated', 'Sign in to post a score.');
  const replay = asReplay(req.data?.replay);
  if (!replay) throw new HttpsError('invalid-argument', 'Replay is incomplete.');
  const name = typeof req.data?.name === 'string' ? req.data.name.trim() : '';
  if (!validBoardName(name)) return { ok: false, reason: 'name' };

  const season = await publishedSeason();
  const uid = req.auth.uid;
  const ref = db.doc(`seasons/${season.id}/board/${uid}`);
  const existing = await ref.get();
  const stored = existing.exists && typeof existing.get('depth') === 'number'
    ? { depth: Number(existing.get('depth')), ticks: Number(existing.get('ticks')) }
    : null;

  let judged: ReturnType<typeof acceptSubmission>;
  try {
    judged = acceptSubmission(replay, stored, {
      contentVersion: CONTENT_VERSION,
      seasonId: season.id,
      endsAt: season.endsAt,
      now: Date.now(),
    });
  } catch {
    return { ok: false, reason: 'mismatch' };
  }
  if (!judged.ok) return { ok: false, reason: judged.reason };

  await ref.set({
    name,
    depth: judged.depth,
    ticks: judged.ticks,
    contentVersion: CONTENT_VERSION,
    updatedAt: Date.now(),
  });
  await db.doc(`players/${uid}`).set({ seasons: FieldValue.arrayUnion(season.id) }, { merge: true });
  return { ok: true };
});

export const setBoardName = onCall(async (req) => {
  if (!req.auth) throw new HttpsError('unauthenticated', 'Sign in to set a board name.');
  const name = typeof req.data?.name === 'string' ? req.data.name.trim() : '';
  if (!validBoardName(name)) throw new HttpsError('invalid-argument', 'Use 2–16 characters.');
  const season = await publishedSeason();
  const ref = db.doc(`seasons/${season.id}/board/${req.auth.uid}`);
  const existing = await ref.get();
  if (!existing.exists) return { ok: true, stored: false };
  await ref.update({ name });
  return { ok: true, stored: true };
});

export const deleteAccount = onCall(async (req) => {
  if (!req.auth) throw new HttpsError('unauthenticated', 'Sign in to delete an account.');
  const uid = req.auth.uid;
  const player = await db.doc(`players/${uid}`).get();
  const listed = player.get('seasons');
  const seasons = new Set<string>(Array.isArray(listed) ? listed.map(String) : []);
  const current = await db.doc('meta/season').get();
  const currentId = current.get('id');
  if (typeof currentId === 'string') seasons.add(currentId);
  for (const seasonId of seasons) {
    await db.doc(`seasons/${seasonId}/board/${uid}`).delete();
  }
  await db.doc(`players/${uid}`).delete();
  await getAuth().deleteUser(uid);
  return { ok: true };
});
