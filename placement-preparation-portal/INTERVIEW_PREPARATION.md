# CampusPrep — Basic Interview Preparation

## 1. Why did you use React for this project?

React makes it easier to split the interface into reusable components and update only the parts of the page whose state changes. It is useful here because the quiz screen changes frequently as the user answers questions.

## 2. What is a React component?

A component is a reusable piece of the user interface. For example, `QuizQuestion` displays one question and its options, while `CategoryCard` displays one practice category.

## 3. What is useState?

`useState` is a React Hook used to store data that can change while the application is running. In this project it stores the current question, selected answers, timer value, quiz result, and history.

## 4. What is useEffect?

`useEffect` lets a component perform side effects after rendering. The timer uses it to create a one-second interval and returns a cleanup function to remove that interval.

## 5. What are props?

Props are values passed from a parent component to a child component. For example, `Home` passes a category and a start callback to `CategoryCard`.

## 6. How does the timer work?

The quiz stores remaining seconds in state. An interval runs every second and decreases that state by one. When the value reaches zero, the quiz is submitted automatically.

## 7. How is quiz state maintained?

The `Quiz` component stores the current question index, selected answers, and remaining time using `useState`. These values determine what the user sees and what happens when they click Next.

## 8. How is the score calculated?

When the quiz finishes, the program loops through all quiz questions and compares each stored selected answer with the question's `correctAnswer`. Every match adds one point.

## 9. How does localStorage work in this application?

The application converts the performance history array into JSON using `JSON.stringify()` and stores it with `localStorage.setItem()`. On startup it reads the value with `getItem()` and uses `JSON.parse()` to restore the array.

## 10. Why is map() used for questions/options?

`map()` is useful when we need to create one UI element for every item in an array. The options array is mapped into four answer buttons.

## 11. What happens when the quiz ends?

The selected answers are evaluated, a result object is created, the attempt is saved to localStorage, and the application changes from the Quiz view to the Results view.

## 12. How would you add a backend?

I would create a server API and database for users, questions, and scores. React would send requests to that API instead of keeping all question data and history only in the browser.

## 13. What are the limitations of this project?

There is no authentication, backend, cloud storage, or large question database. History is stored only in the current browser, so it is not synchronized between devices.

## 14. How could authentication be implemented?

A backend could provide registration and login endpoints, securely store password hashes, and return a session or token after successful login. The frontend could then use that authenticated session for user-specific data.

## 15. How could the application be scaled?

I would move questions and user results to a database, add backend APIs, authentication, pagination, better analytics, and possibly an admin system for managing questions. The React components could remain mostly focused on presentation and user interaction.
