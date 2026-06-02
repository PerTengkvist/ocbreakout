const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('T-BRICK-05/06: Bonus Brick — GR-08', () => {
  it('bonus brick har typ och färg (guld)', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/bonus|bonusbrick|bonus.*brick/.test(code.toLowerCase()), 'måste ha bonus brick typ');
    assert.ok(/FFD700|gold|#FFD700/.test(code), 'färg måste vara gul/guld (#FFD700)');
  });

  it('spawnCoin-funktion finns med tyngdkraft', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/spawnCoin|spawnCoin/.test(code), 'måste ha spawnCoin-funktion');
    assert.ok(/COIN_GRAVITY|400|vy\s*\+=/.test(code), 'mynt måste ha tyngdkraft');
  });

  it('coins-array och updateCoins', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/coins\s*=|coins\.push|coins\.length|updateCoins/.test(code), 'måste ha coins-array och updateCoins');
  });

  it('mynt fångas vid paddle-kontakt: +200 poäng', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/\+\s*200|score\s*\+=\s*200|bonus.*200/.test(code), 'mynt-fånga måste ge +200 poäng');
    // Mynt-fångst-kollisjon måsj finne paddel
    assert.ok(/c\.y\s*\+\s*c\.radius.*>=.*paddle|paddle.*c\.y.*coin|coin.*paddle.*catch|c\.y.*paddle\.y/.test(code) ||
              /paddle\.y.*coin|coin.*paddle\.y|paddle.*coin.*catch/i.test(code), 
              'måste kontrollera kontakt med paddle');
  });

  it('brick +10 poäng + mynt +200 = total +210', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/score\s*\+=\s*10|\+10|10.*bonus.*brick/.test(code), 'bonus brick gir +10');
    assert.ok(/score\s*\+=\s*200|\+200|200.*coin|200.*mynt/.test(code), 'fånget mynt gir +200');
  });

  it('coins renderas på canvas', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/coin.*render|render.*coin|for.*coin.*arc|coins\.forEach/.test(code.toLowerCase()), 'mynt måste renderas');
  });
});
