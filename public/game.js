// Breakout Game — Game Loop & Paddle (Fas 2 + 3)

(function() {
  'use strict';

  const Game = {
    canvas: null,
    ctx: null,
    running: false,
    lastTime: 0,
    keys: {},
    paddle: {
      x: 0,
      y: 0,
      width: 120,
      height: 16,
      speed: 400,
      color: '#FFFFFF'
    }
  };

  // Initiera canvas
  function init() {
    Game.canvas = document.getElementById('gameCanvas');
    Game.ctx = Game.canvas.getContext('2d');
    resizeCanvas();
    setupInput();
    Game.running = true;
    Game.lastTime = performance.now();
    requestAnimationFrame(gameLoop);
  }

  // Uppdatera canvas dimensioner vid resize
  function resizeCanvas() {
    Game.canvas.width = window.innerWidth;
    Game.canvas.height = window.innerHeight;
    Game.paddle.height = Game.canvas.height * 0.02;
    Game.paddle.width = Game.canvas.width * 0.15;
    Game.paddle.y = Game.canvas.height - 40;
    Game.paddle.x = (Game.canvas.width - Game.paddle.width) / 2;
  }

  // Keyboard-input
  function setupInput() {
    document.addEventListener('keydown', function(e) {
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
  }

  // Hantera tangentbord-input för paddle
  function handleInput(dt) {
    if (Game.keys['ArrowLeft']) {
      Game.paddle.x -= Game.paddle.speed * dt;
      // Vänster gräns — paddle.x får inte bli negativ
      Game.paddle.x = Math.max(0, Game.paddle.x);
    }
    if (Game.keys['ArrowRight']) {
      Game.paddle.x += Game.paddle.speed * dt;
      // Höger gräns — paddle får inte gå utanför canvas
      const maxX = Game.canvas.width - Game.paddle.width;
      Game.paddle.x = Math.min(maxX, Game.paddle.x);
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
