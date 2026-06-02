const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('T-LEVEL-01: Nivå 1 bildar ordet "Kvadrat" (SR-01)', () => {
  it('LevelGenerator finns i levelGenerator.js och används i game.js', () => {
    const levelCode = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    const gameCode = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/LevelGenerator|levelGenerator|generateLevel/.test(levelCode), 'måste ha LevelGenerator i levelGenerator.js');
    assert.ok(/LevelGenerator|levelGenerator|generateLevel|levelGenerator\.js/.test(gameCode), 'game.js måste använda LevelGenerator');
  });

  it('generateLevel finns i levelGenerator.js', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/generateLevel|LevelGenerator/.test(code), 'levelGenerator.js måste ha generateLevel');
  });

  it('nivå 1 genererar brickar med textmönster', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/Kvadrat|kvadrat/.test(code), 'måste ha "Kvadrat" textmönster');
  });
});

describe('T-LEVEL-02: Nivå 2 bildar ordet "Tengan" (SR-01)', () => {
  it('nivå 2 har "Tengan" textmönster', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/Tengan|tengan/.test(code), 'måste ha "Tengan" textmönster');
  });

  it('bokstavsmönster finns för T, E, N, G, A', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/LETTER_PATTERNS/.test(code), 'måste ha bokstavsmönster');
    const letters = ['T', 'E', 'N', 'G', 'A'];
    for (const letter of letters) {
      assert.ok(new RegExp(letter + ':').test(code) || new RegExp(letter + '\\s*\\[').test(code),
        'måste ha mönster för bokstaven ' + letter);
    }
  });
});

describe('T-LEVEL-03: Nivå 3-6 visar mönster (SR-02)', () => {
  it('båt-mönster finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/boat|båt|båtmønster/.test(code), 'måste ha båt-mönster');
  });

  it('bil-mönster finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/car|bil/.test(code), 'måste ha bil-mönster');
  });

  it('plan-mönster finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/plane|plan/.test(code), 'måste ha plan-mönster');
  });

  it('cigarett-mönster finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/cigarette|cigarett/.test(code), 'måste ha cigarett-mönster');
  });

  it('SHAPE_PATTERNS finns med alla 4 mönster', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/SHAPE_PATTERNS/.test(code), 'måste ha SHAPE_PATTERNS');
    const shapes = ['boat', 'car', 'plane', 'cigarette'];
    for (const shape of shapes) {
      assert.ok(new RegExp(shape + ':').test(code), 'måste ha shape ' + shape);
    }
  });
});

describe('T-LEVEL-04: Nivå 7-20 slumpmässiga mönster (SR-03)', () => {
  it('random/nivå >= 7 genereras slumpmässigt', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/random|Random|generateRandom|slump/.test(code), 'måste ha random/nivå >= 7-generering');
  });

  it('generateRandomLevel finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/generateRandomLevel/.test(code), 'måste ha generateRandomLevel');
  });

  it('slumpnivå har max 8 rader', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/maxRows|BRICK_ROWS|8/.test(code), 'max 8 rader');
  });
});

describe('T-LEVEL-05: Murmenstyper distribution (SR-04)', () => {
  it('70% enkel murmenst', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/r\s*<\s*70|70|simple.*70|70.*simple/.test(code), '70% enkel');
  });

  it('10% hart murmenst', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/r\s*<\s*80|80|tough.*10|10.*tough/.test(code), '10% hart');
  });

  it('10% bonus murmenst', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/r\s*<\s*90|90|bonus.*10|10.*bonus/.test(code), '10% bonus');
  });

  it('5% double ball murmenst', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/r\s*<\s*95|95|double.*5|5.*double/.test(code), '5% double');
  });

  it('5% speedup murmenst', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/speedup/.test(code), 'måste ha speedup');
  });

  it('randomBrickType finns med viktad sannolikhet', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/randomBrickType|weighted|sannolikhet|Math\.random/.test(code), 'måste ha randomBrickType med viktad sannolikhet');
  });
});

describe('T-LEVEL-06: Totalt 20 nivåer (GR-03)', () => {
  it('TOTAL_LEVELS === 20', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/TOTAL_LEVELS.*20|20.*TOTAL_LEVELS|TOTAL_LEVELS\s*=\s*20/.test(code), 'måste ha exakt 20 nivåer');
  });

  it('getLevelDefinition finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'levelGenerator.js'), 'utf-8');
    assert.ok(/getLevelDefinition/.test(code), 'måste ha getLevelDefinition');
  });
});
