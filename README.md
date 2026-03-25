# YDKJS Reader - You Don't Know JS Vietnamese Reader

A modern, interactive web application for reading the Vietnamese translation of "You Don't Know JS" book series by Kyle Simpson.

## Features

### 📚 Book Reading
- Browse all available books in the series
- Read Vietnamese-translated chapters with beautiful markdown rendering
- Navigate between chapters easily with prev/next buttons
- View estimated reading time for each chapter

### 📊 Progress Tracking
- Mark chapters as read/unread
- Visual progress indicators for each book
- Overall reading statistics
- Track completion percentage

### 📅 Reading Planner
- Set daily reading time goals
- Automatically generate a personalized reading schedule
- View detailed day-by-day reading plan
- Calculate estimated completion date
- Save and manage your reading plan

### 💾 Data Persistence
- All progress and plans are saved in browser localStorage
- No backend or database required
- Data persists across sessions

## Tech Stack

- **Frontend**: React 19 with Vite
- **Routing**: React Router v7
- **Markdown**: react-markdown with remark-gfm
- **Styling**: Pure CSS with modern CSS features
- **Storage**: Browser localStorage
- **Deployment**: GitHub Pages with GitHub Actions

## Project Structure

```
ydkjs-reader/
├── src/
│   ├── components/
│   │   ├── BookList.jsx          # List of books with chapters
│   │   ├── ChapterReader.jsx     # Markdown chapter reader
│   │   ├── ProgressBoard.jsx     # Progress tracking dashboard
│   │   └── ReadingPlanner.jsx    # Reading schedule planner
│   ├── data/
│   │   └── books.js              # Book and chapter metadata
│   ├── utils/
│   │   └── storage.js            # localStorage utilities
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # Entry point
└── public/
    └── (markdown files copied during build)
```

## Development

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

```bash
cd ydkjs-reader
npm install
```

### Running Locally

```bash
npm run dev
```

Visit `http://localhost:5173` to view the app.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup

1. Enable GitHub Pages in your repository settings
2. Set source to "GitHub Actions"
3. Push to main/master branch to trigger deployment

The workflow will:
1. Build the React application
2. Copy markdown files and images from the book folders
3. Deploy to GitHub Pages

## Features Explained

### Book List
- Expandable cards for each book
- Progress circles showing completion percentage
- Quick toggle to mark chapters as read/unread
- Estimated reading time per chapter

### Chapter Reader
- Clean, readable markdown rendering
- Syntax highlighting for code blocks
- Image support with lazy loading
- Breadcrumb navigation
- Read status toggle

### Progress Board
- Overall statistics (chapters read, total chapters, completion %)
- Per-book progress bars
- List of read chapters with quick links
- Option to clear all progress

### Reading Planner
- Input daily reading time (minutes)
- Select start date
- Auto-generates schedule based on unread chapters
- Shows estimated completion date
- Displays day-by-day breakdown
- Saves plan to localStorage

## Books Included

1. **Scope & Closures** (Phạm vi & Đóng cửa) - 11 chapters
2. **Objects & Classes** (Đối tượng & Lớp) - 7 chapters
3. **Types & Grammar** (Các Loại & Ngữ Pháp) - 6 chapters
4. **Sync & Async** (Đồng bộ & Bất đồng bộ) - 2 chapters

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

Based on the "You Don't Know JS" book series by Kyle Simpson.
- [Original Repository](https://github.com/getify/You-Dont-Know-JS)
- Vietnamese translation by community contributors

## License

This project is for educational purposes. The original "You Don't Know JS" content is licensed under Creative Commons Attribution-NonCommercial-NoDerivs 4.0 Unported License.
