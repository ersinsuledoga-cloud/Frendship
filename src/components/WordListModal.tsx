import React, { useState } from 'react';
import { X, Search, Volume2, Check, Star, BookOpen } from 'lucide-react';
import { VOCABULARY_LIST, WordItem } from '../data/vocabulary';
import { soundManager } from '../utils/audio';
import { UserProgress } from '../utils/storage';

interface WordListModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onToggleLearned: (wordId: string) => void;
}

export const WordListModal: React.FC<WordListModalProps> = ({
  isOpen,
  onClose,
  progress,
  onToggleLearned
}) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [speakingWordId, setSpeakingWordId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredWords = VOCABULARY_LIST.filter(word => {
    const matchesSearch = 
      word.english.toLowerCase().includes(search.toLowerCase()) ||
      word.turkish.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'all' || word.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleSpeak = (word: WordItem) => {
    setSpeakingWordId(word.id);
    soundManager.speakEnglish(
      word.speechText,
      () => setSpeakingWordId(word.id),
      () => setSpeakingWordId(null)
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                1. Ünite Friendship Kelime Listesi
              </h3>
              <p className="text-xs text-slate-500">
                Toplam {VOCABULARY_LIST.length} kelime · Dinle, tekrar et ve öğren
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="p-4 sm:px-6 bg-slate-50/70 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Kelime veya anlam ara..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
            {[
              { id: 'all', label: 'Tümü' },
              { id: 'adjective', label: 'Sıfatlar' },
              { id: 'verb', label: 'Fiiller' },
              { id: 'noun', label: 'İsimler' },
              { id: 'phrase', label: 'Kalıplar' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCat(cat.id);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  selectedCat === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Word List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-slate-100 space-y-2">
          {filteredWords.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Aramanızla eşleşen kelime bulunamadı.
            </div>
          ) : (
            filteredWords.map((word) => {
              const isLearned = progress.learnedWordIds.includes(word.id);
              const isSpeaking = speakingWordId === word.id;

              return (
                <div
                  key={word.id}
                  className="pt-3 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-slate-50/80 rounded-xl p-2.5 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold font-display text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {word.english}
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-slate-600 px-1.5 py-0.5 rounded-md bg-slate-100">
                        {word.category}
                      </span>
                    </div>

                    <div className="text-sm font-medium text-indigo-950">
                      {word.turkish}
                    </div>

                    <div className="text-xs text-slate-500 italic">
                      "{word.exampleEn}"
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleSpeak(word)}
                      className={`p-2 rounded-xl transition-all ${
                        isSpeaking
                          ? 'bg-indigo-600 text-white scale-105 animate-pulse'
                          : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                      }`}
                      title="Sesli Dinle"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        soundManager.playClick();
                        onToggleLearned(word.id);
                      }}
                      className={`p-2 rounded-xl transition-all border ${
                        isLearned
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600'
                      }`}
                      title={isLearned ? 'Öğrenildi olarak işaretli' : 'Öğrendim olarak işaretle'}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{filteredWords.length} kelime listeleniyor</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};
