# Testspecifikation: Breakout

Version: 1.0
Datum: 2026-05-31

---

## Översikt

Denna testspecifikation innehåller testfall kopplade till kraven i breakout_spec.md.
Varje testfall refererar till sitt/b sina krav via kravtaggar (GR-, SR-, UX-, SU-, etc).

Teststrukturen följer TDD-cykeln: test först, kod sedan, refaktorering sist.

---

## 1. Arkitekturenhetstester

### T-AR-01 Express-servern servar statiska filer
- **Krav:** AR-01, AR-03
- **Scenario:** Starta Express-servern och fråga efter index.html
- **Förväntat:** Servern svarar med 200 och servar HTML-filen korrekt
- **Typ:** Integrationstest

### T-AR-02 Inget backend API-extrakt
- **Krav:** AR-01
- **Scenario:** Kontrollera projektstruktur och serverkod
- **Förväntat:** Inga API-rutter, databasanslutningar eller backend-logik finns
- **Typ:** Statisk analys

---

## 2. Spelmotor — Boll & Paddle

### T-BALL-01 Bollen startar på paddeln
- **Krav:** GR-03
- **Scenario:** När nivån startar, placeras bollen direkt på paddelns ovansida
- **Förväntat:** Bollen koordinater matchar paddelns övre kant
- **Typ:** Enhets-test

### T-BALL-02 Bollen startar med ±30° vinkel vid space
- **Krav:** UC-03
- **Scenario:** Tryck space när bollen ligger på paddeln
- **Förväntat:** Bollen rör sig uppåt med en vinkel mellan -30° och +30° från vertikal
- **Typ:** Enhets-test

### T-BALL-03 Bollen reflekterar mot väggarna
- **Krav:** GR-03
- **Scenario:** Bollen träffar vänster eller höger vägg
- **Förväntat:** Bollen byter horisontell riktning (x-riktning inverteras)
- **Typ:** Enhets-test

### T-BALL-04 Bollen reflekterar mot taket
- **Krav:** GR-03
- **Scenario:** Bollen träffar taket (övre kanten)
- **Förväntat:** Bollen byter vertikal riktning (y-riktning inverteras)
- **Typ:** Enhets-test

### T-BALL-05 Bollen träffar paddeln och reflekterar
- **Krav:** UC-02, GR-03
- **Scenario:** Bollen träffar paddeln
- **Förväntat:** Bollen byter vertikal riktning,SU-02 spelas upp
- **Typ:** Enhets-test + integration

### T-BALL-06 Boll-miss — liv förloras
- **Krav:** GR-02, UC-04
- **Scenario:** Bollen passerar under paddeln och når bottenkanten
- **Förväntat:** Liv minskas med 1, SU-04 spelas upp, ny boll placeras på paddeln
- **Typ:** Integrationstest

---

## 3. Spelmotor — Paddle

### T-PADDLE-01 Paddle flyttas vänster
- **Krav:** UC-02
- **Scenario:** Tryck vänsterpil
- **Förväntat:** Paddle flyttas åt vänster
- **Typ:** Enhets-test

### T-PADDLE-02 Paddle flyttas höger
- **Krav:** UC-02
- **Scenario:** Tryck högerpil
- **Förväntat:** Paddle flyttas åt höger
- **Typ:** Enhets-test

### T-PADDLE-03 Paddle stannar vid vänster kant
- **Krav:** UC-02
- **Scenario:** Paddle trycks mot vänster kanten av canvasen
- **Förväntat:** Padden stoppar och kan inte gå utanför canvasen
- **Typ:** Enhets-test

### T-PADDLE-04 Paddle stannar vid höger kant
- **Krav:** UC-02
- **Scenario:** Paddle trycks mot höger kanten av canvasen
- **Förväntat:** Padden stoppar och kan inte gå utanför canvasen
- **Typ:** Enhets-test

### T-PADDLE-05 Paddle dimensioner skalas responsivt
- **Krav:** NFR-01
- **Scenario:** Ändra storlek på webbläsarfönstret
- **Förväntat:** Paddeln proportionellt anpassas till fönsterbredden (~15%)
- **Typ:** Integrationstest

---

## 4. Mursten — Grundläggande funktioner

### T-BRICK-01 Mursten skapas i rätt position och färg
- **Krav:** SU-01 (indirekt)
- **Scenario:** Initiera en nivå med murstenar
- **Förväntat:** Murstenarna placeras i ett rutnät, färger matchar bricktyper
- **Typ:** Enhets-test

### T-BRICK-02 Enkel brick försvinner vid 1 träff (GR-05)
- **Krav:** GR-05
- **Scenario:** Bollen träffar en enkel mursten
- **Förväntat:** Mursten försvinner, poäng +10, SU-01 (grå ton) spelas
- **Typ:** Integrationstest

### T-BRICK-03 Hart mursten förstörs vid 3 träffar (GR-06)
- **Krav:** GR-06
- **Scenario:** Bollen träffar hårt mursten 3 gånger
- **Förväntat:** 
  - 1.a träff: murstenen blir blekare (2 HP kvar)
  - 1.b träff: murstenen blir ännu blekare (1 HP kvar)
  - 1.c träff: mursten försvinner, poäng +50, SU-01 (röd ton) spelas
- **Typ:** Integrationstest

### T-BRICK-04 Double ball brick spawnar ny boll (GR-07)
- **Krav:** GR-07
- **Scenario:** Bollen träffar double ball brick
- **Förväntat:** 
  - Mursten försvinner
  - Ny boll spawnar från brickens position med ±30° vinkel
  - Poäng +50, SU-01 (grön ton) spelas
- **Typ:** Integrationstest

### T-BRICK-05 Bonus brick dropar mynt (GR-08)
- **Krav:** GR-08
- **Scenario:** Bollen träffar bonus brick
- **Förväntat:** 
  - Mursten försvinner
  - Ett bonusmynt dropas från brickens position
  - Myntet accelererar nedåt med tyngdkraft
  - Poäng +10, SU-01 (gul ton) spelas
- **Typ:** Integrationstest

### T-BRICK-06 Bonus mynt fångas på paddle (GR-08)
- **Krav:** GR-08
- **Scenario:** Fångat bonusmynt hamnar på paddle
- **Förväntat:** 
  - Mynt försvinner
  - Poäng +200 (total: +210 per brick+mynt)
  - SU-03 (belönande ljud) spelas
- **Typ:** Integrationstest

### T-BRICK-07 Speedup brick ökar bollhastighet (GR-09)
- **Krav:** GR-09
- **Scenario:** Bollen träffar speedup brick, sedan paddle/vägg 2 gånger
- **Förväntat:** 
  - Mursten försvinner
  - Poäng +250, SU-01 (blå ton) spelas
  - Efter 1:a efterföljande väggkrock: hastighet +10%
  - Efter 2:a efterföljande väggkrock: hastighet +20% (totalt +30% från baseline)
- **Typ:** Integrationstest

### T-BRICK-08 Mursten färgkodning
- **Krav:** GR-05–09
- **Scenario:** Kontrollera färg för varje bricktyp
- **Förväntat:** 
  - Enkel → Grå
  - Hart → Röd
  - Double → Grön
  - Bonus → Gul/Guld
  - Speedup → Blå
- **Typ:** Enhets-test

---

## 5. Nivågenerering

### T-LEVEL-01 Nivå 1 bildar ordet "Kvadrat"
- **Krav:** SR-01
- **Scenario:** Ladda nivå 1
- **Förväntat:** Murstenar arrangeras i 8 rader som formar bokstäverna "Kvadrat"
- **Typ:** Integrationstest

### T-LEVEL-02 Nivå 2 bildar ordet "Tengan"
- **Krav:** SR-01
- **Scenario:** Ladda nivå 2
- **Förväntat:** Murstenar arrangeras i 8 rader som formar bokstäverna "Tengan"
- **Typ:** Integrationstest

### T-LEVEL-03 Nivå 3–6 visar mönster
- **Krav:** SR-02
- **Scenario:** Ladda nivå 3 till 6
- **Förväntat:** 
  - Nivå 3: båt-mönster (8 rader)
  - Nivå 4: bil-mönster (8 rader)
  - Nivå 5: plan-mönster (8 rader)
  - Nivå 6: cigarett-mönster (8 rader)
- **Typ:** Integrationstest

### T-LEVEL-04 Nivå 7–20 slumpmässiga mönster
- **Krav:** SR-03
- **Scenario:** Ladda nivå 10 (representativ slumpnivå)
- **Förväntat:** Murstenar placeras slumpmässigt med max 8 rader
- **Typ:** Integrationstest

### T-LEVEL-05 Murstenstypegens distribution i slumpnivåer (SR-04)
- **Krav:** SR-04
- **Scenario:** Generera många slumpnivåer (t.ex. nivå 7–20) och räkna bricktyper
- **Förväntat:** 
  - ~70% enkel mursten
  - ~10% hart mursten
  - ~10% bonus mursten
  - ~5% double ball mursten
  - ~5% speedup mursten
- **Typ:** Integrationstest (statistisk)

### T-LEVEL-06 Totalt 20 nivåer
- **Krav:** GR-03
- **Scenario:** Kontrollera antalet nivåer
- **Förväntat:** Spelet innehåller exakt 20 nivåer
- **Typ:** Enhets-test

---

## 6. Poäng och liv

### T-SCORE-01 Poäng ökar vid enkel brickträff
- **Krav:** GR-05
- **Scenario:** Bollen träffar en enkel brick
- **Förväntat:** Poäng +10
- **Typ:** Enhets-test

### T-SCORE-02 Poäng ökar vid hart brickträff (3 träffar)
- **Krav:** GR-06
- **Scenario:** Bollen förstör en hart mursten (3 träffar totalt)
- **Förväntat:** Poäng +50
- **Typ:** Enhets-test

### T-SCORE-03 Poäng vid double ball brick (GR-07)
- **Krav:** GR-07
- **Scenario:** Bollen träffar double ball brick
- **Förväntat:** Poäng +50
- **Typ:** Enhets-test

### T-SCORE-04 Poäng vid bonus brick (GR-08)
- **Krav:** GR-08
- **Scenario:** Bollen träffar bonus brick + fångar mynt
- **Förväntat:** Poäng +210 (10 + 200)
- **Typ:** Integrationstest

### T-SCORE-05 Poäng vid speedup brick (GR-09)
- **Krav:** GR-09
- **Scenario:** Bollen träffar speedup brick
- **Förväntat:** Poäng +250
- **Typ:** Enhets-test

### T-LIFE-01 Starta med 3 liv
- **Krav:** GR-01
- **Scenario:** Starta nytt spel
- **Förväntat:** Spelaren har 3 liv
- **Typ:** Enhets-test

### T-LIFE-02 Liv minskas vid miss
- **Krav:** GR-02, UC-04
- **Scenario:** Bollen missas
- **Förväntat:** Liv minskas från 3 till 2
- **Typ:** Integrationstest

### T-LIFE-03 Game Over vid 0 liv
- **Krav:** GR-01, UC-07
- **Scenario:** Spelaren har 0 liv kvar
- **Förväntat:** Spela upp SU-05, visa game over-overlay
- **Typ:** Integrationstest

---

## 7. Användargränssnitt

### T-UI-01 Startskärm renderas korrekt (UX-01)
- **Krav:** UX-01
- **Scenario:** Starta spelet
- **Förväntat:** 
  - "BREAKOUT"-text i block-format i toppen
  - Paddle och boll centrerade i botten
  - Mulen ljusblå bakgrund
  - Copyrighttext centrerad: "Skapad av Per Tengkvist med flitig hjälp av Kvadrats hostade AI-modell"
  - Courier-font
- **Typ:** Visuell integrationstest

### T-UI-02 Huvudmeny renderas (UX-02)
- **Krav:** UX-02
- **Scenario:** Navigera till huvudmenyn
- **Förväntat:** 
  - High score-lista med 5 toppscorererna
  - "New Game"-knapp
  - Ljusblå bakgrund
- **Typ:** Visuell integrationstest

### T-UI-03 Spelskärm visar HUD (UX-03)
- **Krav:** UX-03
- **Scenario:** Spela en nivå
- **Förväntat:** 
  - Poäng visas i övre vänstra hörnet
  - Livsindex visas i övre högra hörnet
  - Nivånummer visas i övre mitten
- **Typ:** Visuell integrationstest

### T-UI-04 Level-overlay visas med fade-out (UX-04)
- **Krav:** UX-04
- **Scenario:** Avancera från nivå 1 till 2
- **Förväntat:** "Nivå 2" overlay visas kortvarigt sedan tonar ut
- **Typ:** Visuell integrationstest

### T-UI-05 Game Over-overlay (UX-05)
- **Krav:** UC-07
- **Scenario:** Spelaren förlorar alla liv
- **Förväntat:** "GAME OVER"-text visas centralt med "Back to Menu"-knapp
- **Typ:** Visuell integrationstest

### T-UI-06 Victory-screen (UX-06)
- **Krav:** UC-07 (vinst)
- **Scenario:** Spelaren klara alla 20 nivåer
- **Förväntat:** "Dug Vunnit!"-skärm med totalpoäng och "Back to Menu"-knapp
- **Typ:** Visuell integrationstest

---

## 8. Ljudsystem

### T-SOUND-01 Brick-hit-ljud vid enkel brick (SU-01 + GR-05)
- **Krav:** SU-01, GR-05
- **Scenario:** Bollen träffar enkel brick
- **Förväntat:** Kort grå-ton spelas via Web Audio API
- **Typ:** Integrationstest

### T-SOUND-02 Brick-hit-ljud vid hart brick (SU-01 + GR-06)
- **Krav:** SU-01, GR-06
- **Scenario:** Bollen träffar hart brick
- **Förväntat:** Röd-ton (annan frekvens än enkel) spelas
- **Typ:** Integrationstest

### T-SOUND-03 Brick-hit-ljud vid double brick (SU-01 + GR-07)
- **Krav:** SU-01, GR-07
- **Scenario:** Bollen träffar double brick
- **Förväntat:** Grön-ton spelas (annan frekvens)
- **Typ:** Integrationstest

### T-SOUND-04 Brick-hit-ljud vid bonus brick (SU-01 + GR-08)
- **Krav:** SU-01, GR-08
- **Scenario:** Bollen träffar bonus brick
- **Förväntat:** Gul-ton spelas (annan frekvens)
- **Typ:** Integrationstest

### T-SOUND-05 Brick-hit-ljud vid speedup brick (SU-01 + GR-09)
- **Krav:** SU-01, GR-09
- **Scenario:** Bollen träffar speedup brick
- **Förväntat:** Blå-ton spelas (annan frekvens)
- **Typ:** Integrationstest

### T-SOUND-06 Paddle-hit-ljud (SU-02)
- **Krav:** SU-02
- **Scenario:** Bollen träffar paddeln
- **Förväntat:** "Thump"-ljud (lågfrekvent, kort) spelas
- **Typ:** Integrationstest

### T-SOUND-07 Bonus-catch-ljud (SU-03)
- **Krav:** SU-03
- **Scenario:** Fångat mynt på paddeln
- **Förväntat:** "Belönande" ljud (stigen toner) spelas
- **Typ:** Integrationstest

### T-SOUND-08 Ball-miss-ljud (SU-04)
- **Krav:** SU-04
- **Scenario:** Bollen missas
- **Förväntat:** "Fel"-ljud (dyskordant ton) spelas
- **Typ:** Integrationstest

### T-SOUND-09 Game Over-ljud (SU-05)
- **Krav:** SU-05
- **Scenario:** Spen har 0 liv kvar
- **Förväntat:** Kort spel-ljud (stigande/dyston) spelas
- **Typ:** Integrationstest

---

## 9. Testsummary — Traceability

### Hög prioritet (måste bestå)
| Test | Krav | Typ |
|------|------|-----|
| T-BALL-02 | UC-03 | Enhets |
| T-BALL-06 | GR-02, UC-04 | Integration |
| T-BRICK-02 | GR-05 | Integration |
| T-BRICK-03 | GR-06 | Integration |
| T-BRICK-04 | GR-07 | Integration |
| T-BRICK-05 | GR-08 | Integration |
| T-BRICK-07 | GR-09 | Integration |
| T-LIFE-01 | GR-01 | Enhets |
| T-LIFE-03 | GR-01, UC-07 | Integration |
| T-LEVEL-06 | GR-03 | Enhets |
| T-UI-01 | UX-01 | Visuell |
| T-UI-05 | UC-07 | Visuell |

### Medel prioritet (bör bestå)
| Test | Krav | Typ |
|------|------|-----|
| T-BALL-03 | GR-03 | Enhets |
| T-BALL-05 | GR-03 | Integration |
| T-BRICK-06 | GR-08 | Integration |
| T-LEVEL-04 | SR-03 | Integration |
| T-LEVEL-05 | SR-04 | Integration |
| T-UI-02 | UX-02 | Visuell |
| T-UI-03 | UX-03 | Visuell |
| T-UI-04 | UX-04 | Visuell |
| T-UI-06 | UX-06 | Visuell |
| T-SOUND-* | SU-* | Integration |

### Låg prioritet (bäst-effort)
| Test | Krav | Typ |
|------|------|-----|
| T-AR-01 | AR-03 | Integration |
| T-AR-02 | AR-01 | Statisk |
| T-LEVEL-03 | SR-02 | Visuell |
