/**
 * Branching Valentine's decision tree.
 *
 * Goals:
 * - Each answer selects the next question (true branching flow).
 * - The journey always converges to the final proposal.
 * - There are 12 question steps before the proposal prompt.
 */

const fixedNodes = {
  intro: {
    id: 'intro',
    type: 'statement',
    category: 'intro',
    emoji: '🌙',
    text: 'Hey Sweetu ❤️',
    subtext: 'I have something important to ask you. But first, a little moonlit journey together.',
    options: [
      { label: "I'm ready", tone: 'romantic', nextId: 'q1_bad_jokes' },
    ],
  },

  preProposal: {
    id: 'preProposal',
    type: 'statement',
    category: 'cinematic',
    emoji: '🌕',
    text: "Sweetu, we've traveled through laughter, memories, and moonlight...",
    subtext: "And now there's just one question left.",
    options: [
      { label: 'Ask me', tone: 'anticipation', nextId: 'final' },
    ],
  },

  final: {
    id: 'final',
    type: 'final',
    category: 'proposal',
    emoji: '💝',
    text: 'Sweetu ❤️ Will you be my Valentine?',
    subtext: 'This is the only question that truly matters.',
    options: [
      { label: 'YES! 💕', tone: 'ecstatic', nextId: 'celebration' },
    ],
  },

  celebration: {
    id: 'celebration',
    type: 'celebration',
    category: 'celebration',
    emoji: '🎉',
    text: 'Sweetu, you just made me the happiest person alive.',
    subtext: 'This is just the beginning of our forever. 🌙',
    options: [],
  },
};

const questionNodes = {
  // Q1
  q1_bad_jokes: {
    id: 'q1_bad_jokes',
    type: 'question',
    category: 'playful',
    emoji: '😂',
    text: 'Could you survive my terrible jokes... forever, Sweetu?',
    subtext: 'Be honest. This is a high-stakes compatibility test.',
    options: [
      { label: 'Yes, tell me one', tone: 'playful', nextId: 'q2_joke_delivered' },
      { label: 'Only if it is short', tone: 'playful', nextId: 'q2_joke_soft' },
    ],
  },

  // Q2 (branch from Q1)
  q2_joke_delivered: {
    id: 'q2_joke_delivered',
    type: 'question',
    category: 'playful',
    emoji: '😅',
    text: 'Why did the moon skip dinner? It was already full. Still surviving?',
    subtext: 'I warned you my jokes are aggressively silly.',
    options: [
      { label: "That was so bad it's cute", tone: 'flirty', nextId: 'q3_destiny_yes' },
      { label: 'I demand emotional compensation', tone: 'playful', nextId: 'q3_destiny_no' },
    ],
  },

  q2_joke_soft: {
    id: 'q2_joke_soft',
    type: 'question',
    category: 'playful',
    emoji: '🤭',
    text: 'Should I still risk one tiny stupid joke, or switch to romance mode?',
    subtext: 'I can be dramatic and respectful at the same time.',
    options: [
      { label: 'Risk it, comedian', tone: 'playful', nextId: 'q3_destiny_yes' },
      { label: 'Go romantic now', tone: 'romantic', nextId: 'q3_destiny_no' },
    ],
  },

  // Q3 (branch)
  q3_destiny_yes: {
    id: 'q3_destiny_yes',
    type: 'question',
    category: 'destiny',
    emoji: '✨',
    text: 'Do you think we were meant to find each other, Sweetu?',
    subtext: 'Like the universe quietly nudged us together.',
    options: [
      { label: 'Absolutely yes', tone: 'romantic', nextId: 'q4_memory_deep' },
      { label: 'Maybe... and I love that', tone: 'emotional', nextId: 'q4_memory_light' },
    ],
  },

  q3_destiny_no: {
    id: 'q3_destiny_no',
    type: 'question',
    category: 'destiny',
    emoji: '🌌',
    text: 'If not destiny, then maybe a thousand little choices brought us here?',
    subtext: 'Either way, I am grateful for every step that led to you.',
    options: [
      { label: 'I love that thought', tone: 'romantic', nextId: 'q4_memory_deep' },
      { label: 'Then let us choose each other', tone: 'emotional', nextId: 'q4_memory_light' },
    ],
  },

  // Q4 (branch)
  q4_memory_deep: {
    id: 'q4_memory_deep',
    type: 'question',
    category: 'memory',
    emoji: '📸',
    text: 'Which memory of us still replays in your mind the most?',
    subtext: 'Mine changes daily, and somehow keeps getting better.',
    options: [
      { label: 'Our first real moment', tone: 'emotional', nextId: 'q5_moon_walk' },
      { label: 'This one right now', tone: 'romantic', nextId: 'q5_moon_walk' },
    ],
  },

  q4_memory_light: {
    id: 'q4_memory_light',
    type: 'question',
    category: 'memory',
    emoji: '💭',
    text: 'Should tonight become one of our favorite memories?',
    subtext: 'I am very willing to make this story unforgettable.',
    options: [
      { label: 'Yes, lock it in', tone: 'romantic', nextId: 'q5_moon_walk' },
      { label: 'Only if you stay close', tone: 'flirty', nextId: 'q5_moon_walk' },
    ],
  },

  // Q5
  q5_moon_walk: {
    id: 'q5_moon_walk',
    type: 'question',
    category: 'moonlight',
    emoji: '🌙',
    text: 'Moonlit walk tonight: slow and sweet, or dramatic and cinematic?',
    subtext: 'Either way, I am holding your hand the entire time.',
    options: [
      { label: 'Slow and sweet', tone: 'romantic', nextId: 'q6_future_home' },
      { label: 'Dramatic and cinematic', tone: 'playful', nextId: 'q6_future_adventure' },
    ],
  },

  // Q6 (branch)
  q6_future_home: {
    id: 'q6_future_home',
    type: 'question',
    category: 'future',
    emoji: '🏡',
    text: 'Can you picture us building a cozy life together, one soft morning at a time?',
    subtext: 'Coffee, comfort, and the same favorite person every day.',
    options: [
      { label: 'I can see it clearly', tone: 'romantic', nextId: 'q7_support' },
      { label: 'That sounds perfect', tone: 'emotional', nextId: 'q7_support' },
    ],
  },

  q6_future_adventure: {
    id: 'q6_future_adventure',
    type: 'question',
    category: 'future',
    emoji: '🗺️',
    text: 'Can you picture us chasing adventures, taking wrong turns, and laughing anyway?',
    subtext: 'Road trips, late-night snacks, and no boring chapters.',
    options: [
      { label: 'Adventure with you, always', tone: 'romantic', nextId: 'q7_support' },
      { label: 'Only if we bring playlists', tone: 'playful', nextId: 'q7_support' },
    ],
  },

  // Q7
  q7_support: {
    id: 'q7_support',
    type: 'question',
    category: 'romantic',
    emoji: '🫶',
    text: 'When life gets heavy, will you let me be your safe place?',
    subtext: 'I cannot stop every storm, but I can stand in all of them with you.',
    options: [
      { label: 'Yes, always', tone: 'emotional', nextId: 'q8_love_language_soft' },
      { label: 'Yes, with extra hugs', tone: 'playful', nextId: 'q8_love_language_playful' },
    ],
  },

  // Q8 (branch)
  q8_love_language_soft: {
    id: 'q8_love_language_soft',
    type: 'question',
    category: 'romantic',
    emoji: '💌',
    text: 'What reaches your heart faster: gentle words or steady actions?',
    subtext: 'I want to love you in the way you feel most deeply.',
    options: [
      { label: 'Words that feel true', tone: 'romantic', nextId: 'q9_moon_diary' },
      { label: 'Actions that prove it', tone: 'emotional', nextId: 'q9_moon_diary' },
    ],
  },

  q8_love_language_playful: {
    id: 'q8_love_language_playful',
    type: 'question',
    category: 'playful',
    emoji: '🍟',
    text: 'Important couple policy: no sleeping angry, or no stealing fries?',
    subtext: 'We can negotiate all terms except loving each other.',
    options: [
      { label: 'No sleeping angry', tone: 'romantic', nextId: 'q9_moon_diary' },
      { label: 'Fries are sacred', tone: 'playful', nextId: 'q9_moon_diary' },
    ],
  },

  // Q9
  q9_moon_diary: {
    id: 'q9_moon_diary',
    type: 'question',
    category: 'moonlight',
    emoji: '🌕',
    text: 'If the moon kept a diary, should our story be tonight\'s headline?',
    subtext: 'I think it would write: "Two idiots in love, finally honest."',
    options: [
      { label: 'Headline material for sure', tone: 'romantic', nextId: 'q10_music_yes' },
      { label: 'Only if it includes your joke', tone: 'playful', nextId: 'q10_music_no' },
    ],
  },

  // Q10 (branch)
  q10_music_yes: {
    id: 'q10_music_yes',
    type: 'question',
    category: 'romantic',
    emoji: '🎵',
    text: 'Should our love story have one signature song, or a whole chaotic playlist?',
    subtext: 'I will still dance with you either way.',
    options: [
      { label: 'One signature song', tone: 'romantic', nextId: 'q11_choose_daily' },
      { label: 'Chaotic playlist forever', tone: 'playful', nextId: 'q11_choose_daily' },
    ],
  },

  q10_music_no: {
    id: 'q10_music_no',
    type: 'question',
    category: 'cinematic',
    emoji: '🎬',
    text: 'Or should we skip music and let the silence between us do all the talking?',
    subtext: 'Sometimes the quiet moments say everything.',
    options: [
      { label: 'Silence can be beautiful', tone: 'emotional', nextId: 'q11_choose_daily' },
      { label: 'Fine... but one dance anyway', tone: 'flirty', nextId: 'q11_choose_daily' },
    ],
  },

  // Q11
  q11_choose_daily: {
    id: 'q11_choose_daily',
    type: 'question',
    category: 'romantic',
    emoji: '❤️',
    text: 'Big question before the biggest one: will you keep choosing us, day after day?',
    subtext: 'Not just in easy moments. In all of them.',
    options: [
      { label: 'Yes, every day', tone: 'romantic', nextId: 'q12_last_gate' },
      { label: 'Yes, without hesitation', tone: 'emotional', nextId: 'q12_last_gate' },
    ],
  },

  // Q12
  q12_last_gate: {
    id: 'q12_last_gate',
    type: 'question',
    category: 'cinematic',
    emoji: '🌟',
    text: 'Last step before the real question... should I ask it right now?',
    subtext: 'My heart is ready. I just need your signal.',
    options: [
      { label: 'Ask me now', tone: 'anticipation', nextId: 'preProposal' },
      { label: "I'm ready", tone: 'romantic', nextId: 'preProposal' },
    ],
  },
};

const nodes = {
  ...fixedNodes,
  ...questionNodes,
};

export const START_NODE_ID = 'intro';

// 12 question nodes before the final proposal prompt.
export const TOTAL_STEPS = 12;

export function getNode(id) {
  return nodes[id] || null;
}

export function getNextNodeId(nodeId, option) {
  return option?.nextId || nodes[nodeId]?.nextId || null;
}

export default nodes;
