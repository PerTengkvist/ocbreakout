// Breakout Game — Game Loop, Paddle & Ball (Fas 2, 3, 4)

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
    }
  };

  // Initiera canvas
  function init() {
    Game.canvas = document.getElementById('gameCanvas');
    Game.ctx = Game.canvas.getContext('2d');
    resizeCanvas();
    setupInput();
    resetBall();
    Game.running = true;
    Game.lastTime = performance.now();
    requestAnimationFrame(gameLoop);
  }

  // Uppdatera canvas dimensioner vid resize
  function resizeCanvas() {
    Game.canvas.width = window.innerWidth;
    Game.canvas.height = window.innerHeight;
    Game.paddle.height = Game.canvas.height * 0.02;
    Game.paddle.width = Math.max(80, Game.canvas.width * 0.15);
    Game.paddle.y = Game.canvas.height - 40;
    if (!Game.ballLaunched) {
      resetBall();
    }
  }

  // Reset ball on paddle
  function resetBall() {
    Game.ball.x = Game.paddle.x + Game.paddle.width / 2;
    Game.ball.y = Game.paddle.y - Game.ball.radius;
    Game.ball.vx = 0;
    Game.ball.vy = 0;
    Game.ballLaunched = false;
    Game.speedMultiplier = 1.0;
  }

  // Launch ball with ±30° angle from vertical
  function launchBall() {
    const angle = (Math.random() * 60 - 30) * Math.PI / 180; // ±30°
    Game.ball.vx = Math.sin(angle) * Game.ball.speed * Game.speedMultiplier;
    Game.ball.vy = -Math.cos(angle) * Game.ball.speed * Game.speedMultiplier;
    Game.ballLaunched = true;
  }

  // Keyboard-input
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

  // Game loop — update + render
  function gameLoop(timestamp) {
    if (!Game.running) return;
    const dt = (timestamp - Game.lastTime) / 1000;
    Game.lastTime = timestamp;
    update(dt);
    render();
    requestAnimationFrame(gameLoop);
  }

  // Update-steget — spellogik
  function update(dt) {
    handleInput(dt);
    if (Game.ballLaunched) {
      updateBall(dt);
      checkCollisions();
    }
  }

  // Hantera tangentbord-input för paddle
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

  // Update ball position
  function updateBall(dt) {
    Game.ball.x += Game.ball.vx * dt;
    Game.ball.y += Game.ball.vy * dt;
  }

  // Kollisionsdetektion — vägg och paddle
  function checkCollisions() {
    // Vänster vägg — invertera vx
    if (Game.ball.x - Game.ball.radius <= 0) {
      Game.ball.x = Game.ball.radius;
      Game.ball.vx *= -1;
    }
    // Höger vägg — invertera vx
    if (Game.ball.x + Game.ball.radius >= Game.canvas.width) {
      Game.ball.x = Game.canvas.width - Game.ball.radius;
      Game.ball.vx *= -1;
    }
    // Taket — invertera vy
    if (Game.ball.y - Game.ball.radius <= 0) {
      Game.ball.y = Game.ball.radius;
      Game.ball.vy *= -1;
    }
    // Paddle-kollision
    if (
      Game.ball.vy > 0 &&
      Game.ball.y + Game.ball.radius >= Game.paddle.y &&
      Game.ball.y + Game.ball.radius <= Game.paddle.y + Game.paddle.height &&
      Game.ball.x >= Game.paddle.x &&
      Game.ball.x <= Game.paddle.x + Game.paddle.width
    ) {
      // Beräkna träffposition (0=vänster, 0.5=center, 1=höger)
      const hitPos = (Game.ball.x - Game.paddle.x) / Game.paddle.width;
      const angle = (hitPos - 0.5) * Math.PI * 0.6; // ±54°
      const speed = Game.ball.speed * Game.speedMultiplier;
      Game.ball.vx = Math.sin(angle) * speed;
      Game.ball.vy = -Math.cos(angle) * speed;
      Game.ball.y = Game.paddle.y - Game.ball.radius;
    }
    // Boll-miss — under paddeln
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

  // Render-steget — ritning
  function render() {
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

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

    // Render HUD — lives och score
    Game.ctx.fillStyle = '#000000';
    Game.ctx.font = '16px Courier New';
    Game.ctx.fillText('Lives: ' + Game.lives, 10, 25);
    Game.ctx.fillText('Score: ' + Game.score, 10, 45);
  }

  // Event listener för resize
  window.addEventListener('resize', resizeCanvas);

  // Starta vid DOM-loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.game = Game;

})();
