import { useEffect } from 'react';

export default function Timer({ seconds, onTimeUp }) {
  useEffect(() => {
    if (seconds <= 0) {
      return undefined;
    }

    const timerId = setInterval(() => {
      onTimeUp();
    }, 1000);

    return () => clearInterval(timerId);
  }, [seconds, onTimeUp]);

  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');

  return (
    <div className={`timer ${seconds <= 30 ? 'timer-warning' : ''}`} aria-label="Time remaining">
      <span aria-hidden="true">◷</span> {minutes}:{remainingSeconds}
    </div>
  );
}
