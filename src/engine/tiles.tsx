export type TileSize = '1x1' | 'small' | '2x2';

export default class Tile {
  id: string;           // 'U','A','STAR', etc.
  originR: number;
  originC: number;
  w: number; h: number; // 1 o 2
  size: TileSize;
  weight: number;
  starValue?: number;   // si id === 'STAR' y lleva número
  spriteKey?: string;
  constructor(opts: { id:string, r:number, c:number, size?:TileSize, w?:number, h?:number, weight?:number, starValue?:number, spriteKey?:string }) {
    this.id = opts.id;
    this.originR = opts.r;
    this.originC = opts.c;
    this.size = opts.size ?? '1x1';
    this.w = opts.w ?? (this.size === '2x2' ? 2 : 1);
    this.h = opts.h ?? (this.size === '2x2' ? 2 : 1);
    this.weight = opts.weight ?? (this.size === 'small' ? 0.6 : (this.size === '2x2' ? 4 : 1));
    this.starValue = opts.starValue;
    this.spriteKey = opts.spriteKey;
  }
  occupiesCells() {
    const cells = [];
    for (let rr=0; rr<this.h; rr++) {
      for (let cc=0; cc<this.w; cc++) {
        cells.push({ r: this.originR + rr, c: this.originC + cc });
      }
    }
    return cells;
  }
}
