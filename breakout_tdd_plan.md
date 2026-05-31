# TDD-baserad utvecklingsplan: Breakout

Version: 1.0
Datum: 2026-05-31

---

## Övergripande strategi

Varje fas följer TDD-cykeln:
1. **Red:** Skriv misslyckat test som definierar kravet
2. **Green:** Skriv minst möjliga kod som får testet att passera
3. **Refactor:** Rensa koden utan att bryta test

Faserna körs sekventiellt — varje fas måste bestå innan nästa påbörjas.

---

## Fasmappning till testfall

| Fasa | Modul | Testfall (från breakout_test_spec.md) |
|------|-------|---------------------------------------|
| 1 | Projektstruktur & server | T-AR-01, T-AR-02 |
| 2 | Game loop & canvas | — (grund för alla faser) |
| 3 | Paddle | T-PADDLE-01–05 |
| 4 | Boll | T-BALL-01–06 |
| 5 | Mursten — grund + enkel brick | T-BRICK-01, T-BRICK-02 |
| 6 | Hart brick | T-BRICK-03 |
| 7 | Double ball brick | T-BRICK-04 |
| 8 | Bonus brick + mynt | T-BRICK-05, T-BRICK-06 |
| 9 | Speedup brick | T-BRICK-07 |
| 10 | Liv & poäng | T-LIFE-01–03, T-SCORE-01–05 |
| 11 | Nivågenerering | T-LEVEL-01–06 |
| 12 | Ljudsystem | T-SOUND-01–09 |
| 13 | Startskärm & HUD | T-UI-01, T-UI-03, T-UI-04 |
| 14 | Huvudmeny & Game Over | T-UI-02, T-UI-05, T-UI-06 |
| 15 | Polish & README | DOC-01 |

---

## Detaljerad fasplan

---

### FAS 1: Projektstruktur & Express-server

**Mål:** Grundläggande projektstruktur med fungerande Express-server.

**Filstruktur som ska skapas:**
```
open_code_test/
├── breakout_spec.md          # Denna fil (kravspec)
├── breakout_test_spec.md     # Denna fil (testspecc)
├── breakout_tdd_plan.md      # Denna fil (TDD-plan)
├── server.js                 # Express-server för statisk hosting
├── public/
│   ├── index.html            # Huvudsida
│   ├── style.css             # Globala stilar
│   └── game.js               # Spellogik
└── tests/
    └── ar.test.js            # Arkitekturtester
```

**Teststeg (red → green → refactor):**

1. **T-AR-02** (statisk analys): 
   - Skriv test som verifierar att server.js endast har express-beroende
   
2. **T-AR-01** (Express):
   - Skriv test som startar servern och frågar index.html
   - Förväntat: HTTP 200 med korrekt HTML-innehåll

**Implementation:**
- `server.js:` Enkel Express-app som servar `public/`
- `public/index.html:` Grund struktur med canvas
- `public/style.css:` Reset + grundstilar
- `public/game.js:` Tom spel-initiering

---

### FAS 2: Game Loop & Canvas

**Mål:** Grundläggande spelloop med canvas.

**Teststeg:**

1. Skriv test för canvas-initiering
   - Förväntat: Canvas skapas med rätt dimensioner

2. Skriv test för game loop (requestAnimationFrame)
   - Förväntat: Update-fungerar varje frame
   - Förväntat: Render-fungerar varje frame

3. Skriv test för responsiv canvas
   - Förväntat: Canvas ändrar storlek vid fönsterresize

**Integration:** Detta är plattformen för alla framtida faser.
Inga visuella komponenter ännu — bara tom rendering.

---

### FAS 3: Paddle

**Teststeg (T-PADDLE-01 → T-PADDLE-04):**

1. **T-PADDLE-01:** Test för vänsterpilen
   - Skriv test: `paddle.moveLeft()` → paddle.x är mindre
   
2. **T-PADDLE-02:** Test för högerpilen
   - Skriv test: `paddle.moveRight()` → paddle.x är större
   
3. **T-PADDLE-03:** Test för vänster gräns
   - Skriv test: paddle vid x=0 → tryck vänster → paddle.x == 0
   
4. **T-PADDLE-04:** Test för höger gräns
   - Skriv test: paddle vid max → tryck höger → paddle.x == max

5. **T-PADDLE-05:** Integration: Tangentbordshändelser kopplas till paddle
   - Test: document.dispatchEvent med key='ArrowLeft' → paddle flyttar

**Implementation:**
- `Paddle`-klass med x, y, width, height, speed
- `keydown`-eventlyssnare kopplad till paddle movement
- Gränskontroll i `paddle.update()`

---

### FAS 4: Boll

**Teststeg (T-BALL-01 → T-BALL-06):**

1. **T-BALL-01:** Boll placeras på paddle
   - Skriv test: ball initieras med y = paddle.y - ball.radius
   
2. **T-BALL-02:** Bollen startar med ±30° vid space
   - Skriv test: vid space-tryck → ball.vx, ball.vy beräknas korrekt
   
3. **T-BALL-03:** Boll-väggkollision (horisontell)
   - Skriv test: ball.x <= 0 || ball.x >= canvas.width → vx inverteras
   
4. **T-BALL-04:** Boll-väggkollision (vertikal)
   - Skriv test: ball.y <= 0 → vy inverteras
   
5. **T-BALL-05:** Boll-paddlekollision
   - Skriv test: ball träffar paddle → vy inverteras, SU-02
   
6. **T-BALL-06:** Boll-miss och livförlust
   - Skriv test: ball.y >= canvas.height → lives--, ny ball på paddle

**Implementation:**
- `Ball`-klass med position, velocity, radius, speed
- Vinkelberäkning vid launch: `vx = Math.sin(angle) * speed`, `vy = -Math.cos(angle) * speed`
- Väggkollision i `ball.update()`
- Paddle-kollision i `checkBallPaddleCollision()`
- Miss-detektion och livshantering

---

### FAS 5: Mursten — Grundläggande + Enkel brick

**Teststeg (T-BRICK-01, T-BRICK-02):**

1. **T-BRICK-01:** Mursten skapas i rutnät
   - Skriv test: `BrickGrid.create(nivå)` → array med brick objekt
   
2. **T-BRICK-02:** Enkel brick förstörs vid 1 träff
   - Skriv test: ball träffar enkel brick → brick.hp = 0, brick.remove(), poäng +10

**Implementation:**
- `Brick`-klass med x, y, width, height, type, hp, color
- `BrickGrid`-klass för att hantera hela murstenarrayen
- Enkel brick: hp = 1, färg = grå (#AAAAAA)
- Kollisionsdetektion: ball vs. rectangle

---

### FAS 6: Hart mursten

**Teststeg (T-BRICK-03):**

1. **T-BRICK-03:** Hart brick kräver 3 träffar
   - Skriv test: 
     - ball träffar hart brick (#1) → hp = 2, visuell förändring
     - ball träffar hart brick (#2) → hp = 1, visuell förändring
     - ball träffar hart brick (#3) → hp = 0, brick försvinner

**Implementation:**
- Hart brick: hp = 3, färg = röd (#CC0000)
- Visuellt feedback: blekning baserat på hp
- Poäng: +50 vid förstöring

---

### FAS 7: Double Ball Brick

**Teststeg (T-BRICK-04):**

1. **T-BRICK-04:** Double ball spawns ny boll
   - Skriv test: ball träffar double brick → ny ball spawns från brick position

**Implementation:**
- Double brick: hp = 1, färg = grön (#00AA00)
- `BallManager`-klass som håller koll på aktiva bollar
- `BallManager.spawn(x, y, angle)` method
- Poäng: +50

---

### FAS 8: Bonus Brick + Mynt

**Teststeg (T-BRICK-05, T-BRICK-06):**

1. **T-BRICK-05:** Bonus brick dropar mynt
   - Skriv test: ball träffar bonus brick → bonus coin object skapas
   
2. **T-BRICK-06:** Bonus mynt fångas på paddle
   - Skriv test: coin y >= paddle y && coin x within paddle → poäng +200

**Implementation:**
- Bonus brick: hp = 1, färg = guld (#FFD700)
- `Coin`-klass med x, y, vy (tyngdkraft acceleration)
- `CoinManager`-klass
- Kollisionsdetektion: coin vs. paddle
- Poäng: brick=+10, coin=+200

---

### FAS 9: Speedup Brick

**Teststeg (T-BRICK-07):**

1. **T-BRICK-07:** Speedup brick ökar hastighet
   - Skriv test: ball träffar speedup brick → speedMultiplier += 0.1
   - Skriv test: ball väggkrock → hastighet *= speedMultiplier

**Implementation:**
- Speedup brick: hp = 1, färg = blå (#0066CC)
- `GameSpeed`-klass som håller koll på speedMultiplier
- Vid brick-träff: speedMultiplier += 0.1
- Vid vägg/paddle-krock: apply multiplier

---

### FAS 10: Liv & Poäng

**Teststeg (T-LIFE-01–03, T-SCORE-01–05):**

1. **T-LIFE-01:** Starta med 3 liv
   - Skriv test: Game init → lives = 3
   
2. **T-LIFE-02:** Liv minskas vid boll-miss
   - Skriv test: ball missad → lives--
   
3. **T-LIFE-03:** Game Over vid 0 liv
   - Skriv test: lives === 0 → gameState = 'GAME_OVER'
   
4. **T-SCORE-01–05:** Poängökning vid olika brick-typer
   - Skriv test för var brick-type + poängvärde

**Implementation:**
- `GameScore`-klass med points, lives, level
- Poäng: enkel=10, hart=50, double=50, bonus=10, speedup=250
- Bonus-mynt: +200
- Game state machine: PLAYING → GAME_OVER

---

### FAS 11: Nivågenerering

**Teststeg (T-LEVEL-01–06):**

1. **T-LEVEL-01:** Nivå 1 = "Kvadrat"
   - Skriv test: generateLevel(1) → brick positions matchar "Kvadrat"
   
2. **T-LEVEL-02:** Nivå 2 = "Tengan"
   - Skriv test: generateLevel(2) → brick positions matchar "Tengan"
   
3. **T-LEVEL-03:** Nivå 3–6 mönster
   - Skriv test: 
     - generateLevel(3) → båtmönster
     - generateLevel(4) → bildmönster
     - generateLevel(5) → planmönster
     - generateLevel(6) → cigarettmönster
   
4. **T-LEVEL-04:** Nivå 7–20 slumpmässigt
   - Skriv test: level > 6 → random brick placering
   
5. **T-LEVEL-05:** Mursten distribution
   - Statistiskt test: generera 14 slumpnivåer, verifiera ~70/10/10/5/5
   - Skriv test som räknar brick-typer per nivå
   
6. **T-LEVEL-06:** Totalt 20 nivåer
   - Skriv test: levels.length === 20

**Implementation:**
- `LevelGenerator`-modul
- Bokstav-mappning: "Kvadrat" och "Tengan" → binära mönster (8x5 per bokstav)
- Mönsterdefinitioner för båt/bil/plan/cigarett som 2D-arrayer
- Slumpgenerator för nivå > 6 med viktad brick-typ-sannolikhet

---

### FAS 12: Ljudsystem

**Teststeg (T-SOUND-01–09):**

1. **T-SOUND-01:** Brick-hit-ljud vid enkel brick
   - Skriv test: playSound('simple-brick') → oscillator med rätt frekvens
   
2. **T-SOUND-02:** Hart brick-ljud
   - Skriv test: playSound('tough-brick') → annan frekvens
   
3. **T-SOUND-03:** Double brick-ljud
   - Skriv test: playSound('double-brick') → annan frekvens
   
4. **T-SOUND-04:** Bonus brick-ljud
   - Skriv test: playSound('bonus-brick') → annan frekvens
   
5. **T-SOUND-05:** Speedup brick-ljud
   - Skriv test: playSound('speedup-brick') → annan frekvens
   
6. **T-SOUND-06:** Paddle-hit-ljud
   - Skriv test: playSound('paddle-hit') → thump-ljud (låg frekvens)
   
7. **T-SOUND-07:** Bonus-catch-ljud
   - Skriv test: playSound('bonus-catch') → stigande ton
   
8. **T-SOUND-08:** Ball-miss-ljud
   - Skriv test: playSound('ball-miss') → diskordant ton
   
9. **T-SOUND-09:** Game Over-ljud
   - Skriv test: playSound('game-over') → kort dyston ton

**Implementation:**
- `SoundManager`-modul med Web Audio API
- `AudioContext` initieras vid första användning (kräver användarinteraktion)
- Varje ljud = oscillator med olika frekvenser och varaktighet
- Frekvensmappning:
  - Enkel: 440 Hz, kort
  - Hart: 330 Hz, medium
  - Double: 550 Hz, kort
  - Bonus: 660 Hz, kort
  - Speedup: 220 Hz, långt
  - Paddle: 150 Hz, very kort
  - Bonus-catch: stigande 440→880 Hz
  - Ball-miss: 200Hz→150 Hz, diskordant
  - Game Over: stigande disonans

---

### FAS 13: Startskärm & HUD

**Teststeg (T-UI-01, T-UI-03, T-UI-04):**

1. **T-UI-01:** Startskärm renderas
   - Skriv test (visuell/integration): canvas renderar BREAKOUT-text, paddle+boll, copyright
   
2. **T-UI-03:** Spelskärm HUD
   - Skriv test: HUD visar poäng, liv, nivå
   
3. **T-UI-04:** Level-overlay med fade-out
   - Skriv test: vid level transition → overlay visas med alpha fade

**Implementation:**
- `ScreenManager`-klass för att växla mellan skärmar: SPLASH → MENU → PLAYING → GAME_OVER → VICTORY
- Canvas rendering för splashtext
- HUD rendering: poäng, lives, level
- Overlay-system med alpha-transparens för fade-out-effekt

---

### FAS 14: Huvudmeny, Game Over & Victory

**Teststeg (T-UI-02, T-UI-05, T-UI-06):**

1. **T-UI-02:** Huvudmeny
   - Skriv test: meny renderas med high score och "New Game"-knapp
   
2. **T-UI-05:** Game Over-overlay
   - Skriv test: game over-visning med "Back to Menu"-knapp
   
3. **T-UI-06:** Victory-screen
   - Skriv test: alla 20 nivåer klara → victory-screen med totalpoäng

**Implementation:**
- High score-lista (in-memori): topp 5 med rank, namn, poäng
- "New Game"-knapp initierar `startGame()`
- "Back to Menu"-knapp navigerar till MENU
- Victory-screen visar total poäng efter nivå 20

---

### FAS 15: Polish & Dokumentation

**Teststeg (DOC-01):**

1. Skriv README.md med:
   - Projektbeskrivning
   - Installation: `npm install && node server.js`
   - Hur man spelar: kontroller, regler
   - Strukturöversikt

2. Konsistenskontroll:
   - Alla färger är korrekta (GR-05–09)
   - Alla ljud fungerar (SU-01–05)
   - Alla nivåer fungerar (SR-01–03)
   - Spelet körs i alla moderna webbläsare (NFR-01)

---

## Sammanfattning av fasordning

```
1. Arkitektur (server) 
   ↓
2. Game Loop & Canvas
   ↓
3. Paddle
   ↓
4. Boll
   ↓
5. Enkel mursten
   ↓
6. Hart mursten
   ↓
7. Double ball-mursten
   ↓
8. Bonus-mursten + mynt
   ↓
9. Speedup-mursten
   ↓
10. Liv & Poäng
   ↓
11. Nivågenerering
   ↓
12. Ljudsystem
   ↓
13. Startskärm & HUD
   ↓
14. Meny, Game Over, Victory
   ↓
15. Polish & README
```

Totalt antal testfall: **ca 50**
Varje fas innehåller 1–8 testfall.
Förväntad total utvecklingstid: **2–4 veckor** (beroende på erfarenhetsnivå).

---

## Filstruktur under implementation

```
open_code_test/
├── breakout_spec.md           # Kravspec (färdig)
├── breakout_test_spec.md      # Testspecc (färdig)
├── breakout_tdd_plan.md       # Denna fil
├── package.json
├── server.js
├── public/
│   ├── index.html
│   ├── style.css
│   └── game.js
└── tests/
    ├── ar.test.js
    ├── paddle.test.js
    ├── ball.test.js
    ├── brick.test.js
    ├── level.test.js
    ├── sound.test.js
    └── ui.test.js
```
