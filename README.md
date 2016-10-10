## React Todo App (Blocitoff)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Blocitoff is a simple todo app for learning to code in React.
[Demo](https://stormy-ridge-15940.herokuapp.com/)

User can choose to create a new task, set priority for the task, and mark a task as completed. Additionally, users can go back and forward between current tasks and completed tasks.

I used moment.js for easy time keeping, (i.e. show the amount of time elapsed since creation) and bootstrap 3 for styling.

This Todo app uses Firebase to persist data, the path to the database is simply /items/{key}, so it can only accomodate one user's task keeping needs at a time.
