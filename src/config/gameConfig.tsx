export const gameConfig = {
  rows: 7,
  cols: 7,
  tileSize: 96,
  // Símbolos principales + símbolos clásicos de slot
  symbolIds: ['U','N','I','V','E','R','S','E','X','A','K','Q','J','10','STAR'],
  // weights por tipo (1x1 normal = 1, small = 0.6, 2x2 = 4)
  sizeWeights: { normal: 1, small: 0.6, '2x2': 4 },
  probability: {
    twoByTwo: 0.08,       // 8% para 2x2
    smallTileSpawn: 0.10, // 10% tiles small
    starSpawn: 0.03       // 3% por celda
  },
  // star thresholds y comportamiento (number inside star = starValue)
  starThresholds: [
    { min: 3, max: 4, multiplier: 2 },
    { min: 5, max: 7, multiplier: 3 },
    { min: 8, max: 8, multiplier: 5 }
  ],
  // starValue range default for star-with-number (spawned randomly)
  starValueRange: { min: 1, max: 5 }, // valores que puede llevar la estrella
  // Bonus spins
  minorBonusSpins: 3,
  majorBonusSpins: 10
} as const;
