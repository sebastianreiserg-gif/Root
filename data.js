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
    },
    {
      id: 'a1-u7',
      title: 'Zahlen — why 21 says "one-and-twenty"',
      sub: 'German counts the ones digit before the tens digit, joined by "und." It sounds backwards until you realize English used to do this too.',
      grammarWhy: {
        headline: 'Why "einundzwanzig" instead of "zwanzigeins"?',
        body: 'From 21 onward, German states the ones digit first, then "und" (and), then the tens digit: ein-und-zwanzig, literally "one and twenty." This isn\'t random — English nursery rhymes like "four and twenty blackbirds" preserve the exact same older Germanic pattern English has since dropped. Numbers 13–19 also build directly off the ones digit plus "-zehn" (dreizehn = three-teen), so the whole system is more mechanical than it looks once the pattern clicks.'
      },
      conjugationTable: {
        title: 'Numbers 0–12, then the pattern',
        rows: [
          ['null / eins / zwei', '0 / 1 / 2', 'base forms'],
          ['drei…zehn', '3…10', 'drei, vier, fünf, sechs, sieben, acht, neun, zehn'],
          ['elf / zwölf', '11 / 12', 'irregular — memorize separately'],
          ['einundzwanzig', '21', 'eins + und + zwanzig'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Ich', tag: null },
            { text: 'bin', tag: null },
            { text: 'einundzwanzig', tag: null, why: 'Ones digit "ein-" comes first, then "und," then the tens "-zwanzig" — the reverse of English "twenty-one."', quizTarget: true, caseMarked: true },
            { text: 'Jahre', tag: null },
            { text: 'alt.', tag: null },
          ],
          en: 'I am twenty-one years old.',
          context: 'German states age with sein (to be), not haben — unlike French or Spanish.',
          wordNotes: { 'Jahre': { pos: 'noun, plural', note: 'years — plural of "das Jahr."' } }
        },
        {
          de: [
            { text: 'Er', tag: null },
            { text: 'hat', tag: null },
            { text: 'zwei', tag: null },
            { text: 'Kinder.', tag: null },
          ],
          en: 'He has two children.',
          context: 'Simple, low numbers stay in normal order — the reversal only kicks in at 21+.',
          wordNotes: { 'zwei': { pos: 'number', note: 'two — unlike English, German numbers don\'t change form based on what they count.' } }
        },
        {
          de: [
            { text: 'Wir', tag: null },
            { text: 'haben', tag: null },
            { text: 'zehn', tag: null },
            { text: 'Minuten.', tag: null },
          ],
          en: 'We have ten minutes.',
          context: 'A phrase you\'ll actually use when you\'re running late.',
          wordNotes: { 'zehn': { pos: 'number', note: 'ten — the base that "dreizehn" (thirteen) etc. build from.' } }
        },
      ],
      vocab: [
        { de: 'eins, zwei, drei', en: 'one, two, three', tag: 'numbers' },
        { de: 'zehn', en: 'ten', tag: 'number' },
        { de: 'elf, zwölf', en: 'eleven, twelve', tag: 'numbers, irregular' },
        { de: 'zwanzig', en: 'twenty', tag: 'number' },
        { de: 'einundzwanzig', en: 'twenty-one', tag: 'number, pattern' },
      ]
    },
    {
      id: 'a1-u8',
      title: 'Mein, meine — possessives that agree with the noun, not the owner',
      sub: 'Just like der/die/das, possessives change their ending based on the gender of the thing owned — not the gender of the person who owns it.',
      grammarWhy: {
        headline: 'Why "seine Schwester" even when "seine" describes a man\'s sister?',
        body: 'This is the single biggest trap for English speakers: "sein" (his) and "ihr" (her) agree with the noun that follows, not with the owner. "Sein Bruder" (his brother) has no -e because "Bruder" is masculine. "Seine Schwester" (his sister) gets an -e because "Schwester" is feminine — even though the owner is still male. Possessives inherit the exact same -e-for-feminine, no-ending-for-masculine pattern you already learned for der/die/das in Unit 2.'
      },
      conjugationTable: {
        title: 'mein (my) by gender of the noun owned',
        rows: [
          ['mein', 'masculine/neuter noun', 'mein Bruder, mein Kind'],
          ['meine', 'feminine noun', 'meine Schwester'],
          ['dein / sein / ihr', 'your / his / her', 'same -e pattern applies'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Das', tag: null },
            { text: 'ist', tag: null },
            { text: 'mein', tag: 'masc., no -e', why: '"Bruder" is masculine, so "mein" takes no ending — same rule as "der."', quizTarget: true, caseMarked: true },
            { text: 'Bruder.', tag: null },
          ],
          en: 'That is my brother.',
          context: 'The baseline, unmarked form — no ending at all.',
          wordNotes: { 'Bruder': { pos: 'noun, masc.', note: 'brother.' } }
        },
        {
          de: [
            { text: 'Das', tag: null },
            { text: 'ist', tag: null },
            { text: 'meine', tag: 'fem., +e', why: '"Schwester" is feminine, so "mein" gains an -e — direct parallel to "die."', quizTarget: true, caseMarked: true },
            { text: 'Schwester.', tag: null },
          ],
          en: 'That is my sister.',
          context: 'Same word "mein," different noun gender — compare directly with the sentence above.',
          wordNotes: { 'Schwester': { pos: 'noun, fem.', note: 'sister.' } }
        },
        {
          de: [
            { text: 'Er', tag: null },
            { text: 'liebt', tag: null },
            { text: 'seine', tag: 'fem., +e', why: 'The owner "er" is male, but "seine" still gets -e because it agrees with "Schwester" (feminine), not with "er."', quizTarget: true, caseMarked: true },
            { text: 'Schwester.', tag: null },
          ],
          en: 'He loves his sister.',
          context: 'The exact trap described above, in a real sentence — the owner\'s gender is irrelevant here.',
          wordNotes: { 'liebt': { pos: 'verb', note: 'loves — regular -t ending.' } }
        },
      ],
      vocab: [
        { de: 'der Bruder', en: 'the brother', tag: 'noun, masc.' },
        { de: 'die Schwester', en: 'the sister', tag: 'noun, fem.' },
        { de: 'der Vater', en: 'the father', tag: 'noun, masc.' },
        { de: 'die Mutter', en: 'the mother', tag: 'noun, fem.' },
        { de: 'mein / meine', en: 'my (masc./fem.)', tag: 'possessive' },
      ]
    },
    {
      id: 'a1-u9',
      title: 'Wie spät ist es? — clock time, and why "halb drei" isn\'t 3:30',
      sub: 'German time has a specific trap: "halb drei" means half-way TO three, not half past three.',
      grammarWhy: {
        headline: 'Why does "halb drei" mean 2:30, not 3:30?',
        body: '"Halb drei" translates literally to "half three," and English speakers default to reading that as 3:30. It actually means "half-way to three" — i.e. 2:30. German counts toward the next hour rather than past the last one. This single point trips up nearly every English-speaking learner at least once, usually by showing up late (or absurdly early) to something.'
      },
      conjugationTable: {
        title: 'Days of the week — all masculine ("der")',
        rows: [
          ['Montag, Dienstag, Mittwoch', 'Mon, Tue, Wed', 'der Montag, etc.'],
          ['Donnerstag, Freitag', 'Thu, Fri', 'der Donnerstag, etc.'],
          ['Samstag/Sonnabend, Sonntag', 'Sat, Sun', 'der Samstag, der Sonntag'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Es', tag: null },
            { text: 'ist', tag: null },
            { text: 'neun', tag: null },
            { text: 'Uhr.', tag: null },
          ],
          en: "It's nine o'clock.",
          context: 'The straightforward baseline — on-the-hour times work exactly like English.',
          wordNotes: { 'Uhr': { pos: 'noun, fem.', note: 'clock/o\'clock — always follows the number for time-telling.' } }
        },
        {
          de: [
            { text: 'Es', tag: null },
            { text: 'ist', tag: null },
            { text: 'halb', tag: null, why: '"Halb drei" = half-way TO three = 2:30, not 3:30. German counts forward to the next hour.', quizTarget: true, caseMarked: true },
            { text: 'drei.', tag: null },
          ],
          en: "It's 2:30. (lit. \"half three\")",
          context: 'The classic trap — say this to a German friend expecting 3:30 and you\'ll show up an hour late.',
          wordNotes: { 'drei': { pos: 'number', note: 'three — refers to the upcoming hour being approached, not the current one.' } }
        },
        {
          de: [
            { text: 'Am', tag: null },
            { text: 'Montag', tag: 'masc.', why: 'All days of the week are masculine — "am" is a contraction of "an dem" (on the), matching der Montag.', quizTarget: true, caseMarked: true },
            { text: 'arbeite', tag: null },
            { text: 'ich', tag: null },
            { text: 'nicht.', tag: null },
          ],
          en: "I don't work on Monday.",
          context: 'Reuses the verb-second word order from Unit 6 — "Am Montag" fills slot one, verb comes second.',
          wordNotes: { 'Am': { pos: 'contraction', note: '"an dem" → "am," used for days and set times.' } }
        },
      ],
      vocab: [
        { de: 'die Uhr', en: 'the clock / o\'clock', tag: 'noun, fem.' },
        { de: 'halb', en: 'half (counts toward the next hour)', tag: 'time' },
        { de: 'der Montag', en: 'Monday', tag: 'noun, masc.' },
        { de: 'am', en: 'on (day/date)', tag: 'contraction' },
      ]
    },
    {
      id: 'a1-u10',
      title: 'Plurals — why German plurals aren\'t just "+s"',
      sub: 'English almost always adds -s. German has at least five different plural patterns, and you have to learn each noun\'s plural individually, the same way you learn its gender.',
      grammarWhy: {
        headline: 'Why "Mann" → "Männer" but "Frau" → "Frauen"?',
        body: 'German plurals fall into several families: add -e, add -er (often with an umlaut shift, like Mann → Männer), add -(e)n, add -s (mostly for loanwords), or don\'t change at all. There\'s no single rule that predicts which pattern a given noun uses — like gender, it\'s a property of the word you memorize alongside it. The good news: dictionaries always list a noun\'s plural next to its gender, so you\'re never guessing blind once you build the habit of checking both together.'
      },
      conjugationTable: {
        title: 'The five common plural patterns',
        rows: [
          ['-e', 'der Tisch → die Tische', 'table(s)'],
          ['-er (+ umlaut)', 'der Mann → die Männer', 'man/men'],
          ['-(e)n', 'die Frau → die Frauen', 'woman/women'],
          ['-s', 'das Auto → die Autos', 'car(s), mostly loanwords'],
          ['no change', 'das Fenster → die Fenster', 'window(s)'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Die', tag: null },
            { text: 'Männer', tag: 'plural, -er + umlaut', why: '"Mann" becomes "Männer": -er ending plus an umlaut shift (a → ä) — an irregular but very common pattern.', quizTarget: true, caseMarked: true },
            { text: 'trinken', tag: null },
            { text: 'Kaffee.', tag: null },
          ],
          en: 'The men drink coffee.',
          context: 'Compare to "Der Mann trinkt Kaffee" from Unit 2 — singular verb "trinkt" becomes plural "trinken" too.',
          wordNotes: { 'trinken': { pos: 'verb', note: 'plural form of trinken — matches the sie/plural ending from Unit 3\'s conjugation pattern.' } }
        },
        {
          de: [
            { text: 'Die', tag: null },
            { text: 'Frauen', tag: 'plural, -en', why: '"Frau" becomes "Frauen": the -en pattern, the single most common plural ending for feminine nouns.', quizTarget: true, caseMarked: true },
            { text: 'kommen', tag: null },
            { text: 'aus', tag: null },
            { text: 'Berlin.', tag: null },
          ],
          en: 'The women come from Berlin.',
          context: 'The -en pattern is the safest guess for an unfamiliar feminine noun, though it\'s not universal.',
          wordNotes: { 'kommen': { pos: 'verb', note: 'plural of kommen.' } }
        },
        {
          de: [
            { text: 'Die', tag: null },
            { text: 'Kinder', tag: 'plural, -er (no umlaut)', why: '"Kind" becomes "Kinder": -er ending, but no umlaut shift this time since "i" doesn\'t umlaut.', quizTarget: true, caseMarked: true },
            { text: 'spielen.', tag: null },
          ],
          en: 'The children are playing.',
          context: 'Same -er family as Männer, but without the vowel shift — the pattern isn\'t 100% uniform even within itself.',
          wordNotes: { 'spielen': { pos: 'verb', note: 'to play (plural conjugation).' } }
        },
      ],
      vocab: [
        { de: 'die Männer', en: 'the men', tag: 'noun, pl.' },
        { de: 'die Frauen', en: 'the women', tag: 'noun, pl.' },
        { de: 'die Kinder', en: 'the children', tag: 'noun, pl.' },
        { de: 'die Tische', en: 'the tables', tag: 'noun, pl.' },
        { de: 'die Autos', en: 'the cars', tag: 'noun, pl.' },
      ]
    }
    ],
    a2: [], b1: [], b2: [], c1: [], c2: []
  },
  ga: {
    a1: [
    {
      id: 'a1-u1',
      title: 'Tá vs. Is — Irish\'s two different verbs "to be"',
      sub: 'English gets by with one "to be." Irish splits it in two, and which one you need depends on what kind of sentence you\'re making.',
      grammarWhy: {
        headline: 'Why are there two words for "is"?',
        body: '"Tá" describes a state or condition — how something is right now (tired, at home, big). "Is" (the copula) identifies or classifies — what something fundamentally is (a teacher, Irish, this book). English blurs this distinction completely; Irish never does. A useful test: if you could answer with "very" or "not very" (very tired, not very tired), you need "tá." If you\'re saying what category something belongs to, you need "is."'
      },
      conjugationTable: {
        title: 'Tá — to be (state)',
        rows: [
          ['tá mé', 'I am', 'often shortened to táim'],
          ['tá tú', 'you are (sg.)', ''],
          ['tá sé/sí', 'he/she is', ''],
          ['táimid', 'we are', ''],
          ['tá sibh', 'you are (pl.)', ''],
          ['tá siad', 'they are', ''],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Tá', tag: 'state', why: '"Tá" opens the sentence — Irish verbs come first (more on this in Unit 2). This is the state-of-being verb, not the identity verb.', quizTarget: true, caseMarked: true },
            { text: 'mé', tag: null },
            { text: 'tuirseach.', tag: null },
          ],
          en: 'I am tired.',
          context: 'A state that changes day to day — exactly the kind of sentence that needs "tá," not "is."',
          wordNotes: { 'tuirseach': { pos: 'adjective', note: 'tired. Follows the same "tá + subject + adjective" pattern every time.' } }
        },
        {
          de: [
            { text: 'Is', tag: 'identity', why: '"Is" identifies what category mé (I) belongs to — múinteoir, a profession. This could never be "tá" — you don\'t "have the state of" being a teacher.', quizTarget: true, caseMarked: true },
            { text: 'múinteoir', tag: null },
            { text: 'mé.', tag: null },
          ],
          en: 'I am a teacher.',
          context: 'Notice the word order flips too: "is múinteoir mé" (is teacher I), not "is mé múinteoir."',
          wordNotes: { 'múinteoir': { pos: 'noun', note: 'teacher — the identity/category being assigned.' } }
        },
        {
          de: [
            { text: 'Tá', tag: 'state', why: 'Home isn\'t an identity — it\'s a temporary state/location, so "tá" is correct here.', quizTarget: true, caseMarked: true },
            { text: 'sí', tag: null },
            { text: 'sa', tag: null },
            { text: 'bhaile.', tag: null },
          ],
          en: 'She is at home.',
          context: 'Location always takes "tá" — you are never "identified as" being somewhere.',
          regionNotes: {
            munster: '"Sa bhaile" is standard; some West Munster speakers use "sa mbaile" with eclipsis instead of lenition — both are heard.',
            connacht: 'Pronunciation tends to shorten the vowel in "bhaile" more than other dialects.',
            ulster: '"Tá sí sa bhaile" is common, but Ulster speakers often prefer "baile" pronounced closer to "bal-yeh" with a distinct Ulster vowel quality.'
          }
        },
      ],
      vocab: [
        { de: 'tá', en: '(is/am/are — state)', tag: 'verb' },
        { de: 'is', en: '(is/am/are — identity)', tag: 'verb (copula)' },
        { de: 'tuirseach', en: 'tired', tag: 'adj.' },
        { de: 'múinteoir', en: 'teacher', tag: 'noun' },
        { de: 'sa bhaile', en: 'at home', tag: 'phrase' },
      ]
    },
    {
      id: 'a1-u2',
      title: 'VSO — why the verb comes before the subject',
      sub: 'Irish puts the verb first, always. Once this clicks, every sentence you build follows the same shape.',
      grammarWhy: {
        headline: 'Why "tá mé" and not "mé tá"?',
        body: 'Irish is a VSO language — Verb, Subject, Object — one of the relatively few word orders like this in Europe. English is SVO (Subject-Verb-Object): "I am tired." Irish flips the first two: "Tá mé tuirseach" is literally "Is I tired." This isn\'t a stylistic inversion like an English question ("Are you tired?") — it\'s the ordinary, unmarked word order for every single statement.'
      },
      conjugationTable: {
        title: 'The pattern: Verb – Subject – (rest)',
        rows: [
          ['Tá', 'mé', 'sásta. (I am happy.)'],
          ['Ceannaíonn', 'sí', 'leabhar. (She buys a book.)'],
          ['Feiceann', 'siad', 'an teach. (They see the house.)'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Ceannaíonn', tag: 'V', why: 'The verb "ceannaíonn" (buys) leads the sentence — this is non-negotiable in Irish, not a special question form.', quizTarget: true, caseMarked: true },
            { text: 'sí', tag: 'S', },
            { text: 'leabhar.', tag: 'O' },
          ],
          en: 'She buys a book.',
          context: 'V-S-O in its plainest form: verb, then who, then what.',
          wordNotes: { 'leabhar': { pos: 'noun', note: 'book — the object, appearing last as expected in VSO.' } }
        },
        {
          de: [
            { text: 'Feiceann', tag: 'V', why: 'Same shape: verb first. "Feiceann" (sees) opens the sentence before we even know who is doing the seeing.', quizTarget: true, caseMarked: true },
            { text: 'siad', tag: 'S' },
            { text: 'an', tag: null },
            { text: 'teach.', tag: 'O' },
          ],
          en: 'They see the house.',
          context: 'English speakers instinctively want to say the subject first — this is the habit to unlearn.',
          wordNotes: { 'an teach': { pos: 'noun phrase', note: 'the house — "an" is the definite article, covered fully in Unit 4.' } }
        },
        {
          de: [
            { text: 'Ólann', tag: 'V', why: 'Verb-first again — "ólann" (drinks) before we know it\'s "sé" doing the drinking.', quizTarget: true, caseMarked: true },
            { text: 'sé', tag: 'S' },
            { text: 'tae.', tag: 'O' },
          ],
          en: 'He drinks tea.',
          context: 'A flat, ordinary sentence — this pattern will become automatic faster than it seems right now.',
          wordNotes: { 'tae': { pos: 'noun', note: 'tea — no article needed for general/uncountable nouns like this.' } }
        },
      ],
      vocab: [
        { de: 'ceannaíonn', en: 'buys', tag: 'verb' },
        { de: 'feiceann', en: 'sees', tag: 'verb' },
        { de: 'ólann', en: 'drinks', tag: 'verb' },
        { de: 'leabhar', en: 'book', tag: 'noun' },
        { de: 'teach', en: 'house', tag: 'noun' },
      ]
    },
    {
      id: 'a1-u3',
      title: 'Séimhiú — why "bean" becomes "bhean"',
      sub: 'Irish\'s most famous grammar feature: certain words trigger a change to the very first letter of the next word. This is lenition.',
      grammarWhy: {
        headline: 'Why does a word\'s first letter change?',
        body: 'Certain words — including "mo" (my), the number "a" before some counting contexts, and many prepositions — trigger séimhiú (lenition) on the next word\'s initial consonant, adding an "h" and softening the sound: b→bh, c→ch, m→mh, s→sh, and more. This isn\'t decoration — it\'s grammatically required, the same way German requires "den" instead of "der" for an accusative object. "Bean" (woman) becomes "bhean" the moment a lenition-triggering word precedes it. The trigger word tells you the mutation is coming; the mutation itself carries no separate meaning of its own.'
      },
      conjugationTable: {
        title: 'Common lenition changes (séimhiú)',
        rows: [
          ['b → bh', '/b/ → /w/ or /v/', 'bean → bhean'],
          ['c → ch', '/k/ → /x/', 'cat → chat'],
          ['m → mh', '/m/ → /w/ or /v/', 'máthair → mháthair'],
          ['s → sh', '/s/ → /h/', 'seomra → sheomra'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Mo', tag: 'trigger', why: '"Mo" (my) always triggers séimhiú on the next word — it\'s the trigger, not the mutation itself.' },
            { text: 'bhean', tag: 'lenited', why: '"Bean" (woman) becomes "bhean" because "mo" precedes it — the b has softened to a bh sound.', quizTarget: true, caseMarked: true },
            { text: 'chéile.', tag: null },
          ],
          en: 'My wife.',
          context: '"Bean chéile" literally means "companion woman" — wife. Notice "chéile" is also lenited, since it follows the already-lenited phrase pattern.',
          wordNotes: { 'chéile': { pos: 'noun (lenited)', note: 'companion/spouse — base form "céile."' } }
        },
        {
          de: [
            { text: 'Chonaic', tag: null },
            { text: 'mé', tag: null },
            { text: 'do', tag: 'trigger', why: '"Do" (your) is another lenition trigger, just like "mo" in the previous sentence.' },
            { text: 'chat.', tag: 'lenited', why: '"Cat" becomes "chat" — the hard c-sound softens after the trigger word "do."', quizTarget: true, caseMarked: true },
          ],
          en: 'I saw your cat.',
          context: 'Same rule, different trigger word — this is what makes séimhiú learnable: a fixed, short list of trigger words to memorize, not hundreds of exceptions.',
          wordNotes: { 'Chonaic': { pos: 'verb', note: 'saw (past tense of "feiceann," Unit 2\'s "sees") — irregular, worth memorizing directly.' } }
        },
        {
          de: [
            { text: 'Bhí', tag: null },
            { text: 'a', tag: 'trigger', why: '"A" (his) triggers séimhiú — this is a different "a" from "a" (her), which triggers no mutation at all, a subtlety worth knowing exists.' },
            { text: 'mháthair', tag: 'lenited', why: '"Máthair" (mother) becomes "mháthair" after "a" (his).', quizTarget: true, caseMarked: true },
            { text: 'ann.', tag: null },
          ],
          en: 'His mother was there.',
          context: 'A genuinely tricky point: "a" meaning "his" lenites, but "a" meaning "her" doesn\'t — same spelling, opposite grammatical behavior.',
          wordNotes: { 'Bhí': { pos: 'verb', note: 'was — past tense of "tá" from Unit 1.' } }
        },
      ],
      vocab: [
        { de: 'bean chéile', en: 'wife', tag: 'noun, lenited phrase' },
        { de: 'cat', en: 'cat', tag: 'noun' },
        { de: 'máthair', en: 'mother', tag: 'noun' },
        { de: 'mo', en: 'my (triggers séimhiú)', tag: 'possessive' },
        { de: 'do', en: 'your (triggers séimhiú)', tag: 'possessive' },
      ]
    },
    {
      id: 'a1-u4',
      title: '"An" — the definite article and the mutation it triggers',
      sub: '"The" in Irish isn\'t just a word — like "mo" and "do," it can trigger its own changes to the noun that follows.',
      grammarWhy: {
        headline: 'Why does "an" sometimes change the next word too?',
        body: '"An" (the) triggers séimhiú on feminine nouns starting with most consonants, but NOT on masculine nouns — gender (from Unit 1-adjacent vocabulary you\'ll build) determines the behavior, similar in spirit to how German\'s der/die/das changes for case. This means the article alone can tell you a noun\'s gender before you\'ve even memorized it separately — genuinely useful once it\'s automatic.'
      },
      conjugationTable: {
        title: '"An" (the) before feminine vs. masculine nouns',
        rows: [
          ['an bhean', 'the woman (fem.)', 'lenited: bean → bhean'],
          ['an fear', 'the man (masc.)', 'unchanged'],
          ['an cailín', 'the girl (fem., but starts with c which behaves differently)', 'see notes below'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Tá', tag: null },
            { text: 'an', tag: null },
            { text: 'bhean', tag: 'lenited', why: '"Bean" is feminine, so "an" lenites it to "bhean" — the same b→bh change from Unit 3, now triggered by the article instead of "mo."', quizTarget: true, caseMarked: true },
            { text: 'anseo.', tag: null },
          ],
          en: 'The woman is here.',
          context: 'Compare this to "mo bhean" from Unit 3 — different trigger word, identical mutation.',
          wordNotes: { 'anseo': { pos: 'adverb', note: 'here.' } }
        },
        {
          de: [
            { text: 'Tá', tag: null },
            { text: 'an', tag: null },
            { text: 'fear', tag: 'unchanged', why: '"Fear" (man) is masculine, so "an" does NOT lenite it — it stays exactly as its dictionary form.', quizTarget: true, caseMarked: true },
            { text: 'ard.', tag: null },
          ],
          en: 'The man is tall.',
          context: 'This is the contrast that matters: same article, opposite behavior, purely because of grammatical gender.',
          wordNotes: { 'ard': { pos: 'adjective', note: 'tall.' } }
        },
        {
          de: [
            { text: 'Feiceann', tag: null },
            { text: 'sé', tag: null },
            { text: 'an', tag: null },
            { text: 'teach.', tag: 'unchanged', why: '"Teach" (house) is masculine, so no lenition — reinforcing the same pattern as "fear" above.', quizTarget: true, caseMarked: true },
          ],
          en: 'He sees the house.',
          context: 'Reuses "feiceann" and "teach" from Unit 2, now with the article added.',
          regionNotes: {
            munster: 'Munster speakers often stress the article less and run "an teach" together quickly in casual speech.',
            connacht: 'Considered close to the "standard" pronunciation taught in most schools and apps.',
            ulster: 'Ulster Irish tends to give "an" a slightly fuller vowel sound than the clipped Munster/Connacht pronunciation.'
          }
        },
      ],
      vocab: [
        { de: 'an bhean', en: 'the woman', tag: 'noun phrase, fem.' },
        { de: 'an fear', en: 'the man', tag: 'noun phrase, masc.' },
        { de: 'anseo', en: 'here', tag: 'adv.' },
        { de: 'ard', en: 'tall', tag: 'adj.' },
      ]
    },
    {
      id: 'a1-u5',
      title: 'Present tense verbs — the regular pattern',
      sub: 'Most Irish verbs in the present tense follow one predictable ending, just like the trigger words from earlier units follow one predictable mutation.',
      grammarWhy: {
        headline: 'Why "ceannaím" but "ceannaíonn sí"?',
        body: 'Regular Irish verbs take an ending that depends on the subject — but unlike German, the ending itself can already contain the subject "I," so the pronoun "mé" is often dropped entirely with the "-aim/-im" first-person ending. Third person forms (sé/sí/siad) keep the pronoun and use a different ending, "-ann/-eann." This is why "ceannaíonn sí" (Unit 2) has both a verb ending AND a separate pronoun, while "ceannaím" packs the meaning "I buy" into one word.'
      },
      conjugationTable: {
        title: 'Ceannaigh — to buy (present tense)',
        rows: [
          ['ceannaím', 'I buy', 'pronoun built into the ending'],
          ['ceannaíonn tú', 'you buy', 'separate pronoun needed'],
          ['ceannaíonn sé/sí', 'he/she buys', 'separate pronoun needed'],
          ['ceannaímid', 'we buy', 'pronoun built into the ending'],
          ['ceannaíonn siad', 'they buy', 'separate pronoun needed'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Ceannaím', tag: '1st sg.', why: 'The "-aím" ending already means "I buy" — no separate "mé" is needed or used.', quizTarget: true, caseMarked: true },
            { text: 'arán.', tag: null },
          ],
          en: 'I buy bread.',
          context: 'One word doing the work of two — compare to "ceannaíonn sí" in Unit 2, which needs the separate pronoun "sí."',
          wordNotes: { 'arán': { pos: 'noun', note: 'bread.' } }
        },
        {
          de: [
            { text: 'Ólann', tag: '3rd sg.', why: '"-ann" is the third-person ending — and unlike "ceannaím," it requires the separate pronoun "sí" to say who.', quizTarget: true, caseMarked: true },
            { text: 'sí', tag: null },
            { text: 'uisce.', tag: null },
          ],
          en: 'She drinks water.',
          context: 'Reuses "ólann" from Unit 2 — now you can see explicitly why it needs "sí" while "ceannaím" doesn\'t need "mé."',
          wordNotes: { 'uisce': { pos: 'noun', note: 'water.' } }
        },
        {
          de: [
            { text: 'Ceannaímid', tag: '1st pl.', why: '"-aímid" packs in "we buy" the same way "-aím" packed in "I buy" — no separate pronoun needed.', quizTarget: true, caseMarked: true },
            { text: 'bainne.', tag: null },
          ],
          en: 'We buy milk.',
          context: 'The "we" pattern mirrors the "I" pattern exactly — both build the pronoun into the ending.',
          wordNotes: { 'bainne': { pos: 'noun', note: 'milk.' } }
        },
      ],
      vocab: [
        { de: 'ceannaím', en: 'I buy', tag: 'verb, 1st sg.' },
        { de: 'ceannaímid', en: 'we buy', tag: 'verb, 1st pl.' },
        { de: 'arán', en: 'bread', tag: 'noun' },
        { de: 'uisce', en: 'water', tag: 'noun' },
        { de: 'bainne', en: 'milk', tag: 'noun' },
      ]
    },
    {
      id: 'a1-u6',
      title: 'Counting people — Irish\'s separate numeral system',
      sub: 'Irish has one set of numbers for counting objects, and an entirely different set just for counting people. Mix them up and it sounds distinctly wrong.',
      grammarWhy: {
        headline: 'Why is there a different word for "two" when counting people?',
        body: 'Counting objects uses a fairly ordinary number system (a haon, a dó, a trí...). But counting people uses a completely separate set of words — duine (one person), beirt (two people), triúr (three people) — that don\'t derive from the regular numbers at all. This is a real, functioning grammatical category in Irish, not an optional style choice, and it\'s one of the clearest examples of how a language can encode a distinction (people vs. things) that English doesn\'t bother marking at all.'
      },
      conjugationTable: {
        title: 'Personal numerals (for counting people only)',
        rows: [
          ['duine amháin', '1 person', 'not beirt or triúr'],
          ['beirt', '2 people', 'triggers séimhiú on the noun that follows'],
          ['triúr', '3 people', 'also triggers séimhiú'],
          ['ceathrar', '4 people', ''],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Tá', tag: null },
            { text: 'beirt', tag: 'personal numeral', why: '"Beirt" specifically means "two people" — you could never use it to count two cats or two books.', quizTarget: true, caseMarked: true },
            { text: 'pháiste', tag: 'lenited', },
            { text: 'agam.', tag: null },
          ],
          en: 'I have two children. (lit. "Two children are at me")',
          context: 'Notice "beirt" also lenites the following noun — one more entry for your séimhiú-trigger list from Unit 3.',
          wordNotes: { 'agam': { pos: 'prepositional pronoun', note: '"at me" — this fused form is the whole subject of Unit 8.' } }
        },
        {
          de: [
            { text: 'Bhí', tag: null },
            { text: 'triúr', tag: 'personal numeral', why: '"Triúr" means specifically "three people" — the ordinary number "trí" would be wrong here.', quizTarget: true, caseMarked: true },
            { text: 'ann.', tag: null },
          ],
          en: 'There were three people there.',
          context: 'This is the natural, correct way to say "three people" — reaching for the regular number "trí" would sound like a learner\'s mistake.',
          wordNotes: { 'ann': { pos: 'adverb', note: 'there/present — used with "bhí" to mean "there was/were."' } }
        },
        {
          de: [
            { text: 'Ceannaíonn', tag: null },
            { text: 'sí', tag: null },
            { text: 'trí', tag: 'ordinary number', why: 'Contrast this with "triúr" above — "trí" (plain 3) is correct here because books aren\'t people.', quizTarget: true, caseMarked: true },
            { text: 'leabhar.', tag: null },
          ],
          en: 'She buys three books.',
          context: 'The exact contrast that matters: objects get "trí," people get "triúr" — never interchangeable.',
          wordNotes: { 'leabhar': { pos: 'noun', note: 'books — from Unit 2, unchanged after a number.' } }
        },
      ],
      vocab: [
        { de: 'duine amháin', en: 'one person', tag: 'personal numeral' },
        { de: 'beirt', en: 'two people', tag: 'personal numeral' },
        { de: 'triúr', en: 'three people', tag: 'personal numeral' },
        { de: 'trí', en: 'three (objects)', tag: 'ordinary number' },
        { de: 'agam', en: 'at me / I have', tag: 'prep. pronoun' },
      ]
    },
    {
      id: 'a1-u7',
      title: 'Prepositional pronouns — when a preposition and pronoun fuse into one word',
      sub: '"At me" isn\'t two words in Irish — it\'s one. This single feature explains how Irish expresses possession without a verb "to have" at all.',
      grammarWhy: {
        headline: 'Why is there no direct word for "have" in Irish?',
        body: 'Irish has no verb that means "to have" the way English, German, or French do. Instead, possession is expressed as "being at" someone: "tá leabhar agam" is literally "a book is at-me." The trick is that "ag" (at) plus "mé" (I/me) doesn\'t stay as two words — they fuse into "agam," a single form that changes for every pronoun. This is why "beirt pháiste agam" in Unit 6 meant "I have two children": there is no separate "have" verb hiding anywhere in that sentence.'
      },
      conjugationTable: {
        title: 'Ag (at) + pronoun → fused forms',
        rows: [
          ['agam', 'at me', '= ag + mé'],
          ['agat', 'at you', '= ag + tú'],
          ['aige', 'at him', '= ag + sé'],
          ['aici', 'at her', '= ag + sí'],
          ['againn', 'at us', '= ag + muid'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Tá', tag: null },
            { text: 'carr', tag: null },
            { text: 'agam.', tag: 'fused', why: '"Agam" = ag (at) + mé (me), fused into one word — this whole sentence means "I have a car" with no verb "have" anywhere in it.', quizTarget: true, caseMarked: true },
          ],
          en: 'I have a car. (lit. "A car is at-me")',
          context: 'The single most common way to express possession in Irish — worth internalizing early.',
          wordNotes: { 'carr': { pos: 'noun', note: 'car.' } }
        },
        {
          de: [
            { text: 'An', tag: null },
            { text: 'bhfuil', tag: null },
            { text: 'peann', tag: null },
            { text: 'agat?', tag: 'fused', why: '"Agat" = ag + tú, fused — "do you have a pen" with the same at-you construction.', quizTarget: true, caseMarked: true },
          ],
          en: 'Do you have a pen?',
          context: 'Same pattern as "agam," just the "you" version — the fusing happens for every single pronoun, not just "me."',
          wordNotes: { 'peann': { pos: 'noun', note: 'pen.' } }
        },
        {
          de: [
            { text: 'Tá', tag: null },
            { text: 'madra', tag: null },
            { text: 'aici.', tag: 'fused', why: '"Aici" = ag + sí, fused — "she has a dog," continuing the same pattern one more pronoun over.', quizTarget: true, caseMarked: true },
          ],
          en: 'She has a dog.',
          context: 'By now the pattern should feel predictable: possession is always "tá [thing] ag-[someone]," fused into one word.',
          wordNotes: { 'madra': { pos: 'noun', note: 'dog.' } }
        },
      ],
      vocab: [
        { de: 'agam', en: 'at me / I have', tag: 'prep. pronoun' },
        { de: 'agat', en: 'at you / you have', tag: 'prep. pronoun' },
        { de: 'aici', en: 'at her / she has', tag: 'prep. pronoun' },
        { de: 'carr', en: 'car', tag: 'noun' },
        { de: 'madra', en: 'dog', tag: 'noun' },
      ]
    },
    {
      id: 'a1-u8',
      title: 'Urú — the second mutation, eclipsis',
      sub: 'Séimhiú softens a consonant. Eclipsis replaces it with a completely different sound at the front of the word — and different trigger words call for different mutations.',
      grammarWhy: {
        headline: 'Why does "Baile Átha Cliath" become "i mBaile Átha Cliath"?',
        body: 'Urú (eclipsis) is Irish\'s other initial mutation, distinct from the séimhiú (lenition) covered in Unit 3. Instead of softening a consonant with an added h, eclipsis places a new consonant in front of the original, which then goes silent: b becomes mb (pronounced "m"), c becomes gc (pronounced "g"), and so on. Certain trigger words — like the preposition "i" (in), and numbers 7-10 — call for eclipsis specifically, not lenition. Knowing which trigger wants which mutation is simply a matter of memorizing the trigger word, the same discipline as memorizing German noun genders.'
      },
      conjugationTable: {
        title: 'Common eclipsis changes (urú)',
        rows: [
          ['b → mb', 'silent b, say "m"', 'Baile → mBaile'],
          ['c → gc', 'silent c, say "g"', 'Corcaigh → gCorcaigh'],
          ['d → nd', 'silent d, say "n"', 'doras → ndoras'],
          ['f → bhf', 'silent f, say "v/w"', 'fuinneog → bhfuinneog'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Tá', tag: null },
            { text: 'mé', tag: null },
            { text: 'i', tag: 'trigger', why: 'The preposition "i" (in) triggers eclipsis, not lenition — a different mutation from "mo"/"do" in Unit 3.' },
            { text: 'mBaile', tag: 'eclipsed', why: '"Baile" becomes "mBaile" — the b is now silent, and the word is actually pronounced starting with an "m" sound.', quizTarget: true, caseMarked: true },
            { text: 'Átha', tag: null },
            { text: 'Cliath.', tag: null },
          ],
          en: 'I am in Dublin.',
          context: '"Baile Átha Cliath" is Dublin\'s Irish name — literally "town of the ford of hurdles."',
          wordNotes: { 'i': { pos: 'preposition', note: '"in" — one of the core eclipsis triggers, distinct from lenition triggers like "mo."' } }
        },
        {
          de: [
            { text: 'Tá', tag: null },
            { text: 'sé', tag: null },
            { text: 'ina', tag: null },
            { text: 'chónaí', tag: null },
            { text: 'i', tag: 'trigger', why: 'Same trigger word "i" as above, same eclipsis rule.' },
            { text: 'gCorcaigh.', tag: 'eclipsed', why: '"Corcaigh" (Cork) becomes "gCorcaigh" — the c is silenced, replaced in pronunciation by a "g" sound.', quizTarget: true, caseMarked: true },
          ],
          en: 'He lives in Cork.',
          context: 'Same eclipsis rule, different place name, different letter pair (c→gc instead of b→mb).',
          wordNotes: { 'ina chónaí': { pos: 'phrase', note: 'lit. "in his residing" — the standard way to say where someone lives.' } }
        },
        {
          de: [
            { text: 'Dún', tag: null },
            { text: 'an', tag: null },
            { text: 'doras,', tag: 'unmutated', why: '"Doras" appears unmutated here — no trigger word precedes it in this command, unlike the eclipsed forms above.' },
            { text: 'le', tag: null },
            { text: 'do', tag: 'trigger', why: '"Do" (your) triggers séimhiú, not eclipsis — a reminder that trigger words are consistent in which mutation they demand.' },
            { text: 'thoil.', tag: 'lenited', why: '"Toil" becomes "thoil" after "do" — séimhiú from Unit 3, not the eclipsis this unit is about.', quizTarget: true, caseMarked: true },
          ],
          en: 'Close the door, please.',
          context: 'A useful contrast: this sentence has a lenition trigger ("do") but no eclipsis trigger, showing the two mutation systems side by side.',
          wordNotes: { 'Dún': { pos: 'verb (command)', note: 'close! — imperative form.' } }
        },
      ],
      vocab: [
        { de: 'i mBaile Átha Cliath', en: 'in Dublin', tag: 'phrase, eclipsed' },
        { de: 'i gCorcaigh', en: 'in Cork', tag: 'phrase, eclipsed' },
        { de: 'doras', en: 'door', tag: 'noun' },
        { de: 'le do thoil', en: 'please', tag: 'phrase' },
      ]
    },
    {
      id: 'a1-u9',
      title: 'Family and everyday phrases',
      sub: 'Consolidating the grammar from the last eight units into the vocabulary you\'ll actually reach for first: talking about family.',
      grammarWhy: {
        headline: 'Putting it together: possessives + lenition + the two "to be" verbs',
        body: 'Every family word here interacts with grammar you\'ve already learned: "mo" (Unit 3) still lenites, "tá" vs. "is" (Unit 1) still splits by state vs. identity, and prepositional pronouns (Unit 7) still handle possession. There\'s no new mechanism in this unit — it\'s deliberately built to prove the earlier units generalize to real vocabulary, not just the example sentences they were introduced with.'
      },
      conjugationTable: {
        title: 'Family words and the lenition they trigger with "mo"',
        rows: [
          ['mo dheartháir', 'my brother', 'deartháir → dheartháir'],
          ['mo dheirfiúr', 'my sister', 'deirfiúr → dheirfiúr'],
          ['m\'athair', 'my father', 'vowel-initial words use m\' instead of mo'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Is', tag: null },
            { text: 'dochtúir', tag: null },
            { text: 'é', tag: null },
            { text: 'mo', tag: 'trigger', why: '"Mo" still triggers lenition here, exactly as it did in Unit 3 — the rule doesn\'t change just because the vocabulary is new.' },
            { text: 'dheartháir.', tag: 'lenited', why: '"Deartháir" (brother) becomes "dheartháir" after "mo" — the same d→dh pattern from the séimhiú chart.', quizTarget: true, caseMarked: true },
          ],
          en: 'My brother is a doctor.',
          context: 'Uses "is" (Unit 1) since profession is an identity, not a state — and "mo" still lenites exactly as expected.',
          wordNotes: { 'dochtúir': { pos: 'noun', note: 'doctor.' } }
        },
        {
          de: [
            { text: 'Tá', tag: null },
            { text: 'mo', tag: 'trigger', why: 'Same trigger, same rule as the previous sentence.' },
            { text: 'dheirfiúr', tag: 'lenited', why: '"Deirfiúr" (sister) becomes "dheirfiúr" — identical mutation pattern to "dheartháir" above.', quizTarget: true, caseMarked: true },
            { text: 'tuirseach.', tag: null },
          ],
          en: 'My sister is tired.',
          context: 'This time "tá" is correct, not "is" — tiredness is a state (Unit 1), not an identity.',
          wordNotes: { 'tuirseach': { pos: 'adjective', note: 'tired — reused directly from Unit 1.' } }
        },
        {
          de: [
            { text: 'Tá', tag: null },
            { text: 'peann', tag: null },
            { text: 'ag', tag: null },
            { text: 'm\'athair.', tag: 'exception', why: '"Athair" starts with a vowel, so "mo" shortens to "m\'" instead of triggering séimhiú — a genuine exception worth flagging rather than hiding.', quizTarget: true, caseMarked: true },
          ],
          en: 'My father has a pen.',
          context: 'Vowel-initial nouns sidestep the consonant-mutation system entirely — "m\'athair," not "mo athair."',
          wordNotes: { 'athair': { pos: 'noun', note: 'father.' } }
        },
      ],
      vocab: [
        { de: 'deartháir', en: 'brother', tag: 'noun' },
        { de: 'deirfiúr', en: 'sister', tag: 'noun' },
        { de: 'athair', en: 'father', tag: 'noun' },
        { de: 'máthair', en: 'mother', tag: 'noun' },
        { de: 'dochtúir', en: 'doctor', tag: 'noun' },
      ]
    },
    {
      id: 'a1-u10',
      title: 'Plurals — the patterns behind Irish noun plurals',
      sub: 'Like German, Irish doesn\'t just add one ending for every plural — several patterns exist, and the right one has to be learned per noun.',
      grammarWhy: {
        headline: 'Why "leabhar" → "leabhair" but "fear" → "fir"?',
        body: 'Irish plurals form through several different mechanisms: adding "-anna" or "-í," broadening or slenderizing the final consonant (leabhar → leabhair), or, in a handful of very common nouns, an irregular internal vowel change (fear "man" → fir "men," entirely unpredictable from the singular). As with German in the earlier language you built, there\'s no single rule that covers every noun — dictionaries list the plural alongside the singular for exactly this reason, and the two are learned as a pair.'
      },
      conjugationTable: {
        title: 'Plural patterns',
        rows: [
          ['leabhar → leabhair', 'book → books', 'slenderized ending'],
          ['fear → fir', 'man → men', 'irregular, internal change'],
          ['bean → mná', 'woman → women', 'irregular, different stem entirely'],
          ['teach → tithe', 'house → houses', 'irregular'],
        ]
      },
      sentences: [
        {
          de: [
            { text: 'Tá', tag: null },
            { text: 'go', tag: null },
            { text: 'leor', tag: null },
            { text: 'leabhair', tag: 'plural', why: '"Leabhar" (Unit 2) becomes "leabhair" in the plural — a slenderized ending, one of the more predictable plural patterns.', quizTarget: true, caseMarked: true },
            { text: 'agam.', tag: null },
          ],
          en: 'I have enough books.',
          context: 'Reuses "leabhar" from Unit 2 and "agam" from Unit 7 — the plural pattern layered on top of grammar you already know.',
          wordNotes: { 'go leor': { pos: 'phrase', note: 'enough/plenty.' } }
        },
        {
          de: [
            { text: 'Tá', tag: null },
            { text: 'fir', tag: 'plural, irregular', why: '"Fear" (man, Unit 4) becomes "fir" (men) — a genuinely irregular internal change, not a predictable ending.', quizTarget: true, caseMarked: true },
            { text: 'ag', tag: null },
            { text: 'obair.', tag: null },
          ],
          en: 'Men are working.',
          context: 'No amount of pattern-matching predicts "fir" from "fear" — this one simply has to be memorized directly, same as German\'s irregular plurals.',
          wordNotes: { 'ag obair': { pos: 'phrase', note: '"at work" — working, using the same "ag" preposition family as the possession construction in Unit 7.' } }
        },
        {
          de: [
            { text: 'Tá', tag: null },
            { text: 'mná', tag: 'plural, irregular', why: '"Bean" (woman, Unit 3/4) becomes "mná" — an entirely different-looking stem, the most irregular plural in this unit.', quizTarget: true, caseMarked: true },
            { text: 'anseo.', tag: null },
          ],
          en: 'Women are here.',
          context: 'The most dramatic plural change in this set — nothing about "bean" hints at "mná" at all.',
          wordNotes: { 'anseo': { pos: 'adverb', note: 'here — reused from Unit 4.' } }
        },
      ],
      vocab: [
        { de: 'leabhair', en: 'books', tag: 'noun, pl.' },
        { de: 'fir', en: 'men', tag: 'noun, pl., irregular' },
        { de: 'mná', en: 'women', tag: 'noun, pl., irregular' },
        { de: 'tithe', en: 'houses', tag: 'noun, pl., irregular' },
        { de: 'go leor', en: 'enough/plenty', tag: 'phrase' },
      ]
    }
    ],
    a2: [], b1: [], b2: [], c1: [], c2: []
  },
  vi: {
    a1: [placeholderUnit('Vietnamese')],
    a2: [], b1: [], b2: [], c1: [], c2: []
  },
};

// ============================================================
// FAMILIAR PHRASES — content you already know, translated
// ============================================================
// Every source here is either public domain or, for Latin, the actual
// original text (not a translation at all). Nothing modern/copyrighted
// is used — see the app's Familiar screen intro for why.
const FAMILIAR_PHRASES = {
  de: [
    {
      id: 'fam-shakespeare',
      category: 'Shakespeare',
      sourceNote: 'Hamlet, Act 3 — written c. 1600, public domain everywhere.',
      englishFamiliar: 'To be, or not to be, that is the question.',
      de: [
        { text: 'Sein', tag: null, why: 'The infinitive "sein" (to be) opens the line, mirroring the English "To be" — both languages front the verb here for the same dramatic weight.', quizTarget: true, caseMarked: true },
        { text: 'oder', tag: null },
        { text: 'Nichtsein,', tag: null },
        { text: 'das', tag: null },
        { text: 'ist', tag: null },
        { text: 'die', tag: null },
        { text: 'Frage.', tag: null },
      ],
      wordNotes: { 'Nichtsein': { pos: 'noun', note: 'literally "not-being" — German compounds "nicht" (not) directly onto "sein" (to be) to form one word, where English needs three.' } },
    },
    {
      id: 'fam-declaration',
      category: 'Famous speech',
      sourceNote: 'U.S. Declaration of Independence, 1776 — a government document, never copyrighted.',
      englishFamiliar: 'We hold these truths to be self-evident, that all men are created equal.',
      de: [
        { text: 'Wir', tag: null },
        { text: 'halten', tag: null, why: '"Halten" (to hold) takes the regular -en verb pattern — the same family as Unit 3\'s "wohnen."', quizTarget: true, caseMarked: true },
        { text: 'diese', tag: null },
        { text: 'Wahrheiten', tag: null },
        { text: 'für', tag: null },
        { text: 'selbstverständlich,', tag: null },
        { text: 'dass', tag: null },
        { text: 'alle', tag: null },
        { text: 'Menschen', tag: null },
        { text: 'gleich', tag: null },
        { text: 'geschaffen', tag: null },
        { text: 'sind.', tag: null },
      ],
      wordNotes: { 'selbstverständlich': { pos: 'adjective', note: 'literally "self-understood" — German\'s own compound for "self-evident."' } },
    },
    {
      id: 'fam-fdr',
      category: 'Famous speech',
      sourceNote: 'FDR\'s First Inaugural Address, 1933 — an official U.S. presidential speech, never copyrighted.',
      englishFamiliar: 'The only thing we have to fear is fear itself.',
      de: [
        { text: 'Das', tag: null },
        { text: 'Einzige,', tag: null },
        { text: 'was', tag: null },
        { text: 'wir', tag: null },
        { text: 'fürchten', tag: null, why: '"Fürchten" (to fear) is the regular -en verb pattern from Unit 3, now in a famous line instead of a textbook sentence.', quizTarget: true, caseMarked: true },
        { text: 'müssen,', tag: null },
        { text: 'ist', tag: null },
        { text: 'die', tag: null },
        { text: 'Furcht', tag: null },
        { text: 'selbst.', tag: null },
      ],
      wordNotes: { 'Furcht': { pos: 'noun, fem.', note: 'fear (the noun) — related to but distinct from "fürchten" (the verb).' } },
    },
    {
      id: 'fam-rhythm',
      category: '1930 song',
      sourceNote: '"I Got Rhythm," George & Ira Gershwin, 1930 — the composition entered the public domain Jan 1, 2026.',
      englishFamiliar: 'I got rhythm, I got music, I got my man.',
      de: [
        { text: 'Ich', tag: null },
        { text: 'habe', tag: null, why: 'Reuses "haben" directly from Unit 4 — the exact same "I have X" pattern as "Ich habe Hunger."', quizTarget: true, caseMarked: true },
        { text: 'Rhythmus,', tag: null },
        { text: 'ich', tag: null },
        { text: 'habe', tag: null },
        { text: 'Musik,', tag: null },
        { text: 'ich', tag: null },
        { text: 'habe', tag: null },
        { text: 'meinen', tag: null },
        { text: 'Mann.', tag: null },
      ],
      wordNotes: { 'Rhythmus': { pos: 'noun, masc.', note: 'rhythm — a near-direct loanword, easy to recognize.' } },
    },
    {
      id: 'fam-proverb',
      category: 'Proverb',
      sourceNote: 'Not copyrightable — proverbs are traditional/anonymous.',
      englishFamiliar: 'The early bird catches the worm.',
      de: [
        { text: 'Der', tag: null },
        { text: 'frühe', tag: null },
        { text: 'Vogel', tag: null },
        { text: 'fängt', tag: null, why: 'This proverb is a near word-for-word match to English. Not every phrase translates this cleanly.', quizTarget: true, caseMarked: true },
        { text: 'den', tag: 'acc.', why: '"Den Wurm" — accusative case from Unit 5, since the worm is the object being caught.' },
        { text: 'Wurm.', tag: null },
      ],
      wordNotes: { 'fängt': { pos: 'verb', note: 'catches — irregular verb "fangen," stem-changes a→ä.' } },
    },
    {
      id: 'fam-stillenacht',
      category: 'Original language',
      sourceNote: '"Stille Nacht," 1818 — this is the ORIGINAL. Josef Mohr wrote it in German first; "Silent Night" is the translation.',
      englishFamiliar: '(You know this as "Silent Night" — but German came first.)',
      de: [
        { text: 'Stille', tag: null, why: 'The actual original opening word — "Silent Night" descends from this German line, not the reverse.', quizTarget: true, caseMarked: true },
        { text: 'Nacht,', tag: null },
        { text: 'heilige', tag: null },
        { text: 'Nacht.', tag: null },
      ],
      wordNotes: { 'heilige': { pos: 'adjective', note: 'holy — "heilige Nacht" is literally "holy night."' } },
    },
  ],
  ga: [
    {
      id: 'fam-shakespeare',
      category: 'Shakespeare',
      sourceNote: 'Hamlet, Act 3 — written c. 1600, public domain everywhere.',
      englishFamiliar: 'To be, or not to be, that is the question.',
      de: [
        { text: 'Bheith', tag: null, why: '"Bheith" (to be) opens the line — Irish fronts the verb concept here, same instinct as German\'s "Sein oder Nichtsein."', quizTarget: true, caseMarked: true },
        { text: 'nó', tag: null },
        { text: 'gan', tag: null },
        { text: 'a', tag: null },
        { text: 'bheith,', tag: null },
        { text: 'sin', tag: null },
        { text: 'í', tag: null },
        { text: 'an', tag: null },
        { text: 'cheist.', tag: null },
      ],
      wordNotes: { 'gan': { pos: 'preposition', note: '"without" — "gan a bheith" is literally "without to-be."' } },
    },
    {
      id: 'fam-declaration',
      category: 'Famous speech',
      sourceNote: 'U.S. Declaration of Independence, 1776 — a government document, never copyrighted.',
      englishFamiliar: 'We hold these truths to be self-evident, that all men are created equal.',
      de: [
        { text: 'Táimid', tag: null, why: 'Reuses the "-aímid" ending from Unit 5\'s "ceannaímid" (we buy) — "we" is built into the verb ending.', quizTarget: true, caseMarked: true },
        { text: 'ag', tag: null },
        { text: 'coinneáil', tag: null },
        { text: 'na', tag: null },
        { text: 'fírinní', tag: null },
        { text: 'seo', tag: null },
        { text: 'soiléir', tag: null },
        { text: 'go', tag: null },
        { text: 'bhfuil', tag: null },
        { text: 'gach', tag: null },
        { text: 'duine', tag: null },
        { text: 'comhionann.', tag: null },
      ],
      wordNotes: { 'duine': { pos: 'noun', note: 'person — the same word from Unit 6\'s "duine amháin," one person.' } },
    },
    {
      id: 'fam-fdr',
      category: 'Famous speech',
      sourceNote: 'FDR\'s First Inaugural Address, 1933 — an official U.S. presidential speech, never copyrighted.',
      englishFamiliar: 'The only thing we have to fear is fear itself.',
      de: [
        { text: 'Is', tag: null, why: 'The identity/classification "is" from Unit 1 — "fear itself" is being defined as the one thing, an identity statement.', quizTarget: true, caseMarked: true },
        { text: 'é', tag: null },
        { text: 'an', tag: null },
        { text: 't-eagla', tag: null },
        { text: 'féin', tag: null },
        { text: 'an', tag: null },
        { text: 't-aon', tag: null },
        { text: 'rud', tag: null },
        { text: 'atá', tag: null },
        { text: 'le', tag: null },
        { text: 'eagla', tag: null },
        { text: 'a', tag: null },
        { text: 'bheith', tag: null },
        { text: 'orainn', tag: null },
        { text: 'roimhe.', tag: null },
      ],
      wordNotes: { 'orainn': { pos: 'prepositional pronoun', note: '"on us" — ar + muid, fused the same way "agam" fused in Unit 7.' } },
    },
    {
      id: 'fam-rhythm',
      category: '1930 song',
      sourceNote: '"I Got Rhythm," George & Ira Gershwin, 1930 — the composition entered the public domain Jan 1, 2026.',
      englishFamiliar: 'I got rhythm, I got music, I got my man.',
      de: [
        { text: 'Tá', tag: null },
        { text: 'rithim', tag: null },
        { text: 'agam,', tag: null, why: 'Reuses Unit 7\'s possession construction — "rithim agam" is literally "rhythm at-me," same pattern as "carr agam."', quizTarget: true, caseMarked: true },
        { text: 'tá', tag: null },
        { text: 'ceol', tag: null },
        { text: 'agam,', tag: null },
        { text: 'tá', tag: null },
        { text: 'mo', tag: null },
        { text: 'fhear', tag: null },
        { text: 'agam.', tag: null },
      ],
      wordNotes: { 'ceol': { pos: 'noun', note: 'music.' } },
    },
    {
      id: 'fam-proverb',
      category: 'Proverb',
      sourceNote: 'A traditional Irish proverb — not copyrightable, anonymous/traditional.',
      englishFamiliar: '"Ní neart go cur le chéile" — there is no strength without unity.',
      de: [
        { text: 'Ní', tag: null },
        { text: 'neart', tag: null },
        { text: 'go', tag: null },
        { text: 'cur', tag: null, why: 'A genuinely traditional Irish proverb — the Irish IS the original here, the same relationship German\'s "Stille Nacht" has to "Silent Night."', quizTarget: true, caseMarked: true },
        { text: 'le', tag: null },
        { text: 'chéile.', tag: null },
      ],
      wordNotes: { 'chéile': { pos: 'noun (lenited)', note: 'each other/together — same word from Unit 3\'s "bean chéile."' } },
    },
  ],
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

// ============================================================
// AUDIO — file convention and manifest
// ============================================================
// Convention: audio/{langId}/{regionId}/{unitId}-{sentenceIndex}.mp3
// Drop generated clips into these exact paths (relative to index.html)
// and playback picks them up automatically — no code changes needed.
// e.g. audio/de/at/a1-u1-0.mp3 is the Austrian reading of the first
// sentence in German Unit 1.

// Filesystem-safe slug for a word/phrase's audio filename. Diacritics are
// stripped here (filename only) — the CSV export always keeps the real
// spelling, since that's what actually gets fed into the TTS tool. If two
// different words collapse to the same slug (e.g. "schon" and "schön"),
// a numeric suffix disambiguates them.
function audioPath(langId, regionId, unitId, sentenceIndex) {
  return `audio/${langId}/${regionId}/${unitId}-${sentenceIndex}.mp3`;
}

const _slugRegistry = {}; // slug -> array of original texts already assigned to it
function slugifyWord(text) {
  const base = text
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'x';
  const key = base;
  if (!_slugRegistry[key]) _slugRegistry[key] = [];
  const existingIndex = _slugRegistry[key].indexOf(text);
  if (existingIndex !== -1) {
    return existingIndex === 0 ? base : `${base}-${existingIndex + 1}`;
  }
  _slugRegistry[key].push(text);
  const idx = _slugRegistry[key].length - 1;
  return idx === 0 ? base : `${base}-${idx + 1}`;
}

function wordAudioPath(langId, regionId, word) {
  return `audio/${langId}/${regionId}/words/${slugifyWord(word)}.mp3`;
}

// Unique word/phrase set per language: every sentence token plus every
// vocab-strip entry, deduplicated (case-insensitive) so a word repeated
// across units only needs generating once per dialect.
// ============================================================
// ACTIVE RECALL — spaced-repetition deck
// ============================================================
// Deck cards come from every real unit's vocab list for a language
// (already has target word + English gloss + part of speech — a
// ready-made flashcard). Deduplicated the same way word audio is,
// since the same word often reappears across units.
function collectRecallDeck(langId) {
  const seen = new Set();
  const deck = [];
  const levels = UNITS_BY_LANG[langId] || {};
  Object.values(levels).forEach(units => {
    units.forEach(unit => {
      if (unit.placeholder) return;
      unit.vocab.forEach(v => {
        const key = v.de.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        deck.push({ key, de: v.de, en: v.en, tag: v.tag, unitId: unit.id });
      });
    });
  });
  return deck;
}

function buildWordAudioManifest() {
  const rows = [];
  LANGUAGES.forEach(lang => {
    const regions = REGIONS[lang.id] || [];
    const levels = UNITS_BY_LANG[lang.id] || {};
    const seen = new Set(); // lowercased text already added for this language
    const uniqueTexts = [];
    Object.values(levels).forEach(units => {
      units.forEach(unit => {
        if (unit.placeholder) return;
        unit.sentences.forEach(s => s.de.forEach(w => {
          const clean = w.text.replace(/[.,?]$/, '');
          const key = clean.toLowerCase();
          if (!seen.has(key)) { seen.add(key); uniqueTexts.push(clean); }
        }));
        unit.vocab.forEach(v => {
          const key = v.de.toLowerCase();
          if (!seen.has(key)) { seen.add(key); uniqueTexts.push(v.de); }
        });
      });
    });
    uniqueTexts.forEach(text => {
      regions.forEach(region => {
        rows.push({
          langId: lang.id,
          langName: lang.name,
          regionId: region.id,
          regionLabel: region.label,
          text,
          path: wordAudioPath(lang.id, region.id, text),
        });
      });
    });
  });
  return rows;
}


// Walks every real (non-placeholder) sentence across every language and
// every region that language supports, and returns one manifest row per
// combination — the full list of audio files the app can ever try to play.
function buildAudioManifest() {
  const rows = [];
  LANGUAGES.forEach(lang => {
    const regions = REGIONS[lang.id] || [];
    const levels = UNITS_BY_LANG[lang.id] || {};
    Object.entries(levels).forEach(([levelId, units]) => {
      units.forEach(unit => {
        if (unit.placeholder) return;
        unit.sentences.forEach((sentence, sentenceIndex) => {
          regions.forEach(region => {
            rows.push({
              langId: lang.id,
              langName: lang.name,
              regionId: region.id,
              regionLabel: region.label,
              levelId,
              unitId: unit.id,
              sentenceIndex,
              path: audioPath(lang.id, region.id, unit.id, sentenceIndex),
              text: sentence.de.map(w => w.text).join(' '),
              englishGloss: sentence.en,
            });
          });
        });
      });
    });
  });
  return rows;
}

