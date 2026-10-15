/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { MainMenu } from './components/MainMenu';
import { FlashcardsView } from './components/FlashcardsView';
import { MatchingGame } from './components/MatchingGame';
import { QuizGame } from './components/QuizGame';
import { WordListModal } from './components/WordListModal';
import { loadProgress, saveProgress, UserProgress } from './utils/storage';
import { downloadStandaloneHtml } from './utils/downloadHtml';
import { VOCABULARY_LIST } from './data/vocabulary';
import { Download } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('menu');
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);

  // Sync progress changes to localStorage
  const handleUpdateProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const handleToggleLearned = (wordId: string) => {
    const isLearned = progress.learnedWordIds.includes(wordId);
    let nextLearned: string[];
    let nextLearning: string[];

    if (isLearned) {
      nextLearned = progress.learnedWordIds.filter(id => id !== wordId);
      nextLearning = progress.learningWordIds;
    } else {
      nextLearned = [...progress.learnedWordIds, wordId];
      nextLearning = progress.learningWordIds.filter(id => id !== wordId);
    }

    handleUpdateProgress({
      ...progress,
      learnedWordIds: nextLearned,
      learningWordIds: nextLearning,
      totalXp: progress.totalXp + (isLearned ? 0 : 15)
    });
  };

  // Keyboard shortcut: Escape closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDictionaryOpen) {
        setIsDictionaryOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDictionaryOpen]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-800">
      {/* Top Navbar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDictionary={() => setIsDictionaryOpen(true)}
        xp={progress.totalXp}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full">
        {activeTab === 'menu' && (
          <MainMenu
            setActiveTab={setActiveTab}
            progress={progress}
            onOpenDictionary={() => setIsDictionaryOpen(true)}
            onDownloadHtml={downloadStandaloneHtml}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {activeTab === 'matching' && (
          <MatchingGame
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizGame
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}
      </main>

      {/* Dictionary / Glossary Modal */}
      <WordListModal
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
        progress={progress}
        onToggleLearned={handleToggleLearned}
      />

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200/80 bg-white/70 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>8. Sınıf LGS İngilizce</span>
            <span aria-hidden="true">·</span>
            <span>1. Ünite: Friendship</span>
            <span aria-hidden="true">·</span>
            <span>{VOCABULARY_LIST.length} Temel Kelime</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={downloadStandaloneHtml}
              className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tek Dosya HTML İndir (Çevrimdışı Çalışır)</span>
            </button>
            <span aria-hidden="true">·</span>
            <span>Başarılar dileriz! 🎯</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
