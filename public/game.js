// Breakout Game — Game Loop & Canvas (Fas 2)

(function() {
  'use strict';

  const Game = {
    canvas: null,
    ctx: null,
    running: false,
    lastTime: 0
  };

  // Initiera canvas
  function init() {
    Game.canvas = document.getElementById('gameCanvas');
    Game.ctx = Game.canvas.getContext('2d');
    resizeCanvas();
    Game.running = true;
    requestAnimationFrame(gameLoop);
  }

  // Uppdatera canvas dimensioner vid resize
  function resizeCanvas() {
    Game.canvas.width = window.innerWidth;
    Game.canvas.height = window.innerHeight;
  }

  // Game loop — update + render
  function gameLoop(timestamp) {
    if (!Game.running) return;
    const dt = timestamp - Game.lastTime;
    Game.lastTime = timestamp;
    update(dt);
    render();
    requestAnimationFrame(gameLoop);
  }

  // Update-steget — spellogik
  function update(dt) {
    // Placeholder — fas 3+ lägger till logik här
  }

  // Render-steget — ritning
  function render() {
    // Placeholder — fas 3+ lägger till rendering här
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
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
