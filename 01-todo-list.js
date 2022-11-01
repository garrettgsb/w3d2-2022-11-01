/*
CRUD with Express
Create
Read
Update
Delete

BREAD with Express
Browse
Read
Edit
Add
Delete

BREAD for Todos
GET /todos - Browse - Looking at a list
GET /todos/:id - Read - Looking at the details of an individual todo
POST /todos/:id - Edit - Change the content of a todo
POST /todos - Add - Add a new todo to the collection
POST /todos/:id/delete Delete - Remove a todo from the collection

BR*E*AD for Counters
POST /counters/:id/increment
POST /counters/:id/decrement
POST /counters/:id/set
POST /counters/:id/reset
GET /counters/:id/reset -> Confirm: "Are you sure you want to reset this counter?"
*/

const todos = [
  "Get milk",
  "Wash car",
  "Walk dog",
];

function addTodo(todo) {
  todos.push(todo);
}

function removeTodo(idx) {
  if (!todos[idx]) throw new Error(`No todo at index ${idx}!`);
  todos.splice(idx, 1);
}

function updateTodo(idx, newText) {
  if (!todos[idx]) throw new Error(`No todo at index ${idx}!`);
  todos[idx] = newText;
}

function viewTodos() {
  return `<h1>Todos:</h1>
  <ul>
  ${todos.map((todo, idx) => `
    <li>
      <span>${todo} [${idx}]</span>
      <form method='POST' action='/todos/${idx}'>
        <input value='${todo}' name='newTodoText'>
        <button>✏️</button>
      </form>
      <form method='POST' action='/todos/${idx}/delete'>
        <button>🚮</button>
      </form>
    </li>
  `).join('\n')}
  </ul>

  <form method='POST' action='/todos'>
    <input placeholder='New todo text...' name='newTodoText'>
    <button>➕</button>
  </form>
  `;
}

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => { response.redirect('/todos') });

// Browse
app.get('/todos', (request, response) => { response.send(viewTodos()) });

// Edit
app.post('/todos/:id', (request, response) => {
  const id = request.params.id;
  const text = request.body.newTodoText;
  updateTodo(id, text);
  response.redirect('/todos');
});

// Add
app.post('/todos', (request, response) => {
  const todoText = request.body.newTodoText;
  addTodo(todoText);
  response.redirect('/todos');
});

// Delete
app.post('/todos/:id/delete', (request, response) => {
  const id = request.params.id;
  removeTodo(id);
  response.redirect('/todos');
});

app.listen(8080);
