# Campus Placement Preparation Portal

CampusPrep is a small React-based placement practice application for students preparing for campus recruitment tests. It provides category-based quizzes, a countdown timer, automatic scoring, answer explanations, and simple performance history stored in the browser.

The project is intentionally lightweight. It uses local question data and `localStorage` rather than a backend, database, authentication system, or external API.

## Overview

A student can choose from four practice areas:

- Aptitude
- Logical Reasoning
- Computer Science
- Programming

Each quiz presents ten randomly selected questions from the chosen category. The student selects one option per question, works against a ten-minute countdown, and receives a result summary and answer review at the end.

## Features

- Four placement-focused categories
- 60 original educational questions in a local question bank
- Easy, medium, and hard question labels
- Quiz setup with 5, 10, or 15 question choices
- Random selection of questions per attempt
- Four multiple-choice options per question
- One-answer-at-a-time quiz interaction
- Ten-minute countdown timer
- Automatic submission when the timer reaches zero
- Progress bar and answered-question indicator
- Automatic score and accuracy calculation
- Correct/incorrect answer review with explanations
- Recent performance history using browser `localStorage`
- Clear History option
- Responsive layout for desktop, laptop, tablet, and mobile

## Categories

| Category | Questions | Main Topics |
|---|---:|---|
| Aptitude | 15 | Percentages, ratios, averages, profit/loss, probability, time/work |
| Logical Reasoning | 15 | Sequences, coding-decoding, directions, patterns, deduction |
| Computer Science | 15 | OOP, DBMS, OS, networking, data structures, algorithms |
| Programming | 15 | JavaScript basics, arrays, loops, functions, complexity, algorithms |

## Tech Stack

- **React** — component-based user interface
- **JavaScript** — application and quiz logic
- **HTML** — page structure through JSX
- **CSS** — responsive visual design
- **Vite** — development server and production build
- **localStorage** — simple browser-side performance persistence

No TypeScript, Redux, backend, database, Firebase, authentication, or external APIs are used.

## Application Flow

```text
Home Page
   ↓
Choose Category
   ↓
Randomly Select 10 Questions
   ↓
Timed Quiz
   ↓
Select Answers + Track Progress
   ↓
Submit / Timer Reaches Zero
   ↓
Calculate Score
   ↓
Save Attempt to localStorage
   ↓
Results + Answer Review
   ↓
Try Again / Back to Home
```

## React Concepts Used

### Components

The interface is split into small reusable components such as `Header`, `CategoryCard`, `QuizQuestion`, `ProgressBar`, `Timer`, and `ResultCard`.

### useState

`useState` stores values that change while the application is running, including the current page, selected answers, current question, timer value, quiz result, and performance history.

### useEffect

`useEffect` is used for timer-related work and small side effects such as updating the document title. The timer returns a cleanup function so its interval does not remain active after the component changes.

### Props

Parent components pass data and callback functions to child components. For example, `CategoryCard` receives a category and an `onStart` function from the Home page.

### Conditional Rendering

The application renders Home, Quiz, or Results based on the current application state. It also conditionally displays different review styles and empty states.

### Array Methods

The project uses methods such as `map()`, `filter()`, `reduce()`, and `find()` for rendering question options, selecting questions, calculating scores, and finding category names.

### localStorage

Quiz history is converted to JSON and stored in the browser. When the application starts, that data is read and converted back into a JavaScript array.

## Project Structure

```text
campus-placement-preparation-portal/
│
├── index.html
├── package.json
├── vite.config.js
├── README.md
│
└── src/
    ├── components/
    │   ├── Header.jsx
    │   ├── CategoryCard.jsx
    │   ├── QuizQuestion.jsx
    │   ├── ProgressBar.jsx
    │   ├── Timer.jsx
    │   └── ResultCard.jsx
    │
    ├── data/
    │   └── questions.js
    │
    ├── pages/
    │   ├── Home.jsx
    │   ├── Quiz.jsx
    │   └── Results.jsx
    │
    ├── App.jsx
    ├── main.jsx
    └── styles/
        └── index.css
```

## Installation

> **Important:** This is a Vite + React application. Do **not** double-click `index.html` or open it with `file://`. React JSX is compiled by Vite, so the application must be started through the Vite development server.

### Recommended — Windows

1. Install Node.js if it is not already installed.
2. Extract the project ZIP.
3. Double-click `start-campus-prep.bat`.
4. The script installs dependencies on the first run and starts Vite.
5. Open the `http://localhost:5173` address shown in the terminal.

### Manual

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite, normally `http://localhost:5173`.

## Screenshots

Screenshots can be added here after running the application locally.

Suggested screenshots:

```text
screenshots/
├── home.png
├── quiz.png
└── results.png
```

Example Markdown once screenshots are available:

```markdown
![CampusPrep Home](screenshots/home.png)
![Quiz Screen](screenshots/quiz.png)
![Results Screen](screenshots/results.png)
```

## Data Persistence

The application does not use a server or database. Recent quiz attempts are saved in the browser under a `localStorage` key named `campusPrepHistory`.

This keeps the implementation easy to understand, but it also means the history is local to the browser and device.

## Future Improvements

These features are possible future extensions and are **not implemented** in the current project:

- Backend authentication
- Larger question database
- Leaderboards
- Cloud score storage
- Personalized recommendations
- Company-specific test patterns
- Admin interface for adding questions
- More detailed performance reports

## Limitations

- Quiz questions are stored in source code rather than a database.
- Performance history is available only in the current browser.
- There is no user account or cloud synchronization.
- The question bank is intentionally small for a student portfolio project.
- The application is not intended to be a complete competitive-exam platform.

## Author

**Divyanshu Raj**

Built to demonstrate practical React fundamentals, JavaScript state management, timed quiz logic, responsive UI development, and browser-side data persistence.
