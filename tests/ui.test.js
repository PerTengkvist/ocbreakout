const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('T-UI-01: Startskärm renderas korrekt (UX-01)', () => {
  it('ScreenManager finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/ScreenManager/.test(code), 'måste ha ScreenManager');
  });

  it('BREAKOUT-text finns i splash', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/BREAKOUT|drawSplash/.test(code), 'måste ha BREAKOUT-titel');
  });

  it('Copyright-text finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/Per Tengkvist|Kvadrat|Skapad av/.test(code), 'måste ha copyright-text');
  });

  it('Courier font används', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/Courier New|Courier/.test(code), 'måste använda Courier font');
  });

  it('Mulen ljusblå bakgrund (#87CEEB)', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/87CEEB|skyblue|lightblue/.test(code), 'måste ha ljusblå bakgrund');
  });

  it('Paddle och boll centrerade i splash', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/paddle.*canvas.*width.*0\.15|paddleW.*canvas|canvas.*0\.15.*paddle/.test(code), 'paddle skalas responsivt');
  });
});

describe('T-UI-02: Huvudmeny renderas (UX-02)', () => {
  it('Huvudmeny med high scores finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/HIGH SCORES|highScores|drawMenu/.test(code), 'måste ha high scores i meny');
  });

  it('New Game-knapp finns (space-tangent)', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/NEW GAME|NYTT SPEL|nytt spel|tryck space|SPACE/.test(code), 'måste ha New Game-knapp');
  });

  it('Max 5 high scores', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/maxHighScores.*5|5.*maxHighScores|maxHighScores\s*=\s*5/.test(code), 'max 5 high scores');
  });
});

describe('T-UI-03: Spelskärm visar HUD (UX-03)', () => {
  it('HUD visar poäng', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/Score:|score.*draw|draw.*score|score.*10/.test(code) || /Game\.score/.test(code), 'måste visa poäng');
  });

  it('HUD visar liv', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/Lives:|lives.*draw|draw.*lives|Game\.lives/.test(code), 'måste visa liv');
  });

  it('HUD visar nivånummer', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/level.*Nivå|Nivå.*level|currentLevel|level.*1/.test(code) ||
              /LevelGenerator|levelGenerator/.test(code), 'måste visa nivånummer');
  });
});

describe('T-UI-04: Level-overlay med fade-out (UX-04)', () => {
  it('Level-overlay finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/Level.*Overlay|levelOverlay|drawLevel|Nivå/.test(code), 'måste ha level-overlay');
  });

  it('Alpha-fade finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/alpha|fade|rgba/.test(code), 'måste ha alpha-fade');
  });

  it('Game.levelTransitioning finns i game.js', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/levelTransitioning|levelTransition|levelTransitionAlpha/.test(code), 'måste ha level transition');
  });
});

describe('T-UI-05: Game Over-overlay (UX-05)', () => {
  it('Game Over-text finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/GAME OVER|Game Over|game.*over/.test(code), 'måste ha GAME OVER-text');
  });

  it('Back to Menu-knapp finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/MENU|meny|back.*menu|tilbaka|SPACE/.test(code), 'måste ha back to menu');
  });

  it('Poäng visas vid game over', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/Poäng|score|score.*Game|Game\.score/.test(code), 'måste visa poäng vid game over');
  });
});

describe('T-UI-06: Victory-screen (UX-06)', () => {
  it('Victory-text finns', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/Vunnit|Victory|victory|dug.*vunnit/.test(code), 'måste ha victory-text');
  });

  it('Total poäng visas', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'screenManager.js'), 'utf-8');
    assert.ok(/Total|total.*poäng|poäng.*total|score.*total|total.*score/.test(code), 'måste visa total poäng');
  });

  it('Game state VICTORY finns i game.js', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'public', 'game.js'), 'utf-8');
    assert.ok(/VICTORY|victory|victory.*screen/.test(code), 'måste ha VICTORY state');
  });
});
