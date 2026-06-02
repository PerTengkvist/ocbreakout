# ocbreakout

A Breakout game built with vanilla JavaScript and HTML5 Canvas.

## Description
This is a fully functional Breakout game implemented following a strict Test-Driven Development (TDD) approach. It features various brick types, scoring, lives, level generation, and sound effects.

## Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Play the game:**
   Open your browser and navigate to `http://localhost:3000`.

## How to Play

### Controls
- **ArrowLeft / ArrowRight**: Move the paddle left or right.
- **Space**: Launch the ball or start a new game from the menu.

### Rules
- **Objective**: Destroy all bricks to progress to the next level.
- **Bricks**:
  - **Simple (Grey)**: 1 hit to destroy.
  - **Hard (Red)**: 3 hits to destroy.
  - **Double Ball (Green)**: Spawns an extra ball on impact.
  - **Bonus (Gold)**: Drops a coin.
  - **Speedup (Blue)**: Increases ball speed.
- **Scoring**:
  - Simple brick: 10 pts
  - Hard brick: 50 pts
  - Double brick: 50 pts
  - Bonus brick: 10 pts
  - Bonus coin: 200 pts
  - Speedup brick: 250 pts
- **Lives**: You start with 3 lives. Losing a ball reduces your lives.
- **Levels**: There are 20 levels. The first two form the words "Kvadrat" and "Tengan", followed by various shapes and patterns, and finally random levels.

## Project Structure
```
open_code_test/
├── breakout_spec.md           # Requirements specification
├── breakout_test_spec.md        # Test specification
├── breakout_tdd_plan.md        # Development plan
├── package.json                # Node.js configuration
├── server.js                   # Express server
├── public/
│   ├── index.html              # Main HTML file
│   ├── style.css               # Global styles
│   ├── game.js                 # Main game logic
│   └── soundManager.js         # Web Audio API sound management
└── tests/                      # Test suite
    ├── ar.test.js
    ├── ball.test.js
    └── ...
```
