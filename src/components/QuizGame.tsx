import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, HelpCircle, Star, Shuffle } from 'lucide-react';
import { getRandomQuizQuestions, QuizQuestion } from '../data/quizQuestions';
import { soundManager } from '../utils/audio';
import { UserProgress } from '../utils/storage';

interface QuizGameProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => getRandomQuizQuestions(10));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Array<{
    questionId: number;
    userChoice: 'A' | 'B' | 'C' | 'D';
    isCorrect: boolean;
  }>>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ: QuizQuestion = questions[currentIdx] || questions[0];
  const totalQuestions = questions.length;

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(key);
    const isCorrect = key === currentQ.correctAnswer;

    if (isCorrect) {
      soundManager.playCorrect();
      setScore(s => s + 1);
      // Confetti burst on correct!
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      soundManager.playWrong();
    }

    setUserAnswers(prev => [
      ...prev,
      { questionId: currentQ.id, userChoice: key, isCorrect }
    ]);
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
    } else {
      // Finished!
      setIsFinished(true);
      soundManager.playVictory();
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });

      const finalScore = score + (selectedAnswer === currentQ.correctAnswer ? 1 : 0);
      onUpdateProgress({
        ...progress,
        quizBestScore: Math.max(progress.quizBestScore, finalScore),
        quizTimesPlayed: progress.quizTimesPlayed + 1,
        totalXp: progress.totalXp + (finalScore * 20)
      });
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    setQuestions(getRandomQuizQuestions(10));
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setUserAnswers([]);
    setIsFinished(false);
  };

  // Render Finished Summary View
  if (isFinished) {
    const successRate = Math.round((score / totalQuestions) * 100);
    let title = 'Tebrikler!';
    let badgeText = 'Harika Performans';
    if (score === 10) {
      title = 'Muhteşem! 10\'da 10 Tam İsabet!';
      badgeText = 'LGS Şampiyonu 🌟';
    } else if (score >= 8) {
      title = 'Çok Başarılı!';
      badgeText = 'LGS Hazır Seviye';
    } else if (score >= 5) {
      title = 'İyi Gidiyorsun!';
      badgeText = 'Gelişiyor';
    } else {
      title = 'Biraz Daha Tekrar Yapmalısın';
      badgeText = 'Çalışma Gerekli';
    }

    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{badgeText}</span>
            </div>
            <h2 className="text-3xl font-extrabold font-display text-slate-900">
              {title}
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto">
              LGS 1. Ünite: Friendship Kelime Avcısı testini başarıyla tamamladın.
            </p>
          </div>

          {/* Score Circle Card */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
            <div>
              <span className="text-xs text-slate-500 block">Doğru Sayısı</span>
              <span className="text-2xl font-black font-display text-emerald-600 tabular-nums">
                {score}
              </span>
              <span className="text-[11px] text-slate-400 block">/ {totalQuestions}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Başarı Oranı</span>
              <span className="text-2xl font-black font-display text-indigo-600 tabular-nums">
                %{successRate}
              </span>
              <span className="text-[11px] text-slate-400 block">Net Başarı</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Kazanılan XP</span>
              <span className="text-2xl font-black font-display text-amber-600 tabular-nums">
                +{score * 20}
              </span>
              <span className="text-[11px] text-slate-400 block">Puan</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="flex-1 py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <Shuffle className="w-4 h-4" />
              <span>Farklı Sorularla Yeni Test Başlat</span>
            </button>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-4">
          <h3 className="text-base font-bold font-display text-slate-900 px-1">
            Cevap Analizleri ve Soru Özeti:
          </h3>
          {questions.map((q, idx) => {
            const userAns = userAnswers.find(a => a.questionId === q.id);
            const isCorrect = userAns?.isCorrect;
            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-rose-50/50 border-rose-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-700">
                    Soru {idx + 1}: {q.targetWord}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {isCorrect ? 'Doğru ✓' : 'Yanlış ✗'}
                  </span>
                </div>
                <p className="text-xs text-slate-700 mb-2 whitespace-pre-line">{q.questionText}</p>
                <div className="text-xs text-slate-600 bg-white/80 p-2.5 rounded-xl border border-slate-200/50">
                  <strong className="text-indigo-900">Çözüm İpucu:</strong> {q.explanationTr}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Active Question View
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Quiz Progress & Score Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-500 font-medium">Soru İlerlemesi</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xl font-bold font-display text-slate-900 tabular-nums">
              {currentIdx + 1}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ {totalQuestions}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex-1 max-w-[200px] bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold text-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums">{score} Doğru</span>
          </div>

          <button
            onClick={handleRestart}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Soruları Karıştır & Farklı Sorular Getir"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            {currentQ.scenarioTitle}
          </span>
          <span className="text-xs text-slate-600 font-medium">
            Hedef Kelime: {currentQ.targetWord}
          </span>
        </div>

        {/* Dialogue Box if present */}
        {currentQ.dialogue && (
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-2">
            {currentQ.dialogue.map((d, i) => (
              <div key={i} className="text-sm">
                <span className="font-bold text-indigo-900">{d.speaker}: </span>
                <span className="text-slate-700">{d.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Main Question Text */}
        <div className="text-base sm:text-lg font-bold font-display text-slate-900 leading-snug whitespace-pre-line">
          {currentQ.questionText}
        </div>

        {/* Multiple Choice Options */}
        <div className="grid grid-cols-1 gap-2.5 pt-2">
          {currentQ.options.map((option) => {
            const isChosen = selectedAnswer === option.key;
            const isCorrectAnswer = option.key === currentQ.correctAnswer;
            const hasAnswered = selectedAnswer !== null;

            let btnClasses = 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30 text-slate-800';

            if (hasAnswered) {
              if (isCorrectAnswer) {
                btnClasses = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-400/30';
              } else if (isChosen && !isCorrectAnswer) {
                btnClasses = 'border-rose-400 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-400/30';
              } else {
                btnClasses = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={option.key}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(option.key)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${btnClasses}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    hasAnswered && isCorrectAnswer
                      ? 'bg-emerald-500 text-white'
                      : hasAnswered && isChosen
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {option.key}
                  </span>
                  <span className="text-sm sm:text-base font-medium">
                    {option.text}
                  </span>
                </div>

                {hasAnswered && isCorrectAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {hasAnswered && isChosen && !isCorrectAnswer && (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card & Next Action */}
        {selectedAnswer !== null && (
          <div className="pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-sm leading-relaxed text-indigo-950">
              <div className="flex items-center gap-2 font-bold text-indigo-900 mb-1">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>LGS Çözüm Analizi:</span>
              </div>
              <p className="text-indigo-900/90 text-xs sm:text-sm">
                {currentQ.explanationTr}
              </p>
            </div>

            <button
              onClick={handleNextQuestion}
              className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <span>{currentIdx + 1 === totalQuestions ? 'Sonuçları Gör' : 'Sonraki Soruya Geç'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
