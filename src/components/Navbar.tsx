import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/audio';

export type ActiveTab = 'menu' | 'flashcards' | 'matching' | 'quiz';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDictionary: () => void;
  xp: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDictionary,
  xp
}) => {
  const [soundOn, setSoundOn] = React.useState(soundManager.isSoundEnabled());

  const handleToggleSound = () => {
    const next = soundManager.toggleSound();
    setSoundOn(next);
    if (next) soundManager.playClick();
  };

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'menu', label: 'Ana Menü' },
    { id: 'flashcards', label: 'Kartlar' },
    { id: 'matching', label: 'Eşleştirme' },
    { id: 'quiz', label: 'Kelime Avcısı' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('menu');
          }}
          className="text-left group flex items-center gap-2.5 focus:outline-hidden"
          aria-label="Ana Menüye Git"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <span className="font-bold text-lg font-display">8</span>
          </div>
          <div>
            <span className="font-display font-bold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
              Friendship Quest
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-medium text-slate-600">
              LGS 1. Ünite
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-4 overflow-x-auto py-1 scrollbar-none text-xs sm:text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(item.id);
                }}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Glossary, XP, Sound) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenDictionary();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs sm:text-sm font-medium hover:bg-slate-50 transition-colors shadow-xs"
            title="Kelime Listesi / Sözlük"
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span className="hidden md:inline">Sözlük</span>
          </button>

          <div
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-800 text-xs sm:text-sm font-medium"
            title="Kazanılan Puan"
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="font-mono tabular-nums font-semibold">{xp}</span>
            <span className="text-[11px] text-amber-700/80 hidden sm:inline">XP</span>
          </div>

          <button
            onClick={handleToggleSound}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            title={soundOn ? 'Sesi Kapat' : 'Sesi Aç'}
            aria-label="Ses Ayarı"
          >
            {soundOn ? (
              <Volume2 className="w-4 h-4 text-indigo-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
