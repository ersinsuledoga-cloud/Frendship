export interface QuizQuestion {
  id: number;
  scenarioTitle: string;
  questionText: string;
  contextText?: string;
  dialogue?: { speaker: string; text: string }[];
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanationTr: string;
  targetWord: string;
}

export const LGS_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenarioTitle: 'Karşılıklı Konuşma (LGS Diyalog Sorusu)',
    questionText: 'According to the conversation above, which of the following completes the blank?',
    dialogue: [
      { speaker: 'Efe', text: 'Why is Kerem your best friend in class?' },
      { speaker: 'Bora', text: 'Because he always ________ me up when I have a problem. I know he is always there for me.' }
    ],
    options: [
      { key: 'A', text: 'backs' },
      { key: 'B', text: 'argues' },
      { key: 'C', text: 'refuses' },
      { key: 'D', text: 'lies' }
    ],
    correctAnswer: 'A',
    explanationTr: 'Doğru cevap "backs". "Back up" phrasal verbi "destek olmak, arka çıkmak" anlamına gelir ve LGS sınavında "support" ile birebir eş anlamlıdır.',
    targetWord: 'Back up'
  },
  {
    id: 2,
    scenarioTitle: 'Kişisel Özellik Analizi (Dürüstlük)',
    questionText: 'Read the information about Zeynep and answer the question:\n"Zeynep never tells lies to her friends. She always tells the truth, even if it is difficult."\nAccording to the sentence, Zeynep is a/an ________ person.',
    options: [
      { key: 'A', text: 'laid-back' },
      { key: 'B', text: 'honest' },
      { key: 'C', text: 'punctual' },
      { key: 'D', text: 'unfair' }
    ],
    correctAnswer: 'B',
    explanationTr: 'Doğru cevap "honest" (dürüst). Cümlede geçen "never tells lies" (asla yalan söylemez) ve "always tells the truth" (daima doğruyu söyler) ifadeleri dürüst bir insanı tanımlar.',
    targetWord: 'Honest'
  },
  {
    id: 3,
    scenarioTitle: 'Davet ve Mazeret Bildirme',
    questionText: 'Elif invites her friends to a bowling tournament on Saturday. Which of the following responses REFUSES the invitation by making an EXCUSE (mazeret)?',
    options: [
      { key: 'A', text: 'Awesome! I can\'t refuse this cool offer.' },
      { key: 'B', text: 'Sure, that sounds fun! What time does it start?' },
      { key: 'C', text: 'I\'d love to, but I must help my father paint the garage.' },
      { key: 'D', text: 'No, I don\'t want to come.' }
    ],
    correctAnswer: 'C',
    explanationTr: 'Doğru cevap "C". "I\'d love to, but I must help my father..." ifadesi hem kibarca reddetmekte (refuse) hem de geçerli bir mazeret (excuse) sunmaktadır.',
    targetWord: 'Refuse & Excuse'
  },
  {
    id: 4,
    scenarioTitle: 'Eş Anlamlı Kelime Bilgisi (Güven)',
    questionText: '“I can always count on my buddy Sinan because he is a reliable friend.”\nWhich word can replace "count on" in the sentence above without changing the meaning?',
    options: [
      { key: 'A', text: 'argue with' },
      { key: 'B', text: 'rely on' },
      { key: 'C', text: 'refuse' },
      { key: 'D', text: 'share' }
    ],
    correctAnswer: 'B',
    explanationTr: 'Doğru cevap "rely on". LGS 1. Ünitede "Count on = Rely on = Trust" (güvenmek) üçlüsü kesinlikle bilinmelidir.',
    targetWord: 'Count on / Rely on'
  },
  {
    id: 5,
    scenarioTitle: 'Zaman ve Randevu Davranışı',
    questionText: 'Read the statement:\n"Mert is never late for our meetings. When we say we will meet at 2:00 PM, he arrives at 1:55 PM."\nWhich adjective best describes Mert?',
    options: [
      { key: 'A', text: 'Punctual' },
      { key: 'B', text: 'Laid-back' },
      { key: 'C', text: 'Selfish' },
      { key: 'D', text: 'Aggressive' }
    ],
    correctAnswer: 'A',
    explanationTr: 'Doğru cevap "Punctual" (dakik). "Never late" (asla geç kalmaz) ve "arrives on time" ifadeleri dakikliği anlatır.',
    targetWord: 'Punctual'
  },
  {
    id: 6,
    scenarioTitle: 'İlişki ve Arkadaşlık Bağı',
    questionText: '“Selin and Derya have lots of things in common. They rarely argue and they have a strong bond.”\nAccording to the information, Selin and Derya ________ each other.',
    options: [
      { key: 'A', text: 'tell lies to' },
      { key: 'B', text: 'get on well with' },
      { key: 'C', text: 'make excuses to' },
      { key: 'D', text: 'refuse' }
    ],
    correctAnswer: 'B',
    explanationTr: 'Doğru cevap "get on well with" (iyi geçinmek). Nadiren tartışan ("rarely argue") ve güçlü bağı ("strong bond") olan arkadaşlar iyi anlaşırlar.',
    targetWord: 'Get on well with'
  },
  {
    id: 7,
    scenarioTitle: 'Karakter Analizi (Rahatlık ve Sakinlik)',
    questionText: '“Can is a very ________ boy. Even before the big LGS exam, he never panics or stresses out. He stays completely calm and relaxed.”\nWhich word best completes the sentence?',
    options: [
      { key: 'A', text: 'outgoing' },
      { key: 'B', text: 'laid-back' },
      { key: 'C', text: 'jealous' },
      { key: 'D', text: 'honest' }
    ],
    correctAnswer: 'B',
    explanationTr: 'Doğru cevap "laid-back" (rahat, sakin, telaşsız). "Never panics", "stays calm and relaxed" ifadeleri laid-back karakterini açıklar.',
    targetWord: 'Laid-back'
  },
  {
    id: 8,
    scenarioTitle: 'Güven ve Sır Saklama',
    questionText: '“A true friend never shares your secret with other people. You can easily ________ him.”\nWhich of the following completes the sentence correctly?',
    options: [
      { key: 'A', text: 'argue' },
      { key: 'B', text: 'refuse' },
      { key: 'C', text: 'trust' },
      { key: 'D', text: 'excuse' }
    ],
    correctAnswer: 'C',
    explanationTr: 'Doğru cevap "trust" (güvenmek). Sırrını başkalarıyla paylaşmayan birine güvenebilirsin ("You can easily trust him").',
    targetWord: 'Trust / Share a secret'
  },
  {
    id: 9,
    scenarioTitle: 'Sosyal Kişilik Tanımı',
    questionText: '“Gizem enjoys spending time with people, chatting, and attending social clubs. She makes new friends very easily.”\nWhich personal trait matches Gizem’s personality?',
    options: [
      { key: 'A', text: 'Outgoing' },
      { key: 'B', text: 'Punctual' },
      { key: 'C', text: 'Laid-back' },
      { key: 'D', text: 'Fair' }
    ],
    correctAnswer: 'A',
    explanationTr: 'Doğru cevap "Outgoing" (dışa dönük, sosyal). Yeni arkadaşlıklar kurmayı seven ve kulüplere katılan kişiler "outgoing"dir.',
    targetWord: 'Outgoing'
  },
  {
    id: 10,
    scenarioTitle: 'Adalet ve Eşitlik',
    questionText: '“In our games, Melis never cheats and she treats all players equally according to the rules.”\nAccording to this, Melis is always ________.',
    options: [
      { key: 'A', text: 'fair' },
      { key: 'B', text: 'laid-back' },
      { key: 'C', text: 'selfish' },
      { key: 'D', text: 'dishonest' }
    ],
    correctAnswer: 'A',
    explanationTr: 'Doğru cevap "fair" (adil). Hile yapmayan ("never cheats") ve herkese eşit davranan ("treats all players equally") kişi adildir.',
    targetWord: 'Fair'
  },
  {
    id: 11,
    scenarioTitle: 'Zıt Anlam Bilgisi (İyi Geçinmek / Tartışmak)',
    questionText: '“Good buddies almost never ________ with each other because they respect each other’s ideas.”\nWhich word best fits the blank?',
    options: [
      { key: 'A', text: 'argue' },
      { key: 'B', text: 'support' },
      { key: 'C', text: 'accept' },
      { key: 'D', text: 'count' }
    ],
    correctAnswer: 'A',
    explanationTr: 'Doğru cevap "argue" (tartışmak). Birbirlerinin fikirlerine saygı duyan iyi arkadaşlar nadiren tartışırlar.',
    targetWord: 'Argue'
  },
  {
    id: 12,
    scenarioTitle: 'Sadakat ve Vefa (Loyalty)',
    questionText: '“A ________ friend stays with you through difficult and bad days, not just when things are fun.”\nWhich word correctly completes the sentence?',
    options: [
      { key: 'A', text: 'loyal' },
      { key: 'B', text: 'laid-back' },
      { key: 'C', text: 'unfair' },
      { key: 'D', text: 'dishonest' }
    ],
    correctAnswer: 'A',
    explanationTr: 'Doğru cevap "loyal" (sadık, vefalı). Sadece iyi günde değil, zor günlerde de yanında kalan kişi sadık arkadaştır.',
    targetWord: 'Loyal'
  },
  {
    id: 13,
    scenarioTitle: 'Davet Kabul Etme (Accepting an Offer)',
    questionText: 'Tom: "We are having a picnic this Sunday. Would you like to join us?"\nWhich of the following responses ACCEPTS the invitation?',
    options: [
      { key: 'A', text: 'I\'d love to! I can\'t miss this opportunity.' },
      { key: 'B', text: 'I am so sorry, but I have a doctor appointment.' },
      { key: 'C', text: 'Maybe next time, I need to rest.' },
      { key: 'D', text: 'I refuse to go to picnics.' }
    ],
    correctAnswer: 'A',
    explanationTr: 'Doğru cevap "A". "I\'d love to! I can\'t miss this opportunity" daveti kabul ettiğini (accept) belirtir.',
    targetWord: 'Accept'
  },
  {
    id: 14,
    scenarioTitle: 'Destek Olmak (Support / Help)',
    questionText: '“Whenever my sister is preparing for her school exams, I always ________ her by explaining difficult topics.”\nWhich word completes the blank best?',
    options: [
      { key: 'A', text: 'support' },
      { key: 'B', text: 'refuse' },
      { key: 'C', text: 'argue' },
      { key: 'D', text: 'lie' }
    ],
    correctAnswer: 'A',
    explanationTr: 'Doğru cevap "support" (destek olmak). Zor konuları anlatarak yardım etmek destek olmaktır (support = back up).',
    targetWord: 'Support'
  },
  {
    id: 15,
    scenarioTitle: 'Kanka / Yakın Dost (Buddy / Mate)',
    questionText: '“Jack and I do all homework together and play soccer every evening. He is not just a classmate; he is my best ________.”\nWhich word fits best?',
    options: [
      { key: 'A', text: 'buddy' },
      { key: 'B', text: 'excuse' },
      { key: 'C', text: 'argument' },
      { key: 'D', text: 'lie' }
    ],
    correctAnswer: 'A',
    explanationTr: 'Doğru cevap "buddy" (kanka, yakın dost). Birlikte her şeyi yapan yakın arkadaşı tanımlar.',
    targetWord: 'Buddy'
  },
  {
    id: 16,
    scenarioTitle: 'Sır Saklamak ve Güvenilirlik',
    questionText: '“If you tell something private to Aylin, you can be sure nobody else will hear it. She is extremely ________.”\nWhich word completes the description?',
    options: [
      { key: 'A', text: 'reliable' },
      { key: 'B', text: 'unpunctual' },
      { key: 'C', text: 'aggressive' },
      { key: 'D', text: 'laid-back' }
    ],
    correctAnswer: 'A',
    explanationTr: 'Doğru cevap "reliable" (güvenilir). Kişisel sırları saklayan ve kimseye söylemeyen kişi güvenilirdir.',
    targetWord: 'Reliable'
  },
  {
    id: 17,
    scenarioTitle: 'Doğru ve Gerçek Arkadaş (True Friend)',
    questionText: 'Which proverb or statement best defines "Friendship"?\n“A ________ friend walks in when the rest of the world walks out.”',
    options: [
      { key: 'A', text: 'true' },
      { key: 'B', text: 'unreliable' },
      { key: 'C', text: 'selfish' },
      { key: 'D', text: 'late' }
    ],
    correctAnswer: 'A',
    explanationTr: 'Doğru cevap "true" (doğru, gerçek arkadaş). "A true friend walks in when the rest of the world walks out" ünlü bir arkadaşlık sözüdür.',
    targetWord: 'True friend'
  },
  {
    id: 18,
    scenarioTitle: 'Kopmaz Bağ (Strong Bond)',
    questionText: '“Even though Ali moved to another city, we still talk every day and our friendship never ends. We have a ________ between us.”',
    options: [
      { key: 'A', text: 'strong bond' },
      { key: 'B', text: 'bad excuse' },
      { key: 'C', text: 'loud argument' },
      { key: 'D', text: 'dishonest lie' }
    ],
    correctAnswer: 'A',
    explanationTr: 'Doğru cevap "strong bond" (güçlü bağ). Mesafe girse bile devam eden sarsılmaz dostluk bağını ifade eder.',
    targetWord: 'Strong bond'
  },
  {
    id: 19,
    scenarioTitle: 'Yalan Söylemek (Tell a lie)',
    questionText: '“Our teacher says: ‘Never ________ to anyone, because honesty is the foundation of friendship.’ ”\nWhich phrase correctly completes the teacher’s advice?',
    options: [
      { key: 'A', text: 'tell a lie' },
      { key: 'B', text: 'support friends' },
      { key: 'C', text: 'keep secrets' },
      { key: 'D', text: 'be punctual' }
    ],
    correctAnswer: 'A',
    explanationTr: 'Doğru cevap "tell a lie" (yalan söylemek). Dürüstlüğün zıddı yalan söylemektir.',
    targetWord: 'Lie'
  },
  {
    id: 20,
    scenarioTitle: 'Mazeret Bildirme (Making an Excuse)',
    questionText: 'Duygu: "Why didn\'t you come to my birthday party?"\nDeniz: "I am really sorry. My sister was sick and I had to take care of her."\nAccording to this dialogue, Deniz is giving a/an ________.',
    options: [
      { key: 'A', text: 'excuse' },
      { key: 'B', text: 'argument' },
      { key: 'C', text: 'secret' },
      { key: 'D', text: 'invitation' }
    ],
    correctAnswer: 'A',
    explanationTr: 'Doğru cevap "excuse" (mazeret). Kardeşinin hasta olduğunu söyleyerek katılamama nedenini / mazeretini sunmaktadır.',
    targetWord: 'Excuse'
  }
];

/**
 * Returns a randomized set of questions with shuffled options (A, B, C, D)
 * so every game session feels unique and non-repetitive!
 */
export function getRandomQuizQuestions(count: number = 10): QuizQuestion[] {
  const shuffledBank = [...LGS_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
  const selected = shuffledBank.slice(0, Math.min(count, shuffledBank.length));

  return selected.map((q, idx) => {
    // Identify the correct option text
    const correctOpt = q.options.find(o => o.key === q.correctAnswer);
    const correctText = correctOpt ? correctOpt.text : q.options[0].text;

    // Shuffle options
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
    const keys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

    let newCorrectKey: 'A' | 'B' | 'C' | 'D' = 'A';
    const remappedOptions = shuffledOptions.map((opt, i) => {
      const key = keys[i];
      if (opt.text === correctText) {
        newCorrectKey = key;
      }
      return {
        key,
        text: opt.text
      };
    });

    return {
      ...q,
      id: idx + 1,
      scenarioTitle: `Soru ${idx + 1}: ${q.scenarioTitle.replace(/Soru \d+:\s*/, '')}`,
      options: remappedOptions,
      correctAnswer: newCorrectKey
    };
  });
}
