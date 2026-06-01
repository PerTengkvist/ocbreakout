// Breakout Game — Game Loop, Paddle, Ball & Bricks (Fas 2-5)

(function() {
  'use strict';

  const Game = {
    canvas: null,
    ctx: null,
    running: false,
    lastTime: 0,
    keys: {},
    lives: 3,
    score: 0,
    gameState: 'PLAYING',
    ballLaunched: false,
    speedMultiplier: 1.0,

    paddle: {
      x: 0,
      y: 0,
      width: 120,
      height: 16,
      speed: 400,
      color: '#FFFFFF'
    },

    ball: {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 8,
      speed: 250,
      color: '#FFFFFF'
    },

    bricks: []
  };

  /* =========================
   * Brick constants
   * ========================= */
  const BRICK_ROWS = 6;
  const BRICK_COLS = 8;
  const BRICK_PADDING = 6;
  const BRICK_TOP = 60;
  const BRICK_COLORS = {
    simple: '#AAAAAA',
    tough: '#CC0000',
    double: '#00AA00',
    bonus: '#FFD700',
    speedup: '#0066CC'
  };

  /* =========================
   * Init
   * ========================= */
  function init() {
    Game.canvas = document.getElementById('gameCanvas');
    Game.ctx = Game.canvas.getContext('2d');
    resizeCanvas();
    setupInput();
    createBricks();
    resetBall();
    Game.running = true;
    Game.lastTime = performance.now();
    requestAnimationFrame(gameLoop);
  }

  /* =========================
   * Brick creation
   * ========================= */
  function createBricks() {
    Game.bricks = [];
    const availWidth = Game.canvas.width - BRICK_PADDING * (BRICK_COLS + 1);
    const brickWidth = availWidth / BRICK_COLS;
    const brickHeight = 22;

    let idx = 0;
    const totalBricks = BRICK_ROWS * BRICK_COLS;
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        const x = BRICK_PADDING + col * (brickWidth + BRICK_PADDING);
        const y = BRICK_TOP + row * (brickHeight + BRICK_PADDING);

        // Simple brick as default for level 1
        const brick = {
          x: x,
          y: y,
          width: brickWidth,
          height: brickHeight,
          type: 'simple',
          hp: 1,
          color: BRICK_COLORS.simple
        };
        Game.bricks.push(brick);
        idx++;
      }
    }
  }

  /* =========================
   * Resize
   * ========================= */
  function resizeCanvas() {
    Game.canvas.width = window.innerWidth;
    Game.canvas.height = window.innerHeight;
    Game.paddle.height = Game.canvas.height * 0.02;
    Game.paddle.width = Math.max(80, Game.canvas.width * 0.15);
    Game.paddle.y = Game.canvas.height - 40;
    Game.ballLaunched = false;
    resetBall();
  }

  /* =========================
   * Ball controls
   * ========================= */
  function resetBall() {
    Game.ball.x = Game.paddle.x + Game.paddle.width / 2;
    Game.ball.y = Game.paddle.y - Game.ball.radius;
    Game.ball.vx = 0;
    Game.ball.vy = 0;
    Game.ballLaunched = false;
    Game.speedMultiplier = 1.0;
  }

  function launchBall() {
    const angle = (Math.random() * 60 - 30) * Math.PI / 180;
    Game.ball.vx = Math.sin(angle) * Game.ball.speed * Game.speedMultiplier;
    Game.ball.vy = -Math.cos(angle) * Game.ball.speed * Game.speedMultiplier;
    Game.ballLaunched = true;
  }

  /* =========================
   * Input
   * ========================= */
  function setupInput() {
    document.addEventListener('keydown', function(e) {
      if (e.key === ' ' || e.code === 'Space') {
        if (!Game.ballLaunched) {
          launchBall();
        }
      }
      Game.keys[e.key] = true;
    });
    document.addEventListener('keyup', function(e) {
      Game.keys[e.key] = false;
    });
  }

  /* =========================
   * Game loop
   * ========================= */
  function gameLoop(timestamp) {
    if (!Game.running) return;
    const dt = (timestamp - Game.lastTime) / 1000;
    Game.lastTime = timestamp;
    update(dt);
    render();
    requestAnimationFrame(gameLoop);
  }

  function update(dt) {
    handleInput(dt);
    if (Game.ballLaunched) {
      updateBall(dt);
      checkCollisions();
    }
  }

  function handleInput(dt) {
    if (Game.keys['ArrowLeft']) {
      Game.paddle.x -= Game.paddle.speed * dt;
      Game.paddle.x = Math.max(0, Game.paddle.x);
    }
    if (Game.keys['ArrowRight']) {
      Game.paddle.x += Game.paddle.speed * dt;
      const maxX = Game.canvas.width - Game.paddle.width;
      Game.paddle.x = Math.min(maxX, Game.paddle.x);
    }
  }

  function updateBall(dt) {
    Game.ball.x += Game.ball.vx * dt;
    Game.ball.y += Game.ball.vy * dt;
  }

  /* =========================
   * Collision detection
   * ========================= */
  function checkCollisions() {
    // Väggar
    if (Game.ball.x - Game.ball.radius <= 0) {
      Game.ball.x = Game.ball.radius;
      Game.ball.vx *= -1;
    }
    if (Game.ball.x + Game.ball.radius >= Game.canvas.width) {
      Game.ball.x = Game.canvas.width - Game.ball.radius;
      Game.ball.vx *= -1;
    }
    if (Game.ball.y - Game.ball.radius <= 0) {
      Game.ball.y = Game.ball.radius;
      Game.ball.vy *= -1;
    }

    // Paddle
    if (
      Game.ball.vy > 0 &&
      Game.ball.y + Game.ball.radius >= Game.paddle.y &&
      Game.ball.y + Game.ball.radius <= Game.paddle.y + Game.paddle.height &&
      Game.ball.x >= Game.paddle.x &&
      Game.ball.x <= Game.paddle.x + Game.paddle.width
    ) {
      const hitPos = (Game.ball.x - Game.paddle.x) / Game.paddle.width;
      const angle = (hitPos - 0.5) * Math.PI * 0.6;
      const speed = Game.ball.speed * Game.speedMultiplier;
      Game.ball.vx = Math.sin(angle) * speed;
      Game.ball.vy = -Math.cos(angle) * speed;
      Game.ball.y = Game.paddle.y - Game.ball.radius;
    }

    // Brick collision
    for (let i = Game.bricks.length - 1; i >= 0; i--) {
      const brick = Game.bricks[i];
      if (!brick || brick.hp <= 0) continue;

      if (
        Game.ball.x + Game.ball.radius > brick.x &&
        Game.ball.x - Game.ball.radius < brick.x + brick.width &&
        Game.ball.y + Game.ball.radius > brick.y &&
        Game.ball.y - Game.ball.radius < brick.y + brick.height
      ) {
        // Reflection — which side?
        const overlapLeft = (Game.ball.x + Game.ball.radius) - brick.x;
        const overlapRight = (brick.x + brick.width) - (Game.ball.x - Game.ball.radius);
        const overlapTop = (Game.ball.y + Game.ball.radius) - brick.y;
        const overlapBottom = (brick.y + brick.height) - (Game.ball.y - Game.ball.radius);

        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
        if (minOverlap === overlapTop || minOverlap === overlapBottom) {
          Game.ball.vy *= -1;
        } else {
          Game.ball.vx *= -1;
        }

        // Destroy brick
        brick.hp--;
        if (brick.hp <= 0) {
          Game.bricks.splice(i, 1);
          // Poäng för enkel mursten
          Game.score += 10;
        }
        break; // One brick per frame
      }
    }

    // Miss
    if (Game.ball.y - Game.ball.radius >= Game.canvas.height) {
      Game.lives--;
      if (Game.lives <= 0) {
        Game.lives = 0;
        Game.gameState = 'GAME_OVER';
      } else {
        resetBall();
      }
    }
  }

  /* =========================
   * Render
   * ========================= */
  function render() {
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

    // Render bricks
    for (const brick of Game.bricks) {
      if (brick.hp > 0) {
        Game.ctx.fillStyle = brick.color;
        Game.ctx.fillRect(
          Math.round(brick.x),
          Math.round(brick.y),
          Math.round(brick.width),
          Math.round(brick.height)
        );
      }
    }

    // Render paddle
    Game.ctx.fillStyle = Game.paddle.color;
    Game.ctx.fillRect(
      Math.round(Game.paddle.x),
      Math.round(Game.paddle.y),
      Math.round(Game.paddle.width),
      Math.round(Game.paddle.height)
    );

    // Render ball
    Game.ctx.beginPath();
    Game.ctx.arc(
      Math.round(Game.ball.x),
      Math.round(Game.ball.y),
      Math.round(Game.ball.radius),
      0, Math.PI * 2
    );
    Game.ctx.fill();

    // Render HUD
    Game.ctx.fillStyle = '#000000';
    Game.ctx.font = '16px Courier New';
    Game.ctx.fillText('Lives: ' + Game.lives, 10, 25);
    Game.ctx.fillText('Score: ' + Game.score, 10, 45);
  }

  window.addEventListener('resize', resizeCanvas);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.game = Game;

})();
