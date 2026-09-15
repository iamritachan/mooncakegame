# 中秋月餅記憶配對 🌕🥮

中秋節主題嘅記憶配對小遊戲：12 張牌、6 款可愛月餅插畫，配對晒就贏！

## 玩法

- 撳牌揭開，一次最多揭兩張
- 兩張圖案一樣 → 配對成功，留喺度
- 唔一樣 → 自動蓋返轉
- 全部 6 對配對完成 → 彈出成績（用時＋步數＋稱號）
- 「重新開始」會重新洗牌

## 檔案結構

```
index.html        主頁（遊戲入口）
css/style.css     所有樣式（中秋夜空主題）
js/game.js        遊戲邏輯（洗牌、配對、計時、計步）
assets/           6 款 AI 生成月餅插畫（透明底 PNG）
```

## 放上 GitHub Pages（唔使識 code）

1. 喺 GitHub 開一個新 repository（例如叫 `mooncake-game`）
2. 將呢個資料夾入面**所有檔案** upload 上去（保持上面嘅結構）
3. 入 repository 嘅 **Settings → Pages**
4. 「Source」揀 **Deploy from a branch**，branch 揀 `main`，folder 揀 `/ (root)`，撳 Save
5. 等一至兩分鐘，你條 link 就會係：
   `https://<你嘅用戶名>.github.io/mooncake-game/`

完全唔使裝任何嘢、唔使 build，係純 HTML/CSS/JS。
