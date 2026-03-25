import { useState } from 'react';
import { Link } from 'react-router-dom';
import { books } from '../data/books';
import { getAllProgress, getBookProgress, clearAllProgress } from '../utils/storage';
import './ProgressBoard.css';

function ProgressBoard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const allProgress = getAllProgress();
  
  const stats = books.map(book => {
    const progress = getBookProgress(book.id, book.chapters.length);
    const readChapters = allProgress[book.id] || {};
    
    return {
      book,
      progress,
      readChapters: Object.keys(readChapters).map(chapterId => {
        const chapter = book.chapters.find(ch => ch.id === chapterId);
        return {
          ...chapter,
          completedAt: readChapters[chapterId].completedAt
        };
      }).sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    };
  });

  const totalChapters = books.reduce((sum, book) => sum + book.chapters.length, 0);
  const totalRead = stats.reduce((sum, stat) => sum + stat.progress.completed, 0);
  const overallPercentage = Math.round((totalRead / totalChapters) * 100);

  const handleClearProgress = () => {
    clearAllProgress();
    setRefreshKey(prev => prev + 1);
    setShowConfirm(false);
  };

  return (
    <div className="progress-board" key={refreshKey}>
      <div className="container">
        <div className="board-header">
          <h2 className="page-title">Bảng tiến độ</h2>
          <button 
            className="btn btn-danger"
            onClick={() => setShowConfirm(true)}
          >
            Xóa tiến độ
          </button>
        </div>

        <div className="overall-stats">
          <div className="stat-card">
            <div className="stat-value">{totalRead}</div>
            <div className="stat-label">Chương đã đọc</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalChapters}</div>
            <div className="stat-label">Tổng số chương</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{overallPercentage}%</div>
            <div className="stat-label">Hoàn thành</div>
          </div>
        </div>

        <div className="progress-list">
          {stats.map(({ book, progress, readChapters }) => (
            <div key={book.id} className="progress-item">
              <div className="progress-header">
                <div>
                  <h3>{book.title}</h3>
                  <p className="subtitle">{book.titleEn}</p>
                </div>
                <div className="progress-stats">
                  <span className="progress-text">
                    {progress.completed} / {progress.total} chương
                  </span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {readChapters.length > 0 && (
                <div className="read-chapters">
                  <h4>Đã đọc:</h4>
                  <div className="chapter-tags">
                    {readChapters.map(chapter => (
                      <Link
                        key={chapter.id}
                        to={`/book/${book.id}/chapter/${chapter.id}`}
                        className="chapter-tag"
                      >
                        {chapter.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {readChapters.length === 0 && (
                <p className="no-progress">Chưa có chương nào được đánh dấu đã đọc</p>
              )}
            </div>
          ))}
        </div>

        {showConfirm && (
          <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h3>Xác nhận xóa tiến độ</h3>
              <p>Bạn có chắc chắn muốn xóa toàn bộ tiến độ đọc? Hành động này không thể hoàn tác.</p>
              <div className="modal-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowConfirm(false)}
                >
                  Hủy
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={handleClearProgress}
                >
                  Xóa tiến độ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgressBoard;
