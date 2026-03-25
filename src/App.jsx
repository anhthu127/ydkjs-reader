import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import BookList from './components/BookList';
import ChapterReader from './components/ChapterReader';
import ProgressBoard from './components/ProgressBoard';
import ReadingPlanner from './components/ReadingPlanner';
import './App.css';

function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Router basename="/You-Dont-Know-JS">
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <Link to="/" className="logo">
              <h1>📚 You Don't Know JS - Vietnamese</h1>
            </Link>
            <button 
              className="menu-toggle"
              onClick={() => setShowMenu(!showMenu)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
            <nav className={`nav ${showMenu ? 'show' : ''}`}>
              <Link to="/" onClick={() => setShowMenu(false)}>Sách</Link>
              <Link to="/progress" onClick={() => setShowMenu(false)}>Tiến độ</Link>
              <Link to="/planner" onClick={() => setShowMenu(false)}>Kế hoạch đọc</Link>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/book/:bookId" element={<BookList />} />
            <Route path="/book/:bookId/chapter/:chapterId" element={<ChapterReader />} />
            <Route path="/progress" element={<ProgressBoard />} />
            <Route path="/planner" element={<ReadingPlanner />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>
            Dựa trên bộ sách "You Don't Know JS" của Kyle Simpson.{' '}
            <a 
              href="https://github.com/getify/You-Dont-Know-JS" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Nguồn gốc
            </a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
