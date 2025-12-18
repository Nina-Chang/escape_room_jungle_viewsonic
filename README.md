# Jungle Escape Room

## Page Flow
Start → Prologue → Game Start → Map → Quizzes → Success
↓ (錯路)
Wrong Path

### Core Pages
| Page Name | Type | Purpose |
|-----------|------|---------|
| `start` | Intro | 遊戲開場 |
| `prologue` | Story | 劇情介紹 |
| `gameStart` | Setup | 遊戲開始 |
| `map` | Navigation | **地圖選擇關卡**<br>River Camp → Swamp Trap → Stone Maze → Ancient Temple |
| `wrong path` | Penalty | 選錯路罰頁 |
| `true false quiz` | Quiz | 是非題 (River Camp) |
| `single choice quiz` | Quiz | 單選題 (Swamp Trap) |
| `multiple choice quiz` | Quiz | 多選題 (Stone Maze) |
| `final clue quiz` | Quiz | 最終推理題 (Ancient Temple) |
| `* quiz clear` | Success | 關卡通關動畫 |
| `game success` | Ending | 遊戲完結 |

### Map Flow (4 Steps)
Step 1: River Camp (true false quiz)
↓
Step 2: Swamp Trap (single choice quiz)
↓
Step 3: Stone Maze (multiple choice quiz)
↓
Step 4: Ancient Temple (final clue quiz)
↓
Game Success!

## 🛠️ Tech Stack
- **React** + CSS Modules
- **Public folder assets** (images/sounds)
- **Responsive scaling** (1920x1080 → auto-fit)

## 🚀 Quick Start
npm install
npm start

**Game designed for 1920x1080 full-screen play.**