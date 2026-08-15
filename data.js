// ============================================================
// ROOT — content data model
// Languages: German / Irish / Vietnamese / Latin
// All languages share one font system (Fraunces / IBM Plex Sans /
// IBM Plex Mono — confirmed to fully cover Vietnamese diacritics
// and Irish/Latin accented vowels) and one layout. Only the color
// palette shifts per language, subtly, to its own visual tradition.
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
    },
    heroNote: 'Field-notebook ink and paper.',
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
    },
    heroNote: 'Vellum and bottle-green ink.',
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
    },
    heroNote: 'Lacquerware red, black, and gold leaf.',
  },
  {
    id: 'la',
    name: 'Latin',
    endonym: 'Lingua Latina',
    flag: '🏛️',
    theme: {
      '--paper': '#F1EAE0', '--paper-alt': '#E4D8C6',
      '--ink': '#2E2A24', '--ink-soft': '#5C5548',
      '--case-red': '#8C2F2A', '--case-red-bg': '#E8D3CE',
      '--gold': '#9C7A3C', '--gold-bg': '#E9DEC0',
      '--line': '#CBBB9C', '--green-ok': '#5A6B4E',
    },
    heroNote: 'Marble and inscription bronze.',
  },
];

const FONT_STACK = {
  '--font-display': "'Fraunces', serif",
  '--font-body': "'IBM Plex Sans', sans-serif",
  '--font-mono': "'IBM Plex Mono', monospace",
};
LANGUAGES.forEach(l => { l.theme = { ...l.theme, ...FONT_STACK }; });

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
  la: [
    { id: 'classical', label: 'Classical (Ancient Rome)', flag: '⚱️' },
    { id: 'ecclesiastical', label: 'Ecclesiastical (Church)', flag: '⛪' },
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
    },
    {
      id: 'a1-u3',
      title: 'Regelmäßige Verben — the pattern almost every other verb follows',
      sub: 'sein was the exception. Most German verbs follow one predictable ending pattern — learn it once here.',
      grammarWhy: {
        headline: 'Why "wohne" but "wohnst"?',
        body: 'sein and haben are irregular — but the vast majority of German verbs just attach a predictable ending to a stem: -e, -st, -t, -en, -t, -en for ich/du/er-sie-es/wir/ihr/sie-Sie. Strip the ending off "wohnst" and you get the stem "wohn-" — the same stem every form is built from. Once this pattern is automatic, you can conjugate verbs you\'ve never seen before.'
      },
      conjugationTable: {
        title: 'wohnen — to live (regular pattern)',
        rows: [
          ['ich', 'wohne', '1st singular'],
          ['du', 'wohnst', '2nd singular, informal'],
          ['er/sie/es', 'wohnt', '3rd singular'],
          ['wir', 'wohnen', '1st plural'],
          ['ihr', 'wohnt', '2nd plural, informal'],
          ['sie/Sie', 'wohnen', '3rd plural / formal "you"'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Ich', tag: null },
            { text: 'wohne', tag: '1st sg.', why: 'Stem "wohn-" plus the regular ich-ending "-e."', caseMarked: true },
            { text: 'in', tag: null },
            { text: 'Berlin.', tag: null },
          ],
          en: 'I live in Berlin.',
          context: 'Almost every self-introduction in German uses this exact pattern.',
          wordNotes: { 'in': { pos: 'preposition', note: '"in" for location — pairs with the dative case for a fixed location, not movement.' } }
        },
        {
          de: [
            { text: 'Wo', tag: null },
            { text: 'wohnst', tag: '2nd sg.', why: 'Stem "wohn-" plus the regular du-ending "-st."', caseMarked: true },
            { text: 'du?', tag: null },
          ],
          en: 'Where do you live?',
          context: 'The natural follow-up question after someone introduces themselves.',
          wordNotes: { 'Wo': { pos: 'question word', note: '"where" — location. Not to be confused with "wohin" (where to, implies motion).' } }
        },
        {
          de: [
            { text: 'Sie', tag: null },
            { text: 'kommt', tag: '3rd sg.', why: 'Stem "komm-" plus the regular er/sie/es-ending "-t."', caseMarked: true },
            { text: 'aus', tag: null },
            { text: 'Hamburg.', tag: null },
          ],
          en: 'She comes from Hamburg.',
          context: 'Same regular pattern, different verb — this is the point: the ending logic transfers.',
          wordNotes: { 'aus': { pos: 'preposition', note: '"from" (origin) — always dative, same as in Unit 1.' } }
        },
      ],
      vocab: [
        { de: 'wohnen', en: 'to live (reside)', tag: 'verb' },
        { de: 'kommen', en: 'to come', tag: 'verb' },
        { de: 'wo', en: 'where', tag: 'adv.' },
        { de: 'in', en: 'in', tag: 'prep.' },
        { de: 'aus', en: 'from', tag: 'prep.' },
      ]
    },
    {
      id: 'a1-u4',
      title: 'Haben — the second verb you can\'t avoid',
      sub: 'German reaches for "to have" in places English reaches for "to be" — hunger, fear, and time all get "had," not "been."',
      grammarWhy: {
        headline: 'Why "Ich habe Hunger" and not "Ich bin hungrig"?',
        body: 'Both are technically correct, but native speakers overwhelmingly say "I have hunger" rather than "I am hungry." German treats hunger, thirst, and fear as things you possess, not states you\'re in. This is exactly the kind of native-vs-textbook gap that grammar tables never flag — haben is irregular, so learn its own conjugation, not the regular pattern from Unit 3.'
      },
      conjugationTable: {
        title: 'haben — to have',
        rows: [
          ['ich', 'habe', '1st singular'],
          ['du', 'hast', '2nd singular, informal'],
          ['er/sie/es', 'hat', '3rd singular'],
          ['wir', 'haben', '1st plural'],
          ['ihr', 'habt', '2nd plural, informal'],
          ['sie/Sie', 'haben', '3rd plural / formal "you"'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Ich', tag: null },
            { text: 'habe', tag: '1st sg.', why: '"habe" is the irregular ich-form of haben — memorize it separately from the -e pattern in Unit 3.', caseMarked: true },
            { text: 'Hunger.', tag: null },
          ],
          en: "I'm hungry. (lit. I have hunger.)",
          context: 'Say this instead of "Ich bin hungrig" — it\'s what people actually say.',
          wordNotes: { 'Hunger': { pos: 'noun, masc.', note: 'hunger — treated as a possession here, not a state.' } }
        },
        {
          de: [
            { text: 'Hast', tag: '2nd sg.', why: '"hast" — irregular du-form of haben.', caseMarked: true },
            { text: 'du', tag: null },
            { text: 'Zeit?', tag: null },
          ],
          en: 'Do you have time? (Are you free?)',
          context: 'The casual way to ask if someone\'s available — far more common than "Bist du frei?"',
          wordNotes: { 'Zeit': { pos: 'noun, fem.', note: 'time — in the sense of "free time available," not clock time.' } }
        },
        {
          de: [
            { text: 'Er', tag: null },
            { text: 'hat', tag: '3rd sg.', why: '"hat" — irregular er/sie/es-form of haben.', caseMarked: true },
            { text: 'keine', tag: null },
            { text: 'Ahnung.', tag: null },
          ],
          en: "He has no idea. (He hasn't got a clue.)",
          context: 'A phrase you\'ll hear constantly in casual speech — not something a phrasebook usually teaches.',
          wordNotes: { 'keine': { pos: 'negation', note: '"no/not any" — negates a noun (Ahnung) rather than a verb. More on kein vs nicht in a later unit.' } }
        },
      ],
      vocab: [
        { de: 'haben', en: 'to have', tag: 'verb' },
        { de: 'Hunger', en: 'hunger', tag: 'noun, masc.' },
        { de: 'Zeit', en: 'time', tag: 'noun, fem.' },
        { de: 'keine Ahnung', en: 'no idea', tag: 'phrase' },
      ]
    },
    {
      id: 'a1-u5',
      title: 'Der → den — why the object of a sentence changes shape',
      sub: 'The article you learned in Unit 2 isn\'t fixed — it shifts depending on the noun\'s job in the sentence. This is the accusative case.',
      grammarWhy: {
        headline: 'Why does "der Mann" become "den Mann"?',
        body: '"Der Mann" (Unit 2) was the subject — the one doing the action. The moment a masculine noun becomes the direct object — the thing an action is done TO — its article shifts from "der" to "den." This is called the accusative case. The genuinely good news: only masculine articles change here. Feminine (die), neuter (das), and plural (die) stay exactly the same in the accusative, so there\'s really only one rule to learn.'
      },
      conjugationTable: {
        title: 'Definite article: nominative (subject) vs. accusative (object)',
        rows: [
          ['der → den', 'masculine', 'Der Mann sieht den Hund.'],
          ['die → die', 'feminine', 'no change'],
          ['das → das', 'neuter', 'no change'],
          ['die → die', 'plural', 'no change'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Ich', tag: null },
            { text: 'sehe', tag: null },
            { text: 'den', tag: 'acc. masc.', why: '"Der Mann" is now the object being seen — masculine "der" shifts to "den."', caseMarked: true },
            { text: 'Mann.', tag: null },
          ],
          en: 'I see the man.',
          context: 'Compare directly to Unit 2\'s "Der Mann trinkt Kaffee" — same noun, different job, different article.',
          wordNotes: { 'sehe': { pos: 'verb', note: 'to see — regular -e ending, same pattern as Unit 3.' } }
        },
        {
          de: [
            { text: 'Sie', tag: null },
            { text: 'kauft', tag: null },
            { text: 'die', tag: 'acc. fem.', why: 'Feminine "die" is identical in nominative and accusative — nothing to change here.' },
            { text: 'Milch.', tag: null },
          ],
          en: 'She buys the milk.',
          context: 'The unglamorous but important case: most of the time, nothing changes at all.',
          wordNotes: { 'kauft': { pos: 'verb', note: 'buys — regular -t ending.' } }
        },
        {
          de: [
            { text: 'Kennst', tag: null },
            { text: 'du', tag: null },
            { text: 'den', tag: 'acc. masc.', why: '"Der Film" as an object again pulls "der" to "den."', caseMarked: true },
            { text: 'Film?', tag: null },
          ],
          en: 'Do you know that movie?',
          context: 'A natural way to check if a friend has seen something before you spoil it.',
          wordNotes: { 'Kennst': { pos: 'verb', note: '"to know / be familiar with" (people, places, media) — different from "wissen" (to know facts).' } }
        },
      ],
      vocab: [
        { de: 'sehen', en: 'to see', tag: 'verb' },
        { de: 'kaufen', en: 'to buy', tag: 'verb' },
        { de: 'kennen', en: 'to know (be familiar with)', tag: 'verb' },
        { de: 'den Film', en: 'the movie (object form)', tag: 'noun, masc.' },
      ]
    },
    {
      id: 'a1-u6',
      title: 'Verb-second — why the verb always lands in position two',
      sub: 'German sentences can start with almost anything — but the conjugated verb always claims the second slot. This unlocks natural-sounding word order.',
      grammarWhy: {
        headline: 'Why does "Heute arbeite ich nicht" put "ich" third?',
        body: 'English glues the verb to the subject (Subject-Verb-Object, almost no exceptions). German instead glues the verb to position two, no matter what fills position one — a subject, a time word, an object. If "heute" (today) takes the first slot, the verb "arbeite" must immediately follow in slot two, which pushes the subject "ich" to slot three. This "verb-second" rule also explains why question words (wer, was, wo, wann, warum, wie) are followed immediately by the verb, exactly like a statement would be.'
      },
      conjugationTable: {
        title: 'Common W-question words',
        rows: [
          ['wer', 'who', 'Wer ist das?'],
          ['was', 'what', 'Was machst du?'],
          ['wo', 'where', 'Wo ist der Bahnhof?'],
          ['wann', 'when', 'Wann kommst du?'],
          ['warum', 'why', 'Warum lernst du Deutsch?'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Heute', tag: 'pos. 1', why: '"Heute" fills position one — that\'s allowed to be almost anything.' },
            { text: 'arbeite', tag: 'pos. 2', why: 'The conjugated verb must occupy position two, so "arbeite" jumps ahead of the subject.', caseMarked: true, quizTarget: true },
            { text: 'ich', tag: 'pos. 3', why: 'Because the verb took slot two, the subject "ich" is displaced to slot three — not wrong, just reordered.' },
            { text: 'nicht.', tag: null },
          ],
          en: "Today I'm not working.",
          context: 'The reordering that trips up English speakers most — nothing here is optional stylistic flair, it\'s the rule.',
          wordNotes: { 'nicht': { pos: 'negation', note: 'negates the whole sentence/verb (contrast "keine" in Unit 4, which negates a noun).' } }
        },
        {
          de: [
            { text: 'Wo', tag: null },
            { text: 'ist', tag: 'pos. 2', why: 'Question word "Wo" takes slot one, so "ist" must directly follow in slot two — same rule as statements.', caseMarked: true, quizTarget: true },
            { text: 'der', tag: null },
            { text: 'Bahnhof?', tag: null },
          ],
          en: 'Where is the train station?',
          context: 'One of the most useful travel questions you\'ll ever need.',
          wordNotes: { 'Bahnhof': { pos: 'noun, masc.', note: 'train station.' } }
        },
        {
          de: [
            { text: 'Warum', tag: null },
            { text: 'lernst', tag: 'pos. 2', why: 'Same pattern: question word first, verb immediately second.', caseMarked: true, quizTarget: true },
            { text: 'du', tag: null },
            { text: 'Deutsch?', tag: null },
          ],
          en: 'Why are you learning German?',
          context: 'A question you will get asked constantly once people find out you\'re studying it.',
          wordNotes: { 'lernst': { pos: 'verb', note: 'learn — regular -st ending, same family as "wohnst" in Unit 3.' } }
        },
      ],
      vocab: [
        { de: 'heute', en: 'today', tag: 'adv.' },
        { de: 'arbeiten', en: 'to work', tag: 'verb' },
        { de: 'warum', en: 'why', tag: 'question word' },
        { de: 'lernen', en: 'to learn', tag: 'verb' },
        { de: 'der Bahnhof', en: 'the train station', tag: 'noun, masc.' },
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

  // Collect every quiz-target answer across the unit first — these are
  // naturally grammatically parallel (all verb forms, or all articles),
  // which makes far better distractors than blindly pulling table columns.
  const allTargets = [];
  unit.sentences.forEach(s => {
    const t = s.de.find(w => w.quizTarget) || s.de.find(w => w.why);
    if (t) allTargets.push(t.text.replace(/[.,?]$/, ''));
  });

  unit.sentences.forEach(s => {
    const target = s.de.find(w => w.quizTarget) || s.de.find(w => w.why);
    if (!target) return;
    const fullSentence = s.de.map(w => w.text).join(' ');
    const blanked = s.de.map(w => (w === target ? '____' : w.text)).join(' ');
    const correctClean = target.text.replace(/[.,]$/, '');

    // Distractors: prefer other targets from this same unit (grammatically
    // parallel forms). Only fall back to the conjugation table when a row's
    // second column looks like an actual single-token form, not a gloss.
    let options = [correctClean];
    const seenLower = new Set([correctClean.toLowerCase()]);
    allTargets.forEach(t => {
      if (!seenLower.has(t.toLowerCase()) && options.length < 4) { options.push(t); seenLower.add(t.toLowerCase()); }
    });
    if (options.length < 4 && unit.conjugationTable) {
      const nonForms = new Set(['masculine', 'feminine', 'neuter', 'plural', 'who', 'what', 'where', 'when', 'why', 'no change']);
      unit.conjugationTable.rows.forEach(r => {
        const form = r[1];
        const looksLikeForm = form && !form.includes(' ') && form === form.toLowerCase() && !nonForms.has(form.toLowerCase());
        if (looksLikeForm && !seenLower.has(form.toLowerCase()) && options.length < 4) { options.push(form); seenLower.add(form.toLowerCase()); }
      });
    }
    while (options.length < 3) options.push(correctClean + '*');
    options = shuffle([...new Set(options)]).slice(0, 4);
    if (!options.includes(correctClean)) options[0] = correctClean; // safety net
    questions.push({
      type: 'cloze',
      prompt: blanked,
      correct: correctClean,
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
