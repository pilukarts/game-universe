````markdown
name=docs/feature-variable-tiles.md
```markdown
# Feature: Variable-size tiles, Stars and Bonuses

This branch implements the asset pack and configuration for variable-size tiles and bonus symbols (branch: features/variable-tiles-and-bonuses). Files added in this commit include SVG assets for tiles and a star icon.

Default rules (configurable):
- Symbols: U N I V E R S E X + Star (star = bonus symbol).
- Tile sizes: 1x1 (default) and 2x2 (large). By default, X can appear as 2x2.
- Large tiles count as 4 cells and use weight = 4 in scoring (baseValue * weight).
- Stars spawn randomly (default 3% per cell on refill). Small stars are 1x1 and can stack up to 8 during a resolution. Thresholds: 3-4 => x2, 5-7 => x3, 8 => x5.
- U+X minor bonus: if U and X appear in the resolved winning set, award 3 extra spins.
- UNIVERSE X major bonus: special lockup or configured condition awards 10 free spins.

Engine changes planned / notes:
- The game engine must treat multi-cell tiles as single Tile instances occupying multiple cells. Flood-fill matching should operate on cells but removal should remove the full Tile instance.
- Scoring uses: score = baseValue * tile.weight * globalMultiplier * starMultiplier.
- Global multiplier increments per cascade (+1 default).

Next steps implemented in this branch (to follow after assets are reviewed):
- Update board engine to support multi-cell tiles in src/ (findAllMatches, collapseBoard, scoring).
- Update PreloadScene to preload new assets and to provide dev-mode toggles (force star, force 2x2) for testing.

If you review and accept the assets styling I will proceed to implement the engine changes and add a demo mode to force stars/2x2 for QA.
````
