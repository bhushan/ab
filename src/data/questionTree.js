/**
 * Valentine's Proposal — 100-Question Pool with Smart Shuffle
 *
 * On each visit, 10 questions are randomly selected from a pool of 100,
 * arranged in an emotional arc: opening → middle → closing → proposal.
 * She loves the moon 🌙 — moonlight questions are woven throughout.
 *
 * Personalized for Sweetu ❤️
 * Tone: flirty, witty, romantic — building to the final proposal.
 *
 * Node types: 'question' | 'statement' | 'final' | 'celebration'
 * Categories drive visual theming in QuestionCard.
 * Phases control placement: 'opening' | 'middle' | 'closing'
 */

// ─── FIXED NODES ─────────────────────────────────────────────

const fixedNodes = {
  intro: {
    id: 'intro',
    type: 'statement',
    category: 'intro',
    emoji: '🌙',
    text: 'Hey Sweetu ❤️',
    subtext: 'I have something important to ask you. But first, a little journey together — under the moonlight.',
    options: [
      { label: "I'm ready", tone: 'romantic' },
    ],
  },

  preProposal: {
    id: 'preProposal',
    type: 'statement',
    category: 'cinematic',
    emoji: '🌕',
    text: "Sweetu, we've traveled through memories, dreams, and moonlight...",
    subtext: 'And now there\'s just one question left.',
    options: [
      { label: 'Ask me', tone: 'anticipation' },
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
      { label: 'YES! 💕', tone: 'ecstatic' },
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

// ─── QUESTION POOL (100 questions) ───────────────────────────
//
// phase: 'opening'  → flirty, witty icebreakers (positions 1–3)
//        'middle'   → deeper romantic & moonlit (positions 4–7)
//        'closing'  → intense emotional crescendo (positions 8–10)

const questionPool = [

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // OPENING PHASE — flirty, witty, fun
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 'p1', phase: 'opening', type: 'question', category: 'playful', emoji: '🍕',
    text: "Sweetu, serious question: pizza or me?",
    subtext: 'Think very carefully. Your answer matters.',
    options: [{ label: 'You, obviously', tone: 'romantic' }, { label: 'Can I have both?', tone: 'playful' }],
  },
  {
    id: 'p2', phase: 'opening', type: 'question', category: 'destiny', emoji: '✨',
    text: 'Sweetu, do you believe in destiny?',
    subtext: 'That some things are just... meant to be?',
    options: [{ label: 'Yes, always', tone: 'romantic' }, { label: 'Convince me', tone: 'playful' }],
  },
  {
    id: 'p3', phase: 'opening', type: 'question', category: 'playful', emoji: '😏',
    text: 'On a scale of 1 to 10, Sweetu, how lucky are you?',
    subtext: "Trick question. You met me, so it's clearly an 11.",
    options: [{ label: "Can't argue with that", tone: 'playful' }, { label: 'The confidence!', tone: 'playful' }],
  },
  {
    id: 'p4', phase: 'opening', type: 'question', category: 'memory', emoji: '🥹',
    text: 'Sweetu, do you remember the first time we locked eyes?',
    subtext: 'Because I do. Every detail.',
    options: [{ label: 'Every moment', tone: 'emotional' }, { label: "It's a blur...", tone: 'playful' }],
  },
  {
    id: 'p5', phase: 'opening', type: 'question', category: 'playful', emoji: '😂',
    text: 'Could you survive my terrible jokes... forever, Sweetu?',
    subtext: 'This is a legally binding commitment.',
    options: [{ label: 'Bring them on', tone: 'playful' }, { label: 'How bad are we talking?', tone: 'playful' }],
  },
  {
    id: 'p6', phase: 'opening', type: 'question', category: 'destiny', emoji: '🔮',
    text: 'Sweetu, what if we were written in the stars?',
    subtext: "Long before we even knew each other's names.",
    options: [{ label: 'I believe it', tone: 'romantic' }, { label: 'Show me the proof', tone: 'playful' }],
  },
  {
    id: 'p7', phase: 'opening', type: 'question', category: 'playful', emoji: '🍟',
    text: 'Can you handle me stealing your fries, Sweetu?',
    subtext: "Non-negotiable. It's in the fine print.",
    options: [{ label: "I'll order extra", tone: 'playful' }, { label: 'Only if you share dessert', tone: 'playful' }],
  },
  {
    id: 'p8', phase: 'opening', type: 'question', category: 'memory', emoji: '📸',
    text: 'Sweetu, do you remember our first conversation?',
    subtext: 'I was trying so hard to be cool. Spoiler: I wasn\'t.',
    options: [{ label: 'You were adorable', tone: 'playful' }, { label: 'I was nervous too', tone: 'emotional' }],
  },
  {
    id: 'p9', phase: 'opening', type: 'question', category: 'playful', emoji: '🎤',
    text: 'Sweetu, would you still love me if I sang in the shower?',
    subtext: 'Loudly. Off-key. With full choreography.',
    options: [{ label: "I'd join you", tone: 'playful' }, { label: "I'll bring earplugs... and a camera", tone: 'playful' }],
  },
  {
    id: 'p10', phase: 'opening', type: 'question', category: 'moonlight', emoji: '🌙',
    text: 'Sweetu, do you think the moon gets lonely?',
    subtext: "Because I never do when I'm with you.",
    options: [{ label: "You're my moon", tone: 'romantic' }, { label: 'It has the stars... like I have you', tone: 'romantic' }],
  },
  {
    id: 'p11', phase: 'opening', type: 'question', category: 'playful', emoji: '🎬',
    text: "Netflix or cuddling, Sweetu?",
    subtext: 'Trick question. Both. With me. Non-negotiable.',
    options: [{ label: 'Cuddling wins', tone: 'romantic' }, { label: 'Both, always', tone: 'playful' }],
  },
  {
    id: 'p12', phase: 'opening', type: 'statement', category: 'destiny', emoji: '💫',
    text: 'Sweetu, some call it coincidence...',
    subtext: 'I call it fate. And fate clearly has great taste picking you for me.',
    options: [{ label: "Fate has excellent taste", tone: 'playful' }],
  },
  {
    id: 'p13', phase: 'opening', type: 'question', category: 'playful', emoji: '🧁',
    text: 'If I were a dessert, would you pick me, Sweetu?',
    subtext: "I promise I'm the sweetest thing on the menu... after you.",
    options: [{ label: "You're my favorite flavor", tone: 'romantic' }, { label: 'Depends... are you chocolate?', tone: 'playful' }],
  },
  {
    id: 'p14', phase: 'opening', type: 'question', category: 'memory', emoji: '😊',
    text: 'Sweetu, do you remember the first time you made me laugh?',
    subtext: 'I knew right then. You were trouble. The best kind.',
    options: [{ label: 'You laughed at everything!', tone: 'playful' }, { label: "I remember your smile", tone: 'emotional' }],
  },
  {
    id: 'p15', phase: 'opening', type: 'question', category: 'moonlight', emoji: '🌜',
    text: 'If I could give you the moon, Sweetu, would you keep it?',
    subtext: "I'd wrap it in stardust and leave it on your pillow.",
    options: [{ label: "I'd treasure it", tone: 'romantic' }, { label: "Just give me you instead", tone: 'emotional' }],
  },
  {
    id: 'p16', phase: 'opening', type: 'question', category: 'destiny', emoji: '🎲',
    text: 'Sweetu, do you think our paths were always meant to cross?',
    subtext: "Because I can't imagine a timeline where they didn't.",
    options: [{ label: 'In every universe', tone: 'romantic' }, { label: "This one is perfect", tone: 'emotional' }],
  },
  {
    id: 'p17', phase: 'opening', type: 'question', category: 'playful', emoji: '👀',
    text: 'Be honest Sweetu — did you think I was cute when we first met?',
    subtext: "Because I thought you were unfairly attractive.",
    options: [{ label: "Couldn't stop staring", tone: 'flirty' }, { label: 'I was playing it cool', tone: 'playful' }],
  },
  {
    id: 'p18', phase: 'opening', type: 'statement', category: 'destiny', emoji: '🌌',
    text: 'The universe conspired just for us to meet, Sweetu.',
    subtext: 'Of all the billions of people... it picked you for me.',
    options: [{ label: "Best conspiracy ever", tone: 'playful' }],
  },
  {
    id: 'p19', phase: 'opening', type: 'question', category: 'playful', emoji: '🐶',
    text: 'Sweetu, would you fight a hundred duck-sized horses for me?',
    subtext: "I need to know where your priorities are.",
    options: [{ label: "I'd fight anything for you", tone: 'romantic' }, { label: 'Can I use a pool noodle?', tone: 'playful' }],
  },
  {
    id: 'p20', phase: 'opening', type: 'question', category: 'memory', emoji: '✈️',
    text: "Sweetu, what's your favorite memory of us?",
    subtext: 'Mine changes daily. We keep topping ourselves.',
    options: [{ label: 'There are too many', tone: 'romantic' }, { label: 'This one, right now', tone: 'emotional' }],
  },
  {
    id: 'p21', phase: 'opening', type: 'question', category: 'playful', emoji: '🔥',
    text: 'Sweetu, do you believe in love at first sight?',
    subtext: 'Or should I walk by again? 😏',
    options: [{ label: 'Once was enough', tone: 'romantic' }, { label: 'Walk by again anyway', tone: 'flirty' }],
  },
  {
    id: 'p22', phase: 'opening', type: 'question', category: 'moonlight', emoji: '🌙',
    text: 'If the moon had a favorite couple, Sweetu...',
    subtext: "Don't you think it would be us?",
    options: [{ label: 'Obviously us', tone: 'playful' }, { label: "We're its favorites", tone: 'romantic' }],
  },
  {
    id: 'p23', phase: 'opening', type: 'question', category: 'playful', emoji: '💬',
    text: 'What would your friends say if they saw this right now, Sweetu?',
    subtext: "Mine would say I'm absolutely whipped. And they'd be right.",
    options: [{ label: "They'd say 'finally!'", tone: 'playful' }, { label: "They already know", tone: 'romantic' }],
  },
  {
    id: 'p24', phase: 'opening', type: 'question', category: 'destiny', emoji: '🧲',
    text: "Sweetu, have you ever felt a pull toward someone?",
    subtext: "Like gravity, but way more inconvenient... and way more beautiful.",
    options: [{ label: 'Every time I see you', tone: 'romantic' }, { label: "You're magnetic", tone: 'flirty' }],
  },
  {
    id: 'p25', phase: 'opening', type: 'question', category: 'playful', emoji: '🏆',
    text: "Sweetu, if being adorable was a sport...",
    subtext: "You'd have more gold medals than anyone in history.",
    options: [{ label: 'Smooth talker!', tone: 'playful' }, { label: "You'd be my coach", tone: 'flirty' }],
  },
  {
    id: 'p26', phase: 'opening', type: 'question', category: 'memory', emoji: '💭',
    text: "Sweetu, what did you think about after our first date?",
    subtext: "I replayed the whole thing in my head. Twice. Okay, five times.",
    options: [{ label: "Couldn't sleep that night", tone: 'romantic' }, { label: 'I texted my best friend immediately', tone: 'playful' }],
  },
  {
    id: 'p27', phase: 'opening', type: 'question', category: 'playful', emoji: '🎯',
    text: "If flirting was an Olympic event, Sweetu...",
    subtext: "We'd both be disqualified for being too good.",
    options: [{ label: "We'd sweep the podium", tone: 'playful' }, { label: "You started it", tone: 'flirty' }],
  },
  {
    id: 'p28', phase: 'opening', type: 'question', category: 'moonlight', emoji: '🌟',
    text: "Sweetu, if I promised you a walk under the stars tonight...",
    subtext: "Would you hold my hand the entire way?",
    options: [{ label: "I'd never let go", tone: 'romantic' }, { label: "Only if you hold mine too", tone: 'flirty' }],
  },
  {
    id: 'p29', phase: 'opening', type: 'question', category: 'playful', emoji: '😴',
    text: "Sweetu, am I the last person you think about before you sleep?",
    subtext: "Because you're the first person I think about when I wake up.",
    options: [{ label: 'Every single night', tone: 'romantic' }, { label: "That's classified", tone: 'flirty' }],
  },
  {
    id: 'p30', phase: 'opening', type: 'question', category: 'destiny', emoji: '🎭',
    text: "Sweetu, what if I told you I rehearsed this whole thing?",
    subtext: "And I still managed to make it awkward. That's talent.",
    options: [{ label: "The awkward is the charm", tone: 'playful' }, { label: "You're doing great", tone: 'romantic' }],
  },
  {
    id: 'p31', phase: 'opening', type: 'question', category: 'playful', emoji: '🌡️',
    text: "Is it hot in here or is it just us, Sweetu?",
    subtext: "Asking for scientific purposes only.",
    options: [{ label: "Definitely us", tone: 'flirty' }, { label: "Someone open a window", tone: 'playful' }],
  },
  {
    id: 'p32', phase: 'opening', type: 'question', category: 'memory', emoji: '📱',
    text: "Sweetu, do you still have our first text conversation?",
    subtext: "Because I may or may not have screenshotted mine.",
    options: [{ label: "Obviously I do", tone: 'romantic' }, { label: "I read them sometimes", tone: 'emotional' }],
  },
  {
    id: 'p33', phase: 'opening', type: 'question', category: 'playful', emoji: '🎰',
    text: "Sweetu, if I said I won the lottery the day I met you...",
    subtext: "Would you believe me? Because I genuinely did.",
    options: [{ label: "We both won", tone: 'romantic' }, { label: "Cheesy but I'll allow it", tone: 'playful' }],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MIDDLE PHASE — romantic, flirty, deeper
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 'p34', phase: 'middle', type: 'question', category: 'romantic', emoji: '❤️',
    text: 'Sweetu, would you hold my hand through every storm?',
    subtext: "The sunny days are easy. It's the rainy ones that matter.",
    options: [{ label: 'Always', tone: 'romantic' }, { label: 'Through every single one', tone: 'emotional' }],
  },
  {
    id: 'p35', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌙',
    text: 'Sweetu, do you know what the moon whispered to me last night?',
    subtext: "It said... she's the one. It was talking about you.",
    options: [{ label: 'The moon is wise', tone: 'romantic' }, { label: "You're making me blush", tone: 'shy' }],
  },
  {
    id: 'p36', phase: 'middle', type: 'question', category: 'future', emoji: '🌅',
    text: 'Can you imagine us growing old together, Sweetu?',
    subtext: 'Two rocking chairs. A warm porch. Still calling you Sweetu at 80.',
    options: [{ label: 'I can see it clearly', tone: 'romantic' }, { label: "That's my dream", tone: 'emotional' }],
  },
  {
    id: 'p37', phase: 'middle', type: 'question', category: 'romantic', emoji: '💌',
    text: 'Sweetu, if I wrote you a love letter every day...',
    subtext: "Would you read them when you're old and gray?",
    options: [{ label: "I'd read them forever", tone: 'romantic' }, { label: 'Start writing already', tone: 'flirty' }],
  },
  {
    id: 'p38', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌕',
    text: 'If we could slow dance under the moonlight forever, Sweetu...',
    subtext: 'No music needed. Just your heartbeat next to mine.',
    options: [{ label: "I'd never stop", tone: 'romantic' }, { label: 'Only with you', tone: 'emotional' }],
  },
  {
    id: 'p39', phase: 'middle', type: 'question', category: 'future', emoji: '🗺️',
    text: 'Sunrise hikes. Midnight road trips. Slow dances in the kitchen.',
    subtext: 'Which one sounds like us, Sweetu?',
    options: [{ label: 'All of them', tone: 'romantic' }, { label: 'Kitchen dancing, always', tone: 'playful' }],
  },
  {
    id: 'p40', phase: 'middle', type: 'question', category: 'romantic', emoji: '🎵',
    text: 'Sweetu, do you know what my favorite sound is?',
    subtext: "Your laughter. I'd set it as my alarm if that wasn't creepy.",
    options: [{ label: "That's actually sweet", tone: 'shy' }, { label: 'My laugh is ridiculous!', tone: 'playful' }],
  },
  {
    id: 'p41', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌒',
    text: 'Some people wish upon stars, Sweetu...',
    subtext: 'I wished upon the moon. And somehow, I found you.',
    options: [{ label: 'Best wish ever made', tone: 'romantic' }, { label: 'The moon delivered', tone: 'playful' }],
  },
  {
    id: 'p42', phase: 'middle', type: 'question', category: 'romantic', emoji: '☂️',
    text: 'Sweetu, what if I promise to always be your umbrella?',
    subtext: "I can't stop the rain. But you'll never face it alone.",
    options: [{ label: 'Deal', tone: 'romantic' }, { label: "We'll dance in it instead", tone: 'playful' }],
  },
  {
    id: 'p43', phase: 'middle', type: 'question', category: 'future', emoji: '🏠',
    text: 'Imagine waking up next to your best friend every morning, Sweetu...',
    subtext: "That's the future I think about at 3am.",
    options: [{ label: 'I dream of it too', tone: 'romantic' }, { label: "Only if there's coffee", tone: 'playful' }],
  },
  {
    id: 'p44', phase: 'middle', type: 'statement', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, the moon doesn't shine on its own...",
    subtext: "It reflects light. Just like I'm brighter because of you.",
    options: [{ label: 'We light each other up', tone: 'romantic' }],
  },
  {
    id: 'p45', phase: 'middle', type: 'question', category: 'romantic', emoji: '🌹',
    text: 'Sweetu, would you let me be your safe place?',
    subtext: "Where nothing can touch you. Except me. I'll hold you.",
    options: [{ label: 'You already are', tone: 'emotional' }, { label: 'Come here', tone: 'romantic' }],
  },
  {
    id: 'p46', phase: 'middle', type: 'question', category: 'future', emoji: '🌍',
    text: 'Sweetu, if we could build a life anywhere in the world...',
    subtext: 'Where would our story unfold?',
    options: [{ label: 'Anywhere with you', tone: 'romantic' }, { label: 'Somewhere under the stars', tone: 'moonlight' }],
  },
  {
    id: 'p47', phase: 'middle', type: 'question', category: 'romantic', emoji: '🎨',
    text: 'If love had a color, Sweetu...',
    subtext: "It would be the blush on your cheeks right now. Is that a blush? 😏",
    options: [{ label: "I'm definitely blushing", tone: 'shy' }, { label: "Smooth. Very smooth.", tone: 'flirty' }],
  },
  {
    id: 'p48', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌛',
    text: "Sweetu, promise me we'll always have moonlit walks?",
    subtext: 'Just you, me, and a million stars watching us.',
    options: [{ label: 'Every clear night', tone: 'romantic' }, { label: "It's a promise", tone: 'emotional' }],
  },
  {
    id: 'p49', phase: 'middle', type: 'question', category: 'romantic', emoji: '🎶',
    text: 'Every love song I hear, Sweetu...',
    subtext: "I think of you. It's annoying. And wonderful. Mostly wonderful.",
    options: [{ label: 'Same here', tone: 'romantic' }, { label: "What's our song?", tone: 'playful' }],
  },
  {
    id: 'p50', phase: 'middle', type: 'question', category: 'future', emoji: '🌠',
    text: 'Sweetu, should we create a lifetime of memories together?',
    subtext: 'Adventures. Lazy Sundays. Midnight snacks. Everything.',
    options: [{ label: 'Every single one', tone: 'romantic' }, { label: 'Starting right now', tone: 'emotional' }],
  },
  {
    id: 'p51', phase: 'middle', type: 'question', category: 'romantic', emoji: '💋',
    text: "Sweetu, if I could freeze one moment with you...",
    subtext: "I'd pick every moment. That's cheating? I don't care.",
    options: [{ label: "I'd cheat too", tone: 'romantic' }, { label: "This one, right here", tone: 'emotional' }],
  },
  {
    id: 'p52', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "The moon and I have something in common, Sweetu...",
    subtext: "We both can't stop looking at you.",
    options: [{ label: "Okay that was smooth", tone: 'flirty' }, { label: "The moon has taste", tone: 'playful' }],
  },
  {
    id: 'p53', phase: 'middle', type: 'question', category: 'romantic', emoji: '🫂',
    text: "Sweetu, what if I told you my arms were custom-made for you?",
    subtext: "Because you fit in them a little too perfectly.",
    options: [{ label: 'Prove it', tone: 'flirty' }, { label: "I've noticed", tone: 'romantic' }],
  },
  {
    id: 'p54', phase: 'middle', type: 'question', category: 'future', emoji: '🛋️',
    text: "Sweetu, what's better: a fancy dinner or takeout on the couch with me?",
    subtext: "There's only one correct answer here.",
    options: [{ label: 'Couch. Always couch.', tone: 'playful' }, { label: 'Anywhere with you', tone: 'romantic' }],
  },
  {
    id: 'p55', phase: 'middle', type: 'question', category: 'romantic', emoji: '🧲',
    text: "Sweetu, you know that feeling when you just... can't look away?",
    subtext: "That's me. Every time you walk into a room.",
    options: [{ label: "I feel the same", tone: 'emotional' }, { label: "Stop, my heart", tone: 'shy' }],
  },
  {
    id: 'p56', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌕',
    text: "If the moon kept a diary, Sweetu...",
    subtext: "Tonight's entry would be about how it watched us fall in love.",
    options: [{ label: "Beautiful thought", tone: 'romantic' }, { label: "I'd read that diary", tone: 'playful' }],
  },
  {
    id: 'p57', phase: 'middle', type: 'question', category: 'romantic', emoji: '🔥',
    text: "Is it just me or did the temperature just rise, Sweetu?",
    subtext: "Every time you smile, the room gets warmer.",
    options: [{ label: "It's definitely you", tone: 'flirty' }, { label: "You're ridiculous and I love it", tone: 'playful' }],
  },
  {
    id: 'p58', phase: 'middle', type: 'question', category: 'future', emoji: '🐾',
    text: "Sweetu, should we get a pet together someday?",
    subtext: "Imagine us arguing over who it loves more. (It'll be me.)",
    options: [{ label: "It would love ME more", tone: 'playful' }, { label: "I already love you more", tone: 'romantic' }],
  },
  {
    id: 'p59', phase: 'middle', type: 'question', category: 'romantic', emoji: '💫',
    text: "Sweetu, you make ordinary moments feel like movie scenes.",
    subtext: "Even grocery shopping becomes an adventure with you.",
    options: [{ label: "You're my favorite adventure", tone: 'romantic' }, { label: "The grocery cart races help", tone: 'playful' }],
  },
  {
    id: 'p60', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "I think the moon is jealous of you tonight, Sweetu...",
    subtext: "Because you're the one lighting up my world.",
    options: [{ label: "Now I'm blushing for real", tone: 'shy' }, { label: "Tell the moon to deal with it", tone: 'playful' }],
  },
  {
    id: 'p61', phase: 'middle', type: 'question', category: 'romantic', emoji: '🎪',
    text: "Sweetu, if our love story was a movie...",
    subtext: "I'd watch it on repeat. With snacks. And cry every time.",
    options: [{ label: "I'd star in it forever", tone: 'romantic' }, { label: "What genre would it be?", tone: 'playful' }],
  },
  {
    id: 'p62', phase: 'middle', type: 'question', category: 'future', emoji: '🌄',
    text: "Would you watch every sunset with me, Sweetu?",
    subtext: "Even when we're old and I've told you the same story 47 times?",
    options: [{ label: "Especially then", tone: 'romantic' }, { label: "I'd listen all 47 times", tone: 'emotional' }],
  },
  {
    id: 'p63', phase: 'middle', type: 'question', category: 'romantic', emoji: '💘',
    text: "Sweetu, do you know what you've done to me?",
    subtext: "You've made me the kind of person who makes websites about feelings.",
    options: [{ label: "And I love it", tone: 'romantic' }, { label: "You're adorable", tone: 'playful' }],
  },
  {
    id: 'p64', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌕',
    text: "Full moons remind me of us, Sweetu...",
    subtext: "Whole. Bright. Impossible to ignore.",
    options: [{ label: "That's us", tone: 'romantic' }, { label: "Impossible to ignore is right 😏", tone: 'flirty' }],
  },
  {
    id: 'p65', phase: 'middle', type: 'question', category: 'romantic', emoji: '🤫',
    text: "Sweetu, can I tell you a secret?",
    subtext: "I smile like an idiot every time your name pops up on my phone.",
    options: [{ label: "Me too actually", tone: 'romantic' }, { label: "That's not a secret anymore", tone: 'playful' }],
  },
  {
    id: 'p66', phase: 'middle', type: 'question', category: 'future', emoji: '🎄',
    text: "Imagine spending every holiday together, Sweetu...",
    subtext: "Matching pajamas. Bad cooking. Perfect company.",
    options: [{ label: "Where do I sign up?", tone: 'playful' }, { label: "That sounds like heaven", tone: 'romantic' }],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CLOSING PHASE — emotional crescendo, intense romance
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 'p67', phase: 'closing', type: 'question', category: 'emotional', emoji: '🦋',
    text: 'Sweetu, do you feel the butterflies too... right now?',
    subtext: "Because my heart hasn't stopped racing since we started this.",
    options: [{ label: 'My heart is pounding', tone: 'emotional' }, { label: 'Maybe a little...', tone: 'shy' }],
  },
  {
    id: 'p68', phase: 'closing', type: 'question', category: 'moonlight', emoji: '🌙',
    text: 'Under every moon, in every lifetime, Sweetu...',
    subtext: "I'd find you. I'd choose you. Every time.",
    options: [{ label: 'In every lifetime', tone: 'romantic' }, { label: "I'd choose you too", tone: 'emotional' }],
  },
  {
    id: 'p69', phase: 'closing', type: 'statement', category: 'romantic', emoji: '💎',
    text: 'Sweetu, I promise to choose you. Every single day.',
    subtext: 'In a world full of temporary things, I want to be your forever.',
    options: [{ label: 'I choose you too', tone: 'romantic' }],
  },
  {
    id: 'p70', phase: 'closing', type: 'question', category: 'emotional', emoji: '💗',
    text: 'Sweetu, is love stronger than distance?',
    subtext: 'Than time? Than any obstacle? Ours is. I know it.',
    options: [{ label: 'Nothing can break us', tone: 'romantic' }, { label: 'Ours is unbreakable', tone: 'emotional' }],
  },
  {
    id: 'p71', phase: 'closing', type: 'question', category: 'moonlight', emoji: '🌕',
    text: 'The moon has seen every version of me, Sweetu...',
    subtext: "But it's never seen me as happy as I am with you.",
    options: [{ label: 'You make me happy too', tone: 'emotional' }, { label: "Come here 🤍", tone: 'romantic' }],
  },
  {
    id: 'p72', phase: 'closing', type: 'question', category: 'emotional', emoji: '🌉',
    text: 'Sweetu, what if love is the bridge that closes every gap?',
    subtext: "I don't need perfect conditions. I just need you.",
    options: [{ label: "That's all I need too", tone: 'romantic' }],
  },
  {
    id: 'p73', phase: 'closing', type: 'question', category: 'romantic', emoji: '🌹',
    text: 'Sweetu, if you had three words to describe us...',
    subtext: 'What would they be?',
    options: [{ label: 'Meant to be', tone: 'romantic' }, { label: 'Perfectly imperfect', tone: 'emotional' }, { label: 'Just the beginning', tone: 'hopeful' }],
  },
  {
    id: 'p74', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌙',
    text: 'If the moon could write our love story, Sweetu...',
    subtext: 'It would start with tonight. And it would never end.',
    options: [{ label: 'The most beautiful story', tone: 'romantic' }],
  },
  {
    id: 'p75', phase: 'closing', type: 'question', category: 'emotional', emoji: '💕',
    text: "Sweetu, you're not just someone I love...",
    subtext: "You're someone I can't imagine existing without.",
    options: [{ label: 'I feel the same', tone: 'emotional' }, { label: 'You have my whole heart', tone: 'romantic' }],
  },
  {
    id: 'p76', phase: 'closing', type: 'question', category: 'romantic', emoji: '🤍',
    text: 'Sweetu, would you be my forever person?',
    subtext: 'Not just the highlight reel. The bloopers too.',
    options: [{ label: 'Especially the bloopers', tone: 'playful' }, { label: 'For all of it', tone: 'emotional' }],
  },
  {
    id: 'p77', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌕',
    text: 'The moonlight makes everything more beautiful, Sweetu...',
    subtext: 'But nothing in this world more than you.',
    options: [{ label: "Stop, I'm melting", tone: 'shy' }],
  },
  {
    id: 'p78', phase: 'closing', type: 'question', category: 'emotional', emoji: '💓',
    text: 'Sweetu, my heart is doing somersaults right now...',
    subtext: "And it's all because of you. It's always because of you.",
    options: [{ label: 'Mine too', tone: 'emotional' }, { label: "You're making me feel things", tone: 'shy' }],
  },
  {
    id: 'p79', phase: 'closing', type: 'question', category: 'romantic', emoji: '🔐',
    text: 'Sweetu, if I gave you the key to my heart...',
    subtext: "Would you promise to keep it safe? It's a little fragile.",
    options: [{ label: "I'll guard it with mine", tone: 'romantic' }, { label: 'You already have mine', tone: 'emotional' }],
  },
  {
    id: 'p80', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌙',
    text: 'If we were the last two people watching the moon, Sweetu...',
    subtext: "I wouldn't change a single thing about this moment.",
    options: [{ label: 'Neither would I', tone: 'romantic' }],
  },
  {
    id: 'p81', phase: 'closing', type: 'question', category: 'emotional', emoji: '💫',
    text: 'Sweetu, do you know what scares me most?',
    subtext: "Not being with you. That's the entire list.",
    options: [{ label: "You'll never have to worry", tone: 'romantic' }, { label: "I'm not going anywhere", tone: 'emotional' }],
  },
  {
    id: 'p82', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌕',
    text: 'Sweetu, you are my moon in a sky full of stars...',
    subtext: 'The one my eyes always find first. Always.',
    options: [{ label: 'And you are mine', tone: 'romantic' }],
  },
  {
    id: 'p83', phase: 'closing', type: 'question', category: 'romantic', emoji: '🫀',
    text: "My heartbeat says your name, Sweetu...",
    subtext: "I didn't teach it that. It just knows.",
    options: [{ label: "Mine does the same", tone: 'emotional' }, { label: "Come listen", tone: 'flirty' }],
  },
  {
    id: 'p84', phase: 'closing', type: 'question', category: 'emotional', emoji: '🥺',
    text: "Sweetu, I've never been this sure about anything...",
    subtext: "As I am about wanting you in my life. Permanently.",
    options: [{ label: "I'm sure about you too", tone: 'romantic' }, { label: "Don't make me cry", tone: 'emotional' }],
  },
  {
    id: 'p85', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌙',
    text: "When the whole world is asleep and only the moon is awake, Sweetu...",
    subtext: "It's you I think about. Every single night.",
    options: [{ label: "You're in my thoughts too", tone: 'romantic' }],
  },
  {
    id: 'p86', phase: 'closing', type: 'question', category: 'romantic', emoji: '💍',
    text: "Sweetu, if forever had a face...",
    subtext: "It would look exactly like you.",
    options: [{ label: "Now I'm definitely crying", tone: 'emotional' }, { label: "You're my forever too", tone: 'romantic' }],
  },
  {
    id: 'p87', phase: 'closing', type: 'question', category: 'emotional', emoji: '🌊',
    text: "Sweetu, my love for you isn't a wave...",
    subtext: "It's the whole ocean. Deep. Endless. Unstoppable.",
    options: [{ label: "I'm drowning in it too", tone: 'romantic' }, { label: "I'll swim forever", tone: 'emotional' }],
  },
  {
    id: 'p88', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, the moon promised me something tonight...",
    subtext: "That this is just the beginning of something extraordinary.",
    options: [{ label: "I trust the moon", tone: 'romantic' }],
  },
  {
    id: 'p89', phase: 'closing', type: 'question', category: 'emotional', emoji: '✨',
    text: "Before you, Sweetu, I didn't know what I was missing...",
    subtext: "Now I can't remember what life was like without you.",
    options: [{ label: "You complete me", tone: 'romantic' }, { label: "I feel the exact same way", tone: 'emotional' }],
  },
  {
    id: 'p90', phase: 'closing', type: 'question', category: 'romantic', emoji: '🫶',
    text: "Sweetu, can I be honest with you?",
    subtext: "You're the best thing that ever happened to my heart.",
    options: [{ label: "You're mine too", tone: 'romantic' }, { label: "My heart agrees", tone: 'emotional' }],
  },
  {
    id: 'p91', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌙',
    text: "The moon, the stars, the entire universe, Sweetu...",
    subtext: "None of it compares to the way you make me feel.",
    options: [{ label: "You mean everything to me", tone: 'romantic' }],
  },
  {
    id: 'p92', phase: 'closing', type: 'question', category: 'emotional', emoji: '🕊️',
    text: "Sweetu, if I whispered 'I love you' right now...",
    subtext: "Would you whisper it back?",
    options: [{ label: "I'd say it louder", tone: 'romantic' }, { label: "I already am", tone: 'emotional' }],
  },
  {
    id: 'p93', phase: 'closing', type: 'question', category: 'romantic', emoji: '💝',
    text: "Sweetu, you don't just have a piece of my heart...",
    subtext: "You have the whole thing. No refunds.",
    options: [{ label: "No returns either", tone: 'playful' }, { label: "I'll keep it forever", tone: 'romantic' }],
  },
  {
    id: 'p94', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌕',
    text: "Tonight, the moon is shining just for us, Sweetu...",
    subtext: "As if the whole sky is holding its breath for what comes next.",
    options: [{ label: "I can feel it too", tone: 'emotional' }],
  },
  {
    id: 'p95', phase: 'closing', type: 'question', category: 'emotional', emoji: '🥹',
    text: "Sweetu, are you ready for what comes next?",
    subtext: "Because I've been waiting to ask you something...",
    options: [{ label: "I'm ready", tone: 'anticipation' }, { label: "My heart is racing", tone: 'emotional' }],
  },
  {
    id: 'p96', phase: 'closing', type: 'question', category: 'romantic', emoji: '🌹',
    text: "Sweetu, if I only had one wish...",
    subtext: "I'd wish for more time with you. Always more time.",
    options: [{ label: "I'd wish for the same", tone: 'romantic' }, { label: "We have forever", tone: 'emotional' }],
  },
  {
    id: 'p97', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, under this moon, I want to tell you something...",
    subtext: "You are the most beautiful thing that ever happened to me.",
    options: [{ label: "You're making me cry", tone: 'emotional' }],
  },
  {
    id: 'p98', phase: 'closing', type: 'question', category: 'emotional', emoji: '💖',
    text: "Sweetu, have you ever loved someone so much it scares you?",
    subtext: "Because that's how I feel about you. Terrified. And grateful.",
    options: [{ label: "I feel it too", tone: 'emotional' }, { label: "Don't be scared. I'm here.", tone: 'romantic' }],
  },
  {
    id: 'p99', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌕',
    text: "The moon is full tonight, Sweetu...",
    subtext: "And so is my heart. Because of you.",
    options: [{ label: "My heart is full too", tone: 'romantic' }],
  },
  {
    id: 'p100', phase: 'closing', type: 'question', category: 'romantic', emoji: '💞',
    text: "Sweetu, after everything... there's only one question left.",
    subtext: "And I think you already know what it is.",
    options: [{ label: "Ask me", tone: 'anticipation' }, { label: "I've been waiting", tone: 'emotional' }],
  },
];

// ─── SMART SHUFFLE ───────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build a randomized path of 10 questions with:
 *  - 3 opening (flirty/witty)  → 4 middle (romantic/deeper)  → 3 closing (intense)
 *  - At least 2 moonlight questions guaranteed
 *  - No two consecutive questions share the same category
 *  - Last question is always moonlight (she loves the moon 🌙)
 */
export function buildPath() {
  const byPhase = (phase) => questionPool.filter((q) => q.phase === phase);

  let opening = shuffle(byPhase('opening')).slice(0, 5);
  let middle = shuffle(byPhase('middle')).slice(0, 7);
  let closing = shuffle(byPhase('closing')).slice(0, 6);

  // Ensure last closing question is moonlight
  const moonClosing = closing.find((q) => q.category === 'moonlight');
  const otherClosing = closing.filter((q) => q !== moonClosing);
  if (moonClosing) {
    closing = [...otherClosing.slice(0, 2), moonClosing];
  } else {
    const fallback = byPhase('closing').find((q) => q.category === 'moonlight');
    closing = [...otherClosing.slice(0, 2), fallback || otherClosing[2]];
  }

  opening = opening.slice(0, 3);
  middle = middle.slice(0, 4);
  closing = closing.slice(0, 3);

  let selected = [...opening, ...middle, ...closing];

  // Ensure at least 2 moonlight questions total
  const moonCount = selected.filter((q) => q.category === 'moonlight').length;
  if (moonCount < 2) {
    const allMoon = shuffle(questionPool.filter(
      (q) => q.category === 'moonlight' && !selected.includes(q)
    ));
    if (allMoon.length > 0) {
      const replaceIdx = middle.findIndex((q) => q.category !== 'moonlight');
      if (replaceIdx >= 0) {
        selected[3 + replaceIdx] = allMoon[0];
      }
    }
  }

  // Dedup consecutive same-category
  for (let i = 1; i < selected.length; i++) {
    if (selected[i].category === selected[i - 1].category) {
      for (let j = i + 1; j < selected.length; j++) {
        if (selected[j].category !== selected[i - 1].category) {
          [selected[i], selected[j]] = [selected[j], selected[i]];
          break;
        }
      }
    }
  }

  return [
    'intro',
    ...selected.map((q) => q.id),
    'preProposal',
    'final',
    'celebration',
  ];
}

// ─── HELPERS ─────────────────────────────────────────────────

const poolIndex = Object.fromEntries(questionPool.map((q) => [q.id, q]));

export const getNode = (id) => fixedNodes[id] || poolIndex[id] || null;

// intro (1) + 10 questions + preProposal (1) = 12 steps before final
export const TOTAL_STEPS = 12;

export default questionPool;
