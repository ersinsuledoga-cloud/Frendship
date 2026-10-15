import React, { useState, useEffect, useCallback } from 'react';
import { 
  Volume2, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Check, 
  Star, 
  Sparkles,
  Info
} from 'lucide-react';
import { VOCABULARY_LIST, WordItem } from '../data/vocabulary';
import { soundManager } from '../utils/audio';
import { UserProgress } from '../utils/storage';

interface FlashcardsViewProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
}

type FilterType = 'all' | 'learning' | 'learned';

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [deck, setDeck] = useState<WordItem[]>(() => [...VOCABULARY_LIST].sort(() => Math.random() - 0.5));

  // Filter the vocabulary and shuffle for fresh experience
  useEffect(() => {
    let filtered = VOCABULARY_LIST;
    if (filter === 'learning') {
      filtered = VOCABULARY_LIST.filter(w => progress.learningWordIds.includes(w.id));
      if (filtered.length === 0) {
        filtered = VOCABULARY_LIST; // Fallback if none yet
      }
    } else if (filter === 'learned') {
      filtered = VOCABULARY_LIST.filter(w => progress.learnedWordIds.includes(w.id));
      if (filtered.length === 0) {
        filtered = VOCABULARY_LIST; // Fallback
      }
    }
    // Shuffle cards so each session starts with fresh words
    setDeck([...filtered].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [filter, progress.learnedWordIds, progress.learningWordIds]);

  const currentWord: WordItem | undefined = deck[currentIndex] || deck[0];

  const handleSpeak = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentWord) return;
    setIsSpeaking(true);
    soundManager.speakEnglish(
      currentWord.speechText,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  }, [currentWord]);

  const handleFlip = () => {
    soundManager.playFlip();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    soundManager.playClick();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  const handlePrev = () => {
    soundManager.playClick();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const handleShuffle = () => {
    soundManager.playClick();
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleMarkLearned = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentWord) return;
    soundManager.playCorrect();

    const isAlready = progress.learnedWordIds.includes(currentWord.id);
    let nextLearned: string[];
    let nextLearning: string[];

    if (isAlready) {
      nextLearned = progress.learnedWordIds.filter(id => id !== currentWord.id);
      nextLearning = progress.learningWordIds;
    } else {
      nextLearned = [...progress.learnedWordIds, currentWord.id];
      nextLearning = progress.learningWordIds.filter(id => id !== currentWord.id);
    }

    onUpdateProgress({
      ...progress,
      learnedWordIds: nextLearned,
      learningWordIds: nextLearning,
      totalXp: progress.totalXp + (isAlready ? 0 : 15)
    });

    // Auto flip or advance after short delay
    setTimeout(() => {
      handleNext();
    }, 280);
  };

  const handleMarkLearning = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentWord) return;
    soundManager.playClick();

    const isAlready = progress.learningWordIds.includes(currentWord.id);
    let nextLearning: string[];
    let nextLearned: string[];

    if (isAlready) {
      nextLearning = progress.learningWordIds.filter(id => id !== currentWord.id);
      nextLearned = progress.learnedWordIds;
    } else {
      nextLearning = [...progress.learningWordIds, currentWord.id];
      nextLearned = progress.learnedWordIds.filter(id => id !== currentWord.id);
    }

    onUpdateProgress({
      ...progress,
      learningWordIds: nextLearning,
      learnedWordIds: nextLearned,
      totalXp: progress.totalXp + 5
    });

    setTimeout(() => {
      handleNext();
    }, 280);
  };

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      } else if (e.code === 'KeyS') {
        handleSpeak();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleSpeak, isFlipped, deck.length]);

  if (!currentWord) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 mb-4">Bu kategoride henüz kart bulunmuyor.</p>
        <button
          onClick={() => setFilter('all')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Tüm Kartları Göster
        </button>
      </div>
    );
  }

  const isLearned = progress.learnedWordIds.includes(currentWord.id);
  const isLearning = progress.learningWordIds.includes(currentWord.id);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Top Filter Bar and Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80 w-full sm:w-auto">
          <button
            onClick={() => {
              soundManager.playClick();
              setFilter('all');
            }}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tümü ({VOCABULARY_LIST.length})
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setFilter('learning');
            }}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'learning'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Çalışmalıyım ({progress.learningWordIds.length})
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setFilter('learned');
            }}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'learned'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Biliyorum ({progress.learnedWordIds.length})
          </button>
        </div>

        {/* Action Controls: Shuffle & Index */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            title="Kartları Karıştır"
          >
            <Shuffle className="w-3.5 h-3.5 text-slate-500" />
            <span>Karıştır</span>
          </button>

          <div className="text-xs font-semibold text-slate-500 tabular-nums">
            <span className="text-slate-900">{currentIndex + 1}</span> / {deck.length}
          </div>
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div className="perspective-1000 w-full min-h-[380px] sm:min-h-[400px]">
        <div
          onClick={handleFlip}
          className={`relative w-full h-full min-h-[380px] sm:min-h-[400px] rounded-3xl cursor-pointer transition-transform duration-500 transform-style-preserve-3d shadow-md hover:shadow-lg ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT SIDE (English) */}
          <div className="absolute inset-0 backface-hidden w-full h-full rounded-3xl bg-gradient-to-br from-white via-slate-50/50 to-indigo-50/40 border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between">
            {/* Front Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                {currentWord.category.toUpperCase()}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSpeak}
                  className={`p-2.5 rounded-full transition-all ${
                    isSpeaking
                      ? 'bg-indigo-600 text-white scale-110 shadow-sm animate-pulse'
                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                  }`}
                  title="Sesli Dinle (İngilizce)"
                  aria-label="Sesli Dinle"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Front Body */}
            <div className="text-center my-auto py-4">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight mb-4">
                {currentWord.english}
              </h3>

              <div className="bg-white/80 backdrop-blur-xs rounded-xl p-3.5 border border-slate-200/60 max-w-md mx-auto text-sm text-slate-600 italic">
                "{currentWord.exampleEn}"
              </div>
            </div>

            {/* Front Footer */}
            <div className="flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-slate-100">
              <span className="flex items-center gap-1.5 text-indigo-600 font-medium">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Türkçesi için dokun</span>
              </span>
              <span className="hidden sm:inline">Klavye: [Boşluk] Çevir · [S] Dinle</span>
            </div>
          </div>

          {/* BACK SIDE (Turkish Meaning & LGS Tip) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white border border-indigo-500/50 p-6 sm:p-8 flex flex-col justify-between">
            {/* Back Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
                TÜRKÇE ANLAMI & LGS NOTU
              </span>

              <button
                onClick={handleSpeak}
                className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
                title="İngilizce Telaffuzunu Dinle"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Back Body */}
            <div className="text-center my-auto py-2">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-white mb-2">
                {currentWord.turkish}
              </h3>

              <p className="text-indigo-100/90 text-sm italic mb-4">
                "{currentWord.exampleTr}"
              </p>

              {currentWord.lgsTip && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-left border border-white/15 text-xs text-indigo-50 leading-relaxed max-w-md mx-auto">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>LGS Sınav İpucu:</span>
                  </div>
                  {currentWord.lgsTip}
                </div>
              )}
            </div>

            {/* Back Footer */}
            <div className="flex items-center justify-between text-xs text-indigo-200 pt-3 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5" />
                <span>İngilizce için tekrar dokun</span>
              </span>
              {currentWord.synonymOrNote && (
                <span className="text-indigo-100 truncate max-w-[200px]">
                  Eş: {currentWord.synonymOrNote}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Interaction Buttons: Status & Navigation */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleMarkLearning}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-sm transition-all border ${
            isLearning
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white text-amber-800 border-amber-200 hover:bg-amber-50'
          }`}
        >
          <Star className={`w-4 h-4 ${isLearning ? 'fill-white' : 'text-amber-500'}`} />
          <span>{isLearning ? 'Tekrar Listesinde' : 'Çalışmalıyım'}</span>
        </button>

        <button
          onClick={handleMarkLearned}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-sm transition-all border ${
            isLearned
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
              : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{isLearned ? 'Öğrendim! (+15 XP)' : 'Biliyorum'}</span>
        </button>
      </div>

      {/* Prev / Next Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs sm:text-sm transition-colors shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Önceki Kart</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
        >
          <span>Sonraki Kart</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
