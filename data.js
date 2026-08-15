// ============================================================
// ROOT — content data model
// Multi-language: German / Irish / Vietnamese
// Each language has its own theme, regional dialects, and CEFR
// content tree. Only German (de) has fully authored content so
// far — Irish (ga) and Vietnamese (vi) carry the same structure
// with a placeholder Unit 1 to prove the format generalizes.
// ============================================================

const LANGUAGES = [
  {
    id: 'de',
    name: 'German',
    endonym: 'Deutsch',
    flag: '🇩🇪',
    theme: {
      '--paper': '#F6F3EC', '--paper-alt': '#EDE8DB',
      '--ink': '#1E2A3A', '--ink-soft': '#4A5568',
      '--case-red': '#9C3B3B', '--case-red-bg': '#F3E1DE',
      '--gold': '#B8842B', '--gold-bg': '#F1E4C8',
      '--line': '#D8D0BE', '--green-ok': '#4A7856',
      '--font-display': "'Fraunces', serif",
      '--font-body': "'IBM Plex Sans', sans-serif",
      '--font-mono': "'IBM Plex Mono', monospace",
    },
    heroNote: 'Field-notebook precision — grammar laid out like a linguist\'s diagram.',
  },
  {
    id: 'ga',
    name: 'Irish',
    endonym: 'Gaeilge',
    flag: '🇮🇪',
    theme: {
      '--paper': '#F3ECDC', '--paper-alt': '#E8DDBF',
      '--ink': '#26362B', '--ink-soft': '#5B6B5E',
      '--case-red': '#A8452F', '--case-red-bg': '#E9D6CB',
      '--gold': '#3F7A5C', '--gold-bg': '#DCE8DD',
      '--line': '#D3C4A0', '--green-ok': '#3F7A5C',
      '--font-display': "'Cormorant Garamond', serif",
      '--font-body': "'IBM Plex Sans', sans-serif",
      '--font-mono': "'IBM Plex Mono', monospace",
    },
    heroNote: 'Vellum and manuscript ink — fitting for a language whose grammar is famous for changing a word\'s first letter.',
  },
  {
    id: 'vi',
    name: 'Vietnamese',
    endonym: 'Tiếng Việt',
    flag: '🇻🇳',
    theme: {
      '--paper': '#F5EBDD', '--paper-alt': '#EAD8BE',
      '--ink': '#241B17', '--ink-soft': '#5A4C42',
      '--case-red': '#A81C2B', '--case-red-bg': '#EFD2D2',
      '--gold': '#B8862E', '--gold-bg': '#F0E1BE',
      '--line': '#D9C4A0', '--green-ok': '#3E7C63',
      '--font-display': "'Noto Serif', serif",
      '--font-body': "'Be Vietnam Pro', sans-serif",
      '--font-mono': "'IBM Plex Mono', monospace",
    },
    heroNote: 'Lacquerware red, black, and gold leaf — and fonts chosen for full diacritic support.',
  },
];

const REGIONS = {
  de: [
    { id: 'de', label: 'Germany', flag: '🇩🇪' },
    { id: 'at', label: 'Austria', flag: '🇦🇹' },
    { id: 'ch', label: 'Switzerland', flag: '🇨🇭' },
  ],
  ga: [
    { id: 'munster', label: 'Munster', flag: '🇮🇪' },
    { id: 'connacht', label: 'Connacht', flag: '🇮🇪' },
    { id: 'ulster', label: 'Ulster', flag: '🇮🇪' },
  ],
  vi: [
    { id: 'north', label: 'Northern (Hà Nội)', flag: '🇻🇳' },
    { id: 'central', label: 'Central (Huế)', flag: '🇻🇳' },
    { id: 'south', label: 'Southern (Sài Gòn)', flag: '🇻🇳' },
  ],
};

const CEFR_LEVELS = [
  { id: 'a1', name: 'A1', desc: 'Survival basics — greetings, self-introduction, simple statements' },
  { id: 'a2', name: 'A2', desc: 'Everyday exchanges — routines, shopping, simple past events' },
  { id: 'b1', name: 'B1', desc: 'Independent use — opinions, plans, connected reasoning' },
  { id: 'b2', name: 'B2', desc: 'Fluent interaction — abstract topics, workplace nuance' },
  { id: 'c1', name: 'C1', desc: 'Professional fluency — the level most employers require' },
  { id: 'c2', name: 'C2', desc: 'Near-native mastery — idiom, register-shifting, full nuance' },
];

function placeholderUnit(langName) {
  return {
    id: 'placeholder-a1-u1',
    title: `${langName} Unit 1 — content not written yet`,
    sub: 'The path, theme, and region selector are live for this language. Lesson content is next.',
    grammarWhy: null,
    conjugationTable: null,
    sentences: [],
    vocab: [],
    placeholder: true,
  };
}

// Each level has units. Each unit has sentence "cards" (the immersive material)
// and a vocab bank. A unit's test-out quiz is generated from its own content.
const UNITS_BY_LANG = {
  de: {
    a1: [
    {
      id: 'a1-u1',
      title: 'Sein — the verb that changes to fit who it belongs to',
      sub: 'Why "ich bin" but "er ist"? German conjugates verbs by person — this unit builds the pattern from real sentences.',
      grammarWhy: {
        headline: 'Why does "sein" (to be) change shape?',
        body: "In English, \"to be\" already does this too (I am / you are / he is) — German just does it more visibly, for every verb, every time. The verb ending encodes who's doing the action, so German sentences can drop the subject in places English can't. Learn the pattern once here and it applies to nearly every verb you'll meet."
      },
      conjugationTable: {
        title: 'sein — to be',
        rows: [
          ['ich', 'bin', '1st singular'],
          ['du', 'bist', '2nd singular, informal'],
          ['er/sie/es', 'ist', '3rd singular'],
          ['wir', 'sind', '1st plural'],
          ['ihr', 'seid', '2nd plural, informal'],
          ['sie/Sie', 'sind', '3rd plural / formal "you"'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Ich', tag: null },
            { text: 'bin', tag: '1st sg.', why: '"bin" is the ich-form of sein — it only ever pairs with "ich."' },
            { text: 'müde.', tag: null },
          ],
          en: 'I am tired.',
          context: 'Something you\'d actually say at the end of a long day — not a textbook greeting.',
          wordNotes: {
            'müde': { pos: 'adjective', note: 'tired. Doesn\'t change form here — German adjectives after sein stay in their base form.' }
          }
        },
        {
          de: [
            { text: 'Wie', tag: null },
            { text: 'geht', tag: null },
            { text: 'es', tag: null },
            { text: 'dir?', tag: null },
          ],
          en: 'How are you? (lit. "How goes it to you?")',
          context: 'The real everyday greeting between friends — "Wie geht es dir?" not the stiffer textbook line "Wie geht es Ihnen?"',
          wordNotes: {
            'dir': { pos: 'dative pronoun', note: '"to you" — informal. This is the actual phrase people use with friends; strangers or elders get "Ihnen."' }
          },
          regionNotes: {
            de: '"Wie geht\'s?" — casual short form, extremely common.',
            at: 'Same phrase, but Austrians often add "eh" — "Wie geht\'s dir eh?" as a softener with no direct translation.',
            ch: 'Swiss German shifts to "Wie geit\'s dir?" in dialect, though standard-written German stays "geht\'s."'
          }
        },
        {
          de: [
            { text: 'Er', tag: null },
            { text: 'ist', tag: '3rd sg.', why: '"ist" is used for er/sie/es — any single third-person subject.', caseMarked: true },
            { text: 'aus', tag: null },
            { text: 'Deutschland.', tag: null },
          ],
          en: 'He is from Germany.',
          context: 'A simple factual statement — the kind of sentence you\'ll build hundreds of variations from.',
          wordNotes: {
            'aus': { pos: 'preposition', note: '"from" (origin). Always pairs with the dative case in German — more on that in Unit 2.' }
          }
        },
      ],
      vocab: [
        { de: 'müde', en: 'tired', tag: 'adj.' },
        { de: 'geht', en: '(it) goes', tag: 'verb' },
        { de: 'dir', en: 'to you', tag: 'pron.' },
        { de: 'aus', en: 'from', tag: 'prep.' },
        { de: 'Deutschland', en: 'Germany', tag: 'noun' },
      ]
    },
    {
      id: 'a1-u2',
      title: 'Der, die, das — why nouns come in three genders',
      sub: 'Grammatical gender doesn\'t track real-world gender — it\'s a filing system. Here\'s how to stop fighting it.',
      grammarWhy: {
        headline: 'Why does a table have a gender?',
        body: "German nouns are sorted into three grammatical classes — masculine, feminine, neuter — inherited from an old Germanic system, not from any logic about the object itself. \"Der Tisch\" (table) is masculine for no reason you can derive; you simply learn each noun with its article attached, the same way you'd memorize a word's spelling. The payoff: the article previews information about the sentence before you even reach the noun."
      },
      conjugationTable: {
        title: 'Definite article by gender (nominative case)',
        rows: [
          ['der', 'masculine', 'der Mann (the man)'],
          ['die', 'feminine', 'die Frau (the woman)'],
          ['das', 'neuter', 'das Kind (the child)'],
          ['die', 'plural (all genders)', 'die Kinder (the children)'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Der', tag: 'masc.', why: '"Der" marks a masculine noun in the nominative (subject) case.', caseMarked: true },
            { text: 'Mann', tag: null },
            { text: 'trinkt', tag: null },
            { text: 'Kaffee.', tag: null },
          ],
          en: 'The man drinks coffee.',
          context: 'Notice: "der" here has nothing to do with the man being male — it\'s a coincidence of this specific word.',
          wordNotes: { 'trinkt': { pos: 'verb', note: 'drinks — the er/sie/es verb ending is -t, same pattern family as sein\'s "ist."' } }
        },
        {
          de: [
            { text: 'Die', tag: 'fem.', why: '"Die" marks a feminine noun here — but also marks ALL plurals. Context tells you which.', caseMarked: true },
            { text: 'Milch', tag: null },
            { text: 'ist', tag: null },
            { text: 'kalt.', tag: null },
          ],
          en: 'The milk is cold.',
          context: 'A flat, ordinary sentence — this is what real spoken German sounds like far more often than textbook dialogue.',
          wordNotes: { 'kalt': { pos: 'adjective', note: 'cold. Like müde earlier, stays unchanged after sein/ist.' } }
        },
      ],
      vocab: [
        { de: 'der Mann', en: 'the man', tag: 'noun, masc.' },
        { de: 'die Frau', en: 'the woman', tag: 'noun, fem.' },
        { de: 'das Kind', en: 'the child', tag: 'noun, neut.' },
        { de: 'trinkt', en: 'drinks', tag: 'verb' },
        { de: 'kalt', en: 'cold', tag: 'adj.' },
      ]
    }
    ],
    a2: [], b1: [], b2: [], c1: [], c2: []
  },
  ga: {
    a1: [placeholderUnit('Irish')],
    a2: [], b1: [], b2: [], c1: [], c2: []
  },
  vi: {
    a1: [placeholderUnit('Vietnamese')],
    a2: [], b1: [], b2: [], c1: [], c2: []
  },
};

// Quiz is generated from unit content: cloze (fill the blank with correct form)
// + a "why" recall question, per sentence with a caseMarked/tagged word.
function generateQuizForUnit(unit) {
  const questions = [];
  if (!unit.sentences || unit.sentences.length === 0) return questions;
  unit.sentences.forEach(s => {
    const target = s.de.find(w => w.why);
    if (!target) return;
    const fullSentence = s.de.map(w => w.text).join(' ');
    const blanked = s.de.map(w => (w === target ? '____' : w.text)).join(' ');
    // distractors: pull other forms from the conjugation table if present
    let options = [target.text.replace(/[.,]$/, '')];
    if (unit.conjugationTable) {
      unit.conjugationTable.rows.forEach(r => {
        const form = r[1] || r[0];
        if (form && !options.includes(form) && options.length < 4) options.push(form);
      });
    }
    while (options.length < 3) options.push(target.text + '*');
    options = shuffle([...new Set(options)]).slice(0, 4);
    questions.push({
      type: 'cloze',
      prompt: blanked,
      correct: target.text.replace(/[.,]$/, ''),
      options,
      why: target.why,
      englishGloss: s.en,
    });
  });
  return questions;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
