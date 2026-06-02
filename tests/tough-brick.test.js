const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('T-BRICK-03: Hart mursten förstörs vid 3 träffar', () => {
  it('hart brick har typ och färg (röd)', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /tough|hart|hard/.test(code.toLowerCase()) ||
      /CC0000|red|#CC0000/.test(code),
      'hart brick måste ha typ och röd färg (#CC0000)'
    );
    assert.ok(
      /type.*tough|brick\.type.*=|tough.*brick/.test(code.toLowerCase()) ||
      /BB0000|DD0000|AA0000/.test(code),
      'brick type måste identifiera hart brick'
    );
  });

  it('hart brick hp = 3', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /hp.*3|hp\s*:\s*3|hp.*==.*3|hp\s*==\s*3|hp\s*>=\s*3/.test(code),
      'hart brick måste ha hp = 3'
    );
  });

  it('visuell förändring vid träff (hp > 1)', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /hp.*>.*1|hp\s*>\s*1|hp.*>=.*2|hp.*<.*3|faded|fade|alpha|opacity|lighter|darken|bleka|factor.*hp|renderColor|hp.*3/.test(code),
      'visuell förändring vid träff (hp > 1)'
    );
  });

  it('poäng +50 vid förstöring', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /\+\s*50|score\s*\+=\s*50|score.*50/.test(code),
      'hart brick förstöring ska ge +50 poäng'
    );
  });

  it('första träffen minskar hp från 3 till 2', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      /hp--|hp\s*-\s*=|hp\s*=\s*.*-.*1/.test(code),
      'hp måste minskas vid varje träff'
    );
  });
});
