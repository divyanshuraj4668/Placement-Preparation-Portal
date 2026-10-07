import { useCallback, useEffect, useMemo, useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import QuizQuestion from '../components/QuizQuestion';
import Timer from '../components/Timer';

const QUIZ_MINUTES = 10;

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Quiz({ category, questionBank, onFinish, onBack }) {
  const [questionCount, setQuestionCount] = useState(10);
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(QUIZ_MINUTES * 60);
  const [submitted, setSubmitted] = useState(false);

  const availableQuestions = questionBank.filter(
    (question) => question.category === category,
  ).length;

  const quizQuestions = useMemo(
    () =>
      shuffle(
        questionBank.filter((question) => question.category === category),
      ).slice(0, questionCount),
    [category, questionBank, questionCount],
  );

  const currentQuestion = quizQuestions[currentIndex];

  const finishQuiz = useCallback(() => {
    if (submitted || quizQuestions.length === 0) {
      return;
    }

    setSubmitted(true);

    const score = quizQuestions.reduce((total, question) => {
      return total + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);

    const timeUsedSeconds = QUIZ_MINUTES * 60 - secondsLeft;
    onFinish({ questions: quizQuestions, answers, score, timeUsedSeconds });
  }, [answers, onFinish, quizQuestions, secondsLeft, submitted]);

  useEffect(() => {
    if (!started || !currentQuestion) {
      return undefined;
    }

    document.title = `Question ${currentIndex + 1} | CampusPrep`;

    return () => {
      document.title = 'CampusPrep | Placement Preparation';
    };
  }, [started, currentIndex, currentQuestion]);

  useEffect(() => {
    if (started && secondsLeft === 0) {
      finishQuiz();
    }
  }, [started, secondsLeft, finishQuiz]);

  const tick = useCallback(() => {
    setSecondsLeft((seconds) => Math.max(0, seconds - 1));
  }, []);

  function selectAnswer(answerIndex) {
    if (submitted) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: answerIndex,
    }));
  }

  function handleNext() {
    if (currentIndex === quizQuestions.length - 1) {
      finishQuiz();
      return;
    }

    setCurrentIndex((index) => index + 1);
  }

  if (!started) {
    return (
      <main className="container quiz-page">
        <button className="text-button" onClick={onBack}>
          ← Back to Categories
        </button>

        <section className="setup-card">
          <span className="eyebrow">QUIZ SETUP</span>
          <h1>
            Set up your{' '}
            {category === 'cs'
              ? 'Computer Science'
              : category === 'programming'
                ? 'Programming'
                : category === 'reasoning'
                  ? 'Logical Reasoning'
                  : 'Aptitude'}{' '}
            quiz.
          </h1>
          <p>
            Choose how many questions you want to attempt. You will have 10
            minutes for the quiz.
          </p>

          <label className="setup-label" htmlFor="question-count">
            Number of questions
          </label>
          <select
            id="question-count"
            className="setup-select"
            value={questionCount}
            onChange={(event) => setQuestionCount(Number(event.target.value))}
          >
            {[5, 10, 15]
              .filter((count) => count <= availableQuestions)
              .map((count) => (
                <option key={count} value={count}>
                  {count} questions
                </option>
              ))}
          </select>

          <div className="setup-note">
            {availableQuestions} questions are available in this category.
          </div>

          <button
            className="btn btn-primary setup-start"
            onClick={() => setStarted(true)}
          >
            Start Quiz →
          </button>
        </section>
      </main>
    );
  }

  if (!currentQuestion) {
    return (
      <main className="container page-content">
        <div className="empty-card">
          <strong>No questions available.</strong>
        </div>
      </main>
    );
  }

  return (
    <main className="container quiz-page">
      <div className="quiz-topbar">
        <button className="text-button" onClick={onBack}>
          ← Exit Quiz
        </button>
        <Timer seconds={secondsLeft} onTimeUp={tick} />
      </div>

      <div className="quiz-progress-heading">
        <div>
          <span className="eyebrow">
            {category === 'cs' ? 'COMPUTER SCIENCE' : category.toUpperCase()}
          </span>
          <strong>
            Question {currentIndex + 1} <span>/ {quizQuestions.length}</span>
          </strong>
        </div>
        <span>{Object.keys(answers).length} answered</span>
      </div>

      <ProgressBar current={currentIndex + 1} total={quizQuestions.length} />

      <QuizQuestion
        question={currentQuestion}
        selectedAnswer={answers[currentQuestion.id]}
        onSelect={selectAnswer}
      />

      <div className="quiz-actions">
        <span className="muted-text">Choose one answer before continuing.</span>
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={answers[currentQuestion.id] === undefined || submitted}
        >
          {currentIndex === quizQuestions.length - 1
            ? 'Submit Quiz'
            : 'Next Question →'}
        </button>
      </div>
    </main>
  );
}
