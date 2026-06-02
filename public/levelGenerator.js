// Breakout Game — Level Generator (Fas 11)

(function() {
  'use strict';

  const LevelGenerator = {
    TOTAL_LEVELS: 20,
    BRICK_ROWS: 8,
    BRICK_WIDTH: 50,
    BRICK_HEIGHT: 22,
    BRICK_PADDING: 6,

    // Letter patterns for "Kvadrat" and "Tengan" (8x5 binary grids, 1 = brick, 0 = empty)
    LETTER_PATTERNS: {
      K: [
        [1,0,0,0,1],
        [1,0,0,1,0],
        [1,0,1,0,0],
        [1,0,0,1,0],
        [1,0,0,0,1],
        [1,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ],
      V: [
        [1,0,0,0,1],
        [1,0,0,0,1],
        [0,1,0,1,0],
        [0,1,0,1,0],
        [0,0,1,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ],
      Q: [
        [0,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [0,1,0,1,0],
        [0,1,1,1,1],
        [1,0,0,0,0],
        [0,0,0,0,0]
      ],
      U: [
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [0,1,0,1,0],
        [0,1,1,1,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ],
      D: [
        [1,1,1,0,0],
        [1,0,0,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,1,0],
        [1,1,1,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ],
      R: [
        [1,1,1,0,0],
        [1,0,0,1,0],
        [1,0,0,1,0],
        [1,1,1,0,0],
        [1,0,0,0,0],
        [1,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ],
      A: [
        [0,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,1,1,1,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ],
      T: [
        [1,1,1,1,1],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ],
      E: [
        [1,1,1,1,1],
        [1,0,0,0,0],
        [1,0,0,0,0],
        [1,1,1,0,0],
        [1,0,0,0,0],
        [1,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ],
      N: [
        [1,0,0,0,1],
        [1,1,0,0,1],
        [1,0,1,0,1],
        [1,0,0,1,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ],
      G: [
        [0,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [0,1,1,1,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ],
      'A2': [ // second A in Kvadrat
        [0,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,1,1,1,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ]
    },

    // Shape patterns for levels 3-6 (8 rows x N columns)
    SHAPE_PATTERNS: {
      boat: [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1],
        [1,0,1,1,1,1,0,1],
        [1,0,0,1,1,0,0,1]
      ],
      car: [
        [0,0,0,0,0,0,0,0],
        [0,0,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1],
        [1,1,0,1,1,0,1,1],
        [1,1,1,1,1,1,1,1],
        [0,0,1,0,0,1,0,0],
        [0,0,1,0,0,1,0,0]
      ],
      plane: [
        [0,0,0,0,1,0,0,0],
        [0,0,0,1,1,1,0,0],
        [0,0,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [0,0,1,1,1,1,0,0],
        [0,0,1,0,0,1,0,0],
        [0,0,1,0,0,1,0,0]
      ],
      cigarette: [
        [0,0,0,0,0,0,0,0],
        [0,0,1,1,1,1,0,0],
        [0,0,1,1,1,1,0,0],
        [0,0,1,1,1,1,0,0],
        [0,0,1,1,1,1,0,0],
        [0,0,1,1,1,1,0,0],
        [0,0,1,1,1,1,0,0],
        [0,0,0,1,1,0,0,0]
      ]
    },

    // Level definitions: which letter/shape for each level
    getLevelDefinition(level) {
      if (level === 1) return { type: 'text', word: 'Kvadrat' };
      if (level === 2) return { type: 'text', word: 'Tengan' };
      if (level === 3) return { type: 'shape', shape: 'boat' };
      if (level === 4) return { type: 'shape', shape: 'car' };
      if (level === 5) return { type: 'shape', shape: 'plane' };
      if (level === 6) return { type: 'shape', shape: 'cigarette' };
      return { type: 'random', level: level };
    },

    generateLevel(level) {
      const def = this.getLevelDefinition(level);
      let bricks = [];

      if (def.type === 'text') {
        bricks = this.generateTextLevel(def.word);
      } else if (def.type === 'shape') {
        bricks = this.generateShapeLevel(def.shape);
      } else {
        bricks = this.generateRandomLevel(def.level);
      }

      return bricks;
    },

    generateTextLevel(word) {
      let bricks = [];
      let colOffset = 0;

      const letters = word.split('');
      for (let li = 0; li < letters.length; li++) {
        const letter = letters[li].toUpperCase();
        const pattern = this.LETTER_PATTERNS[letter];
        if (!pattern) continue;

        for (let row = 0; row < 8; row++) {
          for (let col = 0; col < 5; col++) {
            if (pattern[row][col] === 1) {
              const brickX = colOffset + col * (this.BRICK_WIDTH + this.BRICK_PADDING) + this.BRICK_PADDING;
              const brickY = row * (this.BRICK_HEIGHT + this.BRICK_PADDING) + 60;
              const brickType = this.randomBrickType(1);
              bricks.push({
                x: brickX,
                y: brickY,
                width: this.BRICK_WIDTH,
                height: this.BRICK_HEIGHT,
                type: brickType,
                hp: brickType === 'tough' ? 3 : 1,
                color: this.brickColor(brickType)
              });
            }
          }
        }
         colOffset += 5 * (this.BRICK_WIDTH + this.BRICK_PADDING) + 20;
      }

      return bricks;
    },

    generateShapeLevel(shapeName) {
      let bricks = [];
      const pattern = this.SHAPE_PATTERNS[shapeName];
      if (!pattern) return bricks;

      for (let row = 0; row < pattern.length; row++) {
        for (let col = 0; col < pattern[row].length; col++) {
          if (pattern[row][col] === 1) {
            const brickX = col * (this.BRICK_WIDTH + this.BRICK_PADDING) + this.BRICK_PADDING + 40;
            const brickY = row * (this.BRICK_HEIGHT + this.BRICK_PADDING) + 60;
            const brickType = this.randomBrickType(1);
            bricks.push({
              x: brickX,
              y: brickY,
              width: this.BRICK_WIDTH,
              height: this.BRICK_HEIGHT,
              type: brickType,
              hp: brickType === 'tough' ? 3 : 1,
              color: this.brickColor(brickType)
            });
          }
        }
      }

      return bricks;
    },

    generateRandomLevel(level) {
      let bricks = [];
      const totalBricks = 30 + Math.floor(Math.random() * 20); // 30-50 bricks
      const maxRows = 8;
      const canvasWidth = 800; // approximate
      const availWidth = canvasWidth - this.BRICK_PADDING * 2;
      const maxCols = Math.floor(availWidth / (this.BRICK_WIDTH + this.BRICK_PADDING));

      const used = new Set();
      let attempts = 0;

      while (bricks.length < totalBricks && attempts < totalBricks * 5) {
        const row = Math.floor(Math.random() * maxRows);
        const col = Math.floor(Math.random() * maxCols);
        const key = row + ',' + col;

        if (!used.has(key)) {
          used.add(key);
          const brickX = col * (this.BRICK_WIDTH + this.BRICK_PADDING) + this.BRICK_PADDING;
          const brickY = row * (this.BRICK_HEIGHT + this.BRICK_PADDING) + 60;
          const brickType = this.randomBrickType(level);
          bricks.push({
            x: brickX,
            y: brickY,
            width: this.BRICK_WIDTH,
            height: this.BRICK_HEIGHT,
            type: brickType,
            hp: brickType === 'tough' ? 3 : 1,
            color: this.brickColor(brickType)
          });
        }
        attempts++;
      }

      return bricks;
    },

    randomBrickType(level) {
      const r = Math.random() * 100;
      // Weighted distribution for random levels
      // 70% simple, 10% tough, 10% bonus, 5% double, 5% speedup
      if (r < 70) return 'simple';
      if (r < 80) return 'tough';
      if (r < 90) return 'bonus';
      if (r < 95) return 'double';
      return 'speedup';
    },

    brickColor(type) {
      const colors = {
        simple: '#AAAAAA',
        tough: '#CC0000',
        double: '#00AA00',
        bonus: '#FFD700',
        speedup: '#0066CC'
      };
      return colors[type] || colors.simple;
    }
  };

  window.LevelGenerator = LevelGenerator;

})();
