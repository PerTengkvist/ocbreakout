const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('T-LIFE-01: Starta med 3 liv (GR-01)', () => {
  it('Game init med 3 liv', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/lives\s*:\s*3|lives.*=.*3|lives.*3/.test(code), 'måste initiera med 3 liv');
  });

  it('lives resettas vid nytt spel', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/lives.*=.*3|reset.*life|new.*game.*life|startGame.*life|lives.*3|resetBall.*life/.test(code) ||
              /lives\s*=\s*3/.test(code), 'lives måste sättas till 3 vid init');
  });
});

describe('T-LIFE-02: Liv minskas vid miss (GR-02, UC-04)', () => {
  it('lives-- vid ball miss', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/lives--|lives\s*-\s*=|lives\s*=\s*.*-.*1/.test(code), 'lives måste minskas vid miss');
  });

  it('canvas.height kollisjon för ball miss', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/canvas\.height|canvasHeight|y.*>=.*height/.test(code), 'måste kontrollera canvas.height för ball miss');
  });
});

describe('T-LIFE-03: Game Over vid 0 liv (GR-01, UC-07)', () => {
  it('gameState = GAME_OVER vid 0 liv', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/GAME_OVER|gameState.*game.*over/.test(code.toUpperCase()), 'måste sätta gameState till GAME_OVER');
  });

  it('lives === 0 eller lives <= 0 triggers game over', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/lives\s*(<=|===)\s*0|lives.*<=.*0|0.*lives/.test(code), 'måste kontrollera lives <= 0 för game over');
  });

  it('lives == 0 vid game over', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/lives\s*=\s*0/.test(code), 'lives måste sättas till 0 vid game over');
  });
});

describe('T-SCORE-01: Poäng +10 vid enkel brick (GR-05)', () => {
  it('enkel brick ger +10 poäng', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/score.*\+=\s*10|\+10.*score|score.*10/.test(code), 'enkel brick ger +10 poäng');
  });
});

describe('T-SCORE-02: Poäng +50 vid hart brick (GR-06)', () => {
  it('hart brick förstöring ger +50', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/score.*\+=\s*50|\+50.*score/.test(code), 'hart brick ger +50 poäng');
  });
});

describe('T-SCORE-03: Poäng +50 vid double brick (GR-07)', () => {
  it('double brick ger +50 poäng', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/double.*50|score.*50/.test(code), 'double brick ger +50 poäng');
  });
});

describe('T-SCORE-04: Poäng +210 vid bonus brick (GR-08)', () => {
  it('bonus brick + mynt ger +210 totalt', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/score.*\+=\s*10/.test(code), 'bonus brick ger +10');
    assert.ok(/score.*\+=\s*200|score\s*\+=\s*200|bonus.*200/.test(code), 'bonus mynt ger +200');
  });
});

describe('T-SCORE-05: Poäng +250 vid speedup brick (GR-09)', () => {
  it('speedup brick ger +250 poäng', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/score.*\+=\s*250|score\s*\+=\s*250|\+250.*score/.test(code), 'speedup brick ger +250 poäng');
  });
});
