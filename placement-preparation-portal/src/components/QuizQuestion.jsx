export default function QuizQuestion({ question, selectedAnswer, onSelect }) {
  return (
    <section className="question-card">
      <div className="question-meta">
        <span>{question.category === 'cs' ? 'Computer Science' : question.category === 'programming' ? 'Programming' : question.category === 'reasoning' ? 'Logical Reasoning' : 'Aptitude'}</span>
        <span className={`difficulty difficulty-${question.difficulty}`}>{question.difficulty}</span>
      </div>
      <h2>{question.question}</h2>
      <div className="options-list">
        {question.options.map((option, index) => (
          <button
            key={option}
            className={`option ${selectedAnswer === index ? 'option-selected' : ''}`}
            onClick={() => onSelect(index)}
            aria-pressed={selectedAnswer === index}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
            <span>{option}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
