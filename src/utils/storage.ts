export interface UserProgress {
  learnedWordIds: string[];
  learningWordIds: string[];
  matchBestScore: number;
  matchBestTimeSec: number;
  matchRoundsCompleted: number;
  quizBestScore: number;
  quizTimesPlayed: number;
  totalXp: number;
}

const STORAGE_KEY = 'lgs_friendship_progress_v1';

const defaultProgress: UserProgress = {
  learnedWordIds: [],
  learningWordIds: [],
  matchBestScore: 0,
  matchBestTimeSec: 0,
  matchRoundsCompleted: 0,
  quizBestScore: 0,
  quizTimesPlayed: 0,
  totalXp: 0
};

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota error
  }
}
