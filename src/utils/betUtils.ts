import { betConfig } from '../config/betConfig';

// convertir a enteros (p. ej. cents) para evitar errores de float
export function toCents(value: number) {
  return Math.round(value * 100);
}
export function fromCents(cents: number) {
  return cents / 100;
}

// obtener el límite (max) configurado para una denominación
export function getMaxForDenomination(denom: number): number | undefined {
  const key = String(denom);
  return betConfig.maxByDenomination[key];
}

// validar la apuesta seleccionada (dependiendo si interpretas max como maxBet o maxPayout)
export function validateBetSelection(denom: number, stakeMultiplier: number, mode: 'maxBet'|'maxPayout' = 'maxBet') {
  // stakeMultiplier: número de monedas por tirada (ej. 1, 2, 5, etc.) o bet-per-line multiplicador
  const max = getMaxForDenomination(denom);
  if (!max) return { ok: true, reason: null }; // sin límite configurado
  const stake = denom * stakeMultiplier;
  if (mode === 'maxBet') {
    if (stake > max) return { ok: false, reason: `La apuesta ${stake} excede el máximo permitido ${max}` };
    return { ok: true, reason: null };
  } else { // maxPayout
    // si el límite es de payout, luego debes calcular el payout estimado (por ejemplo usando un max multiplier)
    const potentialMaxPayout = Math.min(stake * betConfig.maxWinMultiplier, max);
    // se puede agregar lógica para comparar con banca/limites
    return { ok: true, reason: null, potentialMaxPayout };
  }
}

// calcular payout máximo permitido dado bet y límites
export function calcMaxPayoutForBet(denom: number, stakeMultiplier: number) {
  const stake = denom * stakeMultiplier;
  const limit = getMaxForDenomination(denom);
  const theoreticalMax = stake * betConfig.maxWinMultiplier;
  if (limit !== undefined) {
    // si limit lo interpretamos como tope absoluto de payout
    return Math.min(theoreticalMax, limit);
  }
  return theoreticalMax;
}
