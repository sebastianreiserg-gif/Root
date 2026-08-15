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
  document.getElementById('levelChip').style.display = (state.selectedLanguage && id !== 'language') ? 'block' : 'none';
  window.scrollTo(0, 0);
}

document.addEventListener('click', (e) => {
  const navEl = e.target.closest('[data-nav]');
  if (!navEl) return;
  const target = navEl.dataset.nav;
  if (target === 'language') { renderLanguageList(); showScreen('language'); }
  else if (target === 'home') { if (state.selectedLanguage) { renderHome(); showScreen('home'); } }
  else if (target === 'progress') { renderProgress(); showScreen('progress'); }
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
      if (noteObj) html += `<span class="wp-tag">${noteObj.pos}</span>`;
      html += `<br>`;
      if (w.why) html += w.why + ' ';
      if (noteObj) html += noteObj.note;
      html += `</div>`;
      detailEl.innerHTML = detailEl.innerHTML === html ? '' : html;
    });
  });
}

function renderVocabStrip(unit) {
  const strip = document.getElementById('vocabStrip');
  if (unit.placeholder) { strip.innerHTML = ''; return; }
  strip.innerHTML = unit.vocab.map(v => `
    <div class="vocab-chip">
      <div class="vc-de">${v.de}</div>
      <div class="vc-en">${v.en}</div>
      <div class="vc-tag mono">${v.tag}</div>
    </div>
  `).join('');
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

// ===== boot =====
if (state.selectedLanguage) {
  applyTheme(state.selectedLanguage);
  renderHome();
  showScreen('home');
} else {
  renderLanguageList();
  showScreen('language');
}

// ===== service worker (offline) =====
if ('serviceWorker' in navigator) {
  const swCode = `
    const CACHE = 'root-v2';
    self.addEventListener('install', e => {
      e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./','./data.js','./app.js'])));
    });
    self.addEventListener('fetch', e => {
      e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
    });
  `;
  const blob = new Blob([swCode], { type: 'application/javascript' });
  navigator.serviceWorker.register(URL.createObjectURL(blob)).catch(() => {});
}
