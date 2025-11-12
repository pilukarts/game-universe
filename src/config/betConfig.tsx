export const betConfig = {
  // Denominations that the UI will offer (currency units)
  denominations: [0.2, 0.3, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 2.5, 10, 30, 100],

  // Map of denomination -> maximum (interpretación: configurable; aquí lo pongo tal como lo listaste)
  // Cambia los valores si quieres que se interpreten como maxBet o maxPayout.
  maxByDenomination: {
    "0.2": 100,
    "0.3": 500,
    "0.5": 200,
    "0.6": 600,
    "0.7": 700,
    "0.8": 800,
    "0.9": 900,
    "1.0": 1000,
    // entradas para mayores denominaciones (ej. 2.5 -> ???)
    "2.5": 2500,
    "10": 10000,
    "30": 30000,
    "100": 100000
  },

  // Límite global opcional: máximo multiplicador del juego sobre la apuesta (ej. cap de riesgo)
  maxWinMultiplier: 10000,

  // Si quieres reglas adicionales (por ejemplo: escala en función de denominación)
  // Puedes ignorar este campo si usas mappeo explícito.
  denominationScaleRule: {
    enabled: false,
    factor: 1000
  }
} as const;
