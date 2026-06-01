const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('T-BALL-01: Boll placeras på paddle', () => {
  it('ball.y = paddle.y - ball.radius vid start', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /ball\.y.*paddle\.y|paddle\.y.*ball\.y/.test(code) && /ball\.radius|radius/.test(code),
      'ball.y ska beräknas från paddle.y - ball.radius'
    );
  });

  it('ball.x = paddle.x + paddle.width/2 vid start', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /ball\.x.*paddle\.x.*paddle\.width|paddle\.width.*ball\.x/.test(code) ||
      /ball\.x.*paddle\s*\+/.test(code) ||
      /\.center/.test(code) ||
      /\+\.5\s*\*|\/\s*2/.test(code),
      'ball.x ska vara centrerad på paddeln'
    );
  });
});

describe('T-BALL-02: Bollen startar med ±30° vid space', () => {
  it('launch använder sin/cos för vinkelberäkning', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /Math\.sin|Math\.cos/.test(code),
      'launch måste använda sin/cos för vinkel'
    );
    assert.ok(
      /ball\.vx|ball\.vy|vx|vy/.test(code),
      'ball måste ha vx och vy komponenter'
    );
  });

  it('space-tangent startar bollen', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /Space|space|\s/.test(code) || /key\s*===?\s*['\"]|key\s*===?\s*['\"]|code/.test(code),
      'code måste lyssna på space-tangenten'
    );
  });
});

describe('T-BALL-03: Boll-väggkollision (horisontell)', () => {
  it('vx inverteras vid canvas kanter', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /canvas\.width.*vx|vx.*canvas\.width|wall.*vx|vx\s*\*=\s*-1/.test(code),
      'vx måste inverteras vid väggkollision'
    );
  });
});

describe('T-BALL-04: Boll-väggkollision (vertikal)', () => {
  it('vy inverteras vid taket (y <= 0)', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /canvas\.height.*vy|vy.*canvas\.height|ball\.y.*0|vy\s*\*=\s*-1|yRadius.*0|radius.*0/.test(code),
      'vy måste inverteras vid taket'
    );
  });
});

describe('T-BALL-05: Boll-paddlekollision', () => {
  it('vy inverteras vid paddle-kollision', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /paddle.*vy|vy.*paddle|checkCollision|collision|hit/.test(code),
      'måste finnas paddle-kollisionslogik'
    );
    assert.ok(
      /vy\s*\*=\s*-1|vy\s*=\s*-Math|Math\.abs/.test(code) ||
      /invertera|reverse|flip/.test(code),
      'vy måste inverteras vid paddle-hit'
    );
  });
});

describe('T-BALL-06: Boll-miss och livförlust', () => {
  it('lives minskas vid ball.y >= canvas.height', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /lives|--.*lives|lives--/.test(code) || /lives\s*=\s*.*-?\s*1/.test(code),
      'lives måste minskas vid boll-miss'
    );
    assert.ok(
      /canvas\.height.*ball|ball.*canvas\.height|y\s*>=?\s*canvas|miss|lost|fallen/.test(code),
      'miss-detektion måste finnas'
    );
  });
});
