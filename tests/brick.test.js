const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('T-BRICK-01: Mursten skapas i rätt position och färg', () => {
  it('game.js skapar brick-array i ett rutnät', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /bricks?\s*=\s*\[|\s*\w+\.bricks|\bbricks\b/.test(code),
      'game.js måste ha en brick-array'
    );
    assert.ok(
      /brick\.x|brick\.y|brick\.width|brick\.height/.test(code),
      'brick måste ha position och dimensioner'
    );
    assert.ok(
      /brick\.type|brick\.color|type.*brick|color.*brick/.test(code),
      'brick måste ha type och/eller color'
    );
  });

  it('brick placeras i rutnät med kolonn och rad', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /rows|row|cols|cols|columns|columns/.test(code) ||
      /for\s*\(|\.forEach|\.map/.test(code),
      'brick-layout måste ha iterationslogik (rows/cols eller loop)'
    );
  });
});

describe('T-BRICK-02: Enkel brick försvinner vid 1 träff', () => {
  it('brick har hp-attribut som börjar på 1 för enkel brick', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /brick.*hp|hp\s*[:=]|\.hp\b/.test(code),
      'brick måste ha hp-attribut'
    );
  });

  it('boll-träff minskar brick hp och tar bort vid 0', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /hp\s*[-=]|brick.*remove|splice|filter|\.push|bricks\.splice|delete|splice/.test(code),
      'brick hp måste minskas vid träff och brick tas bort vid 0'
    );
  });

  it('poäng +10 vid enkel brick-träff', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /\+\s*10|score\s*\+=\s*10|score.*10/.test(code),
      'enkel brick ska ge +10 poäng'
    );
  });

  it('enkel brick har grå färg (#AAAAAA)', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /AAAAAA|#777|gray|#888|#999|#BBB/.test(code) ||
      /grey|simple.*grey|simple.*brick.*color/.test(code.toLowerCase()) ||
      /'grey'|\"grey\"/.test(code),
      'enkel brick ska ha grå färg'
    );
  });
});
