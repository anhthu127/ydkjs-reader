// LocalStorage utilities for reading progress tracking

export const STORAGE_KEYS = {
  PROGRESS: 'ydkjs_reading_progress',
  READING_PLAN: 'ydkjs_reading_plan'
};

// Progress tracking
export const getProgress = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  return stored ? JSON.parse(stored) : {};
};

export const markChapterAsRead = (bookId, chapterId) => {
  const progress = getProgress();
  if (!progress[bookId]) {
    progress[bookId] = {};
  }
  progress[bookId][chapterId] = {
    completed: true,
    completedAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
};

export const markChapterAsUnread = (bookId, chapterId) => {
  const progress = getProgress();
  if (progress[bookId] && progress[bookId][chapterId]) {
    delete progress[bookId][chapterId];
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  }
};

export const isChapterRead = (bookId, chapterId) => {
  const progress = getProgress();
  return progress[bookId]?.[chapterId]?.completed || false;
};

export const getBookProgress = (bookId, totalChapters) => {
  const progress = getProgress();
  const bookProgress = progress[bookId] || {};
  const completedCount = Object.keys(bookProgress).length;
  return {
    completed: completedCount,
    total: totalChapters,
    percentage: totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0
  };
};

// Reading plan
export const getReadingPlan = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.READING_PLAN);
  return stored ? JSON.parse(stored) : null;
};

export const saveReadingPlan = (plan) => {
  localStorage.setItem(STORAGE_KEYS.READING_PLAN, JSON.stringify(plan));
};

export const clearReadingPlan = () => {
  localStorage.removeItem(STORAGE_KEYS.READING_PLAN);
};

export const getAllProgress = () => {
  return getProgress();
};

export const clearAllProgress = () => {
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.READING_PLAN);
};
