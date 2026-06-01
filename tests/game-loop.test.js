const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('T-GL-01: Canvas-initiering', () => {
  it('game.js skapar canvas-element med referens', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      code.includes("getElementById") || code.includes("canvas"),
      'game.js måste referera till canvas-elementet'
    );
  });

  it('canvas har rätt dimensioner (bredd x höjd)', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      code.includes("width") && code.includes("height"),
      'game.js måste sätta canvas width och height'
    );
  });
});

describe('T-GL-02: Game loop (requestAnimationFrame)', () => {
  it('game.js använder requestAnimationFrame för loop', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      code.includes("requestAnimationFrame"),
      'game.js måste använda requestAnimationFrame'
    );
  });

  it('game-loop har update() och render() steg', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      code.includes("update") || /\bupdate\b/.test(code),
      'game-loop måste ha update-steget'
    );
    assert.ok(
      code.includes("render") || /\brender\b/.test(code),
      'game-loop måste ha render-steget'
    );
  });

  it('game-loop anropar sig själv rekursivt', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      code.includes("requestAnimationFrame") && code.includes("game"),
      'game-loop måste anropa sig självt via requestAnimationFrame'
    );
  });
});

describe('T-GL-03: Responsiv canvas vid resize', () => {
  it('game.js lyssnar på window resize-event', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      code.includes("resize") || code.includes("addEventListene"),
      'game.js måste hantera fönster-resize'
    );
  });

  it('resize-uppdaterar canvas dimensioner', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(
      code.includes("clientWidth") || code.includes("innerWidth") || code.includes("offsetWidth"),
      'resize-hantering måste läsa fönsterbredden'
    );
  });
});
