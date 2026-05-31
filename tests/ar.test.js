const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');

describe('T-AR-01: Express-servern servar statiska filer', () => {
  let server;
  let app;

  it('servern startar och svarar med HTTP 200 på index.html (AR-03)', (done) => {
    const { app: loadedApp, server: loadedServer } = require('../server.js');
    app = loadedApp;
    server = loadedServer;

    http.get('http://localhost:3000/', (res) => {
      assert.equal(res.statusCode, 200, 'Servern ska svara med 200');
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        assert.ok(data.includes('<!DOCTYPE html>'), 'HTML-filen ska innehålla DOCTYPE');
        assert.ok(data.includes('<canvas'), 'HTML:ska innehålla canvas-element');
        assert.ok(data.includes('<title>Breakout</title>'), 'Titel ska vara Breakout');
        server.close(done);
      });
    }).on('error', (err) => {
      server.close();
      done(err);
    });
  });
});

describe('T-AR-02: Inget backend API-extrakt (statisk analys)', () => {
  it('server.js har endast express som beroende (AR-01)', () => {
    const pkg = require('../package.json');
    const deps = pkg.dependencies || {};
    const depKeys = Object.keys(deps);

    // Endast express ska finnas som produktionsberoende
    assert.ok(
      depKeys.length === 1 && depKeys[0] === 'express',
      `Får endast ha express som beroende, har: ${JSON.stringify(depKeys)}`
    );
  });

  it('server.js har inga API-rutter eller backend-logik (AR-01)', () => {
    const serverCode = fs.readFileSync(path.join(__dirname, '../server.js'), 'utf-8');

    assert.ok(
      !serverCode.includes('/api/'),
      'Servern ska inte ha några API-rutter'
    );
    assert.ok(
      !serverCode.includes('database') && !serverCode.includes('db.') && !serverCode.includes('mongo'),
      'Servern ska inte ha databasanslutningar'
    );
    assert.ok(
      !serverCode.includes('app.post') && !serverCode.includes('app.put') && !serverCode.includes('app.delete'),
      'Servern ska inte ha skriv-API-rutter'
    );
  });

  it('project structure matches expected layout (AR-01)', () => {
    const projectRoot = path.join(__dirname, '..');
    assert.ok(fs.existsSync(path.join(projectRoot, 'server.js')), 'server.js ska existera');
    assert.ok(fs.existsSync(path.join(projectRoot, 'public', 'index.html')), 'public/index.html ska existera');
    assert.ok(fs.existsSync(path.join(projectRoot, 'public', 'style.css')), 'public/style.css ska existera');
    assert.ok(fs.existsSync(path.join(projectRoot, 'public', 'game.js')), 'public/game.js ska existera');
    assert.ok(fs.existsSync(path.join(projectRoot, 'tests', 'ar.test.js')), 'tests/ar.test.js ska existera');
    assert.ok(fs.existsSync(path.join(projectRoot, 'package.json')), 'package.json ska existera');
  });
});
