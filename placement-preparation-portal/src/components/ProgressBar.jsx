export default function ProgressBar({ current, total }) {
  const percentage = total ? (current / total) * 100 : 0;

  return (
    <div className="progress-wrap" aria-label={`Question ${current} of ${total}`}>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
