#!/usr/bin/env node
// Echo Shafts playtest MCP. Handshake stays in this file. The sim loads on the first tool call.

import { writeSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

const TOOLS = [
  { name: 'look', description: 'Where the Warden is: camp stall or shaft, HP, Echo, pack, and a small map.', inputSchema: { type: 'object', properties: {} } },
  {
    name: 'walk',
    description: 'Walk the camp to a stall: shaft, sell, reforge, stash, rank, loadout, or night.',
    inputSchema: { type: 'object', properties: { to: { type: 'string' } }, required: ['to'] },
  },
  {
    name: 'act',
    description: 'Use the stall you are standing at, or the results sheet. t is descend, vein, sell, stash, withdraw, claim, results, equip, pack, keep, salvage, or resolve. ids are pack item ids. id is one results-sheet item.',
    inputSchema: {
      type: 'object',
      properties: {
        t: { type: 'string', enum: ['descend', 'vein', 'sell', 'stash', 'withdraw', 'claim', 'results', 'equip', 'pack', 'keep', 'salvage', 'resolve'] },
        ids: { type: 'array', items: { type: 'string' } },
        id: { type: 'string' },
        depth: { type: 'number' },
      },
      required: ['t'],
    },
  },
  {
    name: 'fight',
    description: 'Play the current shaft for up to `seconds` of sim time. Holds Main, pulls packs, and uses artifact buttons.',
    inputSchema: { type: 'object', properties: { seconds: { type: 'number' } } },
  },
  {
    name: 'play',
    description: 'Walk to the shaft, descend, and fight. One unranked run.',
    inputSchema: { type: 'object', properties: { seconds: { type: 'number' } } },
  },
  {
    name: 'reset',
    description: 'Start a fresh Warden. Pass fresh:false to reload the playtest save.',
    inputSchema: { type: 'object', properties: { fresh: { type: 'boolean' } } },
  },
];

function write(msg) {
  const json = JSON.stringify(msg);
  writeSync(1, `Content-Length: ${Buffer.byteLength(json, 'utf8')}\r\n\r\n${json}`);
}

function takeMessage(buf) {
  const headerEnd = buf.indexOf('\r\n\r\n');
  if (headerEnd === -1) return null;
  const header = buf.subarray(0, headerEnd).toString('utf8');
  const match = /Content-Length:\s*(\d+)/i.exec(header);
  if (!match) return null;
  const len = Number(match[1]);
  const start = headerEnd + 4;
  if (buf.length < start + len) return null;
  return { msg: JSON.parse(buf.subarray(start, start + len).toString('utf8')), rest: buf.subarray(start + len) };
}

let callTool = null;
async function loadGame() {
  if (callTool) return callTool;
  const { register } = await import('tsx/esm/api');
  register();
  const mod = await import(pathToFileURL(resolve(here, 'player.ts')).href);
  callTool = mod.callTool;
  return callTool;
}

async function handle(msg) {
  if (!msg.method || msg.id === undefined) return;
  if (msg.method === 'initialize') {
    const requested = typeof msg.params?.protocolVersion === 'string' ? msg.params.protocolVersion : '2025-06-18';
    write({
      jsonrpc: '2.0',
      id: msg.id,
      result: {
        protocolVersion: requested,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: 'echo-shafts', version: '0.1.0' },
      },
    });
    return;
  }
  if (msg.method === 'ping') {
    write({ jsonrpc: '2.0', id: msg.id, result: {} });
    return;
  }
  if (msg.method === 'tools/list') {
    write({ jsonrpc: '2.0', id: msg.id, result: { tools: TOOLS } });
    return;
  }
  if (msg.method === 'prompts/list' || msg.method === 'resources/list') {
    write({ jsonrpc: '2.0', id: msg.id, result: { [msg.method === 'prompts/list' ? 'prompts' : 'resources']: [] } });
    return;
  }
  if (msg.method === 'tools/call') {
    try {
      const fn = await loadGame();
      write({ jsonrpc: '2.0', id: msg.id, result: await fn(String(msg.params?.name ?? ''), msg.params?.arguments ?? {}) });
    } catch (err) {
      write({ jsonrpc: '2.0', id: msg.id, error: { code: -32000, message: err instanceof Error ? err.message : String(err) } });
    }
    return;
  }
  write({ jsonrpc: '2.0', id: msg.id, error: { code: -32601, message: `Method not found: ${msg.method}` } });
}

let buf = Buffer.alloc(0);
let chain = Promise.resolve();
process.stdin.on('data', (chunk) => {
  buf = Buffer.concat([buf, Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)]);
  while (true) {
    const taken = takeMessage(buf);
    if (!taken) break;
    buf = taken.rest;
    chain = chain.then(() => handle(taken.msg)).catch((err) => console.error('[echo-mcp]', err));
  }
});
process.stdin.resume();
