# Refactoring Guide - 10k Scoreboard

## 📁 New Structure

```
src/
├── constants/
│   ├── index.ts                 (barrel export)
│   ├── game.constants.ts        (game constants)
│   └── storage.constants.ts     (localStorage keys)
├── utils/
│   ├── index.ts                 (barrel export)
│   ├── gameLogic.utils.ts       (game logic)
│   ├── storage.utils.ts         (storage handling)
│   └── validation.utils.ts      (validation functions)
```

## 🔄 Refactoring Examples

### Before: ActivePlayer.tsx
```tsx
const hdlScoreChange = (value: string) => {
  const newScore = value === '' ? 0 : parseInt(value)
  if (newScore % 50 !== 0) {  // ← Magic constant
    setInvalidScore(true)
  } else {
    setInvalidScore(false)
  }
  setNewScore(newScore)
}
```

### After: ActivePlayer.tsx
```tsx
import { isValidScore } from '@utils'

const hdlScoreChange = (value: string) => {
  const newScore = value === '' ? 0 : parseInt(value)
  setInvalidScore(!isValidScore(newScore))
  setNewScore(newScore)
}
```

---

### Before: GamePage.tsx
```tsx
useEffect(() => {
  const loadGame = () => {
    const savedScores = localStorage.getItem('SCORES')  // ← Magic string
    const savedPlayers: IPlayer[] = savedScores
      ? (JSON.parse(savedScores) as IPlayer[])
      : (JSON.parse(localStorage.getItem('PLAYERS') || '[]') as string[])
        .map((name, index) => ({
          name,
          active: index === 0,
          score: 0,
          id: index,
        }))
    setGameState(prev => ({ ...prev, players: savedPlayers }))
  }
  loadGame()
}, [])
```

### After: GamePage.tsx
```tsx
import { getScoresFromStorage, getPlayersFromStorage, initializePlayers } from '@utils'

useEffect(() => {
  const loadGame = () => {
    let players = getScoresFromStorage()
    if (players.length === 0) {
      const playerNames = getPlayersFromStorage()
      players = initializePlayers(playerNames)
    }
    setGameState(prev => ({ ...prev, players }))
  }
  loadGame()
}, [])
```

---

### Before: GamePage.tsx
```tsx
const newScore = currentPlayer.score + score
const isWinner = newScore === 10000  // ← Magic number

if (newScore > 10000) {  // ← Magic number
  return { ...prev, pointsError: t('gamePage.overflowError') }
}
```

### After: GamePage.tsx
```tsx
import { 
  hasWinner, 
  wouldCauseOverflow 
} from '@utils'

const newScore = currentPlayer.score + score

if (wouldCauseOverflow(currentPlayer.score, score)) {
  return { ...prev, pointsError: t('gamePage.overflowError') }
}

const isWinner = hasWinner(newScore)
```

---

## 📝 Benefits of This Refactoring

✅ **Cleaner and more readable code**
- Magic numbers and strings removed
- Descriptive names for all constants

✅ **Easy to maintain**
- Changing game rules is simple (edit constants)
- Changing storage keys in one place

✅ **Reusable**
- Functions can be used in any component
- Centralized logic = fewer bugs

✅ **Easy to test**
- Pure functions without side effects
- Perfect for unit tests

✅ **Professional**
- Recruiters will see well-organized code
- Demonstrates knowledge of best practices

---

## 🚀 How to Proceed

1. **Refactor GamePage.tsx** (highest impact)
2. **Refactor ActivePlayer.tsx**
3. **Refactor PlayersPage.tsx**
4. **Refactor remaining components** following the pattern

---

## 📌 Important Notes

- All files have **complete JSDoc** for IDE autocomplete
- All functions are **fully typed with TypeScript**
- Imports follow `@constants` and `@utils` pattern (tsconfig configured)
- All comments and code in **English**
