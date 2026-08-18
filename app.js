// ============================================================
// ROOT — app logic
// ============================================================

const STORAGE_KEY = 'root_state_v2';

// Overly-cautious gating: a level isn't "mastered" on one good quiz.
// It requires PASS_THRESHOLD or higher across REQUIRED_PASSES separate
// attempts, spaced out (not back-to-back retries of the same session),
// before the next level unlocks.
const PASS_THRESHOLD = 0.9;
const REQUIRED_PASSES = 3;

function defaultLangState(langId) {
  return {
    region: REGIONS[langId][0].id,
    currentLevel: 'a1',
    currentUnitIndex: 0,
    unitProgress: {}, // unitId -> { attempts: [scoreFloat, ...], mastered: bool }
    levelUnlocked: { a1: true, a2: false, b1: false, b2: false, c1: false, c2: false },
    recall: {}, // wordKey -> { box: 1-5, dueDate: ISOdateString, lastReviewed: ISOdateString|null }
  };
}

function defaultState() {
  const languages = {};
  LANGUAGES.forEach(l => { languages[l.id] = defaultLangState(l.id); });
  return {
    selectedLanguage: null,
    xray: false,
    languages,
  };
}

let state = loadState();
let quizState = null; // transient, not persisted mid-quiz

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const merged = defaultState();
      merged.selectedLanguage = parsed.selectedLanguage ?? null;
      merged.xray = parsed.xray ?? false;
      LANGUAGES.forEach(l => {
        if (parsed.languages && parsed.languages[l.id]) {
          merged.languages[l.id] = { ...defaultLangState(l.id), ...parsed.languages[l.id] };
        }
      });
      return merged;
    }
  } catch (e) { console.warn('state load failed', e); }
  return defaultState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function lang() {
  return state.selectedLanguage;
}
function langState() {
  return state.languages[state.selectedLanguage];
}
function langMeta() {
  return LANGUAGES.find(l => l.id === state.selectedLanguage);
}

// ===== theming =====
function applyTheme(langId) {
  const meta = LANGUAGES.find(l => l.id === langId);
  if (!meta) return;
  Object.entries(meta.theme).forEach(([k, v]) => {
    document.documentElement.style.setProperty(k, v);
  });
}

// ===== navigation =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.nav === id));
  document.getElementById('bottomNav').style.display = state.selectedLanguage ? 'flex' : 'none';
  const chipScreens = ['home', 'lesson', 'quiz', 'result', 'progress'];
  document.getElementById('levelChip').style.display = (state.selectedLanguage && chipScreens.includes(id)) ? 'block' : 'none';
  window.scrollTo(0, 0);
}

document.addEventListener('click', (e) => {
  const navEl = e.target.closest('[data-nav]');
  if (!navEl) return;
  const target = navEl.dataset.nav;
  if (target === 'language') { renderLanguageList(); showScreen('language'); }
  else if (target === 'home') { if (state.selectedLanguage) { renderHome(); showScreen('home'); } }
  else if (target === 'progress') { renderProgress(); showScreen('progress'); }
  else if (target === 'recall') { renderRecallIntro(); showScreen('recall'); }
  else if (target === 'settings') { renderSettings(); showScreen('settings'); }
  else if (target === 'lesson-back') { showScreen('lesson'); }
});

// ===== language select screen =====
function renderLanguageList() {
  const list = document.getElementById('langList');
  list.innerHTML = LANGUAGES.map(l => {
    const ls = state.languages[l.id];
    const units = (UNITS_BY_LANG[l.id] && UNITS_BY_LANG[l.id][ls.currentLevel]) || [];
    const masteredCount = units.filter(u => ls.unitProgress[u.id]?.mastered && !u.placeholder).length;
    const hasContent = Object.values(UNITS_BY_LANG[l.id]).some(arr => arr.some(u => !u.placeholder));
    const progressLabel = hasContent
      ? `${CEFR_LEVELS.find(c => c.id === ls.currentLevel).name} · ${masteredCount}/${units.length} units`
      : 'Content coming soon';
    return `
      <div class="lang-card" data-lang="${l.id}">
        <div class="flag">${l.flag}</div>
        <div class="lang-names">
          <div class="lang-name">${l.name}</div>
          <div class="lang-endonym">${l.endonym} · ${l.heroNote}</div>
        </div>
        <div class="lang-progress">${progressLabel}</div>
      </div>
    `;
  }).join('');

  list.querySelectorAll('.lang-card').forEach(card => {
    card.addEventListener('click', () => {
      const langId = card.dataset.lang;
      state.selectedLanguage = langId;
      saveState();
      applyTheme(langId);
      renderHome();
      showScreen('home');
    });
  });
}

// ===== region row =====
function renderRegionRow() {
  const row = document.getElementById('regionRow');
  const regions = REGIONS[lang()];
  row.innerHTML = regions.map(r => `
    <button class="region-pill ${langState().region === r.id ? 'active' : ''}" data-region="${r.id}">
      ${r.flag} ${r.label}
    </button>
  `).join('');
  row.querySelectorAll('.region-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      langState().region = btn.dataset.region;
      saveState();
      renderRegionRow();
      renderHome();
    });
  });
}

// ===== level chip =====
function renderLevelChip() {
  if (!lang()) return;
  const ls = langState();
  const level = CEFR_LEVELS.find(l => l.id === ls.currentLevel);
  const units = (UNITS_BY_LANG[lang()][ls.currentLevel]) || [];
  const masteredCount = units.filter(u => ls.unitProgress[u.id]?.mastered).length;
  const pct = units.length ? Math.round((masteredCount / units.length) * 100) : 0;
  document.getElementById('levelChip').textContent = `${langMeta().flag} ${level.name} · ${pct}%`;
}

// ===== home / cefr track =====
function renderHome() {
  renderRegionRow();
  renderLevelChip();
  const ls = langState();
  const track = document.getElementById('cefrTrack');
  track.innerHTML = CEFR_LEVELS.map((lvl) => {
    const unlocked = ls.levelUnlocked[lvl.id];
    const units = UNITS_BY_LANG[lang()][lvl.id] || [];
    const masteredCount = units.filter(u => ls.unitProgress[u.id]?.mastered).length;
    const isCurrent = lvl.id === ls.currentLevel;
    const isFullyMastered = units.length > 0 && masteredCount === units.length && !units[0]?.placeholder;
    let cls = 'cefr-node';
    if (!unlocked) cls += ' locked';
    else if (isFullyMastered) cls += ' mastered';
    else if (isCurrent) cls += ' current';

    let status;
    if (!unlocked) status = 'Locked';
    else if (units.length === 0) status = 'Content coming soon';
    else if (units[0]?.placeholder) status = 'Content coming soon';
    else if (isFullyMastered) status = 'Mastered';
    else status = `${masteredCount}/${units.length} units`;

    return `
      <div class="${cls}" data-level="${lvl.id}">
        <div class="cefr-badge">${lvl.name}</div>
        <div class="cefr-info">
          <div class="cefr-name">${lvl.name} — ${lvl.desc.split('—')[0].trim()}</div>
          <div class="cefr-desc">${lvl.desc}</div>
        </div>
        <div class="cefr-status">${status}</div>
      </div>
    `;
  }).join('');

  track.querySelectorAll('.cefr-node').forEach(node => {
    node.addEventListener('click', () => {
      const levelId = node.dataset.level;
      if (!ls.levelUnlocked[levelId]) return;
      const units = UNITS_BY_LANG[lang()][levelId];
      if (!units || units.length === 0) return;
      ls.currentLevel = levelId;
      const nextUnit = units.find(u => !ls.unitProgress[u.id]?.mastered) || units[0];
      ls.currentUnitIndex = units.indexOf(nextUnit);
      saveState();
      openLesson();
    });
  });
}

// ===== lesson rendering =====
function currentUnit() {
  const ls = langState();
  return UNITS_BY_LANG[lang()][ls.currentLevel][ls.currentUnitIndex];
}

function openLesson() {
  const unit = currentUnit();
  const ls = langState();
  document.getElementById('lessonUnitLabel').textContent = `${CEFR_LEVELS.find(l=>l.id===ls.currentLevel).name} · Unit ${ls.currentUnitIndex + 1}`;
  document.getElementById('lessonTitle').textContent = unit.title;
  document.getElementById('lessonSub').textContent = unit.sub;
  renderSentenceCards(unit);
  renderVocabStrip(unit);
  const xraySwitch = document.getElementById('xraySwitch');
  xraySwitch.classList.toggle('on', state.xray);
  const continueBtn = document.getElementById('lessonContinueBtn');
  continueBtn.style.display = unit.placeholder ? 'none' : 'block';
  showScreen('lesson');
}

document.getElementById('xraySwitch').addEventListener('click', () => {
  state.xray = !state.xray;
  saveState();
  document.getElementById('xraySwitch').classList.toggle('on', state.xray);
  document.querySelectorAll('.sentence-de').forEach(el => el.classList.toggle('xray-on', state.xray));
});

function renderSentenceCards(unit) {
  const container = document.getElementById('sentenceCards');
  const ls = langState();

  if (unit.placeholder) {
    container.innerHTML = `<div class="why-block"><strong>Not written yet</strong>This language's theme, path, and region selector are live — lesson content for this unit hasn't been authored yet. Come back after the German A1 content pattern gets extended here.</div>`;
    return;
  }

  let html = '';

  if (unit.grammarWhy) {
    html += `<div class="why-block"><strong>The why</strong>${unit.grammarWhy.headline}<br><br>${unit.grammarWhy.body}</div>`;
  }
  if (unit.conjugationTable) {
    const t = unit.conjugationTable;
    html += `<div class="section-eyebrow">${t.title}</div>`;
    html += `<table class="decl-table"><tbody>`;
    t.rows.forEach(row => {
      html += `<tr>${row.map((c,i) => `<td class="${i===1?'hi':''}">${c}</td>`).join('')}</tr>`;
    });
    html += `</tbody></table>`;
  }

  html += `<div class="section-eyebrow">In context</div>`;

  unit.sentences.forEach((s, si) => {
    html += `<div class="sentence-card">`;
    html += `<div class="sentence-de ${state.xray ? 'xray-on' : ''}">`;
    s.de.forEach((w, wi) => {
      const cleanWord = w.text.replace(/[.,?]$/, '');
      const isNoted = w.why || (s.wordNotes && s.wordNotes[cleanWord]);
      html += `<span class="word ${w.caseMarked ? 'case-marked' : ''}" data-sentence="${si}" data-word="${wi}" ${isNoted ? 'data-noted="1"' : ''}>${w.text}</span>`;
      if (w.tag) html += `<span class="xray-tag mono"> [${w.tag}]</span>`;
      html += ' ';
    });
    html += `</div>`;
    html += `<div class="sentence-en">${s.en}</div>`;
    if (s.context) html += `<div class="sentence-context">${s.context}</div>`;
    html += `<div class="word-detail" id="wordDetail-${si}"></div>`;
    html += `
      <div class="speech-row">
        <button class="speech-btn" data-play-sentence="${si}">
          <span class="icon">🔊</span><span class="label">Hear it</span>
        </button>
        <button class="speech-btn" data-record-sentence="${si}">
          <span class="icon">🎙️</span><span class="label">Record me</span>
        </button>
        <button class="speech-btn" data-playmine-sentence="${si}" style="display:none;">
          <span class="icon">▶</span><span class="label">Hear mine</span>
        </button>
      </div>
    `;
    if (s.regionNotes && s.regionNotes[ls.region]) {
      const regionLabel = REGIONS[lang()].find(r => r.id === ls.region).label;
      html += `<div class="region-note"><span class="rn-label">${regionLabel} usage</span><br>${s.regionNotes[ls.region]}</div>`;
    }
    html += `</div>`;
  });

  container.innerHTML = html;

  container.querySelectorAll('.word').forEach(wordEl => {
    wordEl.addEventListener('click', () => {
      const si = wordEl.dataset.sentence, wi = wordEl.dataset.word;
      const s = unit.sentences[si];
      const w = s.de[wi];
      const cleanWord = w.text.replace(/[.,?]$/, '');
      const noteObj = s.wordNotes && s.wordNotes[cleanWord];
      const detailEl = document.getElementById(`wordDetail-${si}`);
      if (!w.why && !noteObj) { detailEl.innerHTML = ''; return; }
      let html = `<div class="word-popover"><span class="wp-word">${cleanWord}</span>`;
      html += `<button class="wp-play-btn" data-word-play="${cleanWord.replace(/"/g, '&quot;')}">🔊 hear</button>`;
      if (noteObj) html += `<span class="wp-tag">${noteObj.pos}</span>`;
      html += `<br>`;
      if (w.why) html += w.why + ' ';
      if (noteObj) html += noteObj.note;
      html += `</div>`;
      const isSame = detailEl.dataset.forWord === cleanWord && detailEl.innerHTML !== '';
      detailEl.innerHTML = isSame ? '' : html;
      detailEl.dataset.forWord = isSame ? '' : cleanWord;
      const playBtn = detailEl.querySelector('[data-word-play]');
      if (playBtn) {
        playBtn.addEventListener('click', () => playWordAudio(lang(), ls.region, playBtn.dataset.wordPlay, playBtn));
      }
    });
  });

  container.querySelectorAll('[data-play-sentence]').forEach(btn => {
    const si = parseInt(btn.dataset.playSentence, 10);
    btn.addEventListener('click', () => playNativeAudio(btn, unit.id, si));
  });
  container.querySelectorAll('[data-record-sentence]').forEach(btn => {
    const si = parseInt(btn.dataset.recordSentence, 10);
    const playMineBtn = container.querySelector(`[data-playmine-sentence="${si}"]`);
    btn.addEventListener('click', () => toggleRecording(btn, playMineBtn, unit.id, si));
  });
  container.querySelectorAll('[data-playmine-sentence]').forEach(btn => {
    const si = parseInt(btn.dataset.playmineSentence, 10);
    btn.addEventListener('click', () => playMyRecording(unit.id, si));
    // Restore visibility if a recording already exists from earlier in this session
    if (recordings[sentenceKey(unit.id, si)]) btn.style.display = 'inline-flex';
  });
}

function renderVocabStrip(unit) {
  const strip = document.getElementById('vocabStrip');
  if (unit.placeholder) { strip.innerHTML = ''; return; }
  strip.innerHTML = unit.vocab.map((v, i) => `
    <div class="vocab-chip" data-vocab-index="${i}">
      <span class="vc-play">🔊</span>
      <div class="vc-de">${v.de}</div>
      <div class="vc-en">${v.en}</div>
      <div class="vc-tag mono">${v.tag}</div>
    </div>
  `).join('');
  const ls = langState();
  strip.querySelectorAll('[data-vocab-index]').forEach(chip => {
    const v = unit.vocab[parseInt(chip.dataset.vocabIndex, 10)];
    chip.addEventListener('click', () => {
      const path = wordAudioPath(lang(), ls.region, v.de);
      const audio = new Audio(path);
      audio.addEventListener('error', () => {
        chip.classList.add('unavailable-flash');
        setTimeout(() => chip.classList.remove('unavailable-flash'), 400);
      });
      audio.play().catch(() => {
        chip.classList.add('unavailable-flash');
        setTimeout(() => chip.classList.remove('unavailable-flash'), 400);
      });
    });
  });
}

document.getElementById('lessonContinueBtn').addEventListener('click', () => {
  startQuiz(currentUnit());
});

// ===== quiz engine =====
function startQuiz(unit) {
  const questions = generateQuizForUnit(unit);
  quizState = { unit, questions, index: 0, answers: [], missed: [] };
  document.getElementById('quizKind').textContent = 'Check-in — ' + unit.title.split('—')[0].trim();
  renderQuizProgress();
  renderQuizQuestion();
  showScreen('quiz');
}

function renderQuizProgress() {
  const bar = document.getElementById('quizProgress');
  bar.innerHTML = quizState.questions.map((_, i) =>
    `<div class="quiz-progress-seg ${i < quizState.index ? 'done' : ''}"></div>`
  ).join('');
}

function renderQuizQuestion() {
  const q = quizState.questions[quizState.index];
  const body = document.getElementById('quizBody');
  body.innerHTML = `
    <div class="quiz-q">${q.prompt}</div>
    <div class="quiz-why-preview mono">${q.englishGloss}</div>
    <div class="quiz-options">
      ${q.options.map(o => `<div class="quiz-opt" data-opt="${o}">${o}</div>`).join('')}
    </div>
    <div class="quiz-feedback" id="quizFeedback"></div>
    <button class="btn btn-primary" id="quizNextBtn" style="display:none;">Next</button>
  `;
  body.querySelectorAll('.quiz-opt').forEach(optEl => {
    optEl.addEventListener('click', () => {
      if (body.querySelector('.quiz-opt.selected')) return; // already answered
      const chosen = optEl.dataset.opt;
      const correct = chosen === q.correct;
      body.querySelectorAll('.quiz-opt').forEach(el => {
        el.classList.add('selected');
        if (el.dataset.opt === q.correct) el.classList.add('correct');
        else if (el === optEl) el.classList.add('incorrect');
      });
      quizState.answers.push(correct);
      if (!correct) quizState.missed.push(q);
      const fb = document.getElementById('quizFeedback');
      fb.classList.add('show');
      fb.innerHTML = correct
        ? `<strong>Right.</strong> ${q.why}`
        : `<strong>Not quite — here's why "${q.correct}" is correct:</strong><br>${q.why}`;
      document.getElementById('quizNextBtn').style.display = 'block';
    });
  });
  document.getElementById('quizNextBtn')?.addEventListener('click', () => {
    quizState.index++;
    if (quizState.index >= quizState.questions.length) {
      finishQuiz();
    } else {
      renderQuizProgress();
      renderQuizQuestion();
    }
  });
}

function finishQuiz() {
  const score = quizState.answers.length ? quizState.answers.filter(Boolean).length / quizState.answers.length : 0;
  const unit = quizState.unit;
  const ls = langState();
  if (!ls.unitProgress[unit.id]) ls.unitProgress[unit.id] = { attempts: [], mastered: false };
  ls.unitProgress[unit.id].attempts.push(score);

  const attempts = ls.unitProgress[unit.id].attempts;
  const recentPasses = attempts.slice(-REQUIRED_PASSES).filter(s => s >= PASS_THRESHOLD).length;
  const justMastered = recentPasses >= REQUIRED_PASSES && !ls.unitProgress[unit.id].mastered;
  if (recentPasses >= REQUIRED_PASSES) ls.unitProgress[unit.id].mastered = true;

  checkLevelUnlocks();
  saveState();
  renderResult(score, justMastered);
}

function checkLevelUnlocks() {
  const ls = langState();
  const levelOrder = CEFR_LEVELS.map(l => l.id);
  levelOrder.forEach((lvl, i) => {
    const units = UNITS_BY_LANG[lang()][lvl];
    if (units && units.length > 0 && units.every(u => ls.unitProgress[u.id]?.mastered)) {
      const next = levelOrder[i + 1];
      if (next) ls.levelUnlocked[next] = true;
    }
  });
}

function renderResult(score, justMastered) {
  const pct = Math.round(score * 100);
  document.getElementById('resultNum').textContent = pct + '%';
  const unit = quizState.unit;
  const ls = langState();
  const progress = ls.unitProgress[unit.id];
  const passesSoFar = progress.attempts.filter(s => s >= PASS_THRESHOLD).length;

  let verdictHtml = '';
  if (score >= PASS_THRESHOLD) {
    if (progress.mastered) {
      verdictHtml = `<div class="test-out-banner"><strong>Unit mastered.</strong>You've now passed ${PASS_THRESHOLD*100}%+ on ${REQUIRED_PASSES} separate check-ins for this unit. That's the bar — one lucky quiz doesn't count as fluency. Next unit unlocked.</div>`;
    } else {
      verdictHtml = `<div class="test-out-banner"><strong>Good pass — but not mastered yet.</strong>You're at ${passesSoFar}/${REQUIRED_PASSES} qualifying passes. Root deliberately requires ${REQUIRED_PASSES} strong, separate attempts before calling a unit mastered — come back to this unit again later (not back-to-back) for it to count fully.</div>`;
    }
  } else {
    verdictHtml = `<div class="test-out-banner"><strong>Below the ${PASS_THRESHOLD*100}% bar.</strong>That's fine — this resets the streak toward mastery. Review the missed items below, revisit the lesson, and try again.</div>`;
  }
  document.getElementById('resultVerdict').innerHTML = verdictHtml;

  const missedList = document.getElementById('missedList');
  if (quizState.missed.length) {
    missedList.innerHTML = `<div class="section-eyebrow">Review these</div>` + quizState.missed.map(q =>
      `<div class="missed-item"><strong>${q.correct}</strong> — ${q.why}</div>`
    ).join('');
  } else {
    missedList.innerHTML = '';
  }

  showScreen('result');
}

document.getElementById('resultContinueBtn').addEventListener('click', () => {
  renderHome();
  showScreen('home');
});

// ===== progress screen =====
function renderProgress() {
  const body = document.getElementById('progressBody');
  const ls = langState();
  let html = '';
  CEFR_LEVELS.forEach(lvl => {
    const units = UNITS_BY_LANG[lang()][lvl.id] || [];
    if (units.length === 0 || units[0]?.placeholder) return;
    html += `<div class="section-eyebrow">${lvl.name}</div>`;
    units.forEach(u => {
      const p = ls.unitProgress[u.id];
      const attempts = p?.attempts || [];
      const lastScore = attempts.length ? Math.round(attempts[attempts.length-1]*100) + '%' : '—';
      const passCount = attempts.filter(s => s >= PASS_THRESHOLD).length;
      html += `
        <div class="cefr-node ${p?.mastered ? 'mastered' : ''}" style="cursor:default;">
          <div class="cefr-badge" style="font-size:14px;">${lastScore}</div>
          <div class="cefr-info">
            <div class="cefr-name">${u.title.split('—')[0].trim()}</div>
            <div class="cefr-desc">${attempts.length} attempt${attempts.length===1?'':'s'} · ${passCount}/${REQUIRED_PASSES} passes toward mastery</div>
          </div>
        </div>
      `;
    });
  });
  if (!html) html = `<p class="page-sub">Complete your first check-in in this language to see progress here.</p>`;
  body.innerHTML = html;
}

// ===== active recall: spaced repetition =====
// Simple 5-box Leitner system: miss a card and it drops back to box 1;
// get it right and it moves up a box, spacing reviews further apart.
// This is deliberately simpler than SM-2/Anki's ease-factor math — the
// goal is a review habit that's easy to reason about, not maximal
// scheduling efficiency.
const LEITNER_INTERVALS_DAYS = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };
let recallSession = null;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function addDaysISO(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function getDueRecallCards(langId) {
  const ls = state.languages[langId];
  const deck = collectRecallDeck(langId);
  const today = todayISO();
  return deck.filter(card => {
    const r = ls.recall[card.key];
    if (!r) return true; // never reviewed — due immediately
    return r.dueDate <= today;
  });
}

function recallBoxDistribution(langId) {
  const ls = state.languages[langId];
  const deck = collectRecallDeck(langId);
  const dist = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }; // 0 = never reviewed
  deck.forEach(card => {
    const r = ls.recall[card.key];
    dist[r ? r.box : 0]++;
  });
  return dist;
}

function renderRecallIntro() {
  if (!lang()) return;
  const introEl = document.getElementById('recallIntro');
  const sessionEl = document.getElementById('recallSession');
  sessionEl.style.display = 'none';
  introEl.style.display = 'block';

  const due = getDueRecallCards(lang());
  const dist = recallBoxDistribution(lang());
  const deckSize = collectRecallDeck(lang()).length;
  const maxBar = Math.max(1, ...Object.values(dist));

  let html = `
    <div class="recall-summary-card">
      <div class="num">${due.length}</div>
      <div class="label">due for review</div>
    </div>
  `;

  if (due.length > 0) {
    html += `<button class="btn btn-primary" id="startRecallBtn">Start review (${due.length} card${due.length === 1 ? '' : 's'})</button>`;
  } else {
    html += `<p class="page-sub">All caught up. New cards appear here as you complete unit check-ins; reviewed cards come back on their own schedule.</p>`;
  }

  html += `<div class="section-eyebrow" style="margin-top:24px;">Deck breakdown — ${deckSize} words total</div>`;
  html += `<div class="recall-box-bars">`;
  [0, 1, 2, 3, 4, 5].forEach(box => {
    const count = dist[box];
    const heightPx = Math.round((count / maxBar) * 60) + 4;
    const label = box === 0 ? 'New' : `Box ${box}`;
    html += `
      <div class="recall-box-bar">
        <div class="bar-fill" style="height:${heightPx}px;"></div>
        <div class="bar-label">${label}<br>${count}</div>
      </div>
    `;
  });
  html += `</div>`;
  html += `<p class="settings-note" style="margin-top:14px;">Box 1 reviews come back tomorrow; box 5 comes back after 16 days. Get a card right and it moves up a box; miss it and it resets to box 1.</p>`;

  introEl.innerHTML = html;
  const startBtn = document.getElementById('startRecallBtn');
  if (startBtn) startBtn.addEventListener('click', startRecallSession);
}

function startRecallSession() {
  const due = getDueRecallCards(lang());
  recallSession = { cards: shuffle(due), index: 0, correct: 0 };
  document.getElementById('recallIntro').style.display = 'none';
  document.getElementById('recallSession').style.display = 'block';
  renderRecallCard();
}

function renderRecallCard() {
  const sessionEl = document.getElementById('recallSession');
  if (recallSession.index >= recallSession.cards.length) {
    sessionEl.innerHTML = `
      <div class="recall-summary-card">
        <div class="num">${recallSession.correct}/${recallSession.cards.length}</div>
        <div class="label">recalled correctly</div>
      </div>
      <button class="btn btn-primary" id="recallDoneBtn">Done</button>
    `;
    document.getElementById('recallDoneBtn').addEventListener('click', () => {
      recallSession = null;
      renderRecallIntro();
    });
    return;
  }

  const card = recallSession.cards[recallSession.index];
  const ls = langState();
  sessionEl.innerHTML = `
    <div class="recall-progress-row">Card ${recallSession.index + 1} of ${recallSession.cards.length}</div>
    <div class="flashcard" id="flashcardEl">
      <div class="fc-word">${card.de}</div>
      <div class="fc-hear">🔊 tap word to hear it</div>
      <div class="fc-answer">
        <div class="fc-en">${card.en}</div>
        <div class="fc-tag">${card.tag}</div>
      </div>
      <div class="fc-tap-hint" id="revealHint">Tap card to reveal</div>
    </div>
    <div class="recall-rate-row" id="rateRow" style="display:none;">
      <button class="recall-rate-btn again" id="rateAgainBtn">Still learning</button>
      <button class="recall-rate-btn good" id="rateGoodBtn">Got it</button>
    </div>
  `;

  const cardEl = document.getElementById('flashcardEl');
  cardEl.addEventListener('click', () => {
    if (!cardEl.classList.contains('revealed')) {
      cardEl.classList.add('revealed');
      document.getElementById('revealHint').style.display = 'none';
      document.getElementById('rateRow').style.display = 'flex';
    }
    playWordAudio(lang(), ls.region, card.de, null);
  });

  document.getElementById('rateAgainBtn').addEventListener('click', () => rateRecallCard(card, false));
  document.getElementById('rateGoodBtn').addEventListener('click', () => rateRecallCard(card, true));
}

function rateRecallCard(card, gotItRight) {
  const ls = langState();
  const existing = ls.recall[card.key];
  const currentBox = existing ? existing.box : 0;
  const newBox = gotItRight ? Math.min(5, currentBox + 1) : 1;
  const today = todayISO();
  ls.recall[card.key] = {
    box: newBox,
    dueDate: addDaysISO(today, LEITNER_INTERVALS_DAYS[newBox]),
    lastReviewed: today,
  };
  if (gotItRight) recallSession.correct++;
  saveState();
  recallSession.index++;
  renderRecallCard();
}

// ===== settings: backup / restore / reset =====
function renderSettings() {
  const list = document.getElementById('resetLangList');
  list.innerHTML = LANGUAGES.map(l => {
    const ls = state.languages[l.id];
    const attemptCount = Object.values(ls.unitProgress).reduce((sum, p) => sum + (p.attempts?.length || 0), 0);
    return `
      <div class="settings-row">
        <div>
          <div class="settings-row-label">${l.flag} ${l.name}</div>
          <div class="settings-row-sub">${attemptCount} check-in${attemptCount === 1 ? '' : 's'} recorded</div>
        </div>
        <button class="btn-sm danger" data-reset-lang="${l.id}">Reset</button>
      </div>
    `;
  }).join('');

  list.querySelectorAll('[data-reset-lang]').forEach(btn => {
    btn.addEventListener('click', () => armConfirm(btn, () => {
      const langId = btn.dataset.resetLang;
      state.languages[langId] = defaultLangState(langId);
      if (state.selectedLanguage === langId) {
        // nothing else to do — home screen will re-render fresh next visit
      }
      saveState();
      renderSettings();
      btn.textContent = 'Done';
      setTimeout(() => renderSettings(), 700);
    }));
  });

  document.getElementById('importStatus').textContent = '';
}

// Two-tap confirm: first click arms a 4s danger window, second click within
// that window fires the callback. Prevents accidental data loss from a
// single mis-tap without needing a modal dialog.
function armConfirm(btn, onConfirm) {
  if (btn.dataset.armed === '1') {
    clearTimeout(btn._confirmTimeout);
    onConfirm();
    return;
  }
  btn.dataset.armed = '1';
  btn.classList.add('confirming');
  const originalText = btn.textContent;
  btn.textContent = 'Tap to confirm';
  btn._confirmTimeout = setTimeout(() => {
    btn.dataset.armed = '0';
    btn.classList.remove('confirming');
    btn.textContent = originalText;
  }, 4000);
}

function exportBackup() {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: 'root',
    version: 2,
    state,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `root-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importBackupFile(file) {
  const statusEl = document.getElementById('importStatus');
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const incoming = parsed.state || parsed; // tolerate a raw state object too
      if (!incoming || typeof incoming !== 'object' || !incoming.languages) {
        throw new Error('This file doesn\'t look like a Root backup.');
      }
      const merged = defaultState();
      merged.selectedLanguage = incoming.selectedLanguage ?? state.selectedLanguage;
      merged.xray = incoming.xray ?? state.xray;
      LANGUAGES.forEach(l => {
        if (incoming.languages[l.id]) {
          merged.languages[l.id] = { ...defaultLangState(l.id), ...incoming.languages[l.id] };
        }
      });
      state = merged;
      saveState();
      if (state.selectedLanguage) applyTheme(state.selectedLanguage);
      statusEl.textContent = 'Backup restored successfully.';
      statusEl.style.color = 'var(--green-ok)';
      renderSettings();
    } catch (err) {
      statusEl.textContent = 'Could not read that file: ' + err.message;
      statusEl.style.color = 'var(--case-red)';
    }
  };
  reader.readAsText(file);
}

document.getElementById('exportBtn').addEventListener('click', exportBackup);
document.getElementById('importBtn').addEventListener('click', () => {
  document.getElementById('importFileInput').click();
});
document.getElementById('importFileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) importBackupFile(file);
  e.target.value = '';
});
document.getElementById('exportAudioChecklistBtn').addEventListener('click', exportAudioChecklist);
document.getElementById('resetAllBtn').addEventListener('click', () => {
  armConfirm(document.getElementById('resetAllBtn'), () => {
    state = defaultState();
    saveState();
    document.getElementById('resetAllBtn').textContent = 'Erase all data';
    renderLanguageList();
    showScreen('language');
  });
});

// ===== speech: playback + self-recording =====
const recordings = {}; // sentenceKey -> { blobUrl, mimeType }
let activeRecorder = null;
let activeRecorderKey = null;

function sentenceKey(unitId, sentenceIndex) {
  return `${unitId}-${sentenceIndex}`;
}

function playWordAudio(langId, regionId, word, btnEl) {
  const path = wordAudioPath(langId, regionId, word);
  const audio = new Audio(path);
  if (btnEl) btnEl.classList.remove('unavailable');
  audio.addEventListener('error', () => {
    if (btnEl) {
      btnEl.classList.add('unavailable');
      btnEl.title = 'Audio not generated yet for this word/dialect';
    }
  });
  audio.play().catch(() => { if (btnEl) btnEl.classList.add('unavailable'); });
}

function playNativeAudio(btnEl, unitId, sentenceIndex) {
  const ls = langState();
  const path = audioPath(lang(), ls.region, unitId, sentenceIndex);
  const audio = new Audio(path);
  btnEl.classList.remove('unavailable');
  audio.addEventListener('error', () => {
    btnEl.classList.add('unavailable');
    btnEl.title = "Audio not generated yet for this dialect — see Settings → Speech audio";
  });
  audio.play().catch(() => {
    btnEl.classList.add('unavailable');
  });
}

async function toggleRecording(btnEl, playBtnEl, unitId, sentenceIndex) {
  const key = sentenceKey(unitId, sentenceIndex);

  // Currently recording this sentence -> stop it
  if (activeRecorderKey === key && activeRecorder && activeRecorder.state === 'recording') {
    activeRecorder.stop();
    return;
  }
  // Recording something else already -> ignore (one at a time)
  if (activeRecorder && activeRecorder.state === 'recording') return;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];
    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
      if (recordings[key]?.blobUrl) URL.revokeObjectURL(recordings[key].blobUrl);
      recordings[key] = { blobUrl: URL.createObjectURL(blob) };
      stream.getTracks().forEach(t => t.stop());
      btnEl.classList.remove('recording');
      btnEl.querySelector('.label').textContent = 'Re-record';
      playBtnEl.style.display = 'inline-flex';
      activeRecorder = null;
      activeRecorderKey = null;
    };
    activeRecorder = recorder;
    activeRecorderKey = key;
    recorder.start();
    btnEl.classList.add('recording');
    btnEl.querySelector('.label').textContent = 'Stop';
    // Safety auto-stop so a forgotten mic doesn't run forever
    setTimeout(() => { if (recorder.state === 'recording') recorder.stop(); }, 12000);
  } catch (err) {
    btnEl.classList.add('unavailable');
    btnEl.title = 'Microphone access denied or unavailable';
  }
}

function playMyRecording(unitId, sentenceIndex) {
  const rec = recordings[sentenceKey(unitId, sentenceIndex)];
  if (!rec) return;
  new Audio(rec.blobUrl).play();
}

function exportAudioChecklist() {
  const sentenceRows = buildAudioManifest().map(r => ({
    type: 'sentence', language: r.langName, dialect: r.regionLabel, level: r.levelId,
    unit: r.unitId, index: r.sentenceIndex, filename: r.path, text: r.text, gloss: r.englishGloss,
  }));
  const wordRows = buildWordAudioManifest().map(r => ({
    type: 'word', language: r.langName, dialect: r.regionLabel, level: '', unit: '', index: '',
    filename: r.path, text: r.text, gloss: '',
  }));
  const allRows = [...sentenceRows, ...wordRows];
  const header = 'type,language,dialect,level,unit,index,filename,text,english_gloss';
  const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
  const csvRows = allRows.map(r =>
    [r.type, r.language, r.dialect, r.level, r.unit, r.index, r.filename, esc(r.text), esc(r.gloss)].join(',')
  );
  const csv = [header, ...csvRows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'root-audio-checklist.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ===== boot =====
if (state.selectedLanguage) {
  applyTheme(state.selectedLanguage);
  renderHome();
  showScreen('home');
} else {
  renderLanguageList();
  showScreen('language');
}

// ===== service worker (offline + installable) =====
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch((err) => console.warn('SW registration failed', err));
}
