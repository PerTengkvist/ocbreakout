---
name: smoke-test
description: "Smoke and integration tests for Breakout game validation. Use when testing game after each phase."
---

# Smoke Test Skill — Breakout Validering

## Testmål

Testa att spelet fungerar grundläggande efter varje fas.

## Testchecklista per fas

### Fase 1 (Server)
- [ ] `curl localhost:3000` returnerar 200
- [ ] HTML-filen servas korrekt
- [ ] Ingen backend-logik (endast statiska filer)

### Fase 2 (Game Loop)
- [ ] Canvas skapas i index.html
- [ ] `requestAnimationFrame` loop exekveras
- [ ] Canvas resize hanteras

### Fase 3 (Paddle)
- [ ] Paddle ritas på canvas  
- [ ] ArrowLeft flyttar paddle vänster
- [ ] ArrowRight flyttar paddle höger
- [ ] Paddle stannar vid kanter

### Fase 4 (Boll)
- [ ] Bollen ritas och rör sig
- [ ] Space startar bollen med ±30°
- [ ] Boll reflekterar mot väggar
- [ ] Boll träffar paddle och reflekterar
- [ ] Boll-miss förlorar liv

### Fase 5 (Enkel Brick)
- [ ] Mursten ritas
- [ ] Boll träffar enkel brick → försvinner
- [ ] Poäng +10

### Fase 6 (Hart Brick)  
- [ ] Hart brick kräver 3 träffar
- [ ] Träff #1: visuell förändring
- [ ] Träff #3: brick försvinner +50p

### Fase 7 (Double Ball)
- [ ] Double brick spawner ny boll vid träff
- [ ] Ny boll från brick-position

### Fase 8 (Bonus Brick)
- [ ] Bonus brick droppar mynt
- [ ] Mynt faller med tyngdkraft
- [ ] Mynt fångas vid paddle-kontakt

### Fase 9 (Speedup Brick)
- [ ] Speedup brick ökar hastighet +10%/krock

### Fase 10 (Liv & Poäng)
- [ ] Startar med 3 liv
- [ ] Poäng ökar korrekt
- [ ] Game Over vid 0 liv

### Fase 11 (Nivågenerering)
- [ ] 20 nivåer genereras
- [ ] Nivå 1 = "Kvadrat", Nivå 2 = "Tengan"
- [ ] Nivå 3-6 = mönster
- [ ] Nivå 7-20 = slump

### Fase 12 (Ljudsystem)
- [ ] Web Audio API initieras
- [ ] Ljud spelas upp vid brick-träff
- [ ] Ljud spelas upp vid paddle-träff
- [ ] Ljud spelas upp vid miss

### Fase 13 (Startskärm+HUD)
- [ ] Startskärm med BREAKOUT-text
- [ ] HUD visar poäng, liv, nivå
- [ ] Level-overlay vid nivåskifte

### Fase 14 (Meny+GameOver) 
- [ ] Huvudmeny med high score
- [ ] Game Over skärm visas
- [ ] Victory skärm visas vid alla 20 nivåer

### Fase 15 (Polish)  
- [ ] README.md existserar
- [ ] README förklarar installation och spel
- [ ] Kod är konsistent

## Exekveringsmetoder

### Server-test (Node.js/curl)
```bash
node server.js &
sleep 1
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
kill %1
```

### Canvas-test (Playwright / Puppeteer)
```javascript
// Exempel: Testa paddle movement med Playwright
const page = await browser.newPage();
await page.goto('http://localhost:3000');
await page.keyboard.press('ArrowRight');
// Kontrollera paddle position
```

### Enhetstest (Node.js)
För renJS-tester utan DOM:
```javascript
// Exempel: Testa bollvinkel
const testAngle = (Math.sin(30 * Math.PI / 180));
assert(testAngle > 0 && testAngle < 0.5, '±30° korrekt');
```

## Viktigt
- Testa ALLTID mot den senaste versionen
- Rapporter PASS eller FAIL per test
- Om FAIL: beskriv exakt vad som feblade
