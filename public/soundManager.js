// Breakout Game — Sound Manager (Fas 12)

(function() {
  'use strict';

  const SoundManager = {
    audioContext: null,
    enabled: true,

    init() {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      return this.audioContext;
    },

    playTone(frequency, duration, type, volume) {
      if (!this.enabled) return;
      const ctx = this.init();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = type || 'sine';
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

      gainNode.gain.setValueAtTime(volume || 0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    },

    playFrequencyBend(startFreq, endFreq, duration, type, volume) {
      if (!this.enabled) return;
      const ctx = this.init();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = type || 'sine';
      oscillator.frequency.setValueAtTime(startFreq, ctx.currentTime);
      oscillator.frequency.linearRampToValueAtTime(endFreq, ctx.currentTime + duration);

      gainNode.gain.setValueAtTime(volume || 0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    },

    // Brick hit sounds
    playSimpleBrick() {
      this.playTone(440, 0.1, 'square', 0.1);
    },

    playToughBrick() {
      this.playTone(330, 0.2, 'square', 0.12);
    },

    playDoubleBrick() {
      this.playTone(550, 0.12, 'square', 0.1);
    },

    playBonusBrick() {
      this.playTone(660, 0.1, 'square', 0.1);
    },

    playSpeedupBrick() {
      this.playTone(220, 0.3, 'sawtooth', 0.08);
    },

    // Paddle hit
    playPaddleHit() {
      this.playTone(150, 0.05, 'sine', 0.2);
    },

    // Bonus catch
    playBonusCatch() {
      this.playFrequencyBend(440, 880, 0.2, 'sine', 0.15);
    },

    // Ball miss
    playBallMiss() {
      this.playFrequencyBend(200, 150, 0.25, 'sawtooth', 0.1);
    },

    // Game Over
    playGameOver() {
      this.playFrequencyBend(220, 110, 0.5, 'sawtooth', 0.12);
    },

    playSound(soundName) {
      switch (soundName) {
        case 'simple-brick': this.playSimpleBrick(); break;
        case 'tough-brick': this.playToughBrick(); break;
        case 'double-brick': this.playDoubleBrick(); break;
        case 'bonus-brick': this.playBonusBrick(); break;
        case 'speedup-brick': this.playSpeedupBrick(); break;
        case 'paddle-hit': this.playPaddleHit(); break;
        case 'bonus-catch': this.playBonusCatch(); break;
        case 'ball-miss': this.playBallMiss(); break;
        case 'game-over': this.playGameOver(); break;
      }
    }
  };

  window.SoundManager = SoundManager;

})();
