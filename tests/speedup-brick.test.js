const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('T-BRICK-07: Speedup Brick — GR-09', () => {
  it('speedup brick har typ och färg (blå)', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/speedup/.test(code.toLowerCase()), 'måste ha speedup brick typ');
    assert.ok(/0066CC|blue|#0066CC/.test(code), 'färg måste vara blå (#0066CC)');
  });

  it('applySpeedup-funktion finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/applySpeedup|speedupBall/.test(code), 'måste ha applySpeedup-funktion');
  });

  it('speedMultiplier ökas per väggkrock och brick-hit', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    // Måste multiplicera speedMultiplier med 1.1
    assert.ok(/speedMultiplier\s*\*=\s*1\.1|ball\.speedMultiplier.*\*.*1\.1|speedup.*1\.1/.test(code), 'speedMultiplier måste öka med 10%');
  });

  it('poäng +250 vid speedup brick-träff', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/\+\s*250|score\s*\+=\s*250/.test(code), 'speedup brick måste ge +250 poäng');
  });

  it('speedMultiplier resettas vid liv-förlust', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/resetSpeedMultiplier|reset.*speed|live.*reset|speedMultiplier.*1\.0/.test(code), 'måste återställa speedMultiplier vid liv-förlust');
  });

  it('speedup brick finns i brick-creation', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/type.*speedup|speedup.*brick|brick\.type.*speedup/.test(code), 'brick-creation generera speedup brick');
  });
});
