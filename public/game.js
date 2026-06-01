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
    * Ball manager (phase 7)
    * ========================= */
    let balls = []; // all active balls
    let coins = []; // falling bonus coins
    const COIN_GRAVITY = 400; // pixels/s^2
    const COIN_RADIUS = 8;
    
    function spawnBall(x, y, spread) {
      const angle = (Math.random() * 60 - 30) * Math.PI / 180;
      const spd = Game.ball.speed * Game.speedMultiplier;
      const newBall = {
        x: x,
        y: y,
        vx: Math.sin(angle) * spd,
        vy: -Math.cos(angle) * spd,
        radius: Game.ball.radius,
        speed: Game.ball.speed,
        speedMultiplier: Game.speedMultiplier,
        color: Game.ball.color
      };
      balls.push(newBall);
    }
    
    function spawnCoin(x, y) {
      coins.push({
        x: x,
        y: y,
        vy: 0,
        vx: (Math.random() - 0.5) * 60,
        radius: COIN_RADIUS,
        color: BRICK_COLORS.bonus
      });
    }
    
    function applySpeedup(ball) {
      ball.speedMultiplier = (ball.speedMultiplier || 1.0) * 1.1;
    }
    
    function resetSpeedMultiplier() {
      for (let bi = 0; bi < balls.length; bi++) {
        balls[bi].speedMultiplier = 1.0;
      }
      Game.speedMultiplier = 1.0;
    }
    
    function updateCoins(dt) {
      for (let i = coins.length - 1; i >= 0; i--) {
        const c = coins[i];
        c.vy += COIN_GRAVITY * dt;
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        
        // Check paddle catch
        if (c.y + c.radius >= Game.paddle.y && 
            c.y - c.radius <= Game.paddle.y + Game.paddle.height &&
            c.x + c.radius >= Game.paddle.x && 
            c.x - c.radius <= Game.paddle.x + Game.paddle.width) {
          Game.score += 200;
          coins.splice(i, 1);
        }
        // Remove if off screen
        else if (c.y - c.radius >= Game.canvas.height) {
          coins.splice(i, 1);
        }
      }
    }

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
    balls = [Game.ball];
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

        // Brick types
        let type = 'simple';
        let hp = 1;
        let color = BRICK_COLORS.simple;
        if (row < 2) {
          type = 'tough';
          hp = 3;
          color = BRICK_COLORS.tough;
        } else if ((row * BRICK_COLS + col) % 13 === 0) {
          type = 'speedup';
          hp = 1;
          color = BRICK_COLORS.speedup;
        } else if ((row * BRICK_COLS + col) % 17 === 0) {
          type = 'bonus';
          hp = 1;
          color = BRICK_COLORS.bonus;
        } else if ((row * BRICK_COLS + col) % 23 === 0) {
          type = 'double';
          hp = 1;
          color = BRICK_COLORS.double;
        }
        const brick = {
          x: x,
          y: y,
          width: brickWidth,
          height: brickHeight,
          type: type,
          hp: hp,
          color: color
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
    balls = [Game.ball];
  }

  function launchBall(fromPaddle) {
    if (fromPaddle === undefined) fromPaddle = true;
    for (let bi = 0; bi < balls.length; bi++) {
      const b = balls[bi];
      const angle = (Math.random() * 60 - 30) * Math.PI / 180;
      const spd = b.speed * Game.speedMultiplier;
      b.vx = Math.sin(angle) * spd;
      b.vy = -Math.cos(angle) * spd;
      if (fromPaddle) b.y = Game.paddle.y - b.radius;
    }
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
    if (!Game.ballLaunched || balls.length === 0) return;
    updateCoins(dt);
    // Update all balls
    for (let bi = 0; bi < balls.length; bi++) updateSingleBall(balls[bi], dt);
    checkAllCollisions();
  }
  
  function updateSingleBall(ball, dt) {
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
    
    // Wall bounces
    if (ball.x - ball.radius <= 0) {
      ball.x = ball.radius;
      ball.vx *= -1;
      applySpeedup(ball);
    }
    if (ball.x + ball.radius >= Game.canvas.width) {
      ball.x = Game.canvas.width - ball.radius;
      ball.vx *= -1;
      applySpeedup(ball);
    }
    if (ball.y - ball.radius <= 0) {
      ball.y = ball.radius;
      ball.vy *= -1;
      applySpeedup(ball);
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

  /* =========================
    * Collision detection (multi-ball)
    * ========================= */
   function checkAllCollisions() {
    // Paddle collision (per ball)
    for (let bi = 0; bi < balls.length; bi++) {
      const ball = balls[bi];
      if (
        ball.vy > 0 &&
        ball.y + ball.radius >= Game.paddle.y &&
        ball.y + ball.radius <= Game.paddle.y + Game.paddle.height &&
        ball.x >= Game.paddle.x &&
        ball.x <= Game.paddle.x + Game.paddle.width
      ) {
        const hitPos = (ball.x - Game.paddle.x) / Game.paddle.width;
        const angle = (hitPos - 0.5) * Math.PI * 0.6;
        const spd = (ball.speed || Game.ball.speed) * (ball.speedMultiplier || Game.speedMultiplier);
        ball.vx = Math.sin(angle) * spd;
        ball.vy = -Math.cos(angle) * spd;
        ball.y = Game.paddle.y - ball.radius;
      }
    }

    // Brick collision (per ball)
    for (let bi = 0; bi < balls.length; bi++) {
      const ball = balls[bi];
      for (let i = Game.bricks.length - 1; i >= 0; i--) {
        const brick = Game.bricks[i];
        if (!brick || brick.hp <= 0) continue;

        if (
          ball.x + ball.radius > brick.x &&
          ball.x - ball.radius < brick.x + brick.width &&
          ball.y + ball.radius > brick.y &&
          ball.y - ball.radius < brick.y + brick.height
        ) {
          const overlapLeft = (ball.x + ball.radius) - brick.x;
          const overlapRight = (brick.x + brick.width) - (ball.x - ball.radius);
          const overlapTop = (ball.y + ball.radius) - brick.y;
          const overlapBottom = (brick.y + brick.height) - (ball.y - ball.radius);

          const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
          if (minOverlap === overlapTop || minOverlap === overlapBottom) {
            ball.vy *= -1;
          } else {
            ball.vx *= -1;
          }

          brick.hp--;
          if (brick.hp <= 0) {
            // Handle special brick types
            if (brick.type === 'double') {
              spawnBall(brick.x + brick.width / 2, brick.y, brick.width);
            } else if (brick.type === 'bonus') {
              spawnCoin(brick.x + brick.width / 2, brick.y);
            } else if (brick.type === 'speedup') {
              // Speedup increases speed for every subsequent bounce
              for (let bi = 0; bi < balls.length; bi++) {
                balls[bi].speedMultiplier = (balls[bi].speedMultiplier || 1.0) * 1.1;
              }
            }
            if (brick.type === 'tough') {
              Game.score += 50;
            } else if (brick.type === 'double') {
              Game.score += 50;
            } else if (brick.type === 'speedup') {
              Game.score += 250;
            } else if (brick.type === 'bonus') {
              Game.score += 10;
            } else {
              Game.score += 10;
            }
            Game.bricks.splice(i, 1);
          }
          break; // One brick per ball per frame
        }
      }
    }

    // Check misses and remove dead balls (per ball)
    for (let bi = balls.length - 1; bi >= 0; bi--) {
      const ball = balls[bi];
      if (ball.y - ball.radius >= Game.canvas.height) {
        balls.splice(bi, 1);
      }
    }

    // If no balls left, lose a life
    if (balls.length === 0) {
      Game.lives--;
      resetSpeedMultiplier();
      if (Game.lives <= 0) {
        Game.lives = 0;
        Game.gameState = 'GAME_OVER';
      } else {
        resetBall();
        // Launch the new ball if already launched
        if (Game.ballLaunched) {
          const angle = (Math.random() * 60 - 30) * Math.PI / 180;
          const spd = Game.ball.speed * Game.speedMultiplier;
          balls[0] = Game.ball;
          balls[0].vx = Math.sin(angle) * spd;
          balls[0].vy = -Math.cos(angle) * spd;
          balls[0].speedMultiplier = Game.speedMultiplier;
        }
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
        // Hart brick — visuell återhämtning/blekning baserat på hp
        let renderColor = brick.color;
        if (brick.type === 'tough' && brick.hp < 3) {
          const factor = brick.hp / 3;
          // Blekna röd färg: #CC0000 → ljusare
          renderColor = factor > 0.5 ? '#CC0000' : '#AA0000';
        }
        Game.ctx.fillStyle = renderColor;
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

    // Render all balls
    for (let bi = 0; bi < balls.length; bi++) {
      const b = balls[bi];
      Game.ctx.beginPath();
      Game.ctx.arc(
        Math.round(b.x),
        Math.round(b.y),
        Math.round(b.radius),
        0, Math.PI * 2
      );
      Game.ctx.fillStyle = b.color || '#FFFFFF';
      Game.ctx.fill();
    }

    // Render coins
    for (const coin of coins) {
      Game.ctx.beginPath();
      Game.ctx.arc(
        Math.round(coin.x),
        Math.round(coin.y),
        Math.round(coin.radius),
        0, Math.PI * 2
      );
      Game.ctx.fillStyle = coin.color || '#FFD700';
      Game.ctx.fill();
      Game.ctx.strokeStyle = '#B8860B';
      Game.ctx.lineWidth = 2;
      Game.ctx.stroke();
    }

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
