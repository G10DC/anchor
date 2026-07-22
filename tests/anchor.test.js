import { describe, it } from 'node:test';
import assert from 'node:assert';
import { AnchorEngine } from '../lib/anchor.js';

describe('AnchorEngine', () => {
  const sampleEndpoints = [
    { name: 'login', method: 'POST', path: '/api/login', requiredFields: ['email', 'password'] },
    { name: 'getProfile', method: 'GET', path: '/api/profile' }
  ];

  it('generates express routes with input validation', () => {
    const engine = new AnchorEngine();
    const code = engine.generateServerRoutes(sampleEndpoints);
    assert.match(code, /router\.post\('\/api\/login'/);
    assert.match(code, /Missing required fields/);
    assert.match(code, /router\.get\('\/api\/profile'/);
  });

  it('generates client SDK fetch wrapper methods', () => {
    const engine = new AnchorEngine();
    const sdk = engine.generateClientSdk(sampleEndpoints, 'https://api.example.com');
    assert.match(sdk, /class ApiClient/);
    assert.match(sdk, /async login\(payload = \{\}\)/);
    assert.match(sdk, /async getProfile\(payload = \{\}\)/);
  });
});
