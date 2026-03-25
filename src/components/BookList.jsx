import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { books } from '../data/books';
import { getBookProgress, isChapterRead, markChapterAsRead, markChapterAsUnread } from '../utils/storage';
import { estimatedReadingTimes } from '../data/books';
import './BookList.css';

function BookList() {
  const { bookId } = useParams();
  const [selectedBook, setSelectedBook] = useState(bookId || null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleBookClick = (id) => {
    setSelectedBook(selectedBook === id ? null : id);
  };

  const toggleChapterStatus = (bookId, chapterId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isChapterRead(bookId, chapterId)) {
      markChapterAsUnread(bookId, chapterId);
    } else {
      markChapterAsRead(bookId, chapterId);
    }
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="book-list" key={refreshKey}>
      <div className="container">
        <h2 className="page-title">Danh sách sách</h2>
        
        <div className="books-grid">
          {books.map(book => {
            const progress = getBookProgress(book.id, book.chapters.length);
            const isExpanded = selectedBook === book.id;
            
            return (
              <div key={book.id} className="book-card">
                <div 
                  className="book-header"
                  onClick={() => handleBookClick(book.id)}
                >
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-title-en">{book.titleEn}</p>
                    <p className="book-description">{book.description}</p>
                  </div>
                  <div className="book-stats">
                    <div className="progress-circle">
                      <svg viewBox="0 0 36 36" className="circular-chart">
                        <path
                          className="circle-bg"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="circle"
                          strokeDasharray={`${progress.percentage}, 100`}
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" className="percentage">
                          {progress.percentage}%
                        </text>
                      </svg>
                    </div>
                    <div className="chapter-count">
                      {progress.completed}/{progress.total} chương
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="chapters-list">
                    {book.chapters.map(chapter => {
                      const isRead = isChapterRead(book.id, chapter.id);
                      const estimatedTime = estimatedReadingTimes[chapter.id] || 20;
                      
                      return (
                        <Link
                          key={chapter.id}
                          to={`/book/${book.id}/chapter/${chapter.id}`}
                          className={`chapter-item ${isRead ? 'read' : ''}`}
                        >
                          <button
                            className={`status-toggle ${isRead ? 'checked' : ''}`}
                            onClick={(e) => toggleChapterStatus(book.id, chapter.id, e)}
                            aria-label={isRead ? 'Mark as unread' : 'Mark as read'}
                          >
                            {isRead ? '✓' : '○'}
                          </button>
                          <div className="chapter-info">
                            <span className="chapter-title">{chapter.title}</span>
                            <span className="reading-time">~{estimatedTime} phút</span>
                          </div>
                          <span className="arrow">→</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BookList;
