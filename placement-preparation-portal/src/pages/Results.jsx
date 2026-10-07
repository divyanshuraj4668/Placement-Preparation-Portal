import ResultCard from '../components/ResultCard';

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remaining = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remaining}`;
}

export default function Results({ result, category, onHome, onRetry }) {
  const { questions, answers, score, timeUsedSeconds } = result;
  const accuracy = Math.round((score / questions.length) * 100);

  return (
    <main className="container results-page">
      <section className="results-header">
        <span className="success-mark">✓</span>
        <span className="eyebrow">QUIZ COMPLETE</span>
        <h1>Nice work. Keep improving.</h1>
        <p>Here is a quick breakdown of your latest attempt.</p>
      </section>

      <ResultCard score={score} total={questions.length} accuracy={accuracy} timeUsed={formatTime(timeUsedSeconds)} />

      <section className="review-section">
        <div className="section-heading"><div><span className="eyebrow">REVIEW</span><h2>Review Answers</h2></div></div>
        <div className="review-list">
          {questions.map((question, index) => {
            const selected = answers[question.id];
            const isCorrect = selected === question.correctAnswer;
            return (
              <article className={`review-card ${isCorrect ? 'review-correct' : 'review-incorrect'}`} key={question.id}>
                <div className="review-number">{index + 1}</div>
                <div className="review-content">
                  <div className="review-status">{isCorrect ? 'Correct' : 'Incorrect'}</div>
                  <h3>{question.question}</h3>
                  <p><strong>Your answer:</strong> {selected === undefined ? 'Not answered' : question.options[selected]}</p>
                  <p><strong>Correct answer:</strong> {question.options[question.correctAnswer]}</p>
                  <p className="explanation">{question.explanation}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="results-actions">
        <button className="btn btn-secondary" onClick={onHome}>Back to Home</button>
        <button className="btn btn-primary" onClick={() => onRetry(category)}>Try Again</button>
      </div>
    </main>
  );
}
