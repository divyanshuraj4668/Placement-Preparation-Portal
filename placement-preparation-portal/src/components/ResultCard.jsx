export default function ResultCard({ score, total, accuracy, timeUsed }) {
  return (
    <div className="result-summary">
      <div className="result-main">
        <span className="result-label">Your Score</span>
        <strong>{score} <small>/ {total}</small></strong>
      </div>
      <div className="result-stats">
        <div><span>Accuracy</span><strong>{accuracy}%</strong></div>
        <div><span>Correct</span><strong>{score}</strong></div>
        <div><span>Incorrect</span><strong>{total - score}</strong></div>
        <div><span>Time Used</span><strong>{timeUsed}</strong></div>
      </div>
    </div>
  );
}
