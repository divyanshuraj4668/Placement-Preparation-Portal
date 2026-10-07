import CategoryCard from '../components/CategoryCard';

export default function Home({ categories, questionBank, history, onStartQuiz, onClearHistory }) {
  const categoryCounts = categories.reduce((counts, category) => {
    counts[category.id] = questionBank.filter((question) => question.category === category.id).length;
    return counts;
  }, {});

  return (
    <main className="container page-content">
      <section className="hero">
        <div>
          <span className="eyebrow">PLACEMENT PRACTICE HUB</span>
          <h1>Prepare with purpose.</h1>
          <p>Practice the fundamentals that commonly appear in campus placement tests. Pick a topic, take a timed quiz, and learn from every attempt.</p>
        </div>
        <div className="hero-stat"><strong>{questionBank.length}</strong><span>practice questions</span></div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><span className="eyebrow">CHOOSE A CATEGORY</span><h2>What do you want to practice?</h2></div>
          <span className="muted-text">15 questions per category</span>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} questionCount={categoryCounts[category.id]} onStart={onStartQuiz} />
          ))}
        </div>
      </section>

      <section className="section-block performance-block">
        <div className="section-heading">
          <div><span className="eyebrow">YOUR PROGRESS</span><h2>Recent Performance</h2></div>
          {history.length > 0 && <button className="text-button danger-text" onClick={onClearHistory}>Clear History</button>}
        </div>
        {history.length === 0 ? (
          <div className="empty-card"><span className="empty-symbol">✓</span><div><strong>No attempts yet</strong><p>Complete your first quiz and your recent performance will appear here.</p></div></div>
        ) : (
          <div className="history-list">
            {history.slice(0, 5).map((attempt) => (
              <div className="history-row" key={attempt.id}>
                <div><strong>{categories.find((category) => category.id === attempt.category)?.name || attempt.category}</strong><span>{new Date(attempt.date).toLocaleString()}</span></div>
                <div className="history-score"><strong>{attempt.score}/{attempt.totalQuestions}</strong><span>{attempt.accuracy}% accuracy</span></div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
