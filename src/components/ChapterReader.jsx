import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { books } from '../data/books';
import { isChapterRead, markChapterAsRead, markChapterAsUnread } from '../utils/storage';
import './ChapterReader.css';

function ChapterReader() {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRead, setIsRead] = useState(false);

  const book = books.find(b => b.id === bookId);
  const chapterIndex = book?.chapters.findIndex(ch => ch.id === chapterId);
  const chapter = book?.chapters[chapterIndex];
  const prevChapter = chapterIndex > 0 ? book.chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < book.chapters.length - 1 ? book.chapters[chapterIndex + 1] : null;

  useEffect(() => {
    if (!book || !chapter) {
      setError('Không tìm thấy chương này');
      setLoading(false);
      return;
    }

    setIsRead(isChapterRead(bookId, chapterId));
    
    const loadChapter = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`../../${bookId}/${chapter.file}`);
        
        if (!response.ok) {
          throw new Error('Không thể tải nội dung chương');
        }
        
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadChapter();
  }, [bookId, chapterId, book, chapter]);

  const toggleReadStatus = () => {
    if (isRead) {
      markChapterAsUnread(bookId, chapterId);
      setIsRead(false);
    } else {
      markChapterAsRead(bookId, chapterId);
      setIsRead(true);
    }
  };

  if (loading) {
    return (
      <div className="chapter-reader">
        <div className="loading">
          <div className="spinner"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error || !book || !chapter) {
    return (
      <div className="chapter-reader">
        <div className="error">
          <h2>⚠️ Lỗi</h2>
          <p>{error || 'Không tìm thấy nội dung'}</p>
          <Link to="/" className="btn btn-primary">Quay lại danh sách sách</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="chapter-reader">
      <div className="reader-header">
        <div className="breadcrumb">
          <Link to="/">Sách</Link>
          <span>/</span>
          <Link to={`/book/${bookId}`}>{book.title}</Link>
          <span>/</span>
          <span>{chapter.title}</span>
        </div>
        
        <button 
          className={`read-toggle ${isRead ? 'checked' : ''}`}
          onClick={toggleReadStatus}
        >
          {isRead ? '✓ Đã đọc' : 'Đánh dấu đã đọc'}
        </button>
      </div>

      <article className="chapter-content">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({node, ...props}) => (
              <img {...props} loading="lazy" alt={props.alt || ''} />
            ),
            a: ({node, ...props}) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            )
          }}
        >
          {content}
        </ReactMarkdown>
      </article>

      <div className="chapter-navigation">
        {prevChapter ? (
          <Link 
            to={`/book/${bookId}/chapter/${prevChapter.id}`}
            className="nav-btn prev"
          >
            <span className="arrow">←</span>
            <div>
              <div className="nav-label">Chương trước</div>
              <div className="nav-title">{prevChapter.title}</div>
            </div>
          </Link>
        ) : (
          <div className="nav-btn disabled"></div>
        )}

        {nextChapter ? (
          <Link 
            to={`/book/${bookId}/chapter/${nextChapter.id}`}
            className="nav-btn next"
          >
            <div>
              <div className="nav-label">Chương tiếp</div>
              <div className="nav-title">{nextChapter.title}</div>
            </div>
            <span className="arrow">→</span>
          </Link>
        ) : (
          <div className="nav-btn disabled"></div>
        )}
      </div>
    </div>
  );
}

export default ChapterReader;
