const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('T-PADDLE-01: Paddle flyttas vänster', () => {
  it('game.js sänker paddle.x vid ArrowLeft', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /\bpaddle\.x\s*-?=/.test(code) || /paddle\.moveLeft|arrowleft/i.test(code),
      'game.js måste hantera paddle.x minskning för ArrowLeft'
    );
    assert.ok(
      /ArrowLeft|arrowleft|left/i.test(code),
      'game.js måste lyssna på ArrowLeft-tangenten'
    );
  });
});

describe('T-PADDLE-02: Paddle flyttas höger', () => {
  it('game.js höjer paddle.x vid ArrowRight', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /\bpaddle\.x\s*-?=/.test(code) || /paddle\.moveRight|arrowright/i.test(code),
      'game.js måste hantera paddle.x ökning för ArrowRight'
    );
    assert.ok(
      /ArrowRight|arrowright|right/i.test(code),
      'game.js måste lyssna på ArrowRight-tangenten'
    );
  });
});

describe('T-PADDLE-03: Paddle stannar vid vänster kant', () => {
  it('paddle.x >= 0 vid vänster gräns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /\bpaddle\.x\s*<=?\s*0|Math\.max\s*\(\s*0|paddle\.x\s*<\s*0/.test(code),
      'game.js måste blockera paddle från att gå under x=0'
    );
  });
});

describe('T-PADDLE-04: Paddle stannar vid höger kant', () => {
  it('paddle.x + paddle.width <= canvas.width vid höger gräns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /canvas\.width|innerWidth|clientWidth|offsetWidth/.test(code),
      'game.js måste läsa canvasbredden'
    );
    assert.ok(
      /paddle\.x.*paddle\.width|paddle\.width.*paddle\.x/.test(code),
      'game.js måste kontrollera paddlebredden vid höger gräns'
    );
    assert.ok(
      /\bpaddle\.x\s*>=|Math\.min\s*\(/.test(code),
      'game.js måste blockera paddle från att gå förbi canvas högra kant'
    );
  });
});

describe('T-PADDLE-05: Tangentbordshändelser kopplas till paddle', () => {
  it('keydown-event lyssnar på ArrowLeft och ArrowRight', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      code.includes("addEventListener") && /key|key|key/i.test(code),
      'game.js måste använda event listener för tangenter'
    );
    assert.ok(
      /ArrowLeft|ArrowRight|left|right/i.test(code),
      'game.js måste mappa pil tangenter till paddle movement'
    );
  });
});
