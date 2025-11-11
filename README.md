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
- package.json, tsconfig.json, vite.config.ts

Telegram WebApp integration
- This project is prepared to be embedded as a Telegram Web App. See docs/telegram.md for integration notes and server-side initData validation (not included in this initial scaffold).

License: MIT
