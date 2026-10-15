import React from 'react';
import { Layers, Puzzle, Award, BookOpen, Download, ArrowRight, CheckCircle2, Flame, HelpCircle } from 'lucide-react';
import { ActiveTab } from './Navbar';
import { UserProgress } from '../utils/storage';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { soundManager } from '../utils/audio';

interface MainMenuProps {
  setActiveTab: (tab: ActiveTab) => void;
  progress: UserProgress;
  onOpenDictionary: () => void;
  onDownloadHtml: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  setActiveTab,
  progress,
  onOpenDictionary,
  onDownloadHtml
}) => {
  const totalWords = VOCABULARY_LIST.length;
  const learnedCount = progress.learnedWordIds.length;
  const learnedPercent = Math.round((learnedCount / totalWords) * 100);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white p-6 sm:p-10 shadow-lg">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-pink-400/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-indigo-100 text-xs font-medium mb-4">
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>8. Sınıf LGS İngilizce Hazırlık</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight leading-tight text-white mb-3">
            Unit 1: Friendship <br />
            <span className="text-indigo-200">Kelime Macerası</span>
          </h1>

          <p className="text-indigo-100/90 text-sm sm:text-base leading-relaxed mb-6">
            LGS sınavında en çok soru çıkan 1. Ünite kelimelerini eğlenceli 3D kartlar,
            hızlı eşleştirme oyunları ve gerçek sınav tarzı mini testlerle kalıcı olarak öğren!
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('flashcards');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-900 font-semibold text-sm shadow-md hover:bg-indigo-50 hover:shadow-lg transition-all"
            >
              <span>Kartlarla Başla</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenDictionary();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-medium transition-colors backdrop-blur-md"
            >
              <BookOpen className="w-4 h-4" />
              <span>Kelime Listesi (25 Kelime)</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onDownloadHtml();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-100 text-xs sm:text-sm font-medium transition-colors"
              title="İnternetsiz de çalışabilen tek dosya HTML sürümünü indir"
            >
              <Download className="w-4 h-4" />
              <span>Tek Dosya HTML İndir</span>
            </button>
          </div>
        </div>
      </section>

      {/* Progress Metric Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500">Öğrenilen Kelimeler</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tabular-nums">
              {learnedCount}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ {totalWords}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${learnedPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500">Eşleştirme Rekoru</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-indigo-600 tabular-nums">
              {progress.matchBestScore}
            </span>
            <span className="text-xs text-slate-400 font-medium">puan</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-3 truncate">
            {progress.matchBestTimeSec > 0 ? `En hızlı: ${progress.matchBestTimeSec} sn` : 'Henüz oynanmadı'}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500">LGS Sınavı En Yüksek</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-amber-500 tabular-nums">
              {progress.quizBestScore}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 10 Doğru</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-3">
            {progress.quizTimesPlayed > 0 ? `${progress.quizTimesPlayed} deneme çözüldü` : 'Henüz çözülmedi'}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500">Toplam Başarı Puanı</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-purple-600 tabular-nums">
              {progress.totalXp}
            </span>
            <span className="text-xs text-slate-400 font-medium">XP</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Aktif Öğrenme</span>
          </div>
        </div>
      </section>

      {/* Main Game Modes Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display text-slate-900 tracking-tight">
            Öğrenme ve Oyun Bölümleri
          </h2>
          <span className="text-xs text-slate-600 font-medium">
            3 Farklı İnteraktif Mod
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Section 1: Flashcards */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('flashcards');
            }}
            className="group cursor-pointer rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                1. BÖLÜM
              </span>
              <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-indigo-600 transition-colors mt-1 mb-2">
                Flashcards (Kelime Kartları)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                3D dönen kartlar, İngilizce sesli okuma (Web Speech API) ve
                "Biliyorum / Çalışmalıyım" etiketleriyle ezber yap.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-indigo-600 group-hover:text-indigo-700">
              <span>Kartları İncele</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Section 2: Matching */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('matching');
            }}
            className="group cursor-pointer rounded-2xl bg-white border border-slate-200/80 hover:border-violet-300 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all mb-4">
                <Puzzle className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                2. BÖLÜM
              </span>
              <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-violet-600 transition-colors mt-1 mb-2">
                Anlam Eşleştirme Yarışması
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                İngilizce kelimeleri Türkçe anlamlarıyla en hızlı sürede eşleştir.
                Süreye ve hatasız hamlelere karşı puan ve kombo topla!
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-violet-600 group-hover:text-violet-700">
              <span>Yarışmaya Başla</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Section 3: Quiz */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('quiz');
            }}
            className="group cursor-pointer rounded-2xl bg-white border border-slate-200/80 hover:border-amber-300 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all mb-4">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                3. BÖLÜM
              </span>
              <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-amber-600 transition-colors mt-1 mb-2">
                LGS Tarzı Kelime Avcısı
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                MEB LGS sınav soru formatına tam uyumlu 10 soruluk senaryolu test.
                Her doğru cevapta konfeti patlaması ve detaylı sınav ipuçları!
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-amber-600 group-hover:text-amber-700">
              <span>Sınavı Başlat</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* LGS Tip of the Day & Study Advice */}
      <section className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/70 p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold font-display text-amber-950">
              LGS 1. Ünite Altın Kuralları (Sınavda Çıkacaklar):
            </h4>
            <p className="text-sm text-amber-900/85 leading-relaxed">
              • <strong>Count on = Rely on = Trust:</strong> "Güvenmek" anlamına gelen bu 3 kelime birbirinin yerine kullanılabilir.<br />
              • <strong>Support = Back up:</strong> Bir arkadaşın zor anında yanında olmaktır.<br />
              • <strong>Refuse with an excuse:</strong> Daveti reddederken "I’d love to, but I have to..." gibi bir gerekçe sunulması LGS sorularında sürekli sorulur.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
