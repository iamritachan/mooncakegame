/* ===== 中秋月餅記憶配對 ===== */
(function () {
  "use strict";

  var MOONCAKES = [
    { id: 1, name: "雙黃蓮蓉月", src: "assets/mooncake-1.png" },
    { id: 2, name: "冰皮玉兔月", src: "assets/mooncake-2.png" },
    { id: 3, name: "抹茶開心月", src: "assets/mooncake-3.png" },
    { id: 4, name: "紫薯星空月", src: "assets/mooncake-4.png" },
    { id: 5, name: "流心奶黃月", src: "assets/mooncake-5.png" },
    { id: 6, name: "豆沙小兔月", src: "assets/mooncake-6.png" }
  ];
  var TOTAL_PAIRS = MOONCAKES.length;

  var board = document.getElementById("board");
  var timerEl = document.getElementById("timer");
  var movesEl = document.getElementById("moves");
  var pairsEl = document.getElementById("pairs");
  var btnRestart = document.getElementById("btnRestart");
  var modalOverlay = document.getElementById("modalOverlay");
  var modalTitleZhEl = document.getElementById("modalTitleZh");
  var modalTitleEnEl = document.getElementById("modalTitleEn");
  var modalSubZhEl = document.getElementById("modalSubZh");
  var modalSubEnEl = document.getElementById("modalSubEn");
  var btnPlayAgain = document.getElementById("btnPlayAgain");
  var finalTimeEl = document.getElementById("finalTime");
  var finalMovesEl = document.getElementById("finalMoves");
  var confettiCanvas = document.getElementById("confetti");

  var firstCard = null;      // 第一張揭開嘅牌
  var lockBoard = false;     // 配對判定期間鎖住
  var moves = 0;
  var matchedPairs = 0;
  var startedAt = null;
  var timerId = null;

  /* ---------- 工具 ---------- */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  function formatTime(ms) {
    var total = Math.floor(ms / 1000);
    var m = Math.floor(total / 60);
    var s = total % 60;
    return pad2(m) + ":" + pad2(s);
  }

  function startTimer() {
    startedAt = Date.now();
    timerId = setInterval(function () {
      timerEl.textContent = formatTime(Date.now() - startedAt);
    }, 500);
  }

  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
  }

  /* ---------- 建牌 ---------- */
  function buildBoard() {
    board.innerHTML = "";
    var deck = shuffle(MOONCAKES.concat(MOONCAKES));
    deck.forEach(function (cake) {
      var card = document.createElement("button");
      card.className = "card";
      card.type = "button";
      card.dataset.id = cake.id;
      card.setAttribute("aria-label", "月餅牌");

      card.innerHTML =
        '<span class="card-inner">' +
          '<span class="card-face card-back" aria-hidden="true"></span>' +
          '<span class="card-face card-front">' +
            '<img src="' + cake.src + '" alt="' + cake.name + '" draggable="false">' +
          "</span>" +
        "</span>";

      card.addEventListener("click", function () { onCardClick(card); });
      board.appendChild(card);
    });
  }

  /* ---------- 遊戲邏輯 ---------- */
  function onCardClick(card) {
    if (lockBoard) return;
    if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

    if (startedAt === null) startTimer();

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    // 揭開咗第二張
    moves++;
    movesEl.textContent = moves;

    var a = firstCard, b = card;
    firstCard = null;
    lockBoard = true;

    if (a.dataset.id === b.dataset.id) {
      // 配對成功
      a.classList.add("matched");
      b.classList.add("matched");
      matchedPairs++;
      pairsEl.textContent = matchedPairs;
      lockBoard = false;
      if (matchedPairs === TOTAL_PAIRS) {
        stopTimer();
        setTimeout(showResult, 650);
      }
    } else {
      // 唔啱：搖一搖，蓋返轉
      a.classList.add("shake");
      b.classList.add("shake");
      setTimeout(function () {
        a.classList.remove("flipped", "shake");
        b.classList.remove("flipped", "shake");
        lockBoard = false;
      }, 850);
    }
  }

  function getRank(timeMs, steps) {
    var sec = Math.floor(timeMs / 1000);
    if (steps <= 9 && sec <= 45) {
      return {
        zh: "月餅大神", en: "Mooncake Master",
        body: "閣下手速又快又準，佩服佩服！",
        bodyEn: "Lightning-fast hands and pinpoint accuracy — impressive!"
      };
    }
    if (steps <= 14 && sec <= 90) {
      return {
        zh: "賞月高手", en: "Moon-Gazing Pro",
        body: "叻叻！食多件月餅！",
        bodyEn: "Great job! Treat yourself to another mooncake!"
      };
    }
    if (steps <= 20) {
      return {
        zh: "月餅站長", en: "Mooncake Captain",
        body: "嗯，可以快少少囉～",
        bodyEn: "Not bad — could be a little faster~"
      };
    }
    return {
      zh: "繼續努力的小白兔", en: "Little Bunny, Keep Going",
      body: "看來月餅吃多了⋯⋯",
      bodyEn: "Looks like you've had one too many mooncakes⋯⋯"
    };
  }

  function showResult() {
    var elapsed = startedAt ? Date.now() - startedAt : 0;
    finalTimeEl.textContent = formatTime(elapsed);
    finalMovesEl.textContent = moves;
    var rank = getRank(elapsed, moves);
    modalTitleZhEl.textContent = "稱號：" + rank.zh;
    modalTitleEnEl.textContent = "Your Title: " + rank.en;
    modalSubZhEl.textContent = rank.body;
    modalSubEnEl.textContent = rank.bodyEn;
    modalOverlay.hidden = false;
    launchConfetti();
  }

  function resetGame() {
    stopTimer();
    startedAt = null;
    firstCard = null;
    lockBoard = false;
    moves = 0;
    matchedPairs = 0;
    timerEl.textContent = "00:00";
    movesEl.textContent = "0";
    pairsEl.textContent = "0";
    modalOverlay.hidden = true;
    stopConfetti();
    buildBoard();
  }

  /* ---------- 桂花彩帶 ---------- */
  var confettiId = null;
  var petals = [];

  function launchConfetti() {
    var ctx = confettiCanvas.getContext("2d");
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    var colors = ["#e3c384", "#fce1b6", "#f6b04e", "#ffd9e8", "#ffffff", "#af915f"];
    petals = [];
    for (var i = 0; i < 140; i++) {
      petals.push({
        x: Math.random() * confettiCanvas.width,
        y: -20 - Math.random() * confettiCanvas.height * 0.5,
        r: 3 + Math.random() * 5,
        c: colors[Math.floor(Math.random() * colors.length)],
        vy: 1.2 + Math.random() * 2.2,
        vx: -0.8 + Math.random() * 1.6,
        rot: Math.random() * Math.PI * 2,
        vr: -0.06 + Math.random() * 0.12,
        round: Math.random() < 0.5
      });
    }
    var start = Date.now();
    var DURATION = 5000;

    function tick() {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      var elapsed = Date.now() - start;
      petals.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > confettiCanvas.height + 20) p.y = -20;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        if (p.round) {
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.r, -p.r * 0.5, p.r * 2, p.r);
        }
        ctx.restore();
      });
      if (elapsed < DURATION) {
        confettiId = requestAnimationFrame(tick);
      } else {
        stopConfetti();
      }
    }
    stopConfetti();
    confettiId = requestAnimationFrame(tick);
  }

  function stopConfetti() {
    if (confettiId) { cancelAnimationFrame(confettiId); confettiId = null; }
    var ctx = confettiCanvas.getContext("2d");
    ctx && ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }

  /* ---------- 事件 ---------- */
  btnRestart.addEventListener("click", resetGame);
  btnPlayAgain.addEventListener("click", resetGame);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalOverlay.hidden) resetGame();
  });

  /* 開局 */
  buildBoard();
})();
