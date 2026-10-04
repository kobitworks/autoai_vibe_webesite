(() => {
  "use strict";

  const INITIAL = Object.freeze({
    turn: 1,
    maxTurns: 7,
    money: 100,
    trust: 50,
    progress: 0,
    energy: 100,
    finished: false
  });

  const ACTIONS = Object.freeze({
    sales: {
      label: "営業",
      apply(s) {
        s.money += 25;
        s.trust += 8;
        s.energy -= 15;
        return "新規商談を獲得。資金と信頼が上昇しました。";
      }
    },
    develop: {
      label: "開発",
      apply(s) {
        s.progress += 25;
        s.energy -= 22;
        return "集中開発を実施。プロジェクトを25%前進させました。";
      }
    },
    promote: {
      label: "広報",
      apply(s) {
        s.money -= 10;
        s.trust += 14;
        s.energy -= 8;
        return "広報キャンペーンを実施。認知が広がり信頼が上昇しました。";
      }
    },
    rest: {
      label: "休息",
      apply(s) {
        s.energy += 28;
        return "チームを休ませました。体力を回復しました。";
      }
    }
  });

  const state = { ...INITIAL };
  const logEntries = [];

  const $ = (id) => document.getElementById(id);
  const els = {
    turnValue: $("turnValue"),
    turnRemain: $("turnRemain"),
    moneyValue: $("moneyValue"),
    trustValue: $("trustValue"),
    progressValue: $("progressValue"),
    energyValue: $("energyValue"),
    missionPercent: $("missionPercent"),
    missionBar: $("missionBar"),
    missionFill: $("missionFill"),
    moneyGauge: $("moneyGauge"),
    trustGauge: $("trustGauge"),
    progressGauge: $("progressGauge"),
    energyGauge: $("energyGauge"),
    moneyGaugeText: $("moneyGaugeText"),
    trustGaugeText: $("trustGaugeText"),
    progressGaugeText: $("progressGaugeText"),
    energyGaugeText: $("energyGaugeText"),
    tacticalText: $("tacticalText"),
    phaseBadge: $("phaseBadge"),
    eventLog: $("eventLog"),
    resetButton: $("resetButton"),
    resultOverlay: $("resultOverlay"),
    resultResetButton: $("resultResetButton"),
    resultMark: $("resultMark"),
    resultTitle: $("resultTitle"),
    resultMessage: $("resultMessage"),
    resultMoney: $("resultMoney"),
    resultTrust: $("resultTrust"),
    resultProgress: $("resultProgress"),
    resultEnergy: $("resultEnergy")
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function normalizeState() {
    state.money = Math.max(-99, Math.round(state.money));
    state.trust = clamp(Math.round(state.trust), 0, 100);
    state.progress = clamp(Math.round(state.progress), 0, 125);
    state.energy = clamp(Math.round(state.energy), 0, 100);
  }

  function renderGauge(element, value, max) {
    element.style.width = clamp((value / max) * 100, 0, 100) + "%";
  }

  function tacticalNote() {
    if (state.progress >= 100) return "開発は完成済み。残りターンは経営指標を整える自由行動です。";
    if (state.energy <= 25) return "体力が低下中。休息で立て直すと、次の開発判断がしやすくなります。";
    const actionsLeft = state.maxTurns - state.turn + 1;
    const devActionsNeeded = Math.ceil((100 - state.progress) / 25);
    if (devActionsNeeded >= actionsLeft) return "開発完了には残りの多くを開発へ投入する必要があります。";
    if (state.money < 30) return "資金が少なめです。営業で余力を作る選択もあります。";
    return "開発を軸に、営業・広報・休息をどう挟むかが7ターンの配分ポイントです。";
  }

  function render() {
    const visibleProgress = clamp(state.progress, 0, 100);
    const actionsLeft = state.finished ? 0 : state.maxTurns - state.turn + 1;

    els.turnValue.textContent = state.turn + " / " + state.maxTurns;
    els.turnRemain.textContent = String(actionsLeft);
    els.moneyValue.textContent = String(state.money);
    els.trustValue.textContent = String(state.trust);
    els.progressValue.textContent = String(visibleProgress);
    els.energyValue.textContent = String(state.energy);

    els.missionPercent.textContent = visibleProgress + "%";
    els.missionFill.style.width = visibleProgress + "%";
    els.missionBar.setAttribute("aria-valuenow", String(visibleProgress));

    els.moneyGaugeText.textContent = state.money + "万円";
    els.trustGaugeText.textContent = String(state.trust);
    els.progressGaugeText.textContent = visibleProgress + "%";
    els.energyGaugeText.textContent = state.energy + "%";

    renderGauge(els.moneyGauge, Math.max(state.money, 0), 200);
    renderGauge(els.trustGauge, state.trust, 100);
    renderGauge(els.progressGauge, visibleProgress, 100);
    renderGauge(els.energyGauge, state.energy, 100);

    els.tacticalText.textContent = tacticalNote();
    els.phaseBadge.textContent = state.finished ? "RESULT" : "TURN " + state.turn;

    document.querySelectorAll(".command").forEach((button) => {
      button.disabled = state.finished;
    });

    renderLog();
  }

  function renderLog() {
    els.eventLog.replaceChildren();
    const source = logEntries.length
      ? logEntries.slice(0, 5)
      : [{ turn: "START", text: "スタジオ運営を開始しました。開発進捗100%がクリア条件です。" }];

    source.forEach((entry) => {
      const li = document.createElement("li");
      const badge = document.createElement("span");
      const text = document.createElement("p");
      badge.className = "log-turn";
      badge.textContent = entry.turn;
      text.textContent = entry.text;
      li.append(badge, text);
      els.eventLog.append(li);
    });
  }

  function popMetrics(before) {
    const changed = [];
    if (before.money !== state.money) changed.push("money");
    if (before.trust !== state.trust) changed.push("trust");
    if (before.progress !== state.progress) changed.push("progress");
    if (before.energy !== state.energy) changed.push("energy");

    changed.forEach((metric) => {
      const card = document.querySelector('[data-metric="' + metric + '"]');
      if (!card) return;
      card.classList.remove("metric-pop");
      void card.offsetWidth;
      card.classList.add("metric-pop");
    });
  }

  function addLog(turn, text) {
    logEntries.unshift({ turn: "TURN " + turn, text });
    if (logEntries.length > 5) logEntries.length = 5;
  }

  function play(actionName) {
    if (state.finished) return;
    const action = ACTIONS[actionName];
    if (!action) return;

    const actionTurn = state.turn;
    const before = { ...state };
    const detail = action.apply(state);
    normalizeState();
    addLog(actionTurn, action.label + "： " + detail);

    if (actionTurn >= state.maxTurns) {
      state.finished = true;
    } else {
      state.turn += 1;
    }

    render();
    popMetrics(before);

    if (state.finished) {
      window.setTimeout(showResult, 220);
    }
  }

  function showResult() {
    const clear = state.progress >= 100;
    const card = els.resultOverlay.querySelector(".result-card");
    card.classList.toggle("fail", !clear);
    els.resultMark.textContent = clear ? "CLEAR" : "TRY AGAIN";
    els.resultTitle.textContent = clear ? "プロジェクト完成！" : "完成まであと一歩。";
    els.resultMessage.textContent = clear
      ? "7ターンの意思決定で開発進捗100%を達成しました。配分を変えて、別の経営結果も試せます。"
      : "開発進捗は" + clamp(state.progress, 0, 100) + "%でした。行動配分を変えて、100%完成を目指してください。";
    els.resultMoney.textContent = state.money + "万円";
    els.resultTrust.textContent = String(state.trust);
    els.resultProgress.textContent = clamp(state.progress, 0, 100) + "%";
    els.resultEnergy.textContent = state.energy + "%";
    els.resultOverlay.hidden = false;
    els.resultResetButton.focus();
  }

  function reset() {
    Object.assign(state, INITIAL);
    logEntries.length = 0;
    els.resultOverlay.hidden = true;
    render();
    document.querySelector(".command")?.focus();
  }

  document.querySelectorAll(".command").forEach((button) => {
    button.addEventListener("click", () => play(button.dataset.action));
  });

  els.resetButton.addEventListener("click", reset);
  els.resultResetButton.addEventListener("click", reset);

  els.resultOverlay.addEventListener("click", (event) => {
    if (event.target === els.resultOverlay) reset();
  });

  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const keyMap = { "1": "sales", "2": "develop", "3": "promote", "4": "rest" };
    if (keyMap[event.key] && !state.finished) {
      play(keyMap[event.key]);
    }
    if (event.key === "Escape" && !els.resultOverlay.hidden) {
      reset();
    }
  });

  render();
})();
