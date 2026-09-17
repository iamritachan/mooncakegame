# 中秋月餅對對碰 · Mooncake Memory Match 🌕

一個中秋節主題的記憶配對小遊戲：12 張卡牌、6 款可愛月餅插畫，全部配對成功即為勝利！
A Mid-Autumn Festival themed memory-matching game — 12 cards, 6 cute mooncake illustrations, match them all to win.

---

## 玩法 · How to Play

- 點擊卡牌翻開，一次最多翻開兩張
- 若兩張圖案相同 → 配對成功，卡牌保持翻開
- 若不相同 → 會自動蓋回
- 完成全部 6 對配對後 → 會彈出成績（包括用時、步數及稱號）
- 按「重新開始」會重新洗牌

- Tap a card to flip it — up to two cards can be face-up at once
- Same pair → matched, stays face-up
- No match → both flip back down automatically
- Match all 6 pairs → a result pops up with your time, moves, and a title
- "Restart" reshuffles the deck for a new round

---

## 點樣整出嚟 · How I Built This

這個遊戲從頭到尾都是透過與 AI（Claude）對話建構而成——我沒有寫過一行程式碼。插畫由 AI 生成，其後我與 Claude 討論設計、文案、排版及配色，由它直接完成所有 HTML / CSS / JS 的程式碼，而我則負責觀察、選擇，並提出「這裡不太理想，請修改」之類的意見。

This entire game was built through conversation with an AI (Claude) — I didn't write a single line of code myself. The illustrations were AI-generated, and from there I talked through the design, copy, layout, and colours with Claude, which wrote all the HTML/CSS/JS. My job was to look, choose, and say "this doesn't look right, fix it."

---

## 點解整呢個 · Why I Made This

作為一個完全不懂程式編寫的人，我一直想知道：像我這樣從事廣告行業的人（現在也有承接自由工作項目，有興趣歡迎聯絡），在這個 AI 時代究竟可以做到甚麼。

以往每逢大節日臨近，最遲兩個月前就要開始為這類製作做準備：構思創意、尋找設計師、尋找程式開發人員。這次，由構思到完成第一個初稿，我只用了一小時。當然，若要效果更細緻、更完美，仍需額外時間慢慢修飾。

但在以前，作為一名創意文案（copywriter），我絕不可能獨自完成這件事——我需要設計師，還需要懂程式編寫的人。

我不認同「想法不再值錢」，也不認為「技能不再值錢」。然而在 AI 時代之下，判斷力（judgement）的價值，依然存在。

As someone who doesn't know how to code at all, I've always wanted to find out: what can someone like me — who works in advertising (still freelancing, by the way — get in touch if you have a project) — actually do in this AI era?

In the past, whenever a major festival was approaching, I'd need to start preparing this kind of production at least two months ahead — coming up with the concept, finding a designer, finding someone to write the code. This time, from idea to first draft took just one hour. Of course, refining it to look and feel just right still takes extra time.

But before this, as a creative copywriter, there's no way I could have pulled this off alone — I'd have needed a designer, and I'd have needed someone to write the code.

I don't believe ideas have become worthless. I don't believe skills have become worthless either. But in the AI era, the value of judgement still holds.

---

## 關於我 · About Me

我是 Rita Chan，現正接洽廣告自由工作項目，歡迎有興趣合作者聯絡：

I'm Rita Chan, currently open to freelance advertising projects — feel free to reach out:

- LinkedIn: [ritachanhk](https://www.linkedin.com/in/ritachanhk/)
- Instagram: [@iamritachan](https://www.instagram.com/iamritachan/)
- Email: [ritachan.pro@gmail.com](mailto:ritachan.pro@gmail.com)

---

## 檔案結構 · File Structure

```
index.html        主頁（遊戲入口）· Main page (game entry point)
css/style.css     所有樣式 · All styling (Mid-Autumn night-sky theme)
js/game.js        遊戲邏輯 · Game logic (shuffle, matching, timer, move count)
assets/           由 AI 生成的月餅及貓咪插畫 · AI-generated mooncake & cat illustrations
```

---

## 放上 GitHub Pages（不需懂程式）· Deploy to GitHub Pages (no coding needed)

1. 在 GitHub 開設一個新的 repository（例如命名為 `mooncake-game`）
   Create a new repository on GitHub (e.g. named `mooncake-game`)
2. 將此資料夾內的**所有檔案**上載（並保持上述結構）
   Upload **all the files** in this folder, keeping the structure above
3. 進入 repository 的 **Settings → Pages**
   Go to the repository's **Settings → Pages**
4. 「Source」選擇 **Deploy from a branch**，branch 選 `main`，folder 選 `/ (root)`，然後按 Save
   Under "Source", choose **Deploy from a branch**, pick branch `main` and folder `/ (root)`, then Save
5. 等候一至兩分鐘，你的連結將會是：
   Wait a minute or two, and your link will be:
   `https://<你的用戶名 / your-username>.github.io/mooncake-game/`

完全不需要安裝任何工具，亦不需要 build，純粹是 HTML/CSS/JS。
No installs, no build step needed — it's pure HTML/CSS/JS.
