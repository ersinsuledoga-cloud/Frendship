export interface WordItem {
  id: string;
  english: string;
  turkish: string;
  speechText: string;
  category: 'verb' | 'noun' | 'adjective' | 'phrase';
  exampleEn: string;
  exampleTr: string;
  synonymOrNote?: string;
  lgsTip?: string;
}

export const VOCABULARY_LIST: WordItem[] = [
  {
    id: 'friendship',
    english: 'Friendship',
    turkish: 'Arkadaşlık, dostluk',
    speechText: 'Friendship',
    category: 'noun',
    exampleEn: 'True friendship lasts forever.',
    exampleTr: 'Gerçek arkadaşlık sonsuza kadar sürer.',
    synonymOrNote: 'Companionship, bond',
    lgsTip: 'Ünitenin ana başlığı. Paragraflarda arkadaşlığın önemi sıkça vurgulanır.'
  },
  {
    id: 'close-friend',
    english: 'Close friend',
    turkish: 'Yakın arkadaş',
    speechText: 'Close friend',
    category: 'noun',
    exampleEn: 'Ayşe is my close friend; we share everything.',
    exampleTr: 'Ayşe benim yakın arkadaşım; her şeyimizi paylaşırız.',
    synonymOrNote: 'Intimate companion',
    lgsTip: 'Paragraf sorularında "best friend" ile eş anlamlı olarak kullanılır.'
  },
  {
    id: 'best-friend',
    english: 'Best friend',
    turkish: 'En iyi arkadaş',
    speechText: 'Best friend',
    category: 'noun',
    exampleEn: 'A best friend is like a brother or sister.',
    exampleTr: 'En iyi arkadaş bir kardeş gibidir.',
    synonymOrNote: 'Number one buddy',
    lgsTip: 'LGS diyaloglarında "Who is your best friend and why?" kalıbında çıkar.'
  },
  {
    id: 'true-friend',
    english: 'True friend',
    turkish: 'Doğru, gerçek arkadaş',
    speechText: 'True friend',
    category: 'noun',
    exampleEn: 'A true friend never leaves you alone in hard times.',
    exampleTr: 'Doğru bir arkadaş zor zamanlarında seni asla yalnız bırakmaz.',
    synonymOrNote: 'Real friend, loyal friend',
    lgsTip: 'Sorularda ideal bir arkadaşın özellikleri sorulduğunda aranacak temel ifadedir.'
  },
  {
    id: 'buddy',
    english: 'Buddy',
    turkish: 'Kanka, can dostu',
    speechText: 'Buddy',
    category: 'noun',
    exampleEn: 'Ali is my buddy from primary school.',
    exampleTr: 'Ali benim ilkokuldan kankam.',
    synonymOrNote: 'Mate, friend, pal',
    lgsTip: 'LGS diyaloglarında samimi hitaplarda ve davet mektuplarında sık görülür.'
  },
  {
    id: 'mate',
    english: 'Mate',
    turkish: 'Arkadaş, dost',
    speechText: 'Mate',
    category: 'noun',
    exampleEn: 'We are classmates and good mates.',
    exampleTr: 'Biz sınıf arkadaşıyız ve iyi dostlarız.',
    synonymOrNote: 'Classmate, buddy',
    lgsTip: 'Özellikle "classmate" veya "roommate" kelimeleriyle bağlantılıdır.'
  },
  {
    id: 'support',
    english: 'Support',
    turkish: 'Destek olmak, yardım etmek',
    speechText: 'Support',
    category: 'verb',
    exampleEn: 'Good friends always support each other.',
    exampleTr: 'İyi arkadaşlar birbirlerine daima destek olurlar.',
    synonymOrNote: 'Help, back up',
    lgsTip: 'LGS’de kesinlikle bilmen gereken fiil. "Back up" ile birebir eş anlamlıdır!'
  },
  {
    id: 'back-up',
    english: 'Back up',
    turkish: 'Destek olmak, arka çıkmak',
    speechText: 'Back up',
    category: 'verb',
    exampleEn: 'My friends always back me up when I have a problem.',
    exampleTr: 'Bir sorunum olduğunda arkadaşlarım her zaman bana arka çıkar.',
    synonymOrNote: 'Support, stand by',
    lgsTip: 'LGS’de en çok sorulan Phrasal Verb! "He backs me up = He supports me".'
  },
  {
    id: 'trust',
    english: 'Trust',
    turkish: 'Güvenmek / Güven',
    speechText: 'Trust',
    category: 'verb',
    exampleEn: 'You can trust him; he never tells lies.',
    exampleTr: 'Ona güvenebilirsin; asla yalan söylemez.',
    synonymOrNote: 'Rely on, count on, depend on',
    lgsTip: 'LGS vazgeçilmez üçlüsü: Trust = Count on = Rely on.'
  },
  {
    id: 'count-on',
    english: 'Count on',
    turkish: 'Güvenmek, bel bağlamak',
    speechText: 'Count on',
    category: 'verb',
    exampleEn: 'I count on Zeynep because she keeps my secrets.',
    exampleTr: 'Zeynep’e güvenirim çünkü sırlarımı saklar.',
    synonymOrNote: 'Trust, rely on',
    lgsTip: 'Boşluk doldurma ve eşleştirme sorularının 1 numaralı yıldızı.'
  },
  {
    id: 'rely-on',
    english: 'Rely on',
    turkish: 'Güvenmek, inanmak',
    speechText: 'Rely on',
    category: 'verb',
    exampleEn: 'True friends can always rely on each other.',
    exampleTr: 'Gerçek arkadaşlar birbirlerine daima güvenebilirler.',
    synonymOrNote: 'Trust, count on',
    lgsTip: 'Genellikle "reliable" (güvenilir) sıfatıyla birlikte sorulur.'
  },
  {
    id: 'reliable',
    english: 'Reliable / Trustful',
    turkish: 'Güvenilir, itimat edilir',
    speechText: 'Reliable, Trustful',
    category: 'adjective',
    exampleEn: 'A reliable friend never shares your personal secrets.',
    exampleTr: 'Güvenilir bir arkadaş kişisel sırlarını asla paylaşmaz.',
    synonymOrNote: 'Dependable, honest',
    lgsTip: 'Kişilik özelliklerini anlatan sorularda en çok geçen doğru cevaptır.'
  },
  {
    id: 'honest',
    english: 'Honest',
    turkish: 'Dürüst, doğru sözlü',
    speechText: 'Honest',
    category: 'adjective',
    exampleEn: 'He is honest and always tells the truth.',
    exampleTr: 'O dürüsttür ve her zaman doğruyu söyler.',
    synonymOrNote: 'Truthful (opposite: dishonest)',
    lgsTip: '"Never tells lies" (asla yalan söylemez) ipucu varsa cevap "honest"tır!'
  },
  {
    id: 'lie',
    english: 'Lie (Tell a lie)',
    turkish: 'Yalan söylemek, yalan',
    speechText: 'Lie, tell a lie',
    category: 'verb',
    exampleEn: 'Never tell a lie to your best friend.',
    exampleTr: 'En iyi arkadaşına asla yalan söyleme.',
    synonymOrNote: 'Untruth, dishonest act',
    lgsTip: 'Negatif kişilik özelliği: "A good friend NEVER tells lies."'
  },
  {
    id: 'get-on-well-with',
    english: 'Get on well with',
    turkish: 'İyi geçinmek, anlaşmak',
    speechText: 'Get on well with',
    category: 'phrase',
    exampleEn: 'I get on well with my classmates.',
    exampleTr: 'Sınıf arkadaşlarımla çok iyi geçinirim.',
    synonymOrNote: 'Have a good relationship',
    lgsTip: 'Zıt anlamı: "argue" (tartışmak). İyi arkadaşlar "get on well with" olurlar.'
  },
  {
    id: 'share-a-secret',
    english: 'Share a secret',
    turkish: 'Sır paylaşmak',
    speechText: 'Share a secret',
    category: 'phrase',
    exampleEn: 'We share our secrets because we trust each other.',
    exampleTr: 'Birbirimize güvendiğimiz için sırlarımızı paylaşırız.',
    synonymOrNote: 'Keep a secret / Tell secrets',
    lgsTip: '"Keep a secret" = Sır tutmak. "Share a secret" = Sırrı yakın arkadaşla paylaşmak.'
  },
  {
    id: 'accept',
    english: 'Accept',
    turkish: 'Kabul etmek (daveti/teklifi)',
    speechText: 'Accept',
    category: 'verb',
    exampleEn: 'I’d love to come! (She accepted the invitation.)',
    exampleTr: 'Çok isterim! (Daveti kabul etti.)',
    synonymOrNote: 'Agree, say yes',
    lgsTip: 'Davet mektuplarında: "I can’t refuse this offer" = Daveti kabul etti demektir!'
  },
  {
    id: 'refuse',
    english: 'Refuse',
    turkish: 'Reddetmek, geri çevirmek',
    speechText: 'Refuse',
    category: 'verb',
    exampleEn: 'I’m sorry, but I can’t join the party.',
    exampleTr: 'Üzgünüm ama partiye katılamam.',
    synonymOrNote: 'Turn down, decline',
    lgsTip: 'LGS’de "Who refuses the invitation?" sorusu her yıl çıkar.'
  },
  {
    id: 'excuse',
    english: 'Excuse',
    turkish: 'Mazeret, bahane',
    speechText: 'Excuse',
    category: 'noun',
    exampleEn: 'She made an excuse: "I must study for my exam."',
    exampleTr: 'Bir mazeret sundu: "Sınavıma çalışmak zorundayım."',
    synonymOrNote: 'Reason, justification',
    lgsTip: 'Sorularda: "Who gives an excuse for refusing?" şeklinde sorulur.'
  },
  {
    id: 'loyal',
    english: 'Loyal / Loyalty',
    turkish: 'Sadık, vefalı / Sadakat',
    speechText: 'Loyal, Loyalty',
    category: 'adjective',
    exampleEn: 'Loyal friends stand by you in tough times.',
    exampleTr: 'Sadık arkadaşlar zor zamanlarında yanında durur.',
    synonymOrNote: 'Faithful, devoted',
    lgsTip: 'İyi bir arkadaşın erdemlerinden biridir.'
  },
  {
    id: 'laid-back',
    english: 'Laid-back',
    turkish: 'Rahat, sakin, kaygısız',
    speechText: 'Laid-back',
    category: 'adjective',
    exampleEn: 'Emre is very laid-back; he never worries about exams.',
    exampleTr: 'Emre çok rahattır; sınavlar hakkında asla endişelenmez.',
    synonymOrNote: 'Relaxed, calm, easy-going',
    lgsTip: 'Karakter analizi sorularında "relaxed and calm" ifadesiyle tanımlanır.'
  },
  {
    id: 'outgoing',
    english: 'Outgoing',
    turkish: 'Dışa dönük, cana yakın, sosyal',
    speechText: 'Outgoing',
    category: 'adjective',
    exampleEn: 'Defne is outgoing; she loves meeting new people.',
    exampleTr: 'Defne dışa dönüktür; yeni insanlarla tanışmayı çok sever.',
    synonymOrNote: 'Sociable, extroverted',
    lgsTip: '"Loves making new friends, social" ipuçları varsa cevap outgoing’dir.'
  },
  {
    id: 'strong-bond',
    english: 'Strong bond',
    turkish: 'Güçlü bağ, kopmaz ilişki',
    speechText: 'Strong bond',
    category: 'noun',
    exampleEn: 'They have a strong bond that will never break.',
    exampleTr: 'Asla kopmayacak çok güçlü bir bağları var.',
    synonymOrNote: 'Close relationship, strong tie',
    lgsTip: 'Metin sorularında en iyi arkadaşların arasındaki bağı ifade eder.'
  },
  {
    id: 'punctual',
    english: 'Punctual',
    turkish: 'Dakik, zamanına sadık',
    speechText: 'Punctual',
    category: 'adjective',
    exampleEn: 'He is punctual; he always arrives on time.',
    exampleTr: 'O dakiktir; daima vaktinde gelir.',
    synonymOrNote: 'On time, never late',
    lgsTip: '"Never comes late", "always on time" ipuçları daima punctual kelimesine çıkar.'
  },
  {
    id: 'argue',
    english: 'Argue',
    turkish: 'Tartışmak, münakaşa etmek',
    speechText: 'Argue',
    category: 'verb',
    exampleEn: 'Good friends rarely argue with each other.',
    exampleTr: 'İyi arkadaşlar birbirleriyle nadiren tartışırlar.',
    synonymOrNote: 'Fight, dispute (opposite: get on well)',
    lgsTip: '"We sometimes argue, but we solve our problems quickly" LGS kalıbıdır.'
  },
  {
    id: 'fair',
    english: 'Fair',
    turkish: 'Adil, hakkaniyetli',
    speechText: 'Fair',
    category: 'adjective',
    exampleEn: 'A fair person treats everyone equally.',
    exampleTr: 'Adil bir insan herkese eşit davranır.',
    synonymOrNote: 'Just, equal (opposite: unfair)',
    lgsTip: 'Arkadaş grubunda oyun oynarken kurallara uyan ve hak yemeyen kişidir.'
  }
];
