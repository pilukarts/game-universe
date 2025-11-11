import Phaser from 'phaser'
import { WinDisplay } from '../ui/WinDisplay'

type Tile = {
  id: number
  sprite?: Phaser.GameObjects.Image
  x: number
  y: number
}

export default class GameScene extends Phaser.Scene {
  private rows = 7
  private cols = 7
  private tileSize = 96
  private board: (Tile | null)[][] = []
  private symbolCount = 6
  private tilesLayer?: Phaser.GameObjects.Container
  private balance = 4.39
  private bet = 0.4
  private multiplier = 1
  private uiText?: Phaser.GameObjects.Text
  private spinButton?: Phaser.GameObjects.Container
  private resolving = false
  private winDisplay?: WinDisplay

  constructor() {
    super({ key: 'GameScene' })
  }

  create() {
    this.cameras.main.setBackgroundColor(0x0e2230)
    const bg = this.add.rectangle(512, 384, 900, 680, 0x12302b).setAlpha(0.18)

    const boardX = 512 - (this.cols * this.tileSize) / 2
    const boardY = 120
    this.tilesLayer = this.add.container(boardX, boardY)

    for (let r = 0; r < this.rows; r++) {
      this.board[r] = []
      for (let c = 0; c < this.cols; c++) {
        this.board[r][c] = null
      }
    }

    this.add.text(18, 18, 'UNIVERSE X', { fontSize: '22px', color: '#ffffff', fontStyle: 'bold' })
    this.uiText = this.add.text(18, 50, this.getStatusText(), { fontSize: '18px', color: '#ffffff' })

    this.add
      .text(512, 70, `x${this.multiplier}`, { fontSize: '28px', color: '#ffd166', fontStyle: 'bold' })
      .setOrigin(0.5)

    this.createSpinButton(900, 520)

    // Create WinDisplay instance
    this.winDisplay = new WinDisplay(this)
    this.winDisplay.create(512, 400)

    this.generateBoardNoInitialMatches()
    this.renderBoard()
  }

  private getStatusText() {
    return `Balance: £${this.balance.toFixed(2)}   Bet: £${this.bet.toFixed(2)}   Mult: x${this.multiplier}`
  }

  private createSpinButton(x: number, y: number) {
    const container = this.add.container(x, y)
    const circle = this.add.circle(0, 0, 64, 0x2ca6f8)
    const arrow = this.add.text(-12, -12, '▶', { fontSize: '40px', color: '#fff' })
    container.add([circle, arrow])
    circle.setInteractive({ cursor: 'pointer' })
    circle.on('pointerdown', () => {
      if (!this.resolving) this.startSpin()
    })
    this.spinButton = container
  }

  private startSpin() {
    this.resolving = true
    // Hide win display when starting new spin
    this.winDisplay?.hide()
    this.balance = Math.max(0, this.balance - this.bet)
    this.uiText?.setText(this.getStatusText())
    this.time.delayedCall(200, () => {
      this.resolveCascades().then(() => {
        this.resolving = false
        this.uiText?.setText(this.getStatusText())
      })
    })
  }

  private generateBoardNoInitialMatches() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        let candidates = this.range(0, this.symbolCount - 1)
        if (c >= 2) {
          const left1 = this.board[r][c - 1]
          const left2 = this.board[r][c - 2]
          if (left1 && left2 && left1.id === left2.id) {
            candidates = candidates.filter((x) => x !== left1.id)
          }
        }
        if (r >= 2) {
          const up1 = this.board[r - 1][c]
          const up2 = this.board[r - 2][c]
          if (up1 && up2 && up1.id === up2.id) {
            candidates = candidates.filter((x) => x !== up1.id)
          }
        }
        const id = Phaser.Utils.Array.GetRandom(candidates)
        this.board[r][c] = { id, x: c, y: r }
      }
    }
  }

  private renderBoard(highlightPositions: Set<string> = new Set()) {
    if (!this.tilesLayer) return
    this.tilesLayer.removeAll(true)
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const tile = this.board[r][c]
        if (!tile) continue
        const px = c * this.tileSize + this.tileSize / 2
        const py = r * this.tileSize + this.tileSize / 2
        const key = `symbol_${tile.id}`
        const img = this.add.image(px, py, key).setDisplaySize(this.tileSize - 8, this.tileSize - 8)
        tile.sprite = img
        const coordKey = `${r},${c}`
        if (highlightPositions.has(coordKey)) {
          const frame = this.add.image(px, py, 'gold_frame').setDisplaySize(this.tileSize, this.tileSize)
          this.tilesLayer.add(frame)
        }
        this.tilesLayer.add(img)
      }
    }
  }

  private async resolveCascades() {
    this.multiplier = 1
    let chain = 0
    let totalWinAmount = 0
    while (true) {
      const matches = this.findAllMatches()
      if (matches.length === 0) break
      chain++
      const highlightSet = new Set<string>()
      matches.forEach((pos) => highlightSet.add(`${pos.r},${pos.c}`))
      this.renderBoard(highlightSet)

      await this.tweenFadeMatches(matches)

      const winAmount = this.calculateWin(matches, chain)
      totalWinAmount += winAmount * this.multiplier
      this.balance += winAmount * this.multiplier
      this.multiplier += 1
      this.uiText?.setText(this.getStatusText())

      this.collapseBoard()
      await this.tweenDrop()
      this.renderBoard()
      await this.wait(200)
    }
    this.multiplier = 1
    this.uiText?.setText(this.getStatusText())
    
    // Show win display if there was any win
    if (totalWinAmount > 0) {
      this.winDisplay?.showWin(totalWinAmount)
    }
  }

  private calculateWin(matches: { r: number; c: number }[], chain: number) {
    const base = 0.05
    return base * matches.length * Math.max(1, chain)
  }

  private collapseBoard() {
    for (let c = 0; c < this.cols; c++) {
      const column: (Tile | null)[] = []
      for (let r = 0; r < this.rows; r++) {
        column.push(this.board[r][c])
      }
      const compact: Tile[] = column.filter(Boolean) as Tile[]
      const missing = this.rows - compact.length
      const newTiles: Tile[] = []
      for (let i = 0; i < missing; i++) {
        const id = Phaser.Math.Between(0, this.symbolCount - 1)
        newTiles.push({ id, x: c, y: i })
      }
      const newColumn = [...newTiles, ...compact]
      for (let r = 0; r < this.rows; r++) {
        const t = newColumn[r]
        if (t) {
          t.x = c
          t.y = r
        }
        this.board[r][c] = t ?? null
      }
    }
  }

  private tweenDrop(): Promise<void> {
    return new Promise((resolve) => {
      const tweens: Phaser.Types.Tweens.TweenBuilderConfig[] = []
      if (!this.tilesLayer) {
        resolve()
        return
      }
      this.tilesLayer.removeAll(true)
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols; c++) {
          const tile = this.board[r][c]
          if (!tile) continue
          const px = c * this.tileSize + this.tileSize / 2
          const pyTarget = r * this.tileSize + this.tileSize / 2
          const img = this.add.image(px, -150 + Phaser.Math.Between(-20, 20), `symbol_${tile.id}`).setDisplaySize(this.tileSize - 8, this.tileSize - 8)
          tile.sprite = img
          this.tilesLayer.add(img)
          tweens.push({
            targets: img,
            y: pyTarget,
            duration: 250 + (this.rows - r) * 10,
            ease: 'Cubic.easeIn'
          })
        }
      }

      this.tweens.timeline({
        tweens,
        onComplete: () => {
          resolve()
        }
      })
    })
  }

  private tweenFadeMatches(matches: { r: number; c: number }[]): Promise<void> {
    return new Promise((resolve) => {
      const targets: Phaser.GameObjects.Image[] = []
      const toRemove: { r: number; c: number }[] = []
      matches.forEach((m) => {
        const tile = this.board[m.r][m.c]
        if (tile && tile.sprite) {
          targets.push(tile.sprite)
          toRemove.push(m)
        }
      })
      this.tweens.add({
        targets,
        alpha: 0,
        scale: 0.6,
        duration: 300,
        onComplete: () => {
          toRemove.forEach((m) => {
            this.board[m.r][m.c] = null
          })
          resolve()
        }
      })
    })
  }

  private findAllMatches(): { r: number; c: number }[] {
    const visited = Array.from({ length: this.rows }, () => Array(this.cols).fill(false))
    const matches: { r: number; c: number }[] = []

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (visited[r][c]) continue
        const tile = this.board[r][c]
        if (!tile) continue
        const group: { r: number; c: number }[] = []
        this.floodFill(r, c, tile.id, visited, group)
        if (group.length >= 3) {
          matches.push(...group)
        }
      }
    }
    const uniqMap = new Map<string, { r: number; c: number }>()
    matches.forEach((m) => uniqMap.set(`${m.r},${m.c}`, m))
    return Array.from(uniqMap.values())
  }

  private floodFill(r: number, c: number, id: number, visited: boolean[][], group: { r: number; c: number }[]) {
    const stack = [{ r, c }]
    while (stack.length > 0) {
      const p = stack.pop()!
      if (p.r < 0 || p.r >= this.rows || p.c < 0 || p.c >= this.cols) continue
      if (visited[p.r][p.c]) continue
      const t = this.board[p.r][p.c]
      if (!t || t.id !== id) continue
      visited[p.r][p.c] = true
      group.push({ r: p.r, c: p.c })
      stack.push({ r: p.r + 1, c: p.c }, { r: p.r - 1, c: p.c }, { r: p.r, c: p.c + 1 }, { r: p.r, c: p.c - 1 })
    }
  }

  private range(a: number, b: number) {
    const arr: number[] = []
    for (let i = a; i <= b; i++) arr.push(i)
    return arr
  }

  private wait(ms: number) {
    return new Promise((res) => {
      this.time.delayedCall(ms, () => res(undefined))
    })
  }
}
