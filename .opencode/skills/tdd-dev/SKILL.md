---
name: tdd-dev
description: "Red-green-refactor TDD-cycle for game development. Use when coding game features for Breakout."
---

# TDD Development Skill — Red-Green-Refactor

## Rules

### Rule 1: Red (Test First)
- Skriv **alltid** test före implementering
- Testet MÅSTE misslyckas först (red state)
- Testfilen ligger i `tests/` eller som inline-test i samma modul

### Rule 2: Green (Minimal Implementation)
- Skriv MINSTA möjliga kod för att testet ska passera
- Ingen refaktorering ännu — bara grön
- Ingen extra funktionalitet

### Rule 3: Refactor
- När testet passerar (green state) — rensa koden
- Namnge korrekt, undvik dubblater, extrahera funktioner
- Kör alla tidigare tester — inga regressioner!

## Breakout-specific guidelines

### Spelteknik
- Vanilla JavaScript (ES6+), HTML5 Canvas
- Web Audio API (ingen extern ljudfil)
- Express-server för statisk hosting
- Inga build-tools, inga ramverk

### Filstruktur
```
open_code_test/
├── server.js                    # Express-server
├── public/
│   ├── index.html               # Huvudfil
│   ├── style.css                # CSS
│   └── game.js                  # Huvudspelet
└── tests/
    └── phase-{N}.test.js        # Tester per fas
```

### Git-strategi per fas
```bash
git checkout -b feat/phase-{N}-{name}
# red-green-refactor
git add -A
git commit -m "feat(phase-{N}): implementera {name} [GR-XX, UC-XX]"
git push origin feat/phase-{N}-{name}
gh pr create --title "feat(phase-{N}): {name}" --body "..."
```

### Kravtagg-konvention
Alla commits och PR-beskrivningar MÅSTE referera till kravtaggar:
```
feat(phase-3): paddle movement [UC-02, T-PADDLE-01..04]
```

### Testkategorier
- **Enhets-test (Unit)**: Isolerad test av enkel funktion
- **Integrationstest**: Testar flera modulers samspel
- **Visuell**: Beskrivning av vad som visas på skärmen

### Viktiga regel:
1. INGEN kod utan misslyckat test först
2. INGEN extra funktionalitet utan test
3. ALLA tidigare tester måste passera (ingen regression)
4. KOMMITT-MEDDELANDE MÅSTE inkludera kravtaggar
