import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import { categories, questions } from './data/questions';

const HISTORY_KEY = 'campusPrepHistory';

function loadHistory() {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Could not load quiz history:', error);
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(loadHistory);

  function startQuiz(categoryId) {
    setSelectedCategory(categoryId);
    setResult(null);
    setPage('quiz');
  }

  function finishQuiz(quizResult) {
    setResult(quizResult);
    setPage('results');

    const accuracy = Math.round((quizResult.score / quizResult.questions.length) * 100);
    const attempt = {
      id: Date.now(),
      category: selectedCategory,
      score: quizResult.score,
      totalQuestions: quizResult.questions.length,
      accuracy,
      date: new Date().toISOString(),
    };

    const updatedHistory = [attempt, ...history].slice(0, 10);
    setHistory(updatedHistory);
    saveHistory(updatedHistory);
  }

  function goHome() {
    setPage('home');
    setResult(null);
  }

  function clearHistory() {
    if (!window.confirm('Clear all saved quiz attempts?')) {
      return;
    }
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }

  let content;

  if (page === 'quiz') {
    content = (
      <Quiz
        key={selectedCategory}
        category={selectedCategory}
        questionBank={questions}
        onFinish={finishQuiz}
        onBack={goHome}
      />
    );
  } else if (page === 'results' && result) {
    content = (
      <Results
        result={result}
        category={selectedCategory}
        onHome={goHome}
        onRetry={startQuiz}
      />
    );
  } else {
    content = (
      <Home
        categories={categories}
        questionBank={questions}
        history={history}
        onStartQuiz={startQuiz}
        onClearHistory={clearHistory}
      />
    );
  }

  return (
    <>
      <Header onHome={goHome} />
      {content}
      <footer className="site-footer">
        <div className="container">CampusPrep · A student-built placement practice project</div>
      </footer>
    </>
  );
}
