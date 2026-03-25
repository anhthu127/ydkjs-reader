import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { books, estimatedReadingTimes } from '../data/books';
import { getReadingPlan, saveReadingPlan, clearReadingPlan, getAllProgress } from '../utils/storage';
import './ReadingPlanner.css';

function ReadingPlanner() {
  const [dailyMinutes, setDailyMinutes] = useState(30);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [plan, setPlan] = useState(null);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const savedPlan = getReadingPlan();
    if (savedPlan) {
      setPlan(savedPlan);
      setDailyMinutes(savedPlan.dailyMinutes);
      setStartDate(savedPlan.startDate);
    }
  }, []);

  const calculatePlan = () => {
    const progress = getAllProgress();
    const schedule = [];
    let currentDate = new Date(startDate);
    let remainingMinutes = dailyMinutes;
    let dayChapters = [];

    books.forEach(book => {
      book.chapters.forEach(chapter => {
        if (progress[book.id]?.[chapter.id]?.completed) {
          return;
        }

        const readingTime = estimatedReadingTimes[chapter.id] || 20;

        if (remainingMinutes >= readingTime) {
          dayChapters.push({
            bookId: book.id,
            bookTitle: book.title,
            chapterId: chapter.id,
            chapterTitle: chapter.title,
            readingTime
          });
          remainingMinutes -= readingTime;
        } else {
          if (dayChapters.length > 0) {
            schedule.push({
              date: new Date(currentDate).toISOString().split('T')[0],
              chapters: dayChapters,
              totalMinutes: dailyMinutes - remainingMinutes
            });
          }

          currentDate.setDate(currentDate.getDate() + 1);
          dayChapters = [{
            bookId: book.id,
            bookTitle: book.title,
            chapterId: chapter.id,
            chapterTitle: chapter.title,
            readingTime
          }];
          remainingMinutes = dailyMinutes - readingTime;
        }
      });
    });

    if (dayChapters.length > 0) {
      schedule.push({
        date: new Date(currentDate).toISOString().split('T')[0],
        chapters: dayChapters,
        totalMinutes: dailyMinutes - remainingMinutes
      });
    }

    const newPlan = {
      dailyMinutes,
      startDate,
      schedule,
      createdAt: new Date().toISOString()
    };

    setPlan(newPlan);
    saveReadingPlan(newPlan);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const handleClearPlan = () => {
    clearReadingPlan();
    setPlan(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const totalDays = plan?.schedule.length || 0;
  const totalReadingTime = plan?.schedule.reduce((sum, day) => sum + day.totalMinutes, 0) || 0;
  const endDate = plan?.schedule[plan.schedule.length - 1]?.date;

  return (
    <div className="reading-planner">
      <div className="container">
        <h2 className="page-title">Kế hoạch đọc</h2>

        <div className="planner-form">
          <div className="form-group">
            <label>
              Thời gian đọc mỗi ngày (phút):
              <input
                type="number"
                min="10"
                max="300"
                value={dailyMinutes}
                onChange={(e) => setDailyMinutes(parseInt(e.target.value))}
                className="input"
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              Ngày bắt đầu:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input"
              />
            </label>
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" onClick={calculatePlan}>
              Tạo kế hoạch
            </button>
            {plan && (
              <button className="btn btn-secondary" onClick={handleClearPlan}>
                Xóa kế hoạch
              </button>
            )}
          </div>

          {showSaved && (
            <div className="alert alert-success">
              ✓ Kế hoạch đã được lưu!
            </div>
          )}
        </div>

        {plan && (
          <>
            <div className="plan-summary">
              <div className="summary-card">
                <div className="summary-value">{totalDays}</div>
                <div className="summary-label">Ngày</div>
              </div>
              <div className="summary-card">
                <div className="summary-value">{Math.round(totalReadingTime / 60)}h {totalReadingTime % 60}m</div>
                <div className="summary-label">Tổng thời gian</div>
              </div>
              <div className="summary-card">
                <div className="summary-value">{formatDate(endDate).split(',')[0]}</div>
                <div className="summary-label">Hoàn thành vào</div>
              </div>
            </div>

            <div className="schedule">
              <h3>Lịch trình chi tiết</h3>
              {plan.schedule.map((day, index) => (
                <div key={index} className="day-card">
                  <div className="day-header">
                    <div>
                      <h4>Ngày {index + 1}</h4>
                      <p className="date">{formatDate(day.date)}</p>
                    </div>
                    <div className="day-time">{day.totalMinutes} phút</div>
                  </div>
                  <div className="day-chapters">
                    {day.chapters.map((chapter, chIndex) => (
                      <Link
                        key={chIndex}
                        to={`/book/${chapter.bookId}/chapter/${chapter.chapterId}`}
                        className="chapter-card"
                      >
                        <div className="chapter-info">
                          <span className="book-badge">{chapter.bookTitle}</span>
                          <span className="chapter-name">{chapter.chapterTitle}</span>
                        </div>
                        <span className="chapter-time">{chapter.readingTime} phút</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!plan && (
          <div className="empty-state">
            <p>📅 Chưa có kế hoạch đọc nào. Hãy tạo kế hoạch để bắt đầu!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReadingPlanner;
