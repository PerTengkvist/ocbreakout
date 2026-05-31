# Kravspecifikation: Breakout

Version: 1.0
Datum: 2026-05-31
Ansvarig: Per Tengkvist

---

## 1. Omfang

Denna specifikation beskriver krav för ett webbaserat klonspel av klassiska Breakout,
utvecklat med ren Vanilla JavaScript, HTML och CSS. Spelet körs i webbläsaren utan
backend-logik.

---

## 2. Arkitektur- och miljökrav

### AR-01 Backendfri körning
Spelet ska exekvera helt i webbläsaren utan backend-logik. Endast en enkel webbserver
behövs för att hosta statiska filer (HTML, CSS, JS).

### AR-02 Teknikstack
- HTML5 för strukturen
- CSS3 för styling
- Vanilla JavaScript (ES6+) för spel-logik
- Web Audio API för ljudgenerering
- Ingen build-toolchain, inga ramverk (React, Vue etc.)

### AR-03 Statisk hosting
Enkel Express-server (eller liknande) som servar statiska filer är tillräckligt.

### NFR-01 Webbläsarkompatibilitet
Spelet ska köras i moderna webbläsare (Chrome, Firefox, Safari, Edge).

---

## 3. Spelregler

### GR-01 Liv
Spelaren har 3 liv per spelrun. Alla liv återställs vid nytt spel.

### GR-02 Förlust av liv
Ett liv förloras när bollen passerar under paddeln och träffar bottenkanten.
Ett liv förloras vid game over och spelaren måste starta om.

### GR-03 Nivåförlopp
- Spelet innehåller exakt 20 nivåer.
- Varje nivå spelas i turordning.
- En nivå är klar när alla murstenar är förstörda.

### GR-04 Vinstvillkor
När alla 20 nivåer är genomspelande visar spelet en "Du Vunnit!"-skärm med totalpoäng.

---

## 4. Murstenstyper

### GR-05 Enkel mursten (Simple Brick)
- Försvinner vid 1 träff från bollen.
- Ger 10 poäng.
- Färg: Grå.

### GR-06 Hart mursten (Tough Brick)
- Kräver 3 träffar från bollen för att förstöras.
- Varje träff syns visuellt (färgen bleknar/spricker).
- Ger 50 poäng.
- Färg: Röd.

### GR-07 Double Ball Mursten (Double Brick)
- Försvinner vid 1 träff.
- Spränger ut en ny boll från brickens position i en slumpmässig riktning (±30°).
- Ger 50 poäng.
- Färg: Grön.

### GR-08 Bonus Mursten (Bonus Brick)
- Försvinner vid 1 träff.
- Droppar ett bonusmynt från brickens position som faller med tyngdkraft.
- Myntet fångas vid kontakt med paddeln.
- Ger 10 poäng för bricken + 200 poäng för fångat mynt.
- Färg: Guld/Gul.

### GR-09 Speedup Mursten (Speedup Brick)
- Försvinner vid 1 träff.
- Bollens hastighet ökar med 10% för varje efterföljande väggkrock (paddel/vägg)
  tills nivån är klar eller livet är borta.
- Ger 250 poäng.
- Färg: Blå.

---

## 5. Nivåstrukturer

### SR-01 Nivå 1–2 — Textformationer
Nivå 1: Murstenar bildar ordet "Kvadrat"
Nivå 2: Murstenar bildar ordet "Tengan"
Format: 8 rader mursten vertikalt.

### SR-02 Nivå 3–6 — Mönster
Nivå 3: Båt-mönster (8 rader)
Nivå 4: Bil-mönster (8 rader)
Nivå 5: Plan-mönster (8 rader)
Nivå 6: Cigarett-mönster (8 rader)

### SR-03 Nivå 7–20 — Slumpmässiga mönster
Slumpmässig placering av murstenar med max 8 rader vertikalt.

### SR-04 Murstenstyperns distribution
Slumpmässiga nivåer (nivå 7–20) använder följande viktade sannolikheter:
- 70% enkel mursten
- 10% hart mursten
- 10% bonus mursten
- 5% double ball mursten
- 5% speedup mursten

---

## 6. Användningsfall

### UC-01 Starta nytt spel
Spelaren väljer "New Game" på huvudskärmen.
Spelaren placeras på nivå 1 med 3 liv och 0 poäng.

### UC-02 Flytta paddle
Spelaren trycker vänsterpil eller högerpil för att flytta paddeln horisontellt.

### UC-03 Starta boll
Spelaren trycker mellanrum (space) för att starta bollen.
Bollen rör sig uppåt med en vinkel på ±30° från vertikal.

### UC-04 Missa boll
Om bollen passerar under paddeln förloras ett liv.
Ett "fel"-ljud spelas upp och en ny boll placeras på paddeln.

### UC-05 Fullfölj nivå
Spelaren förstör alla murstenar för att avancera till nästa nivå.
En kort "Nivå X" overlay visas med fade-out-effekt.

### UC-06 Högsta poänglista
En lista över de 5 högsta poängen (rank, namn, poäng) visas på huvudskärmen.
Poäng lagras in-memori — ingen persistent lagring.

### UC-07 Game Over
När alla 3 liv är förlorade visas en "GAME OVER"-skärm.
Spelet returnerar till huvudmenyn.

---

## 7. Användargränssnitt

### UX-01 Startskärm
- "BREAKOUT" skrivet i "breakout-block" i toppen av skärmen.
- Paddle och boll centrerade i botten av startskärmen.
- Bakgrund: mulen ljusblå färg.
- Centrerad text i svart, Courier-font, vertikalt och horisontellt:
  "Skapad av Per Tengkvist med flitig hjälp av Kvadrats hostade AI-modell"

### UX-02 Huvudmeny
- Högsta poänglista med 5 toppsnörerna (rank, namn, poäng).
- "New Game"-knapp.
- Samma bakgrund som startskärm.

### UX-03 Spelskärm
- Canvas med spelområde.
- Poängvisning i övre vänstra hörnet.
- Livsindex i övre högra hörnet.
- Nivåvisning i övre mitten.

### UX-04 Level-overlay
Kort overlay med "Nivå X" text, fade-out-effekt.

### UX-05 Game Over-overlay
Stor "GAME OVER"-text, centralt på skärmen.
"Back to Menu"-knapp.

### UX-06 Victory-screen
"Dug Vunnit!"-skärm med totalpoäng.
"Back to Menu"-knapp.

---

## 8. Ljudsystem

### SU-01 Brick-hit-ljud
Spelas upp varje gång bollen träffar en mursten.
Olika ton vid olika bricktyper.

### SU-02 Paddle-hit-ljud
Ett "thump"-ljud spelas upp varje gång bollen träffar paddeln.

### SU-03 Bonus-catch
Ett "belönande"-ljud spelas upp när ett bonusmynt fångas.

### SU-04 Ball-miss
Ett "fel"-ljud spelas upp när bollen missas.

### SU-05 Game Over
Ett kort spel-ljud spelas upp när spelaren har förlorat alla liv.

---

## 9. Dokumentationskrav

### DOC-01 README
En README.md-fil ska skapas som förklarar:
- Hur man installerar/klonar projektet
- Hur man startar spelet lokalt
- Hur man spelar (kontroller, regler)
- Eventuella beroenden

---

## 10. Kravspårbarhet — Traceability-matris

| Krav | Beskrivning | Typ | Prioritet |
|------|-------------|-----|-----------|
| AR-01 | Backendfri körning | Arkitektur | Hög |
| AR-02 | Teknikstack | Arkitektur | Medel |
| AR-03 | Statisk hosting | Arkitektur | Låg |
| NFR-01 | Webbläsarkompatibilitet | Icke-funktions | Medel |
| GR-01 | 3 liv per spelrun | Spelregel | Hög |
| GR-02 | Förlust av liv | Spelregel | Hög |
| GR-03 | Nivåförlopp | Spelregel | Hög |
| GR-04 | Vinstvillkor | Spelregel | Hög |
| GR-05 | Enkel mursten | Spelregel | Hög |
| GR-06 | Hart mursten | Spelregel | Hög |
| GR-07 | Double ball mursten | Spelregel | Hög |
| GR-08 | Bonus mursten | Spelregel | Hög |
| GR-09 | Speedup mursten | Spelregel | Hög |
| SR-01 | Nivå 1-2 — Text | Specifikations | Hög |
| SR-02 | Nivå 3-6 — Mönster | Specifikations | Hög |
| SR-03 | Nivå 7-20 — Slump | Specifikations | Hög |
| SR-04 | Murstendistribution | Specifikations | Medel |
| UC-01 | Starta nytt spel | Användningsfall | Hög |
| UC-02 | Flytta paddle | Användningsfall | Hög |
| UC-03 | Starta boll | Användningsfall | Hög |
| UC-04 | Missa boll | Användningsfall | Hög |
| UC-05 | Fullfölj nivå | Användningsfall | Hög |
| UC-06 | Högsta poänglista | Användningsfall | Medel |
| UC-07 | Game Over | Användningsfall | Hög |
| UX-01 | Startskärm | UI | Hög |
| UX-02 | Huvudmeny | UI | Hög |
| UX-03 | Spelskärm | UI | Medel |
| UX-04 | Level-overlay | UI | Medel |
| UX-05 | Game Over-overlay | UI | Hög |
| UX-06 | Victory-screen | UI | Hög |
| SU-01 | Brick-hit-ljud | Ljud | Medel |
| SU-02 | Paddle-hit-ljud | Ljud | Medel |
| SU-03 | Bonus-catch | Ljud | Medel |
| SU-04 | Ball-miss | Ljud | Medel |
| SU-05 | Game Over | Ljud | Medel |
| DOC-01 | README | Dokumentation | Låg |
