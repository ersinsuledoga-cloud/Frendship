import React, { useState, useEffect, useCallback, useTransition } from 'react';
import confetti from 'canvas-confetti';
import { Timer, AlertCircle, Sparkles, RefreshCw, Trophy, ArrowRight, Zap } from 'lucide-react';
import { VOCABULARY_LIST, WordItem } from '../data/vocabulary';
import { soundManager } from '../utils/audio';
import { UserProgress } from '../utils/storage';

interface MatchingGameProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
}

interface TileItem {
  tileId: string;
  wordId: string;
  text: string;
  lang: 'en' | 'tr';
  speechText?: string;
  isMatched: boolean;
}

const PAIRS_PER_ROUND = 6;

export const MatchingGame: React.FC<MatchingGameProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [, startTransition] = useTransition();
  const [tiles, setTiles] = useState<TileItem[]>([]);
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  const [wrongPairIds, setWrongPairIds] = useState<[string, string] | null>(null);
  const [matchedCount, setMatchedCount] = useState(0);
  const [errors, setErrors] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isRoundFinished, setIsRoundFinished] = useState(false);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);
  const unusedWordsRef = React.useRef<WordItem[]>([]);

  // Setup a round with fresh unique words from the pool
  const initRound = useCallback(() => {
    // If fewer than PAIRS_PER_ROUND words left in pool, refill with shuffled complete vocabulary
    if (unusedWordsRef.current.length < PAIRS_PER_ROUND) {
      unusedWordsRef.current = [...VOCABULARY_LIST].sort(() => Math.random() - 0.5);
    }

    // Pick unique fresh words
    const selectedWords: WordItem[] = unusedWordsRef.current.splice(0, PAIRS_PER_ROUND);

    const generatedTiles: TileItem[] = [];
    selectedWords.forEach((word) => {
      // English tile
      generatedTiles.push({
        tileId: `${word.id}-en`,
        wordId: word.id,
        text: word.english,
        lang: 'en',
        speechText: word.speechText,
        isMatched: false
      });
      // Turkish tile
      generatedTiles.push({
        tileId: `${word.id}-tr`,
        wordId: word.id,
        text: word.turkish,
        lang: 'tr',
        isMatched: false
      });
    });

    // Shuffle tiles randomly
    setTiles(generatedTiles.sort(() => Math.random() - 0.5));
    setSelectedTileId(null);
    setWrongPairIds(null);
    setMatchedCount(0);
    setErrors(0);
    setSeconds(0);
    setIsPlaying(true);
    setIsRoundFinished(false);
    setCombo(0);
  }, []);

  useEffect(() => {
    initRound();
  }, [initRound, roundNumber]);

  // Timer loop
  useEffect(() => {
    if (!isPlaying || isRoundFinished) return;
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, isRoundFinished]);

  // Handle Tile Click
  const handleTileClick = (clickedTile: TileItem) => {
    if (clickedTile.isMatched) return;
    if (wrongPairIds) return; // Wait during shake

    // If click on English, pronounce it!
    if (clickedTile.lang === 'en' && clickedTile.speechText) {
      soundManager.speakEnglish(clickedTile.speechText);
    }

    // If nothing selected yet
    if (!selectedTileId) {
      soundManager.playClick();
      setSelectedTileId(clickedTile.tileId);
      return;
    }

    // If clicking same tile, unselect
    if (selectedTileId === clickedTile.tileId) {
      soundManager.playClick();
      setSelectedTileId(null);
      return;
    }

    const firstTile = tiles.find(t => t.tileId === selectedTileId);
    if (!firstTile) {
      setSelectedTileId(clickedTile.tileId);
      return;
    }

    // Check match
    if (firstTile.wordId === clickedTile.wordId && firstTile.lang !== clickedTile.lang) {
      // MATCH!
      soundManager.playMatch();
      const newCombo = combo + 1;
      const pointsEarned = 100 + (newCombo > 1 ? (newCombo - 1) * 30 : 0);
      setCombo(newCombo);
      setScore(s => s + pointsEarned);

      setTiles(prev =>
        prev.map(t =>
          t.tileId === firstTile.tileId || t.tileId === clickedTile.tileId
            ? { ...t, isMatched: true }
            : t
        )
      );
      setSelectedTileId(null);

      const nextMatched = matchedCount + 1;
      setMatchedCount(nextMatched);

      // Check if all matched
      if (nextMatched === PAIRS_PER_ROUND) {
        setIsPlaying(false);
        setIsRoundFinished(true);
        soundManager.playVictory();

        // Confetti burst
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Calculate and save best score
        const timeBonus = Math.max(0, 120 - seconds) * 2;
        const finalRoundScore = score + pointsEarned + timeBonus;

        const isNewBestScore = finalRoundScore > progress.matchBestScore;
        const isNewBestTime = progress.matchBestTimeSec === 0 || seconds < progress.matchBestTimeSec;

        onUpdateProgress({
          ...progress,
          matchBestScore: Math.max(progress.matchBestScore, finalRoundScore),
          matchBestTimeSec: isNewBestTime ? seconds : progress.matchBestTimeSec,
          matchRoundsCompleted: progress.matchRoundsCompleted + 1,
          totalXp: progress.totalXp + 50
        });
      }
    } else {
      // MISMATCH
      soundManager.playWrong();
      setErrors(e => e + 1);
      setCombo(0);
      setWrongPairIds([firstTile.tileId, clickedTile.tileId]);

      setTimeout(() => {
        setWrongPairIds(null);
        setSelectedTileId(null);
      }, 700);
    }
  };

  const handleNextRound = () => {
    soundManager.playClick();
    startTransition(() => {
      setRoundNumber(r => r + 1);
    });
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* HUD Header Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Left: Round & Combo */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-100">
            Tur {roundNumber}
          </div>
          {combo > 1 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 text-white font-bold text-xs animate-bounce shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>{combo}x Seri!</span>
            </div>
          )}
        </div>

        {/* Center: Live Stats */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-1.5 text-slate-700">
            <Timer className="w-4 h-4 text-slate-400" />
            <span className="font-mono tabular-nums font-semibold">{formatTime(seconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 text-rose-600">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span className="font-mono tabular-nums font-semibold">{errors} Hata</span>
          </div>

          <div className="flex items-center gap-1.5 text-indigo-600">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="font-mono tabular-nums font-semibold">{score} Puan</span>
          </div>
        </div>

        {/* Right: Restart Round */}
        <button
          onClick={initRound}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          title="Turu Baştan Başlat"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Instructions Kicker */}
      <div className="text-center text-xs text-slate-600">
        Bir İngilizce kelimeye, ardından Türkçe karşılığına dokunarak eşleştir.
      </div>

      {/* Tile Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {tiles.map((tile) => {
          const isSelected = selectedTileId === tile.tileId;
          const isWrong = wrongPairIds?.includes(tile.tileId);

          if (tile.isMatched) {
            return (
              <div
                key={tile.tileId}
                className="min-h-[90px] sm:min-h-[110px] rounded-2xl bg-emerald-50/60 border border-emerald-200/50 flex flex-col items-center justify-center p-3 opacity-40 transition-all pointer-events-none"
              >
                <span className="text-xs sm:text-sm font-medium text-emerald-800 line-through text-center">
                  {tile.text}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold mt-1">Eşleşti ✓</span>
              </div>
            );
          }

          let stateClasses = 'bg-white border-slate-200/90 text-slate-800 hover:border-indigo-300 hover:shadow-sm';
          if (isSelected) {
            stateClasses = 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-500/20 text-indigo-900 shadow-md scale-[1.02]';
          } else if (isWrong) {
            stateClasses = 'bg-rose-50 border-rose-500 ring-2 ring-rose-400/20 text-rose-900 animate-shake';
          }

          return (
            <button
              key={tile.tileId}
              onClick={() => handleTileClick(tile)}
              className={`min-h-[90px] sm:min-h-[110px] rounded-2xl border p-3.5 flex flex-col items-center justify-center text-center transition-all cursor-pointer select-none active:scale-95 ${stateClasses}`}
            >
              <span className={`text-[11px] uppercase tracking-wider font-semibold mb-1 ${
                tile.lang === 'en' ? 'text-indigo-500' : 'text-slate-600'
              }`}>
                {tile.lang === 'en' ? 'İngilizce' : 'Türkçe'}
              </span>
              <span className="text-sm sm:text-base font-bold font-display leading-snug">
                {tile.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Round Finished Victory Modal */}
      {isRoundFinished && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-100 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                TEBRİKLER! TUR TAMAMLANDI
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-1">
                Harika İş Çıkardın!
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                1. Ünite Friendship kelimelerini başarıyla eşleştirdin.
              </p>
            </div>

            {/* Scorecard */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
              <div>
                <span className="text-[11px] text-slate-500 block">Süre</span>
                <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                  {formatTime(seconds)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Hata</span>
                <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                  {errors}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Toplam Skor</span>
                <span className="text-lg font-bold font-mono text-indigo-600 tabular-nums">
                  {score}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={initRound}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                Bu Turu Tekrarla
              </button>
              <button
                onClick={handleNextRound}
                className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Sonraki Tur</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
