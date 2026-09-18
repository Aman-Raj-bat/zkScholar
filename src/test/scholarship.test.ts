import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { WebSocket } from 'ws';
// @ts-expect-error WebSocket global
globalThis.WebSocket = WebSocket;
describe('zkScholar Contract', () => {
  it('placeholder', () => { expect(true).toBe(true); });
});
