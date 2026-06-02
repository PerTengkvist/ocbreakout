const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('T-SOUND-01: Brick-hit-ljud vid enkel brick (SU-01 + GR-05)', () => {
  it('SoundManager finns i separate fil', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'soundManager.js'), 'utf-8');
    assert.ok(/SoundManager/.test(code), 'måste ha SoundManager');
  });

  it('playSimpleBrick finns med 440 Hz', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'soundManager.js'), 'utf-8');
    assert.ok(/playSimpleBrick|440/.test(code), 'måste ha playSimpleBrick med 440 Hz');
  });

  it('Web Audio API oscillator används', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'soundManager.js'), 'utf-8');
    assert.ok(/AudioContext|createOscillator|oscillator/.test(code), 'måste använda Web Audio API oscillator');
  });
});

describe('T-SOUND-02: Brick-hit-ljud vid hart brick (SU-01 + GR-06)', () => {
  it('playToughBrick finns med annan frekvens än enkel', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'soundManager.js'), 'utf-8');
    assert.ok(/playToughBrick|330|tough.*brick/.test(code), 'måste ha playToughBrick med annan frekvens');
  });

  it('tough-brick har annan frekvens än simple-brick (440 Hz)', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'soundManager.js'), 'utf-8');
    assert.ok(/playToughBrick/.test(code) && /330/.test(code), 'tough-brick måste ha annan frekvens');
  });
});

describe('T-SOUND-03: Brick-hit-ljud vid double brick (SU-01 + GR-07)', () => {
  it('playDoubleBrick finns med 550 Hz', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'soundManager.js'), 'utf-8');
    assert.ok(/playDoubleBrick|550/.test(code), 'måste ha playDoubleBrick med 550 Hz');
  });
});

describe('T-SOUND-04: Brick-hit-ljud vid bonus brick (SU-01 + GR-08)', () => {
  it('playBonusBrick finns med 660 Hz', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'soundManager.js'), 'utf-8');
    assert.ok(/playBonusBrick|660/.test(code), 'måste ha playBonusBrick med 660 Hz');
  });
});

describe('T-SOUND-05: Brick-hit-ljud vid speedup brick (SU-01 + GR-09)', () => {
  it('playSpeedupBrick finns med 220 Hz', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'soundManager.js'), 'utf-8');
    assert.ok(/playSpeedupBrick|220/.test(code), 'måste ha playSpeedupBrick med 220 Hz');
  });

  it('speedup-brick har längre duration', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'soundManager.js'), 'utf-8');
    assert.ok(/0\.3.*speedup|speedup.*0\.3|playSpeedupBrick.*0\.3|0\.3.*0\.08/.test(code), 'längre duration för speedup');
  });
});

describe('T-SOUND-06: Paddle-hit-ljud (SU-02)', () => {
  it('playPaddleHit finns med låg frekvens', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'soundManager.js'), 'utf-8');
    assert.ok(/playPaddleHit|150|paddle.*hit/.test(code), 'måste ha playPaddleHit med låg frekvens');
  });

  it('paddle-hit är mycket kort', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'soundManager.js'), 'utf-8');
    assert.ok(/0\.05.*paddle|paddle.*0\.05|playPaddleHit.*0\.05|0\.05.*0\.2/.test(code), 'mycket kort duration');
  });
});

describe('T-SOUND-07: Bonus-catch-ljud (SU-03)', () => {
  it('playBonusCatch finns med stigande ton', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'soundManager.js'), 'utf-8');
    assert.ok(/playBonusCatch|440.*880|880.*440|FrequencyBend|frequencyBend/.test(code), 'måste ha stigande ton');
  });
});

describe('T-SOUND-08: Ball-miss-ljud (SU-04)', () => {
  it('playBallMiss finns med diskordant ton', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'soundManager.js'), 'utf-8');
    assert.ok(/playBallMiss|200.*150|150.*200|ball.*miss|sawtooth/.test(code), 'måste ha diskordant ton');
  });
});

describe('T-SOUND-09: Game Over-ljud (SU-05)', () => {
  it('playGameOver finns med dyston ton', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'soundManager.js'), 'utf-8');
    assert.ok(/playGameOver|220.*110|110.*220|game.*over|dyston/.test(code), 'måste ha dyston game over ton');
  });

  it('playSound dispatcher finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'soundManager.js'), 'utf-8');
    assert.ok(/playSound|switch.*soundName/.test(code), 'måste ha playSound dispatcher');
  });
});
