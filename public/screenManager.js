// Breakout Game — Screen Manager (Fas 13 + 14)

(function() {
  'use strict';

  const ScreenManager = {
    currentScreen: 'SPLASH', // SPLASH, MENU, PLAYING, GAME_OVER, VICTORY
    highScores: [],
    maxHighScores: 5,

    // Splash screen
    drawSplashScreen(ctx, canvas) {
      // Background
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // BREAKOUT title in block letters
      const title = 'BREAKOUT';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold ' + Math.floor(canvas.width * 0.08) + 'px Courier New';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(title, canvas.width / 2, canvas.height * 0.25);

      // Copyright text
      ctx.fillStyle = '#000000';
      ctx.font = '14px Courier New';
      const copyright = 'Skapad av Per Tengkvist med flitig hjälp av Kvadrats hostade AI-modell';
      ctx.fillText(copyright, canvas.width / 2, canvas.height * 0.7);

      // Draw paddle and ball centered
      const paddleW = canvas.width * 0.15;
      const paddleH = canvas.height * 0.02;
      const paddleX = (canvas.width - paddleW) / 2;
      const paddleY = canvas.height * 0.6;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(paddleX, paddleY, paddleW, paddleH);

      const ballX = canvas.width / 2;
      const ballY = paddleY - 10;
      ctx.beginPath();
      ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.textAlign = 'start';
    },

    // Menu screen
    drawMenuScreen(ctx, canvas) {
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 28px Courier New';
      ctx.textAlign = 'center';
      ctx.fillText('HIGH SCORES', canvas.width / 2, canvas.height * 0.2);

      // High score list
      ctx.font = '16px Courier New';
      ctx.textAlign = 'left';
      const startX = canvas.width / 2 - 100;
      const startY = canvas.height * 0.3;
      const spacing = 30;

      for (let i = 0; i < this.maxHighScores; i++) {
        const score = this.highScores[i];
        const text = (i + 1) + '. ' + (score ? score.name.padEnd(15) : '------------') + ' ' + (score ? score.points : '----');
        ctx.fillStyle = i === 0 ? '#FFD700' : '#000000';
        ctx.fillText(text, startX, startY + i * spacing);
      }

      // New Game button
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 20px Courier New';
      ctx.fillText('[ TRYCK SPACE FOR ATT NYTT SPEL ]', canvas.width / 2, canvas.height * 0.75);

      ctx.textAlign = 'start';
    },

    // Game Over overlay
    drawGameOverScreen(ctx, canvas) {
      // Semi-transparent overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 48px Courier New';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 30);

      ctx.font = '18px Courier New';
      ctx.fillText('Poäng: ' + Game.score, canvas.width / 2, canvas.height / 2 + 20);

      ctx.font = '16px Courier New';
      ctx.fillStyle = '#CCCCCC';
      ctx.fillText('Tryck SPACE for att gä tillbaka till meny', canvas.width / 2, canvas.height / 2 + 60);

      ctx.textAlign = 'start';
      ctx.textBaseline = 'alphabetic';
    },

    // Victory screen
    drawVictoryScreen(ctx, canvas) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 48px Courier New';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Dug Vunnit!', canvas.width / 2, canvas.height / 2 - 30);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '22px Courier New';
      ctx.fillText('Total poäng: ' + Game.score, canvas.width / 2, canvas.height / 2 + 20);

      ctx.font = '16px Courier New';
      ctx.fillStyle = '#CCCCCC';
      ctx.fillText('Tryck SPACE for att gä tillbaka till meny', canvas.width / 2, canvas.height / 2 + 60);

      ctx.textAlign = 'start';
      ctx.textBaseline = 'alphabetic';
    },

    // Level transition overlay
    drawLevelOverlay(ctx, canvas, alpha, text) {
      if (alpha <= 0) return;
      ctx.fillStyle = 'rgba(0, 0, 0, ' + alpha * 0.5 + ')';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px Courier New';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      ctx.textAlign = 'start';
      ctx.textBaseline = 'alphabetic';
    },

    // Save high score
    saveHighScore(name, points) {
      this.highScores.push({ name: name, points: points });
      this.highScores.sort(function(a, b) { return b.points - a.points; });
      if (this.highScores.length > this.maxHighScores) {
        this.highScores = this.highScores.slice(0, this.maxHighScores);
      }
    }
  };

  window.ScreenManager = ScreenManager;

})();
