/**
 * Dynamic Valentine's journey engine.
 *
 * 100 unique questions across 8 emotional categories.
 * Each page load builds a fresh 8-question path following:
 *   playful → destiny → memory → moonlight → future → support → romantic → cinematic
 * Both answer choices always advance — the journey converges to the final proposal.
 */

// ═══════════════════════════════════════════════════════════════
// FIXED NODES (always present)
// ═══════════════════════════════════════════════════════════════

const fixedNodes = {
  intro: {
    id: 'intro',
    type: 'statement',
    category: 'intro',
    emoji: '🌙',
    text: 'Hey Sweetu ❤️',
    subtext: 'I have something important to ask you. But first, a little moonlit journey together.',
    options: [
      { label: "I'm ready", tone: 'romantic', nextId: null }, // wired at build time
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

// ═══════════════════════════════════════════════════════════════
// 100-QUESTION BANK
// ═══════════════════════════════════════════════════════════════

const QUESTION_BANK = [
  // ─── PLAYFUL (15) ────────────────────────────────────────────
  {
    category: 'playful',
    emoji: '😂',
    text: 'Could you survive my terrible jokes... forever?',
    subtext: 'Be honest. This is a high-stakes compatibility test.',
    options: [
      { label: 'Yes, tell me one', tone: 'playful' },
      { label: "Only if they're short", tone: 'cautious' },
    ],
  },
  {
    category: 'playful',
    emoji: '🍟',
    text: 'Critical relationship policy: sharing fries or separate orders?',
    subtext: 'This answer reveals more about you than any personality test.',
    options: [
      { label: 'Always sharing', tone: 'generous' },
      { label: 'My fries are sacred', tone: 'firm' },
    ],
  },
  {
    category: 'playful',
    emoji: '😅',
    text: 'If I sang you a love song completely off-key, would you still smile?',
    subtext: 'Fair warning: my singing voice is... an acquired taste.',
    options: [
      { label: "I'd join in worse", tone: 'playful' },
      { label: "I'd secretly record it", tone: 'mischievous' },
    ],
  },
  {
    category: 'playful',
    emoji: '🤭',
    text: "Be honest — am I funnier when I try, or when I don't?",
    subtext: 'My ego can handle it. Maybe.',
    options: [
      { label: "When you don't try", tone: 'honest' },
      { label: 'Both, honestly', tone: 'kind' },
    ],
  },
  {
    category: 'playful',
    emoji: '🏝️',
    text: 'Stuck on a deserted island together — who panics first?',
    subtext: 'This is purely for emergency planning purposes.',
    options: [
      { label: 'Definitely you', tone: 'teasing' },
      { label: "We'd panic together", tone: 'realistic' },
    ],
  },
  {
    category: 'playful',
    emoji: '🧁',
    text: 'Midnight snack together — sweet or savory?',
    subtext: 'Choose wisely. This affects our entire future kitchen.',
    options: [
      { label: 'Sweet, always', tone: 'sweet' },
      { label: 'Savory and chaotic', tone: 'adventurous' },
    ],
  },
  {
    category: 'playful',
    emoji: '📱',
    text: 'If I texted you 47 memes in a row, would you open every one?',
    subtext: 'Because that might already be happening.',
    options: [
      { label: 'Every. Single. One.', tone: 'dedicated' },
      { label: 'Only the cat ones', tone: 'selective' },
    ],
  },
  {
    category: 'playful',
    emoji: '🎬',
    text: 'Movie night: fight over the remote or take turns?',
    subtext: 'I should mention I have strong opinions about rom-coms.',
    options: [
      { label: "You pick, I'll snuggle", tone: 'sweet' },
      { label: 'We alternate fairly', tone: 'fair' },
    ],
  },
  {
    category: 'playful',
    emoji: '☕',
    text: 'Would you bring me chai in bed on a lazy Sunday?',
    subtext: "I'd bring you the whole breakfast, just saying.",
    options: [
      { label: 'Only if you ask nicely', tone: 'flirty' },
      { label: 'Chai and cuddles, done', tone: 'sweet' },
    ],
  },
  {
    category: 'playful',
    emoji: '🐶',
    text: 'Important debate: if we got a dog, who would it love more?',
    subtext: "There's only one correct answer here.",
    options: [
      { label: 'Obviously me', tone: 'confident' },
      { label: "We'd share the love", tone: 'diplomatic' },
    ],
  },
  {
    category: 'playful',
    emoji: '💤',
    text: 'Do you steal blankets in your sleep? I need to prepare.',
    subtext: 'I have backup blanket strategies ready.',
    options: [
      { label: "I'm a blanket thief", tone: 'honest' },
      { label: "I'm very well behaved", tone: 'innocent' },
    ],
  },
  {
    category: 'playful',
    emoji: '💃',
    text: 'If I challenged you to a dance-off right now, would you accept?',
    subtext: 'My moves are questionable but my enthusiasm is unmatched.',
    options: [
      { label: 'Bring it on', tone: 'competitive' },
      { label: 'Only if nobody watches', tone: 'shy' },
    ],
  },
  {
    category: 'playful',
    emoji: '🌮',
    text: 'Late night food run at 2am — are you in?',
    subtext: 'The best conversations happen over unexpected food.',
    options: [
      { label: 'Always, no questions', tone: 'enthusiastic' },
      { label: "Only if you're driving", tone: 'practical' },
    ],
  },
  {
    category: 'playful',
    emoji: '🤝',
    text: "Should we have a secret handshake that's embarrassingly complicated?",
    subtext: 'Because normal couples are overrated.',
    options: [
      { label: 'The more ridiculous the better', tone: 'playful' },
      { label: 'A subtle one, just for us', tone: 'sweet' },
    ],
  },
  {
    category: 'playful',
    emoji: '🎤',
    text: 'Karaoke together — dramatic power ballad or hilariously bad?',
    subtext: "Either way, we're making everyone jealous.",
    options: [
      { label: 'Dramatically bad', tone: 'chaotic' },
      { label: 'Heartfelt duet', tone: 'romantic' },
    ],
  },

  // ─── ROMANTIC (15) ───────────────────────────────────────────
  {
    category: 'romantic',
    emoji: '🫶',
    text: 'When life gets heavy, will you let me be your safe place?',
    subtext: "I can't stop every storm, but I'll stand in all of them with you.",
    options: [
      { label: 'Yes, always', tone: 'emotional' },
      { label: 'Only with extra hugs', tone: 'warm' },
    ],
  },
  {
    category: 'romantic',
    emoji: '💌',
    text: 'What reaches your heart faster — gentle words or steady actions?',
    subtext: 'I want to love you in the way you feel most deeply.',
    options: [
      { label: 'Words that feel true', tone: 'sincere' },
      { label: 'Actions that prove it', tone: 'grounded' },
    ],
  },
  {
    category: 'romantic',
    emoji: '❤️',
    text: 'Will you keep choosing us, day after day, even on the hard ones?',
    subtext: 'Not just in easy moments. In all of them.',
    options: [
      { label: 'Every single day', tone: 'devoted' },
      { label: 'Without hesitation', tone: 'certain' },
    ],
  },
  {
    category: 'romantic',
    emoji: '🌹',
    text: "If I wrote you a letter you'd never expect, would you keep it forever?",
    subtext: 'Some words deserve more than a text message.',
    options: [
      { label: "I'd read it a hundred times", tone: 'emotional' },
      { label: "I'd write one back", tone: 'reciprocal' },
    ],
  },
  {
    category: 'romantic',
    emoji: '💕',
    text: "Do you feel it too — how everything gets warmer when we're together?",
    subtext: "It's not just me, right?",
    options: [
      { label: 'I feel it every time', tone: 'affirming' },
      { label: 'More than you know', tone: 'deep' },
    ],
  },
  {
    category: 'romantic',
    emoji: '🎵',
    text: 'Should our love story have one signature song, or a whole chaotic playlist?',
    subtext: "I'll still dance with you either way.",
    options: [
      { label: 'One perfect song', tone: 'romantic' },
      { label: 'A messy, beautiful playlist', tone: 'real' },
    ],
  },
  {
    category: 'romantic',
    emoji: '🌸',
    text: "Can you feel how my world gets quieter when you're near?",
    subtext: 'Like the noise just... fades away.',
    options: [
      { label: 'I feel the same thing', tone: 'mutual' },
      { label: 'Stay close then', tone: 'tender' },
    ],
  },
  {
    category: 'romantic',
    emoji: '🤲',
    text: "If I promised to always be honest, even when it's hard — would that mean something?",
    subtext: "Real love doesn't hide. It just holds tighter.",
    options: [
      { label: 'That means everything', tone: 'grateful' },
      { label: 'Only if we both promise', tone: 'equal' },
    ],
  },
  {
    category: 'romantic',
    emoji: '🌊',
    text: 'Do you ever think about us and smile for no reason?',
    subtext: "Because I do. More often than I'd admit.",
    options: [
      { label: 'All the time', tone: 'sweet' },
      { label: 'You just made me do it', tone: 'charming' },
    ],
  },
  {
    category: 'romantic',
    emoji: '🔥',
    text: "What if I told you — you're my favorite person in any room?",
    subtext: "Crowded or empty. You're who I look for.",
    options: [
      { label: 'I look for you too', tone: 'mutual' },
      { label: "Don't stop telling me", tone: 'honest' },
    ],
  },
  {
    category: 'romantic',
    emoji: '💗',
    text: 'Can I be the one you call first — on good days and bad?',
    subtext: 'Not because you have to. Because you want to.',
    options: [
      { label: 'You already are', tone: 'affirming' },
      { label: 'Always, no matter what', tone: 'committed' },
    ],
  },
  {
    category: 'romantic',
    emoji: '🕊️',
    text: 'If love was a quiet thing — no fireworks, just peace — would you still want it?',
    subtext: "That's the kind I want to give you.",
    options: [
      { label: "That's the best kind", tone: 'wise' },
      { label: 'Peace with you sounds perfect', tone: 'content' },
    ],
  },
  {
    category: 'romantic',
    emoji: '🫂',
    text: "Would you let me hold you on the days when words aren't enough?",
    subtext: 'Sometimes presence says more than anything.',
    options: [
      { label: "Just don't let go", tone: 'vulnerable' },
      { label: "That's all I'd need", tone: 'simple' },
    ],
  },
  {
    category: 'romantic',
    emoji: '✍️',
    text: 'If our love had a title, what kind of story would it be?',
    subtext: 'I\'d call it "the one I\'d read again and again."',
    options: [
      { label: 'A slow-burn epic', tone: 'thoughtful' },
      { label: 'The kind that stays with you', tone: 'lasting' },
    ],
  },
  {
    category: 'romantic',
    emoji: '🌅',
    text: "Promise me — we'll always talk before we assume?",
    subtext: "Most love stories don't end. They just go silent.",
    options: [
      { label: 'I promise', tone: 'sincere' },
      { label: 'No silence between us', tone: 'brave' },
    ],
  },

  // ─── MEMORY (12) ─────────────────────────────────────────────
  {
    category: 'memory',
    emoji: '📸',
    text: 'Which memory of us still replays in your mind the most?',
    subtext: 'Mine changes daily, but somehow keeps getting better.',
    options: [
      { label: 'Our first real moment', tone: 'nostalgic' },
      { label: 'This one right now', tone: 'present' },
    ],
  },
  {
    category: 'memory',
    emoji: '💭',
    text: 'Should tonight become one of our favorite memories?',
    subtext: "I'm willing to make this story unforgettable.",
    options: [
      { label: 'Yes, lock it in', tone: 'committed' },
      { label: 'Only if you stay close', tone: 'warm' },
    ],
  },
  {
    category: 'memory',
    emoji: '🎞️',
    text: 'If you could pause one moment of us and live in it — which one?',
    subtext: "Don't overthink it. First thing that comes to mind.",
    options: [
      { label: 'When we first laughed', tone: 'joyful' },
      { label: 'A quiet one, just us', tone: 'intimate' },
    ],
  },
  {
    category: 'memory',
    emoji: '🧳',
    text: 'Do you remember the first time you realized this was more than casual?',
    subtext: 'I remember mine like it was yesterday.',
    options: [
      { label: 'I think about it a lot', tone: 'reflective' },
      { label: 'Tell me yours first', tone: 'curious' },
    ],
  },
  {
    category: 'memory',
    emoji: '📖',
    text: 'Which version of us do you love most — early days or right now?',
    subtext: "We've come a long way. And there's still so far to go.",
    options: [
      { label: 'Right now, this version', tone: 'present' },
      { label: 'Every version of us', tone: 'loyal' },
    ],
  },
  {
    category: 'memory',
    emoji: '🌧️',
    text: 'Do you remember a hard moment that somehow brought us closer?',
    subtext: 'The ones that tested us also built us.',
    options: [
      { label: 'It made us stronger', tone: 'resilient' },
      { label: "I wouldn't change it", tone: 'accepting' },
    ],
  },
  {
    category: 'memory',
    emoji: '🎁',
    text: "What's the smallest thing I've done that you still remember?",
    subtext: 'Sometimes the tiny things stay the longest.',
    options: [
      { label: "You'd be surprised", tone: 'mysterious' },
      { label: 'Too many to pick one', tone: 'grateful' },
    ],
  },
  {
    category: 'memory',
    emoji: '🌻',
    text: 'Is there a song that instantly takes you back to an "us" moment?',
    subtext: 'I have at least three. Maybe five. Okay, more.',
    options: [
      { label: 'Yes, and it makes me smile', tone: 'happy' },
      { label: "Let's make more of those", tone: 'forward' },
    ],
  },
  {
    category: 'memory',
    emoji: '🏠',
    text: 'If we had a place that was "ours," where would it be?',
    subtext: 'Not a dream house. Just a spot that feels like us.',
    options: [
      { label: 'Somewhere quiet and warm', tone: 'peaceful' },
      { label: 'Wherever you are', tone: 'devoted' },
    ],
  },
  {
    category: 'memory',
    emoji: '🕰️',
    text: 'When did you first think "okay, this person really gets me"?',
    subtext: 'For me, it hit when I least expected it.',
    options: [
      { label: 'It crept up slowly', tone: 'gradual' },
      { label: 'One specific moment', tone: 'vivid' },
    ],
  },
  {
    category: 'memory',
    emoji: '🌈',
    text: "What's one thing about early-us you hope we never lose?",
    subtext: 'Some things are worth protecting no matter how much time passes.',
    options: [
      { label: 'The way we laugh', tone: 'playful' },
      { label: 'How honest we are', tone: 'sincere' },
    ],
  },
  {
    category: 'memory',
    emoji: '💫',
    text: 'Years from now, how do you want to remember tonight?',
    subtext: "Let's make it worth the memory.",
    options: [
      { label: 'The night everything changed', tone: 'dramatic' },
      { label: 'The night we were brave', tone: 'courageous' },
    ],
  },

  // ─── FUTURE (13) ─────────────────────────────────────────────
  {
    category: 'future',
    emoji: '🏡',
    text: 'Can you picture us building a cozy life, one soft morning at a time?',
    subtext: 'Coffee, comfort, and the same favorite person every day.',
    options: [
      { label: 'I can see it clearly', tone: 'hopeful' },
      { label: 'That sounds like home', tone: 'warm' },
    ],
  },
  {
    category: 'future',
    emoji: '🗺️',
    text: 'Can you imagine us chasing adventures, taking wrong turns, laughing anyway?',
    subtext: 'Road trips, late-night snacks, and no boring chapters.',
    options: [
      { label: 'Adventure with you, always', tone: 'excited' },
      { label: 'Only if we bring playlists', tone: 'practical' },
    ],
  },
  {
    category: 'future',
    emoji: '🌍',
    text: 'If we could go anywhere tomorrow — no limits — where would we wake up?',
    subtext: "Dream big. I'm taking notes.",
    options: [
      { label: 'Somewhere with mountains', tone: 'dreamy' },
      { label: "A city we've never seen", tone: 'curious' },
    ],
  },
  {
    category: 'future',
    emoji: '🌱',
    text: "What's one thing you want us to build together that doesn't exist yet?",
    subtext: 'A tradition, a place, a life — anything.',
    options: [
      { label: 'Our own little world', tone: 'intimate' },
      { label: 'Something that lasts', tone: 'lasting' },
    ],
  },
  {
    category: 'future',
    emoji: '📅',
    text: 'Ten years from now — are we the chill couple or the fun chaotic ones?',
    subtext: "I'm good with either, as long as it's us.",
    options: [
      { label: 'Chill with chaotic moments', tone: 'balanced' },
      { label: 'Chaotic with chill moments', tone: 'fun' },
    ],
  },
  {
    category: 'future',
    emoji: '🛋️',
    text: 'Rainy Sunday, ten years from now — what are we doing?',
    subtext: 'Paint me the picture. I want to see it.',
    options: [
      { label: 'Reading together in silence', tone: 'peaceful' },
      { label: 'Cooking something ambitious', tone: 'adventurous' },
    ],
  },
  {
    category: 'future',
    emoji: '✈️',
    text: 'Should we be the couple that always has a trip planned?',
    subtext: "Even if it's just a weekend drive to nowhere.",
    options: [
      { label: 'Always planning the next one', tone: 'excited' },
      { label: 'Spontaneous is better', tone: 'free' },
    ],
  },
  {
    category: 'future',
    emoji: '🎓',
    text: 'What if we promised to always keep learning — together?',
    subtext: "New skills, new recipes we'd probably mess up.",
    options: [
      { label: 'I love that idea', tone: 'inspired' },
      { label: 'Especially the messy recipes', tone: 'playful' },
    ],
  },
  {
    category: 'future',
    emoji: '🏔️',
    text: "What's a dream you haven't told anyone that you'd trust me with?",
    subtext: "I'll hold it gently. And help you chase it.",
    options: [
      { label: "I'll tell you tonight", tone: 'vulnerable' },
      { label: 'Only if you share yours', tone: 'equal' },
    ],
  },
  {
    category: 'future',
    emoji: '🌟',
    text: "Do you believe the best parts of us haven't happened yet?",
    subtext: "I genuinely think we're just getting started.",
    options: [
      { label: 'I believe that completely', tone: 'hopeful' },
      { label: 'Show me', tone: 'eager' },
    ],
  },
  {
    category: 'future',
    emoji: '📷',
    text: 'Should we document everything or keep some moments just for us?',
    subtext: 'Some stories are better kept between two people.',
    options: [
      { label: 'A mix of both', tone: 'balanced' },
      { label: 'Some things stay ours', tone: 'private' },
    ],
  },
  {
    category: 'future',
    emoji: '🌿',
    text: 'If we built our perfect day from scratch, what would it look like?',
    subtext: 'No obligations, no rush. Just us deciding.',
    options: [
      { label: 'Slow start, long night', tone: 'relaxed' },
      { label: 'Packed with little adventures', tone: 'energetic' },
    ],
  },
  {
    category: 'future',
    emoji: '💡',
    text: 'What if we made a pact to never let routine steal our spark?',
    subtext: 'Surprise dates, random notes, small rebellions against ordinary.',
    options: [
      { label: 'Deal — no boring us', tone: 'determined' },
      { label: "I'll hold you to it", tone: 'trusting' },
    ],
  },

  // ─── SUPPORT (12) ────────────────────────────────────────────
  {
    category: 'support',
    emoji: '🤝',
    text: 'When everything feels overwhelming, can I be the person you lean on?',
    subtext: "You don't have to carry everything alone anymore.",
    options: [
      { label: "I'd really like that", tone: 'vulnerable' },
      { label: 'Only if I can do the same', tone: 'reciprocal' },
    ],
  },
  {
    category: 'support',
    emoji: '🛡️',
    text: 'Would you trust me with the parts of you that you usually hide?',
    subtext: 'Not the polished version. The real one.',
    options: [
      { label: 'I trust you with all of it', tone: 'brave' },
      { label: "I'm learning to", tone: 'honest' },
    ],
  },
  {
    category: 'support',
    emoji: '🌙',
    text: "On your worst days, what's the one thing that would actually help?",
    subtext: 'I want to know so I can show up the right way.',
    options: [
      { label: 'Just being there is enough', tone: 'simple' },
      { label: 'Distract me from it all', tone: 'practical' },
    ],
  },
  {
    category: 'support',
    emoji: '💪',
    text: 'Should we be the kind of couple that makes each other braver?',
    subtext: "Not fearless. Just less afraid, because we're together.",
    options: [
      { label: 'Yes, push me to grow', tone: 'ambitious' },
      { label: 'Just hold my hand through it', tone: 'gentle' },
    ],
  },
  {
    category: 'support',
    emoji: '🫧',
    text: "If I'm ever too much or not enough — will you tell me honestly?",
    subtext: "Kindness isn't always softness. Sometimes it's truth.",
    options: [
      { label: 'Always, with love', tone: 'brave' },
      { label: 'If you promise the same', tone: 'equal' },
    ],
  },
  {
    category: 'support',
    emoji: '🌤️',
    text: 'Do you believe two people can heal each other just by staying?',
    subtext: 'Not fixing. Just... being present.',
    options: [
      { label: 'I think we already do', tone: 'reflective' },
      { label: 'Staying is everything', tone: 'committed' },
    ],
  },
  {
    category: 'support',
    emoji: '🤗',
    text: "When we disagree, can we promise to fight for us, not against each other?",
    subtext: 'Same team. Always.',
    options: [
      { label: 'Same team, always', tone: 'united' },
      { label: 'I promise', tone: 'sincere' },
    ],
  },
  {
    category: 'support',
    emoji: '🧡',
    text: 'Would you remind me of who I am when I start to forget?',
    subtext: 'We all lose ourselves sometimes. I want you to pull me back.',
    options: [
      { label: 'Every single time', tone: 'devoted' },
      { label: "You'd do the same for me", tone: 'mutual' },
    ],
  },
  {
    category: 'support',
    emoji: '🏠',
    text: 'Can we agree: no sleeping angry, no matter how stubborn we are?',
    subtext: 'We can be mad. But not distant. Never distant.',
    options: [
      { label: 'No distance, ever', tone: 'fierce' },
      { label: 'Deal — even at 3am', tone: 'committed' },
    ],
  },
  {
    category: 'support',
    emoji: '🧭',
    text: 'If life took us somewhere unexpected, would you still hold on?',
    subtext: "Plans change. But some things shouldn't.",
    options: [
      { label: "I'd hold on tighter", tone: 'strong' },
      { label: "We'd figure it out together", tone: 'resilient' },
    ],
  },
  {
    category: 'support',
    emoji: '☀️',
    text: 'Should we celebrate each other more — the small wins, not just the big ones?',
    subtext: 'You got through a hard day? That deserves recognition.',
    options: [
      { label: 'Every small win counts', tone: 'encouraging' },
      { label: 'Start with tonight', tone: 'present' },
    ],
  },
  {
    category: 'support',
    emoji: '💎',
    text: "What if I promised to always choose kindness, even when I'm frustrated?",
    subtext: 'You deserve gentleness, even in my hard moments.',
    options: [
      { label: 'That means so much', tone: 'touched' },
      { label: "I'll match that promise", tone: 'reciprocal' },
    ],
  },

  // ─── CINEMATIC (12) ──────────────────────────────────────────
  {
    category: 'cinematic',
    emoji: '🌟',
    text: 'Last step before the real question... are you ready?',
    subtext: "My heart's been ready. I just need your signal.",
    options: [
      { label: 'Ask me now', tone: 'anticipation' },
      { label: "I'm ready", tone: 'confident' },
    ],
  },
  {
    category: 'cinematic',
    emoji: '🎭',
    text: 'If our story was a film, this would be the scene where everything changes.',
    subtext: 'Soundtrack swelling. Camera close. Just us.',
    options: [
      { label: 'I feel it', tone: 'intense' },
      { label: "Don't fade to black yet", tone: 'playful' },
    ],
  },
  {
    category: 'cinematic',
    emoji: '🌌',
    text: 'Do you feel it — this moment is different from all the others?',
    subtext: 'Something shifted. Can you feel it too?',
    options: [
      { label: 'Everything feels different', tone: 'aware' },
      { label: 'My heart knows', tone: 'intuitive' },
    ],
  },
  {
    category: 'cinematic',
    emoji: '🎬',
    text: 'If silence between us could speak, what would it say right now?',
    subtext: 'Sometimes the quiet moments hold the most truth.',
    options: [
      { label: 'It would say "finally"', tone: 'emotional' },
      { label: 'Something beautiful', tone: 'hopeful' },
    ],
  },
  {
    category: 'cinematic',
    emoji: '🕯️',
    text: 'The stars are watching tonight. Should we give them something to remember?',
    subtext: 'Not every night becomes a story. But this one could.',
    options: [
      { label: "Let's make it unforgettable", tone: 'bold' },
      { label: "They're already watching", tone: 'knowing' },
    ],
  },
  {
    category: 'cinematic',
    emoji: '🔮',
    text: "What if everything we've been through was leading to exactly this moment?",
    subtext: 'Every detour. Every doubt. Every late-night thought. All for now.',
    options: [
      { label: 'Then it was worth it', tone: 'resolved' },
      { label: "I wouldn't change a thing", tone: 'peaceful' },
    ],
  },
  {
    category: 'cinematic',
    emoji: '🎶',
    text: 'Can you hear it — how the whole world gets quieter around us?',
    subtext: 'Like the universe is giving us room to say what matters.',
    options: [
      { label: 'I hear it', tone: 'tender' },
      { label: 'Keep talking', tone: 'captivated' },
    ],
  },
  {
    category: 'cinematic',
    emoji: '✨',
    text: "This is the part of the story I'll tell a thousand times. Are you in?",
    subtext: "Not because it's perfect. Because it's ours.",
    options: [
      { label: "I'm all in", tone: 'certain' },
      { label: 'Tell it with me', tone: 'together' },
    ],
  },
  {
    category: 'cinematic',
    emoji: '🌠',
    text: 'They say you know when a moment matters. Does this one feel like that?',
    subtext: "Because from where I'm standing... it does.",
    options: [
      { label: 'More than you know', tone: 'deep' },
      { label: 'I can feel it', tone: 'aware' },
    ],
  },
  {
    category: 'cinematic',
    emoji: '🎪',
    text: 'If I told you the next moment changes everything — scared or excited?',
    subtext: "I'm both. And that's how I know it's real.",
    options: [
      { label: 'Excited', tone: 'brave' },
      { label: 'Beautifully terrified', tone: 'honest' },
    ],
  },
  {
    category: 'cinematic',
    emoji: '🌑',
    text: "We've walked through the dark to get here. Can you see the light ahead?",
    subtext: 'Every step brought us closer. This is where it leads.',
    options: [
      { label: 'I see it clearly', tone: 'hopeful' },
      { label: "I see you. That's enough.", tone: 'devoted' },
    ],
  },
  {
    category: 'cinematic',
    emoji: '💫',
    text: 'Take a breath. The biggest moment is next. Ready?',
    subtext: 'No more questions after this — just the one that matters.',
    options: [
      { label: "I've been ready", tone: 'anticipation' },
      { label: "Let's do this", tone: 'determined' },
    ],
  },

  // ─── MOONLIGHT (10) ──────────────────────────────────────────
  {
    category: 'moonlight',
    emoji: '🌙',
    text: 'Moonlit walk tonight — slow and sweet, or dramatic and cinematic?',
    subtext: "Either way, I'm holding your hand the entire time.",
    options: [
      { label: 'Slow and sweet', tone: 'gentle' },
      { label: 'Dramatic and cinematic', tone: 'bold' },
    ],
  },
  {
    category: 'moonlight',
    emoji: '🌕',
    text: "If the moon kept a diary, should our story be tonight's headline?",
    subtext: 'I think it\'d write: "Two hearts, finally honest."',
    options: [
      { label: 'Headline material', tone: 'confident' },
      { label: 'Front page, definitely', tone: 'playful' },
    ],
  },
  {
    category: 'moonlight',
    emoji: '🌒',
    text: "The moon started dark tonight and it's growing brighter — just like us.",
    subtext: 'Every step has brought a little more light.',
    options: [
      { label: 'I see it changing', tone: 'observant' },
      { label: "We're the light", tone: 'romantic' },
    ],
  },
  {
    category: 'moonlight',
    emoji: '🌃',
    text: 'What is it about nighttime that makes everything feel more honest?',
    subtext: "Like the dark gives us permission to say what daylight won't.",
    options: [
      { label: 'It strips away pretending', tone: 'raw' },
      { label: 'Everything feels closer', tone: 'intimate' },
    ],
  },
  {
    category: 'moonlight',
    emoji: '⭐',
    text: 'If we could name a star after this moment, what would we call it?',
    subtext: 'Something that shines long after tonight is over.',
    options: [
      { label: "Something only we'd get", tone: 'private' },
      { label: '"Ours"', tone: 'simple' },
    ],
  },
  {
    category: 'moonlight',
    emoji: '🌜',
    text: "The moon's seen every version of us. Which one's its favorite?",
    subtext: "I think it's rooting for tonight's version.",
    options: [
      { label: 'The version being honest', tone: 'brave' },
      { label: 'This one, right now', tone: 'present' },
    ],
  },
  {
    category: 'moonlight',
    emoji: '🌛',
    text: "Some people wish on stars. I'd rather wish on this moment.",
    subtext: 'Stars fade. But what we have feels different.',
    options: [
      { label: 'This moment is the wish', tone: 'poetic' },
      { label: 'I stopped wishing — I found it', tone: 'content' },
    ],
  },
  {
    category: 'moonlight',
    emoji: '🌖',
    text: "The sky is so clear tonight. Like it's been waiting for us.",
    subtext: "Or maybe we've been waiting for a night like this.",
    options: [
      { label: 'It was waiting', tone: 'magical' },
      { label: 'We were waiting', tone: 'patient' },
    ],
  },
  {
    category: 'moonlight',
    emoji: '🔭',
    text: 'If we sat under this sky for hours, would you ever run out of things to say?',
    subtext: 'Or would the silence be just as comfortable?',
    options: [
      { label: 'Never run out', tone: 'connected' },
      { label: 'The silence would be perfect', tone: 'comfortable' },
    ],
  },
  {
    category: 'moonlight',
    emoji: '🌟',
    text: 'Under this moonlight, everything feels possible. What would you ask for?',
    subtext: 'Not from the universe. From me.',
    options: [
      { label: 'Just you, as you are', tone: 'genuine' },
      { label: 'This — forever', tone: 'devoted' },
    ],
  },

  // ─── DESTINY (11) ────────────────────────────────────────────
  {
    category: 'destiny',
    emoji: '✨',
    text: 'Do you think we were meant to find each other?',
    subtext: 'Like the universe quietly nudged us together.',
    options: [
      { label: 'Absolutely yes', tone: 'certain' },
      { label: 'Maybe — and I love that', tone: 'wondering' },
    ],
  },
  {
    category: 'destiny',
    emoji: '🌌',
    text: 'If not destiny, then a thousand little choices brought us here?',
    subtext: "Either way, I'm grateful for every step that led to you.",
    options: [
      { label: 'I love that thought', tone: 'philosophical' },
      { label: "Then let's choose each other", tone: 'intentional' },
    ],
  },
  {
    category: 'destiny',
    emoji: '🔗',
    text: 'What if we were always going to meet — just not always ready?',
    subtext: 'And maybe the timing right now is exactly right.',
    options: [
      { label: 'The timing is perfect', tone: 'grateful' },
      { label: "We're ready now", tone: 'present' },
    ],
  },
  {
    category: 'destiny',
    emoji: '🪐',
    text: 'In a universe this big, what are the odds we found each other?',
    subtext: 'Statistically impossible. Emotionally inevitable.',
    options: [
      { label: 'The best kind of impossible', tone: 'romantic' },
      { label: 'We beat the odds', tone: 'proud' },
    ],
  },
  {
    category: 'destiny',
    emoji: '🧬',
    text: 'Do you ever feel like some part of you already knew me before we met?',
    subtext: 'Like a recognition, not a discovery.',
    options: [
      { label: 'Yes, like coming home', tone: 'deep' },
      { label: "That's exactly how it felt", tone: 'aligned' },
    ],
  },
  {
    category: 'destiny',
    emoji: '🦋',
    text: 'What if one tiny moment had gone differently and we never crossed paths?',
    subtext: "I try not to think about it. It scares me a little.",
    options: [
      { label: "We'd have found each other anyway", tone: 'certain' },
      { label: "I'm glad we didn't miss it", tone: 'grateful' },
    ],
  },
  {
    category: 'destiny',
    emoji: '🌀',
    text: 'Some connections defy explanation. Is ours one of them?',
    subtext: "Logic can't quite reach it. But your heart can.",
    options: [
      { label: "It's beyond logic", tone: 'mystical' },
      { label: 'I just know it\'s real', tone: 'grounded' },
    ],
  },
  {
    category: 'destiny',
    emoji: '📜',
    text: 'If our story was already written, would you still choose to live it?',
    subtext: 'Even knowing the hard parts?',
    options: [
      { label: 'Every chapter', tone: 'committed' },
      { label: 'Especially the hard parts', tone: 'brave' },
    ],
  },
  {
    category: 'destiny',
    emoji: '🎯',
    text: "Do you believe some people just fit — not perfectly, but honestly?",
    subtext: 'Not puzzle pieces. More like two melodies that harmonize.',
    options: [
      { label: "That's exactly us", tone: 'knowing' },
      { label: 'Imperfect and beautiful', tone: 'accepting' },
    ],
  },
  {
    category: 'destiny',
    emoji: '💠',
    text: "What if we understand each other because we simply pay attention?",
    subtext: "Maybe love isn't magic. It's noticing.",
    options: [
      { label: 'You notice everything', tone: 'touched' },
      { label: "That's the real magic", tone: 'wise' },
    ],
  },
  {
    category: 'destiny',
    emoji: '🌊',
    text: 'If you could send a message to past-you about us, what would you say?',
    subtext: 'Mine would be: "Wait for it. It\'s worth everything."',
    options: [
      { label: '"You have no idea what\'s coming"', tone: 'excited' },
      { label: '"Trust this one"', tone: 'certain' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// JOURNEY BUILDER
// ═══════════════════════════════════════════════════════════════

// Emotional arc: ice-breaker → cosmic → nostalgic → atmospheric → dreams → trust → love → climax
const CATEGORY_FLOW = [
  'playful',
  'destiny',
  'memory',
  'moonlight',
  'future',
  'support',
  'romantic',
  'cinematic',
];

/** Fisher-Yates shuffle */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Build a unique 8-question journey (runs once on module load) */
function buildJourney() {
  const questions = [];

  for (const category of CATEGORY_FLOW) {
    const pool = QUESTION_BANK.filter((q) => q.category === category);
    const picked = shuffle(pool)[0];
    questions.push({
      ...picked,
      id: `dq_${questions.length}`,
      type: 'question',
    });
  }

  // Wire each question → next question, last question → preProposal
  for (let i = 0; i < questions.length; i++) {
    const nextId = questions[i + 1]?.id || 'preProposal';
    questions[i].options = questions[i].options.map((o) => ({ ...o, nextId }));
  }

  return questions;
}

// Build on module load — gives a fresh journey per page load
const journey = buildJourney();

// Wire intro → first dynamic question
fixedNodes.intro.options[0].nextId = journey[0].id;

// Assemble complete node map
const nodes = {
  ...fixedNodes,
  ...Object.fromEntries(journey.map((q) => [q.id, q])),
};

// ═══════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════

export const START_NODE_ID = 'intro';
export const TOTAL_STEPS = CATEGORY_FLOW.length; // 8

export function getNode(id) {
  return nodes[id] || null;
}

export function getNextNodeId(nodeId, option) {
  return option?.nextId || nodes[nodeId]?.nextId || null;
}

export default nodes;
