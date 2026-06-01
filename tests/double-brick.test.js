const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('T-BRICK-04: Double Ball Brick — GR-07', () => {
  it('double brick har typ och färg (grön)', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/double|doubleball/.test(code.toLowerCase()), 'måste ha "double" brick type');
    assert.ok(/00AA00|green|#00AA00/.test(code), 'färg måste vara grön (#00AA00)');
  });

  it('spawnBall-funktion finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/spawnBall|spawn.*ball|spawnBalls/.test(code), 'måste ha spawnBall-funktion');
  });

  it('balls-array för flera bollar', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/balls\s*=|balls\.push|balls\.length|for.*balls/.test(code), 'måste ha balls-array');
  });

  it('ny boll spawnar från brick-position med ±30°', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    // spawnBall måste ta x, y-parameter och sätta vx/vy baserat på vinkel
    assert.ok(/spawnBall\s*\(/.test(code), 'spawnBall måste anropas vid collision');
    // ±30° vinkel måste finnas (60 - 30 graders intervall)
    assert.ok(/60\s*-\s*30|Math\.sin.*angle|Math\.cos.*angle/.test(code), 'vinkel ±30° måste beräknas');
  });

  it('poäng +50 vid double brick-träff', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/\+\s*50|score\s*\+=\s*50/.test(code), 'double brick måste ge +50 poäng');
  });
});
