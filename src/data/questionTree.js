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

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EXTENDED POOL — 200 additional questions (p101–p300)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ── OPENING PHASE (p101–p167) — 67 more flirty, witty, fun ──

  {
    id: 'p101', phase: 'opening', type: 'question', category: 'playful', emoji: '🍦',
    text: "Sweetu, if I were an ice cream flavor, would you get a double scoop?",
    subtext: "Warning: I'm dangerously addictive.",
    options: [{ label: 'Triple scoop minimum', tone: 'playful' }, { label: "You'd melt before I finish", tone: 'flirty' }],
  },
  {
    id: 'p102', phase: 'opening', type: 'question', category: 'destiny', emoji: '🧭',
    text: "Sweetu, do you think some souls are just magnets?",
    subtext: "Because mine has been pulling toward yours since forever.",
    options: [{ label: "That explains the pull", tone: 'romantic' }, { label: "Strongest magnet I've felt", tone: 'emotional' }],
  },
  {
    id: 'p103', phase: 'opening', type: 'question', category: 'playful', emoji: '🎮',
    text: "Sweetu, if love was a video game, what level are we on?",
    subtext: "Whatever level it is, I'm not hitting pause.",
    options: [{ label: 'Boss level, easy', tone: 'playful' }, { label: "We unlocked co-op forever", tone: 'romantic' }],
  },
  {
    id: 'p104', phase: 'opening', type: 'question', category: 'memory', emoji: '🎧',
    text: "Sweetu, do you have a song that reminds you of us?",
    subtext: "I have seventeen. And counting.",
    options: [{ label: "Every love song now", tone: 'romantic' }, { label: "Make me a playlist", tone: 'playful' }],
  },
  {
    id: 'p105', phase: 'opening', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, if the moon sent you a text right now...",
    subtext: "It would say: 'He talks about you. Constantly.'",
    options: [{ label: "The moon knows too much", tone: 'playful' }, { label: "Tell the moon I said hi", tone: 'romantic' }],
  },
  {
    id: 'p106', phase: 'opening', type: 'question', category: 'playful', emoji: '🦸',
    text: "If you had a superpower, Sweetu, what would it be?",
    subtext: "Mine would be teleporting to you whenever I miss you. So... constantly.",
    options: [{ label: 'Reading your mind', tone: 'flirty' }, { label: 'Freezing time with you', tone: 'romantic' }],
  },
  {
    id: 'p107', phase: 'opening', type: 'question', category: 'destiny', emoji: '📖',
    text: "Sweetu, if our love story had a title, what would it be?",
    subtext: "I'd call it: 'How I Got Lucky Beyond Belief.'",
    options: [{ label: "'Written in the Stars'", tone: 'romantic' }, { label: "'The Sweetu Chronicles'", tone: 'playful' }],
  },
  {
    id: 'p108', phase: 'opening', type: 'question', category: 'playful', emoji: '🐱',
    text: "Sweetu, cat person or dog person?",
    subtext: "Wrong answers only. Just kidding, there's no wrong answer when you say it.",
    options: [{ label: 'Dog! No wait—', tone: 'playful' }, { label: "I'm a YOU person", tone: 'flirty' }],
  },
  {
    id: 'p109', phase: 'opening', type: 'question', category: 'memory', emoji: '🌻',
    text: "Sweetu, when did you first realize I was into you?",
    subtext: "Because I thought I was being subtle. I was not.",
    options: [{ label: "You were SO obvious", tone: 'playful' }, { label: "Your eyes gave it away", tone: 'romantic' }],
  },
  {
    id: 'p110', phase: 'opening', type: 'question', category: 'playful', emoji: '🎪',
    text: "If we ran away to join the circus, Sweetu...",
    subtext: "I'd be the clown. You'd be the star everyone came to see.",
    options: [{ label: "We'd be the main act", tone: 'playful' }, { label: "You're already my clown", tone: 'playful' }],
  },
  {
    id: 'p111', phase: 'opening', type: 'question', category: 'destiny', emoji: '🌈',
    text: "Sweetu, what are the odds of two people like us finding each other?",
    subtext: "In this whole crazy world? Astronomical. And yet, here we are.",
    options: [{ label: 'One in a billion', tone: 'romantic' }, { label: "The universe knew", tone: 'emotional' }],
  },
  {
    id: 'p112', phase: 'opening', type: 'question', category: 'playful', emoji: '☕',
    text: "Sweetu, morning coffee or midnight chai with me?",
    subtext: "The only correct answer is both. Every day. Forever.",
    options: [{ label: 'Midnight chai, always', tone: 'romantic' }, { label: "Both, obviously", tone: 'playful' }],
  },
  {
    id: 'p113', phase: 'opening', type: 'question', category: 'memory', emoji: '🎁',
    text: "Sweetu, what's the best gift I ever gave you?",
    subtext: "Besides my charming personality, of course.",
    options: [{ label: "Your time", tone: 'emotional' }, { label: "The audacity to ask that", tone: 'playful' }],
  },
  {
    id: 'p114', phase: 'opening', type: 'question', category: 'playful', emoji: '🧀',
    text: "Am I too cheesy for you, Sweetu?",
    subtext: "Be honest. I can tone it down. I won't, but I can.",
    options: [{ label: "Never enough cheese", tone: 'playful' }, { label: "I love the cheese", tone: 'romantic' }],
  },
  {
    id: 'p115', phase: 'opening', type: 'question', category: 'moonlight', emoji: '🌜',
    text: "Sweetu, have you ever made a wish on the moon?",
    subtext: "I made one once. And then you showed up.",
    options: [{ label: "I'm your wish come true?", tone: 'flirty' }, { label: "The moon delivers", tone: 'playful' }],
  },
  {
    id: 'p116', phase: 'opening', type: 'question', category: 'playful', emoji: '🏖️',
    text: "Beach vacation or mountain cabin, Sweetu?",
    subtext: "With me, obviously. That part isn't optional.",
    options: [{ label: "Mountains with you", tone: 'romantic' }, { label: "Anywhere you are is paradise", tone: 'romantic' }],
  },
  {
    id: 'p117', phase: 'opening', type: 'question', category: 'destiny', emoji: '🎯',
    text: "Sweetu, do you think the universe has a matchmaking service?",
    subtext: "Because it absolutely nailed it with us.",
    options: [{ label: "5-star review", tone: 'playful' }, { label: "Perfect match indeed", tone: 'romantic' }],
  },
  {
    id: 'p118', phase: 'opening', type: 'question', category: 'playful', emoji: '🍿',
    text: "Sweetu, scary movie or rom-com?",
    subtext: "Either way, you're hiding your face in my shoulder. I see it as a win.",
    options: [{ label: "Scary movie, need an excuse to hold you", tone: 'flirty' }, { label: "Rom-com, it's basically us", tone: 'playful' }],
  },
  {
    id: 'p119', phase: 'opening', type: 'question', category: 'memory', emoji: '💐',
    text: "Sweetu, what's the silliest thing I've done to make you smile?",
    subtext: "I have a whole archive of silly. This is just the demo.",
    options: [{ label: "This. This right here.", tone: 'playful' }, { label: "Everything you do", tone: 'romantic' }],
  },
  {
    id: 'p120', phase: 'opening', type: 'question', category: 'playful', emoji: '🎂',
    text: "Sweetu, if you were a cake, you'd be the whole bakery.",
    subtext: "That doesn't even make sense. Love does that to your brain.",
    options: [{ label: "Smooth save", tone: 'playful' }, { label: "Your brain on love is cute", tone: 'romantic' }],
  },
  {
    id: 'p121', phase: 'opening', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "If I serenaded you under the moonlight, Sweetu...",
    subtext: "Would you pretend my singing was good? For love?",
    options: [{ label: "I'd applaud every note", tone: 'romantic' }, { label: "Depends on the song", tone: 'playful' }],
  },
  {
    id: 'p122', phase: 'opening', type: 'question', category: 'destiny', emoji: '🪄',
    text: "Sweetu, if love was magic, we'd be the most powerful spell.",
    subtext: "Unbreakable. Unstoppable. And slightly dramatic.",
    options: [{ label: "We ARE magic", tone: 'romantic' }, { label: "The dramatics are accurate", tone: 'playful' }],
  },
  {
    id: 'p123', phase: 'opening', type: 'question', category: 'playful', emoji: '🧳',
    text: "Sweetu, if we could teleport anywhere right now, where would you go?",
    subtext: "My answer is wherever you are. Which is here. So I'm already winning.",
    options: [{ label: "Paris with you", tone: 'romantic' }, { label: "Right here is perfect", tone: 'emotional' }],
  },
  {
    id: 'p124', phase: 'opening', type: 'question', category: 'memory', emoji: '📞',
    text: "Sweetu, remember our longest phone call?",
    subtext: "We said 'okay bye' twelve times. And neither of us hung up.",
    options: [{ label: "Classic us", tone: 'playful' }, { label: "I never want to hang up", tone: 'romantic' }],
  },
  {
    id: 'p125', phase: 'opening', type: 'question', category: 'playful', emoji: '🦋',
    text: "Sweetu, do I still give you butterflies?",
    subtext: "Because you give me the whole zoo.",
    options: [{ label: "The whole zoo is right", tone: 'playful' }, { label: "Every single time", tone: 'romantic' }],
  },
  {
    id: 'p126', phase: 'opening', type: 'question', category: 'playful', emoji: '🎨',
    text: "Sweetu, if you could describe me in one emoji, which one?",
    subtext: "I already know mine for you: 🔥. Wait no, ❤️. Wait, both.",
    options: [{ label: '🤦 but lovingly', tone: 'playful' }, { label: '❤️ obviously', tone: 'romantic' }],
  },
  {
    id: 'p127', phase: 'opening', type: 'question', category: 'destiny', emoji: '⏳',
    text: "Sweetu, if time travel existed, I'd still choose this timeline.",
    subtext: "The one where I found you. Every other timeline is incomplete.",
    options: [{ label: "This is the best one", tone: 'romantic' }, { label: "Time travel can't improve us", tone: 'playful' }],
  },
  {
    id: 'p128', phase: 'opening', type: 'question', category: 'playful', emoji: '🎤',
    text: "Sweetu, what's our karaoke song?",
    subtext: "Doesn't matter what we pick, we'd still sound terrible. Beautifully terrible.",
    options: [{ label: "We'd destroy the stage", tone: 'playful' }, { label: "Any duet with you", tone: 'romantic' }],
  },
  {
    id: 'p129', phase: 'opening', type: 'question', category: 'memory', emoji: '🌃',
    text: "Sweetu, do you remember that night we talked until sunrise?",
    subtext: "The sun was jealous. It rose just to see what the fuss was about.",
    options: [{ label: "Best night ever", tone: 'romantic' }, { label: "I could do it again tonight", tone: 'flirty' }],
  },
  {
    id: 'p130', phase: 'opening', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, the moon and I made a pact.",
    subtext: "It watches over you when I can't. We have an arrangement.",
    options: [{ label: "The moon is on your team?", tone: 'playful' }, { label: "That's weirdly romantic", tone: 'romantic' }],
  },
  {
    id: 'p131', phase: 'opening', type: 'question', category: 'playful', emoji: '🍳',
    text: "Sweetu, I'd cook for you every day.",
    subtext: "Disclaimer: by 'cook' I mean order food and put it on nice plates.",
    options: [{ label: "That counts", tone: 'playful' }, { label: "I'll teach you", tone: 'romantic' }],
  },
  {
    id: 'p132', phase: 'opening', type: 'question', category: 'destiny', emoji: '🌀',
    text: "Sweetu, what if we've been finding each other for lifetimes?",
    subtext: "And this time, I'm not letting go.",
    options: [{ label: "Don't you dare", tone: 'romantic' }, { label: "Every lifetime, every time", tone: 'emotional' }],
  },
  {
    id: 'p133', phase: 'opening', type: 'question', category: 'playful', emoji: '💪',
    text: "Sweetu, would you still love me after seeing my gym form?",
    subtext: "It's... creative. Let's leave it at that.",
    options: [{ label: "I'd be your spotter", tone: 'playful' }, { label: "I love creative", tone: 'flirty' }],
  },
  {
    id: 'p134', phase: 'opening', type: 'question', category: 'memory', emoji: '🌸',
    text: "Sweetu, what's one thing about me that surprised you?",
    subtext: "Besides how impossibly charming I am. That one's obvious.",
    options: [{ label: "Your humility, clearly", tone: 'playful' }, { label: "How real you are", tone: 'emotional' }],
  },
  {
    id: 'p135', phase: 'opening', type: 'question', category: 'playful', emoji: '🎸',
    text: "Sweetu, if I learned guitar just to write you a song...",
    subtext: "Would you listen even if it had only two chords?",
    options: [{ label: "I'd cry at both chords", tone: 'romantic' }, { label: "Two chords is plenty", tone: 'playful' }],
  },
  {
    id: 'p136', phase: 'opening', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, if the moon could grant one wish tonight...",
    subtext: "I'd wish for a thousand more nights like this with you.",
    options: [{ label: "A thousand isn't enough", tone: 'romantic' }, { label: "Wish granted", tone: 'emotional' }],
  },
  {
    id: 'p137', phase: 'opening', type: 'question', category: 'playful', emoji: '🐻',
    text: "Sweetu, big spoon or little spoon?",
    subtext: "Trick question. The answer is whatever makes you comfortable.",
    options: [{ label: "Little spoon forever", tone: 'romantic' }, { label: "I want both", tone: 'playful' }],
  },
  {
    id: 'p138', phase: 'opening', type: 'question', category: 'destiny', emoji: '🔗',
    text: "Sweetu, some connections can't be explained.",
    subtext: "Ours is one of them. And I don't need an explanation.",
    options: [{ label: "It just makes sense", tone: 'romantic' }, { label: "Some things are beyond words", tone: 'emotional' }],
  },
  {
    id: 'p139', phase: 'opening', type: 'question', category: 'playful', emoji: '📸',
    text: "Sweetu, what's your most embarrassing photo of me?",
    subtext: "I know you have one. Everyone does. I've made peace with it.",
    options: [{ label: "I have several actually", tone: 'playful' }, { label: "You're cute in all of them", tone: 'romantic' }],
  },
  {
    id: 'p140', phase: 'opening', type: 'question', category: 'memory', emoji: '🎆',
    text: "Sweetu, remember the first time you called me by a nickname?",
    subtext: "My heart did a little backflip. It still does.",
    options: [{ label: "You reacted so cutely", tone: 'playful' }, { label: "I love our names for each other", tone: 'romantic' }],
  },
  {
    id: 'p141', phase: 'opening', type: 'question', category: 'playful', emoji: '🧩',
    text: "Sweetu, if I said you complete me...",
    subtext: "Would you cringe or melt? Be honest.",
    options: [{ label: "Both simultaneously", tone: 'playful' }, { label: "Melt, 100%", tone: 'romantic' }],
  },
  {
    id: 'p142', phase: 'opening', type: 'question', category: 'playful', emoji: '🌶️',
    text: "Sweetu, rate my flirting skills. 1 to 10.",
    subtext: "Anything below 8 and I'm filing a complaint with the universe.",
    options: [{ label: "Solid 11", tone: 'flirty' }, { label: "A generous 7... okay fine, 10", tone: 'playful' }],
  },
  {
    id: 'p143', phase: 'opening', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, do you talk to the moon too?",
    subtext: "Because I told it everything about you. It's a big fan.",
    options: [{ label: "I talk to it about you too", tone: 'romantic' }, { label: "The moon's a gossip", tone: 'playful' }],
  },
  {
    id: 'p144', phase: 'opening', type: 'question', category: 'destiny', emoji: '🌠',
    text: "Sweetu, shooting stars are overrated.",
    subtext: "I don't need to wish anymore. I already have you.",
    options: [{ label: "Best non-wish ever", tone: 'romantic' }, { label: "You're the wish that came true", tone: 'emotional' }],
  },
  {
    id: 'p145', phase: 'opening', type: 'question', category: 'playful', emoji: '🎲',
    text: "Sweetu, truth or dare?",
    subtext: "Truth: I'm crazy about you. Dare: try not to blush reading this.",
    options: [{ label: "Dare failed. I'm blushing.", tone: 'shy' }, { label: "Truth: I'm crazy about you too", tone: 'romantic' }],
  },
  {
    id: 'p146', phase: 'opening', type: 'question', category: 'memory', emoji: '🌻',
    text: "Sweetu, when did 'just friends' stop working for us?",
    subtext: "Because I remember the exact moment. My heart couldn't pretend anymore.",
    options: [{ label: "It never worked", tone: 'romantic' }, { label: "We were never just friends", tone: 'emotional' }],
  },
  {
    id: 'p147', phase: 'opening', type: 'question', category: 'playful', emoji: '🎡',
    text: "Sweetu, ferris wheel at sunset?",
    subtext: "Just you, me, the view, and my sweaty palms because I'm secretly scared of heights.",
    options: [{ label: "I'll hold your hand", tone: 'romantic' }, { label: "The view is you anyway", tone: 'flirty' }],
  },
  {
    id: 'p148', phase: 'opening', type: 'question', category: 'playful', emoji: '🎵',
    text: "Sweetu, if our relationship had a theme song...",
    subtext: "It would be stuck in everyone's head. Because we're that iconic.",
    options: [{ label: "Top of the charts forever", tone: 'playful' }, { label: "Something timeless", tone: 'romantic' }],
  },
  {
    id: 'p149', phase: 'opening', type: 'question', category: 'destiny', emoji: '💫',
    text: "Sweetu, I once asked the universe for a sign.",
    subtext: "It didn't send a sign. It sent you. Overachiever, that universe.",
    options: [{ label: "Universe has great taste", tone: 'playful' }, { label: "I got the same sign", tone: 'romantic' }],
  },
  {
    id: 'p150', phase: 'opening', type: 'question', category: 'playful', emoji: '🌮',
    text: "Sweetu, late night tacos or late night talks?",
    subtext: "Why am I even asking? We both know it's both.",
    options: [{ label: "Tacos AND talks", tone: 'playful' }, { label: "Talks first, tacos after", tone: 'romantic' }],
  },
  {
    id: 'p151', phase: 'opening', type: 'question', category: 'memory', emoji: '🎭',
    text: "Sweetu, remember when we tried to act normal around each other?",
    subtext: "We failed spectacularly. And I wouldn't change a thing.",
    options: [{ label: "Normal was never our thing", tone: 'playful' }, { label: "We're perfect as we are", tone: 'romantic' }],
  },
  {
    id: 'p152', phase: 'opening', type: 'question', category: 'playful', emoji: '🏋️',
    text: "Sweetu, I carry your love in my heart every day.",
    subtext: "That's my workout. Emotional cardio.",
    options: [{ label: "Strongest heart ever", tone: 'playful' }, { label: "You carry mine too", tone: 'romantic' }],
  },
  {
    id: 'p153', phase: 'opening', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, some nights the moon looks extra bright.",
    subtext: "Those are the nights it's trying to compete with your smile.",
    options: [{ label: "Moon loses every time", tone: 'flirty' }, { label: "You and that silver tongue", tone: 'playful' }],
  },
  {
    id: 'p154', phase: 'opening', type: 'question', category: 'playful', emoji: '🛒',
    text: "Sweetu, grocery shopping together is secretly romantic.",
    subtext: "Arguing over cereal brands? That's love language.",
    options: [{ label: "The cart racing is the best part", tone: 'playful' }, { label: "Everything's romantic with you", tone: 'romantic' }],
  },
  {
    id: 'p155', phase: 'opening', type: 'question', category: 'destiny', emoji: '🧵',
    text: "Sweetu, they say there's a red thread connecting soulmates.",
    subtext: "Ours is probably tangled. Like everything else about us. And I love it.",
    options: [{ label: "Tangled but unbreakable", tone: 'romantic' }, { label: "We make chaos look good", tone: 'playful' }],
  },
  {
    id: 'p156', phase: 'opening', type: 'question', category: 'playful', emoji: '☀️',
    text: "Sweetu, you're the reason I smile at my phone like an idiot.",
    subtext: "People on the bus think I'm unhinged. Worth it.",
    options: [{ label: "Same, actually", tone: 'romantic' }, { label: "The bus people understand", tone: 'playful' }],
  },
  {
    id: 'p157', phase: 'opening', type: 'question', category: 'memory', emoji: '🥂',
    text: "Sweetu, if we could relive one day together, which one?",
    subtext: "I'd pick any day. Because every day with you is my favorite.",
    options: [{ label: "The day we met", tone: 'romantic' }, { label: "Today. Always today.", tone: 'emotional' }],
  },
  {
    id: 'p158', phase: 'opening', type: 'question', category: 'playful', emoji: '🧁',
    text: "Sweetu, I tried to write you a poem.",
    subtext: "Roses are red, violets are blue, this is terrible, but I love you.",
    options: [{ label: "10/10 poem", tone: 'playful' }, { label: "Say it again", tone: 'romantic' }],
  },
  {
    id: 'p159', phase: 'opening', type: 'question', category: 'playful', emoji: '🕺',
    text: "Sweetu, slow dance in the living room?",
    subtext: "No music, no occasion, just us being us.",
    options: [{ label: "Right now", tone: 'romantic' }, { label: "Only if you lead", tone: 'flirty' }],
  },
  {
    id: 'p160', phase: 'opening', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, the moon asked about you again.",
    subtext: "I told it you're even more beautiful than last night. It agreed.",
    options: [{ label: "You and the moon gossip too much", tone: 'playful' }, { label: "Tell the moon thank you", tone: 'romantic' }],
  },
  {
    id: 'p161', phase: 'opening', type: 'question', category: 'destiny', emoji: '🎪',
    text: "Sweetu, this universe is chaotic and unpredictable.",
    subtext: "But it got one thing absolutely right: us.",
    options: [{ label: "Its best work yet", tone: 'playful' }, { label: "We're the exception to chaos", tone: 'romantic' }],
  },
  {
    id: 'p162', phase: 'opening', type: 'question', category: 'playful', emoji: '📝',
    text: "Sweetu, if I made a pros and cons list about us...",
    subtext: "The cons column would be empty. The pros column would need extra pages.",
    options: [{ label: "Where's this list?", tone: 'playful' }, { label: "No cons possible", tone: 'romantic' }],
  },
  {
    id: 'p163', phase: 'opening', type: 'question', category: 'memory', emoji: '🎯',
    text: "Sweetu, what's the one thing I do that always makes you laugh?",
    subtext: "I need to know so I can do it forever.",
    options: [{ label: "Just being yourself", tone: 'romantic' }, { label: "Your terrible impressions", tone: 'playful' }],
  },
  {
    id: 'p164', phase: 'opening', type: 'question', category: 'playful', emoji: '🧲',
    text: "Sweetu, my phone autocorrects everything to your name.",
    subtext: "It doesn't, but my brain does. Same thing.",
    options: [{ label: "Your brain has taste", tone: 'playful' }, { label: "That's oddly adorable", tone: 'romantic' }],
  },
  {
    id: 'p165', phase: 'opening', type: 'question', category: 'playful', emoji: '🎈',
    text: "Sweetu, if happiness was a person...",
    subtext: "It would look exactly like you. And smell nice. You always smell nice.",
    options: [{ label: "Okay now you're just rambling", tone: 'playful' }, { label: "You notice everything", tone: 'romantic' }],
  },
  {
    id: 'p166', phase: 'opening', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, every crescent moon is just the moon winking at us.",
    subtext: "Like it knows something we don't. Or maybe it knows exactly what we do.",
    options: [{ label: "The moon ships us", tone: 'playful' }, { label: "It sees our future", tone: 'romantic' }],
  },
  {
    id: 'p167', phase: 'opening', type: 'question', category: 'destiny', emoji: '🌟',
    text: "Sweetu, if destiny had a face, I'd thank it personally.",
    subtext: "For every twist and turn that led me to you.",
    options: [{ label: "I'd send destiny flowers", tone: 'playful' }, { label: "Every twist was worth it", tone: 'romantic' }],
  },

  // ── MIDDLE PHASE (p168–p234) — 67 more romantic, deeper ──

  {
    id: 'p168', phase: 'middle', type: 'question', category: 'romantic', emoji: '💌',
    text: "Sweetu, if I could only say three words for the rest of my life...",
    subtext: "You already know which three.",
    options: [{ label: 'Say them', tone: 'emotional' }, { label: 'I know. Me too.', tone: 'romantic' }],
  },
  {
    id: 'p169', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, the moon has phases, but my love for you doesn't.",
    subtext: "It's always full. Always bright. Always yours.",
    options: [{ label: "Full moon energy forever", tone: 'romantic' }, { label: "You're poetic tonight", tone: 'playful' }],
  },
  {
    id: 'p170', phase: 'middle', type: 'question', category: 'future', emoji: '🏡',
    text: "Sweetu, our future home needs one non-negotiable thing.",
    subtext: "A balcony. For us. For the moon. For late-night conversations.",
    options: [{ label: "And fairy lights", tone: 'playful' }, { label: "Anywhere feels like home with you", tone: 'romantic' }],
  },
  {
    id: 'p171', phase: 'middle', type: 'question', category: 'romantic', emoji: '🫶',
    text: "Sweetu, being loved by you feels like coming home.",
    subtext: "After the longest journey. To the warmest place.",
    options: [{ label: "You are my home", tone: 'emotional' }, { label: "Welcome home, always", tone: 'romantic' }],
  },
  {
    id: 'p172', phase: 'middle', type: 'question', category: 'future', emoji: '🌏',
    text: "Sweetu, let's make a travel bucket list together.",
    subtext: "First stop: anywhere. Only condition: you're next to me.",
    options: [{ label: "Passport ready", tone: 'playful' }, { label: "Every adventure with you", tone: 'romantic' }],
  },
  {
    id: 'p173', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, on moonless nights, you become my light.",
    subtext: "You don't even know you do it. But you do. Every time.",
    options: [{ label: "You light me up too", tone: 'romantic' }, { label: "That's the most beautiful thing", tone: 'emotional' }],
  },
  {
    id: 'p174', phase: 'middle', type: 'question', category: 'romantic', emoji: '💐',
    text: "Sweetu, I don't need grand gestures.",
    subtext: "Your hand in mine is bigger than any firework show.",
    options: [{ label: "Small moments, big love", tone: 'romantic' }, { label: "Never let go then", tone: 'emotional' }],
  },
  {
    id: 'p175', phase: 'middle', type: 'question', category: 'future', emoji: '🎪',
    text: "Sweetu, imagine us cooking together at midnight.",
    subtext: "Flour everywhere. Burnt edges. Perfect memories.",
    options: [{ label: "Messy and perfect", tone: 'playful' }, { label: "I'd burn food with you forever", tone: 'romantic' }],
  },
  {
    id: 'p176', phase: 'middle', type: 'question', category: 'romantic', emoji: '🕊️',
    text: "Sweetu, my peace isn't a place. It's a person.",
    subtext: "And that person is currently reading this.",
    options: [{ label: "You're my peace too", tone: 'emotional' }, { label: "Don't make me cry already", tone: 'shy' }],
  },
  {
    id: 'p177', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, I told the moon our story tonight.",
    subtext: "It cried a little. Even celestial objects can't handle us.",
    options: [{ label: "We made the moon emotional?", tone: 'playful' }, { label: "Our story is that powerful", tone: 'romantic' }],
  },
  {
    id: 'p178', phase: 'middle', type: 'question', category: 'romantic', emoji: '💞',
    text: "Sweetu, you taught me that love isn't just a word.",
    subtext: "It's waking up and choosing someone. And I choose you. Every sunrise.",
    options: [{ label: "Every sunrise, every sunset", tone: 'romantic' }, { label: "I choose you too", tone: 'emotional' }],
  },
  {
    id: 'p179', phase: 'middle', type: 'question', category: 'future', emoji: '🛤️',
    text: "Sweetu, the road ahead is unknown.",
    subtext: "But if you're walking it with me, I'm not scared of a single step.",
    options: [{ label: "Side by side, always", tone: 'romantic' }, { label: "I'll match your every step", tone: 'emotional' }],
  },
  {
    id: 'p180', phase: 'middle', type: 'question', category: 'romantic', emoji: '🎀',
    text: "Sweetu, you're not just my favorite person.",
    subtext: "You're my favorite everything. My favorite chapter. My favorite view.",
    options: [{ label: "You're my favorite too", tone: 'romantic' }, { label: "Keep going, I'm listening", tone: 'flirty' }],
  },
  {
    id: 'p181', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, the moon and I share custody of the night.",
    subtext: "It gets the sky. I get the girl. I think I got the better deal.",
    options: [{ label: "Definitely the better deal", tone: 'playful' }, { label: "The moon agrees", tone: 'romantic' }],
  },
  {
    id: 'p182', phase: 'middle', type: 'question', category: 'romantic', emoji: '🎼',
    text: "Sweetu, you're the melody I didn't know I was humming.",
    subtext: "And now I can't get you out of my head. Ever.",
    options: [{ label: "Don't even try", tone: 'flirty' }, { label: "You're stuck in my head too", tone: 'romantic' }],
  },
  {
    id: 'p183', phase: 'middle', type: 'question', category: 'future', emoji: '🌤️',
    text: "Sweetu, mornings with you would be my religion.",
    subtext: "Messy hair. Sleepy eyes. The most beautiful sight in the world.",
    options: [{ label: "I'd worship lazy mornings", tone: 'romantic' }, { label: "You can't even wake up early", tone: 'playful' }],
  },
  {
    id: 'p184', phase: 'middle', type: 'question', category: 'romantic', emoji: '🫧',
    text: "Sweetu, this thing between us? It's not a spark.",
    subtext: "It's a whole bonfire. And it's only getting warmer.",
    options: [{ label: "Let it burn", tone: 'flirty' }, { label: "I feel the warmth", tone: 'romantic' }],
  },
  {
    id: 'p185', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, the moonlight looks different when you're around.",
    subtext: "Softer. Warmer. Like even it adjusts for you.",
    options: [{ label: "The moon is simping", tone: 'playful' }, { label: "Everything's softer with you", tone: 'romantic' }],
  },
  {
    id: 'p186', phase: 'middle', type: 'question', category: 'romantic', emoji: '🧸',
    text: "Sweetu, you make me feel safe in the most chaotic world.",
    subtext: "Like nothing bad can touch me when I'm next to you.",
    options: [{ label: "Nothing ever will", tone: 'emotional' }, { label: "We protect each other", tone: 'romantic' }],
  },
  {
    id: 'p187', phase: 'middle', type: 'question', category: 'future', emoji: '📸',
    text: "Sweetu, our photo album will be legendary.",
    subtext: "Half cute selfies. Half ugly ones we'll laugh at forever.",
    options: [{ label: "The ugly ones are the best", tone: 'playful' }, { label: "A lifetime of frames", tone: 'romantic' }],
  },
  {
    id: 'p188', phase: 'middle', type: 'question', category: 'romantic', emoji: '💖',
    text: "Sweetu, I've never believed in perfect.",
    subtext: "Until you walked in and rewrote the definition.",
    options: [{ label: "I'm far from perfect", tone: 'shy' }, { label: "Perfect for you, maybe", tone: 'romantic' }],
  },
  {
    id: 'p189', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, if the moon could sing, it would sing about us.",
    subtext: "A slow, infinite lullaby. Just for two.",
    options: [{ label: "Our personal lullaby", tone: 'romantic' }, { label: "The moon has great taste in lyrics", tone: 'playful' }],
  },
  {
    id: 'p190', phase: 'middle', type: 'question', category: 'romantic', emoji: '🌺',
    text: "Sweetu, you don't just make me happy.",
    subtext: "You make happiness feel like it was invented for us.",
    options: [{ label: "We own happiness", tone: 'playful' }, { label: "You invented my happiness", tone: 'emotional' }],
  },
  {
    id: 'p191', phase: 'middle', type: 'question', category: 'future', emoji: '🍵',
    text: "Sweetu, growing old with you sounds like the best adventure.",
    subtext: "Two cups of chai. Same stories. Still laughing.",
    options: [{ label: "I'll pour the chai", tone: 'romantic' }, { label: "Same stories, new laughs", tone: 'playful' }],
  },
  {
    id: 'p192', phase: 'middle', type: 'question', category: 'romantic', emoji: '🕰️',
    text: "Sweetu, time stops when I'm with you.",
    subtext: "And speeds up when I'm not. The universe is rigged.",
    options: [{ label: "Time is biased toward us", tone: 'playful' }, { label: "Let's make it stop forever", tone: 'romantic' }],
  },
  {
    id: 'p193', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, the moon is proof that something can shine in the dark.",
    subtext: "And so are you. Especially in my darkest moments.",
    options: [{ label: "You shine in mine too", tone: 'emotional' }, { label: "We light the dark together", tone: 'romantic' }],
  },
  {
    id: 'p194', phase: 'middle', type: 'question', category: 'romantic', emoji: '💝',
    text: "Sweetu, my heart has a reserved seat.",
    subtext: "It's got your name on it. Permanent. Non-transferable.",
    options: [{ label: "Front row forever", tone: 'playful' }, { label: "I'll never give it up", tone: 'romantic' }],
  },
  {
    id: 'p195', phase: 'middle', type: 'question', category: 'future', emoji: '🎆',
    text: "Sweetu, every New Year's countdown with you...",
    subtext: "Would end the same way. With a kiss. And a promise for more.",
    options: [{ label: "Every countdown, every year", tone: 'romantic' }, { label: "That's the only tradition I need", tone: 'emotional' }],
  },
  {
    id: 'p196', phase: 'middle', type: 'question', category: 'romantic', emoji: '🌷',
    text: "Sweetu, if love had levels, we'd be on a floor nobody's reached.",
    subtext: "We broke the elevator. No going back.",
    options: [{ label: "We invented a new floor", tone: 'playful' }, { label: "Only up from here", tone: 'romantic' }],
  },
  {
    id: 'p197', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, some people see craters on the moon.",
    subtext: "I see the same place where I imagine us sitting, feet dangling, in love.",
    options: [{ label: "Book us a seat", tone: 'playful' }, { label: "That's our spot", tone: 'romantic' }],
  },
  {
    id: 'p198', phase: 'middle', type: 'question', category: 'romantic', emoji: '🎭',
    text: "Sweetu, I stopped pretending to be cool around you.",
    subtext: "Because you loved the messy, real, unfiltered me. And that's everything.",
    options: [{ label: "The real you is my favorite", tone: 'romantic' }, { label: "You were never cool anyway", tone: 'playful' }],
  },
  {
    id: 'p199', phase: 'middle', type: 'question', category: 'future', emoji: '🛋️',
    text: "Sweetu, lazy Sundays with you are my love language.",
    subtext: "Nothing planned. Nowhere to go. Just us existing together.",
    options: [{ label: "That's the whole dream", tone: 'romantic' }, { label: "Every Sunday, please", tone: 'emotional' }],
  },
  {
    id: 'p200', phase: 'middle', type: 'question', category: 'romantic', emoji: '🔮',
    text: "Sweetu, I don't need a crystal ball to see my future.",
    subtext: "I just look at you. And everything makes sense.",
    options: [{ label: "You're my future too", tone: 'romantic' }, { label: "I see the same thing", tone: 'emotional' }],
  },
  {
    id: 'p201', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, I named a star after you in my head.",
    subtext: "It's the brightest one. Right next to the moon. Where it belongs.",
    options: [{ label: "That's our star now", tone: 'romantic' }, { label: "You're such a dreamer", tone: 'playful' }],
  },
  {
    id: 'p202', phase: 'middle', type: 'question', category: 'romantic', emoji: '🫂',
    text: "Sweetu, your hugs should be prescribed by doctors.",
    subtext: "Side effects include: uncontrollable smiling and heart palpitations.",
    options: [{ label: "Come get your dose", tone: 'flirty' }, { label: "I prescribe daily hugs", tone: 'romantic' }],
  },
  {
    id: 'p203', phase: 'middle', type: 'question', category: 'future', emoji: '🌅',
    text: "Sweetu, first thing I want to do every morning?",
    subtext: "See your face. Even the sleepy, grumpy, pillow-mark version.",
    options: [{ label: "That's the best version", tone: 'romantic' }, { label: "You haven't seen grumpy me yet", tone: 'playful' }],
  },
  {
    id: 'p204', phase: 'middle', type: 'question', category: 'romantic', emoji: '💗',
    text: "Sweetu, you know what's unfair?",
    subtext: "That one person can mean this much. That you can be this important.",
    options: [{ label: "You mean everything", tone: 'emotional' }, { label: "Life's unfairly beautiful now", tone: 'romantic' }],
  },
  {
    id: 'p205', phase: 'middle', type: 'statement', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, the moon keeps our secrets safe.",
    subtext: "Every whisper, every laugh, every 'I love you' under the night sky.",
    options: [{ label: "Our vault in the sky", tone: 'romantic' }],
  },
  {
    id: 'p206', phase: 'middle', type: 'question', category: 'romantic', emoji: '🎯',
    text: "Sweetu, falling for you wasn't a choice.",
    subtext: "It was gravity. Inevitable. And the best fall of my life.",
    options: [{ label: "Best landing ever", tone: 'playful' }, { label: "I fell just as hard", tone: 'romantic' }],
  },
  {
    id: 'p207', phase: 'middle', type: 'question', category: 'future', emoji: '📚',
    text: "Sweetu, I want to read books next to you on rainy afternoons.",
    subtext: "Different books. Same couch. Our feet tangled under a blanket.",
    options: [{ label: "That's intimacy", tone: 'romantic' }, { label: "I call the comfy side", tone: 'playful' }],
  },
  {
    id: 'p208', phase: 'middle', type: 'question', category: 'romantic', emoji: '🌻',
    text: "Sweetu, you're the calm in my chaos.",
    subtext: "When everything's loud, your voice is the one I hear.",
    options: [{ label: "You're my calm too", tone: 'emotional' }, { label: "I'll always be your anchor", tone: 'romantic' }],
  },
  {
    id: 'p209', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, the moon rises every night like a love letter to the sky.",
    subtext: "And every night, I read it and think of you.",
    options: [{ label: "The sky is lucky", tone: 'playful' }, { label: "I read the same letter", tone: 'romantic' }],
  },
  {
    id: 'p210', phase: 'middle', type: 'question', category: 'romantic', emoji: '🎹',
    text: "Sweetu, if my life was a piano, you'd be the key of C.",
    subtext: "Everything starts with you. Every melody begins at you.",
    options: [{ label: "Play me a song then", tone: 'flirty' }, { label: "We make beautiful music", tone: 'romantic' }],
  },
  {
    id: 'p211', phase: 'middle', type: 'question', category: 'future', emoji: '🌿',
    text: "Sweetu, let's plant a garden together someday.",
    subtext: "We'll watch things grow. Like our love, but with tomatoes.",
    options: [{ label: "Love and tomatoes, perfect", tone: 'playful' }, { label: "Growing things together", tone: 'romantic' }],
  },
  {
    id: 'p212', phase: 'middle', type: 'question', category: 'romantic', emoji: '💘',
    text: "Sweetu, I've tried to describe how I feel about you.",
    subtext: "Words keep failing. But my heart keeps trying.",
    options: [{ label: "I feel it even without words", tone: 'emotional' }, { label: "Your heart speaks louder", tone: 'romantic' }],
  },
  {
    id: 'p213', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, the moon doesn't judge our midnight overthinking.",
    subtext: "It just listens. And glows a little brighter when we figure things out.",
    options: [{ label: "Our silent therapist", tone: 'playful' }, { label: "We always figure it out", tone: 'romantic' }],
  },
  {
    id: 'p214', phase: 'middle', type: 'question', category: 'romantic', emoji: '🌊',
    text: "Sweetu, you're not my anchor. You're my sail.",
    subtext: "You don't hold me down. You take me places I've never been.",
    options: [{ label: "Let's sail everywhere", tone: 'romantic' }, { label: "Together, we're the whole ship", tone: 'emotional' }],
  },
  {
    id: 'p215', phase: 'middle', type: 'question', category: 'future', emoji: '🎊',
    text: "Sweetu, I want to celebrate everything with you.",
    subtext: "Big wins. Small wins. Tuesday. Doesn't matter. You're the celebration.",
    options: [{ label: "Tuesday celebrations hit different", tone: 'playful' }, { label: "You're the reason to celebrate", tone: 'romantic' }],
  },
  {
    id: 'p216', phase: 'middle', type: 'question', category: 'romantic', emoji: '🪞',
    text: "Sweetu, when I look at you, I see the best version of my future.",
    subtext: "Not because you complete me. Because you inspire me.",
    options: [{ label: "You inspire me too", tone: 'emotional' }, { label: "We bring out the best", tone: 'romantic' }],
  },
  {
    id: 'p217', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, even the moon takes a night off sometimes.",
    subtext: "But my love for you? No off switch. No dim mode. Full brightness, always.",
    options: [{ label: "High beams forever", tone: 'playful' }, { label: "Same brightness here", tone: 'romantic' }],
  },
  {
    id: 'p218', phase: 'middle', type: 'question', category: 'romantic', emoji: '🧩',
    text: "Sweetu, we fit together like two puzzle pieces.",
    subtext: "The kind that were always meant to connect. Even when the picture looked impossible.",
    options: [{ label: "The picture is beautiful now", tone: 'romantic' }, { label: "We make the impossible possible", tone: 'emotional' }],
  },
  {
    id: 'p219', phase: 'middle', type: 'question', category: 'future', emoji: '🏕️',
    text: "Sweetu, campfire under the stars. You and me.",
    subtext: "Marshmallows. Blanket. Bad ghost stories. Perfect company.",
    options: [{ label: "My kind of date", tone: 'playful' }, { label: "Under every star with you", tone: 'romantic' }],
  },
  {
    id: 'p220', phase: 'middle', type: 'question', category: 'romantic', emoji: '💫',
    text: "Sweetu, you turned my ordinary life into something cinematic.",
    subtext: "Every moment with you has a soundtrack. And it's beautiful.",
    options: [{ label: "We're the main characters", tone: 'playful' }, { label: "Our soundtrack is everything", tone: 'romantic' }],
  },
  {
    id: 'p221', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, promise me one thing.",
    subtext: "That when you see the moon, you'll think of me. Even for a second.",
    options: [{ label: "Every single time", tone: 'romantic' }, { label: "Already been doing that", tone: 'emotional' }],
  },
  {
    id: 'p222', phase: 'middle', type: 'question', category: 'romantic', emoji: '❤️‍🔥',
    text: "Sweetu, my love for you is annoyingly persistent.",
    subtext: "It shows up uninvited. Stays forever. And refuses to be quiet.",
    options: [{ label: "The best kind of stubborn", tone: 'playful' }, { label: "Never quiet it down", tone: 'romantic' }],
  },
  {
    id: 'p223', phase: 'middle', type: 'question', category: 'future', emoji: '🎻',
    text: "Sweetu, when we're old, I'll still open the door for you.",
    subtext: "With shaky hands and a proud heart. Some things never change.",
    options: [{ label: "I'll still get butterflies", tone: 'romantic' }, { label: "The shaky hands part got me", tone: 'emotional' }],
  },
  {
    id: 'p224', phase: 'middle', type: 'question', category: 'romantic', emoji: '🌸',
    text: "Sweetu, I've memorized the way your eyes light up.",
    subtext: "When you laugh. When you're surprised. When you see food. Especially food.",
    options: [{ label: "Food gets the best reaction", tone: 'playful' }, { label: "You notice everything about me", tone: 'romantic' }],
  },
  {
    id: 'p225', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, midnight walks under the moon are our thing.",
    subtext: "No destination. No plan. Just two hearts wandering together.",
    options: [{ label: "Our favorite tradition", tone: 'romantic' }, { label: "Let's go tonight", tone: 'emotional' }],
  },
  {
    id: 'p226', phase: 'middle', type: 'question', category: 'romantic', emoji: '💎',
    text: "Sweetu, you're rare. Like actually rare.",
    subtext: "In a world of copies, you're the original. My original.",
    options: [{ label: "One of a kind", tone: 'romantic' }, { label: "So are you", tone: 'emotional' }],
  },
  {
    id: 'p227', phase: 'middle', type: 'question', category: 'future', emoji: '🎬',
    text: "Sweetu, when we're eighty, let's rewatch our favorite movies.",
    subtext: "And pretend we've never seen them. Even though we'll mouth every line.",
    options: [{ label: "We'll still argue about the endings", tone: 'playful' }, { label: "Movie nights forever", tone: 'romantic' }],
  },
  {
    id: 'p228', phase: 'middle', type: 'question', category: 'romantic', emoji: '🫀',
    text: "Sweetu, my heart skips when you say my name.",
    subtext: "It's medically concerning. But emotionally? 10/10.",
    options: [{ label: "I'll say it more often", tone: 'flirty' }, { label: "My heart does the same", tone: 'romantic' }],
  },
  {
    id: 'p229', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, the moon gets it. The stars get it.",
    subtext: "Even the clouds move aside when we're together. We're that obvious.",
    options: [{ label: "The sky ships us", tone: 'playful' }, { label: "Obviously in love", tone: 'romantic' }],
  },
  {
    id: 'p230', phase: 'middle', type: 'question', category: 'romantic', emoji: '🪴',
    text: "Sweetu, love with you isn't a sprint.",
    subtext: "It's a slow, steady walk through a garden. And I never want to leave.",
    options: [{ label: "Let's stay in the garden", tone: 'romantic' }, { label: "Walk with me forever", tone: 'emotional' }],
  },
  {
    id: 'p231', phase: 'middle', type: 'question', category: 'future', emoji: '🌇',
    text: "Sweetu, I want to be the first and last face you see every day.",
    subtext: "Morning eyes. Night whispers. Everything in between.",
    options: [{ label: "Sounds like forever", tone: 'romantic' }, { label: "That's the whole plan", tone: 'emotional' }],
  },
  {
    id: 'p232', phase: 'middle', type: 'question', category: 'romantic', emoji: '🎠',
    text: "Sweetu, love used to confuse me.",
    subtext: "Then you showed up, and suddenly the whole thing made sense.",
    options: [{ label: "You make everything clear", tone: 'romantic' }, { label: "Love clicked with you", tone: 'emotional' }],
  },
  {
    id: 'p233', phase: 'middle', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, if we ever argue under the moonlight...",
    subtext: "The moon said it'll take my side. I have witnesses.",
    options: [{ label: "The moon is biased!", tone: 'playful' }, { label: "We'd make up before it sets", tone: 'romantic' }],
  },
  {
    id: 'p234', phase: 'middle', type: 'question', category: 'romantic', emoji: '🧡',
    text: "Sweetu, some people search their whole lives for what we have.",
    subtext: "And here we are. Found. Chosen. Loved.",
    options: [{ label: "Found and keeping forever", tone: 'romantic' }, { label: "We got lucky", tone: 'emotional' }],
  },

  // ── CLOSING PHASE (p235–p300) — 66 more emotional crescendo ──

  {
    id: 'p235', phase: 'closing', type: 'question', category: 'emotional', emoji: '🦢',
    text: "Sweetu, swans mate for life.",
    subtext: "I think they got the idea from us.",
    options: [{ label: "For life. No less.", tone: 'romantic' }, { label: "We inspired the swans", tone: 'playful' }],
  },
  {
    id: 'p236', phase: 'closing', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, this moonlight knows our truth.",
    subtext: "That what we have is once in a forever. Not once in a lifetime. Forever.",
    options: [{ label: "Once in a forever", tone: 'romantic' }, { label: "The moon understands us", tone: 'emotional' }],
  },
  {
    id: 'p237', phase: 'closing', type: 'question', category: 'romantic', emoji: '🔥',
    text: "Sweetu, I'd walk through fire for you.",
    subtext: "And honestly? It would probably feel like a cool breeze compared to how much I love you.",
    options: [{ label: "I'd walk through it with you", tone: 'romantic' }, { label: "You're my kind of intense", tone: 'emotional' }],
  },
  {
    id: 'p238', phase: 'closing', type: 'question', category: 'emotional', emoji: '🥀',
    text: "Sweetu, even flowers fade. Seasons change.",
    subtext: "But what I feel for you? It's the one permanent thing in a temporary world.",
    options: [{ label: "Permanent and proud", tone: 'romantic' }, { label: "You're my constant", tone: 'emotional' }],
  },
  {
    id: 'p239', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, the moon watches over lovers.",
    subtext: "Tonight, it's watching over us. And smiling.",
    options: [{ label: "We make the moon smile", tone: 'romantic' }],
  },
  {
    id: 'p240', phase: 'closing', type: 'question', category: 'emotional', emoji: '🫧',
    text: "Sweetu, this isn't a crush. This isn't infatuation.",
    subtext: "This is the kind of love that poets write about. And I'm living it. With you.",
    options: [{ label: "We are the poem", tone: 'romantic' }, { label: "Keep writing it with me", tone: 'emotional' }],
  },
  {
    id: 'p241', phase: 'closing', type: 'question', category: 'romantic', emoji: '🏔️',
    text: "Sweetu, if our love was a mountain, nobody could climb it.",
    subtext: "It's that tall. That unshakeable. That breathtaking.",
    options: [{ label: "We're at the summit together", tone: 'romantic' }, { label: "Unclimbable and ours", tone: 'emotional' }],
  },
  {
    id: 'p242', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, tonight the moon is ours.",
    subtext: "It cleared its schedule. Just. For. Us.",
    options: [{ label: "The moon has priorities", tone: 'playful' }],
  },
  {
    id: 'p243', phase: 'closing', type: 'question', category: 'emotional', emoji: '💝',
    text: "Sweetu, I used to be afraid of forever.",
    subtext: "Until I realized forever with you isn't enough.",
    options: [{ label: "Give me forever plus one", tone: 'romantic' }, { label: "I want more than forever too", tone: 'emotional' }],
  },
  {
    id: 'p244', phase: 'closing', type: 'question', category: 'romantic', emoji: '🕯️',
    text: "Sweetu, you're the flame that never flickers.",
    subtext: "Steady. Warm. And impossible to ignore.",
    options: [{ label: "I'll burn for you always", tone: 'romantic' }, { label: "You keep me burning too", tone: 'emotional' }],
  },
  {
    id: 'p245', phase: 'closing', type: 'question', category: 'emotional', emoji: '🌬️',
    text: "Sweetu, even the wind carries your name to me.",
    subtext: "In every breeze, every whisper, every quiet moment.",
    options: [{ label: "The wind is a romantic", tone: 'playful' }, { label: "Your name is everywhere", tone: 'romantic' }],
  },
  {
    id: 'p246', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, under this moon, I want to make a vow.",
    subtext: "To love you in every language the universe speaks.",
    options: [{ label: "In every language, every lifetime", tone: 'romantic' }],
  },
  {
    id: 'p247', phase: 'closing', type: 'question', category: 'romantic', emoji: '🌹',
    text: "Sweetu, a hundred roses couldn't say what one look from you says.",
    subtext: "Your eyes speak volumes. And I'm reading every page.",
    options: [{ label: "Keep reading", tone: 'flirty' }, { label: "Your eyes speak too", tone: 'romantic' }],
  },
  {
    id: 'p248', phase: 'closing', type: 'question', category: 'emotional', emoji: '🎇',
    text: "Sweetu, you didn't just enter my life.",
    subtext: "You rewrote it. Every chapter. Every line. Made it worth reading.",
    options: [{ label: "You rewrote mine too", tone: 'emotional' }, { label: "Best plot twist ever", tone: 'romantic' }],
  },
  {
    id: 'p249', phase: 'closing', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, if I could bottle moonlight...",
    subtext: "I'd pour it into your hands. So you always carry a piece of us.",
    options: [{ label: "I already carry us in my heart", tone: 'emotional' }, { label: "That's pure poetry", tone: 'romantic' }],
  },
  {
    id: 'p250', phase: 'closing', type: 'question', category: 'romantic', emoji: '💗',
    text: "Sweetu, I promise you imperfect. And real. And forever.",
    subtext: "Because perfect is boring. But forever with you? That's everything.",
    options: [{ label: "Imperfect and real is everything", tone: 'romantic' }, { label: "Forever isn't long enough", tone: 'emotional' }],
  },
  {
    id: 'p251', phase: 'closing', type: 'question', category: 'emotional', emoji: '🕊️',
    text: "Sweetu, you taught me that vulnerability isn't weakness.",
    subtext: "It's the bravest thing two people can share. And I'd share it all with you.",
    options: [{ label: "I trust you with all of me", tone: 'emotional' }, { label: "We're brave together", tone: 'romantic' }],
  },
  {
    id: 'p252', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, the moon is our witness tonight.",
    subtext: "To every unspoken word. Every racing heartbeat. Every 'I love you' between the lines.",
    options: [{ label: "The most beautiful witness", tone: 'romantic' }],
  },
  {
    id: 'p253', phase: 'closing', type: 'question', category: 'romantic', emoji: '🌟',
    text: "Sweetu, you don't just own my heart.",
    subtext: "You own every version of it. Past, present, and all the futures.",
    options: [{ label: "Every version loves you", tone: 'romantic' }, { label: "All my futures are yours", tone: 'emotional' }],
  },
  {
    id: 'p254', phase: 'closing', type: 'question', category: 'emotional', emoji: '😭',
    text: "Sweetu, happy tears are a real thing.",
    subtext: "I know because I'm trying really hard not to have them right now.",
    options: [{ label: "Let them fall", tone: 'emotional' }, { label: "We cry together", tone: 'romantic' }],
  },
  {
    id: 'p255', phase: 'closing', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, every phase of the moon reminds me of us.",
    subtext: "New beginnings. Full love. Quiet moments. And always coming back.",
    options: [{ label: "Always coming back to you", tone: 'romantic' }, { label: "Every phase is beautiful", tone: 'emotional' }],
  },
  {
    id: 'p256', phase: 'closing', type: 'question', category: 'romantic', emoji: '💌',
    text: "Sweetu, if this website is the craziest thing I've done for love...",
    subtext: "Just wait. I'm only getting started.",
    options: [{ label: "I'm ready for all of it", tone: 'romantic' }, { label: "You're perfectly crazy", tone: 'playful' }],
  },
  {
    id: 'p257', phase: 'closing', type: 'question', category: 'emotional', emoji: '🫀',
    text: "Sweetu, my heart beats differently now.",
    subtext: "Like it finally found its rhythm. And that rhythm is you.",
    options: [{ label: "Our hearts sync", tone: 'romantic' }, { label: "You're my heartbeat", tone: 'emotional' }],
  },
  {
    id: 'p258', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, the moon is old. Ancient. Timeless.",
    subtext: "And still, it's never seen a love like ours.",
    options: [{ label: "We're making history", tone: 'romantic' }],
  },
  {
    id: 'p259', phase: 'closing', type: 'question', category: 'romantic', emoji: '🤍',
    text: "Sweetu, I don't want easy. I want you.",
    subtext: "The real you. The complicated, beautiful, wonderful you.",
    options: [{ label: "You get all of me", tone: 'emotional' }, { label: "I want all of you too", tone: 'romantic' }],
  },
  {
    id: 'p260', phase: 'closing', type: 'question', category: 'emotional', emoji: '🌈',
    text: "Sweetu, after every storm we've faced...",
    subtext: "You've been my rainbow. Every single time.",
    options: [{ label: "You're my rainbow too", tone: 'romantic' }, { label: "Together through every storm", tone: 'emotional' }],
  },
  {
    id: 'p261', phase: 'closing', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, the moon is holding its breath tonight.",
    subtext: "It knows what's coming. And it's been waiting for this moment too.",
    options: [{ label: "The moon knew all along", tone: 'romantic' }, { label: "I can feel it too", tone: 'emotional' }],
  },
  {
    id: 'p262', phase: 'closing', type: 'question', category: 'romantic', emoji: '💍',
    text: "Sweetu, some promises are made with words.",
    subtext: "Ours? Made with heartbeats. And they're louder than anything I could say.",
    options: [{ label: "Heartbeat promises are forever", tone: 'romantic' }, { label: "I hear every beat", tone: 'emotional' }],
  },
  {
    id: 'p263', phase: 'closing', type: 'question', category: 'emotional', emoji: '🥺',
    text: "Sweetu, I'm running out of ways to say I love you.",
    subtext: "So I built you a whole website instead. That counts, right?",
    options: [{ label: "It counts times a million", tone: 'romantic' }, { label: "This is the best love letter", tone: 'emotional' }],
  },
  {
    id: 'p264', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, the moonlit sky is rooting for us.",
    subtext: "Every star aligned. Every cloud parted. All for this moment.",
    options: [{ label: "This moment is ours", tone: 'romantic' }],
  },
  {
    id: 'p265', phase: 'closing', type: 'question', category: 'romantic', emoji: '❤️',
    text: "Sweetu, I promise to love your bad days just as much.",
    subtext: "The messy, hard, ugly ones. Those are when love matters most.",
    options: [{ label: "That's real love", tone: 'emotional' }, { label: "I promise the same", tone: 'romantic' }],
  },
  {
    id: 'p266', phase: 'closing', type: 'question', category: 'emotional', emoji: '🌊',
    text: "Sweetu, if my love was water, you'd need an ark.",
    subtext: "It's that deep. That wide. That unstoppable.",
    options: [{ label: "I'll build the ark with you", tone: 'romantic' }, { label: "Let it flood", tone: 'emotional' }],
  },
  {
    id: 'p267', phase: 'closing', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, the moon whispered something new tonight.",
    subtext: "It said: 'She's ready. Ask her.'",
    options: [{ label: "The moon is right", tone: 'romantic' }, { label: "I've been ready", tone: 'emotional' }],
  },
  {
    id: 'p268', phase: 'closing', type: 'question', category: 'romantic', emoji: '💐',
    text: "Sweetu, every love story has a defining moment.",
    subtext: "I think ours is right now. Right here. This one.",
    options: [{ label: "This is our moment", tone: 'romantic' }, { label: "I feel it too", tone: 'emotional' }],
  },
  {
    id: 'p269', phase: 'closing', type: 'question', category: 'emotional', emoji: '✨',
    text: "Sweetu, I want to grow with you. Not apart.",
    subtext: "Every year, closer. Every challenge, stronger. Every moment, deeper.",
    options: [{ label: "Growing together forever", tone: 'romantic' }, { label: "Closer every day", tone: 'emotional' }],
  },
  {
    id: 'p270', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, the moon told me to be brave tonight.",
    subtext: "So here I am. Heart open. Completely yours.",
    options: [{ label: "You're the bravest person I know", tone: 'romantic' }],
  },
  {
    id: 'p271', phase: 'closing', type: 'question', category: 'romantic', emoji: '🫶',
    text: "Sweetu, I'm not perfect. But my love for you is.",
    subtext: "It's the one thing I got completely, undeniably right.",
    options: [{ label: "You got it so right", tone: 'romantic' }, { label: "We're perfectly imperfect", tone: 'emotional' }],
  },
  {
    id: 'p272', phase: 'closing', type: 'question', category: 'emotional', emoji: '💓',
    text: "Sweetu, can you hear my heart from there?",
    subtext: "Because it's screaming your name. And it has no volume control.",
    options: [{ label: "I hear it clearly", tone: 'romantic' }, { label: "Mine is screaming yours", tone: 'emotional' }],
  },
  {
    id: 'p273', phase: 'closing', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, under this same moon, I'm making you a promise.",
    subtext: "To always show up. To always choose you. To never stop trying.",
    options: [{ label: "I promise the same", tone: 'romantic' }, { label: "That's all I ever need", tone: 'emotional' }],
  },
  {
    id: 'p274', phase: 'closing', type: 'question', category: 'romantic', emoji: '💘',
    text: "Sweetu, you didn't just capture my heart.",
    subtext: "You gave it a reason to beat. A purpose. A home.",
    options: [{ label: "You're my heart's home", tone: 'emotional' }, { label: "You gave mine purpose too", tone: 'romantic' }],
  },
  {
    id: 'p275', phase: 'closing', type: 'question', category: 'emotional', emoji: '🌸',
    text: "Sweetu, I'm terrified of how much I love you.",
    subtext: "But I'm even more terrified of a world where I don't.",
    options: [{ label: "Don't ever stop", tone: 'romantic' }, { label: "I'm terrified too. And grateful.", tone: 'emotional' }],
  },
  {
    id: 'p276', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, the moon knows what I'm about to ask.",
    subtext: "And it's been waiting almost as long as I have.",
    options: [{ label: "Ask me anything", tone: 'anticipation' }],
  },
  {
    id: 'p277', phase: 'closing', type: 'question', category: 'romantic', emoji: '🌹',
    text: "Sweetu, every 'I love you' I say is an understatement.",
    subtext: "The real feeling is so much bigger. Words just can't carry it all.",
    options: [{ label: "I feel what you can't say", tone: 'emotional' }, { label: "I love you beyond words too", tone: 'romantic' }],
  },
  {
    id: 'p278', phase: 'closing', type: 'question', category: 'emotional', emoji: '🦋',
    text: "Sweetu, you make my soul smile.",
    subtext: "Not just my face. My actual soul. I didn't know it could do that.",
    options: [{ label: "You taught my soul to smile too", tone: 'emotional' }, { label: "Souls smiling is our thing", tone: 'romantic' }],
  },
  {
    id: 'p279', phase: 'closing', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, when the moonlight hits your face...",
    subtext: "Even the stars go quiet. Like the whole sky is admiring you.",
    options: [{ label: "The sky has taste", tone: 'playful' }, { label: "You see me so beautifully", tone: 'romantic' }],
  },
  {
    id: 'p280', phase: 'closing', type: 'question', category: 'romantic', emoji: '💞',
    text: "Sweetu, I stopped counting the reasons I love you.",
    subtext: "Not because there are too few. Because they never stop multiplying.",
    options: [{ label: "Infinite reasons", tone: 'romantic' }, { label: "New ones every day", tone: 'emotional' }],
  },
  {
    id: 'p281', phase: 'closing', type: 'question', category: 'emotional', emoji: '🥹',
    text: "Sweetu, you know what breaks me in the best way?",
    subtext: "The way you love me back. Like I actually deserve it.",
    options: [{ label: "You deserve all of it", tone: 'romantic' }, { label: "You deserve even more", tone: 'emotional' }],
  },
  {
    id: 'p282', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, tonight's moon is the most beautiful I've seen.",
    subtext: "Second most beautiful. You're first. You're always first.",
    options: [{ label: "You and that silver tongue", tone: 'playful' }],
  },
  {
    id: 'p283', phase: 'closing', type: 'question', category: 'romantic', emoji: '🔐',
    text: "Sweetu, I locked away all my fears the day I chose you.",
    subtext: "And threw away the key. I'm all in. No backup plan.",
    options: [{ label: "All in, no turning back", tone: 'romantic' }, { label: "Who needs a backup?", tone: 'emotional' }],
  },
  {
    id: 'p284', phase: 'closing', type: 'question', category: 'emotional', emoji: '🌊',
    text: "Sweetu, some feelings are too big for words.",
    subtext: "This is one of them. So I'm just going to let my heart do the talking.",
    options: [{ label: "I'm listening with mine", tone: 'romantic' }, { label: "Hearts speak louder", tone: 'emotional' }],
  },
  {
    id: 'p285', phase: 'closing', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, the night sky wrote our names together.",
    subtext: "In constellations. In moonbeams. In every shooting star.",
    options: [{ label: "Written in the stars, literally", tone: 'romantic' }, { label: "The sky knows our story", tone: 'emotional' }],
  },
  {
    id: 'p286', phase: 'closing', type: 'question', category: 'romantic', emoji: '🫀',
    text: "Sweetu, my heart only knows one direction now.",
    subtext: "Toward you. Always toward you. There is no other way.",
    options: [{ label: "One direction: us", tone: 'romantic' }, { label: "My compass points to you too", tone: 'emotional' }],
  },
  {
    id: 'p287', phase: 'closing', type: 'question', category: 'emotional', emoji: '✨',
    text: "Sweetu, you are the reason I believe in beautiful things.",
    subtext: "Sunsets. Slow songs. Love that lasts. You made me believe again.",
    options: [{ label: "You made me believe too", tone: 'emotional' }, { label: "Believing together", tone: 'romantic' }],
  },
  {
    id: 'p288', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, the moon has one last message for you.",
    subtext: "It says: 'He's never loved anyone the way he loves you. Trust him.'",
    options: [{ label: "I trust you completely", tone: 'romantic' }],
  },
  {
    id: 'p289', phase: 'closing', type: 'question', category: 'romantic', emoji: '💝',
    text: "Sweetu, I don't want to just love you.",
    subtext: "I want to love you loudly. Proudly. In front of the whole world.",
    options: [{ label: "Shout it from rooftops", tone: 'romantic' }, { label: "The whole world can hear", tone: 'emotional' }],
  },
  {
    id: 'p290', phase: 'closing', type: 'question', category: 'emotional', emoji: '🥀',
    text: "Sweetu, I'll love you in the messy moments.",
    subtext: "When things aren't pretty. When it's hard. Especially then.",
    options: [{ label: "Especially then", tone: 'romantic' }, { label: "Through all of it", tone: 'emotional' }],
  },
  {
    id: 'p291', phase: 'closing', type: 'question', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, every moon we share from now on is a chapter.",
    subtext: "In the longest, most beautiful book ever written. By us.",
    options: [{ label: "A never-ending book", tone: 'romantic' }, { label: "Our best chapter starts now", tone: 'emotional' }],
  },
  {
    id: 'p292', phase: 'closing', type: 'question', category: 'romantic', emoji: '💎',
    text: "Sweetu, I'd rather have hard days with you...",
    subtext: "Than perfect days with anyone else. That's not a choice. That's a fact.",
    options: [{ label: "Hard days, soft love", tone: 'romantic' }, { label: "Always you. Only you.", tone: 'emotional' }],
  },
  {
    id: 'p293', phase: 'closing', type: 'question', category: 'emotional', emoji: '🌺',
    text: "Sweetu, you're not just in my heart.",
    subtext: "You are my heart. The whole thing beats because of you.",
    options: [{ label: "Then we share a heartbeat", tone: 'romantic' }, { label: "You ARE my heart too", tone: 'emotional' }],
  },
  {
    id: 'p294', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, the moon saved its brightest glow for tonight.",
    subtext: "Because tonight, something beautiful is about to happen.",
    options: [{ label: "I can feel it", tone: 'anticipation' }],
  },
  {
    id: 'p295', phase: 'closing', type: 'question', category: 'romantic', emoji: '🫶',
    text: "Sweetu, I have loved you in silence and in chaos.",
    subtext: "In doubt and in certainty. And every version of love led here.",
    options: [{ label: "Every path led to us", tone: 'romantic' }, { label: "Here is exactly right", tone: 'emotional' }],
  },
  {
    id: 'p296', phase: 'closing', type: 'question', category: 'emotional', emoji: '💫',
    text: "Sweetu, what we have can't be replicated.",
    subtext: "They could try for a thousand years. And still not come close.",
    options: [{ label: "One of a kind love", tone: 'romantic' }, { label: "Irreplaceable", tone: 'emotional' }],
  },
  {
    id: 'p297', phase: 'closing', type: 'statement', category: 'moonlight', emoji: '🌙',
    text: "Sweetu, the moon is full. My heart is full. This moment is full.",
    subtext: "And there's only one thing left to make it perfect.",
    options: [{ label: "I know what it is", tone: 'anticipation' }],
  },
  {
    id: 'p298', phase: 'closing', type: 'question', category: 'romantic', emoji: '❤️',
    text: "Sweetu, everything I am is yours.",
    subtext: "The good, the flawed, the ridiculous, the romantic. All of it. All for you.",
    options: [{ label: "I accept all of you", tone: 'romantic' }, { label: "And everything I am is yours", tone: 'emotional' }],
  },
  {
    id: 'p299', phase: 'closing', type: 'question', category: 'emotional', emoji: '💖',
    text: "Sweetu, this is the most real thing I've ever felt.",
    subtext: "And I want to feel it every day. For every day that comes after today.",
    options: [{ label: "Every day, always", tone: 'romantic' }, { label: "This is just the beginning", tone: 'emotional' }],
  },
  {
    id: 'p300', phase: 'closing', type: 'question', category: 'moonlight', emoji: '🌕',
    text: "Sweetu, the moon, the stars, and my entire heart agree...",
    subtext: "There's only one question left worth asking. And I'm ready.",
    options: [{ label: "I'm ready too", tone: 'anticipation' }, { label: "Ask me", tone: 'emotional' }],
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
