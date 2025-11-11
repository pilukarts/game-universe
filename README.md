#```markdown
# Universe X (prototype)

Universe X is a prototype browser game inspired by Avalon X. It implements a 7x7 cascading-grid slot mechanic with cluster detection, tumbling cascades, increasing multipliers, and a modular game engine built in Phaser 3 + TypeScript. Placeholder graphics are included so you can run the prototype immediately; replace them with your original art to complete the project.

Short description (tagline): Universe X — A fantasy-themed cascading-grid slot prototype built with Phaser 3 and TypeScript

How to run (development)
1. npm install
2. npm run dev
3. Open http://localhost:5173

Structure
- index.html
- src/
  - main.ts
  - scenes/BootScene.ts
  - scenes/PreloadScene.ts
  - scenes/GameScene.ts
- assets/ (place your images/spritesheets here)
- docs/ (branding guide and integration notes)
- package.json, tsconfig.json, vite.config.ts

Gameplay mechanics (summary)
- Randomness:
  - The slot engine fills the board with symbols using a pseudo-random generator for the prototype. The engine behaves as a random slot: each spin (or cascade refill) results in a new randomized board state.
  - IMPORTANT: This prototype uses client-side randomness only for demo purposes. For commercial / certified releases you must use a server-side RNG or a certified randomness provider and obtain the required audits and certification.

- Variable-size pieces:
  - Symbols can have different sizes (examples: 1x1, 2x2, etc.). Larger pieces occupy more cells and award more points when they participate in a winning cluster.
  - The payout calculation is size-aware: larger pieces increase symbol weight, so wins that include bigger pieces pay proportionally more.

- Cascading (tumbling):
  - When a cluster of 3 or more connected identical symbols is formed, those tiles are removed, the board collapses, and new symbols fall from above. Cascades can chain, and each successive cascade increases a multiplier that boosts payouts.

Bonuses and special triggers
- There are two configurable bonus classes in the engine:
  1) Minor Bonus (U + X combo): If symbols corresponding to 'U' and 'X' appear together in the resolved play (as configured by the engine), the player receives 3 extra spins (demo default). This condition is configurable.
  2) Major Bonus (UNIVERSE X lockup): If the special combined trigger — the full "UNIVERSE X" lockup symbol or the configured equivalent — appears in a winning formation, the player receives 10 free spins.

- Star / Puzzle symbol:
  - The Star symbol triggers puzzle-like effects. When a Star lands, it can transform nearby pieces, lock certain tiles, or clear nearby groups according to the puzzle rules. The intention is to layer puzzle interactions on top of slot cascades (a falling-puzzle overlay behavior).

- Piece scoring and puzzle behavior:
  - Because some pieces are larger (2x2, etc.) the engine treats them as multi-cell pieces for matching and scoring; when part of a winning group, the full piece contributes according to its size and weight.
  - Puzzle transforms caused by Star may convert smaller pieces into larger ones, or vice versa, depending on configuration.

Notes on payouts, RTP and certification
- The current prototype uses a simple demo payout formula. For production and commercial distribution you must:
  - Move payout/RTP calculation to a server-side implementation (or provide a certified RNG + math).
  - Document the mathematical model for RTP and volatility.
  - Obtain independent laboratory testing (GLI, BMM, NMi or equivalent) prior to deploying with real money.
- All bonus conditions, symbol weights, and payout formulas are configurable in the game engine source; update the configuration before requesting audits.

Telegram WebApp integration
- The project includes notes and a demo for running Universe X as a Telegram Web App. See docs/telegram.md for details about:
  - creating a bot (BotFather),
  - serving the HTML5 game over HTTPS,
  - using Telegram.WebApp (initData, sendData),
  - validating initData on the server, and
  - receiving scores or web_app_data in the bot backend.

Phaser / installation note
- If you tried the Phaser template installer (create-game), you may see an interactive prompt to choose options (demo, middleware, client framework, bundler). That's normal — the official template offers many starter options.
- This repository provides a ready-to-run Vite + Phaser + TypeScript scaffold that bypasses that interactive setup. Use the included project if you prefer a minimal Vite-based workflow.

- Example installer prompt you may see (informational):
  ```
  @phaserjs/create-game@1.3.0
  Ok to proceed? (y) y

  npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead

  > npx
  > create-game

  o----------------------------------------------------o
  |      Welcome to the Phaser Template Installer      |
  |            Let´s start the installation            |
  |                       v1.3.0                       |
  o----------------------------------------------------o
  ```
  Then it asks for project name and options (Client Framework, Bundler, etc.). If you prefer that generator, follow its prompts and then merge assets/code into this repo as needed.

Assets and logos
- Place your original graphics under assets/ in appropriately named subfolders:
  - assets/logos/
  - assets/sprites/
  - assets/audio/
- The repo already contains vector logo files in assets/logos/ and icons in assets/icons/.

License
- MIT by default. Change or add a commercial license as needed for distribution to operators/casino partners.

Development checklist and next steps (I can help with these)
- Provide server-side RNG / payout engine and documentation for audits.
- Add PNG exports of logos at multiple sizes and add preload hooks in PreloadScene.
- Add Telegram server example (/server) that validates initData and receives scores.
- Add issues/milestones for certification, Web3 integration, and commercial packaging.
- Create packaging and integration guide for operators (playable demo, sandbox endpoints, logs, RTP math).

Contact / next steps
- I can push the README update for you if you want — confirm and I will retry the upload.
- Or you can paste the content above into README.md using the GitHub web editor or a local git commit (commands shown above).

```
License: MIT
