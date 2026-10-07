export default function CategoryCard({ category, questionCount, onStart }) {
  return (
    <article className="category-card">
      <div className="category-icon">{category.icon}</div>
      <div className="category-content">
        <h3>{category.name}</h3>
        <p>{category.description}</p>
        <span className="question-count">{questionCount} questions</span>
      </div>
      <button className="btn btn-secondary" onClick={() => onStart(category.id)}>
        Start Quiz <span aria-hidden="true">→</span>
      </button>
    </article>
  );
}
