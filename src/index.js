import './style.css';

const todosListEl = document.getElementById('todos-list');

const todos = [
  {
    description: 'task 1',
    completed: true,
    index: 1,
  },
  {
    description: 'task 2',
    completed: false,
    index: 2,
  },
  {
    description: 'task 3',
    completed: false,
    index: 3,
  },
];

let content = '';
// RENDER TODOS
todos.forEach((todo, index) => {
  content += `
    <li id="todo-item">
      <div id=${index}>
        <span class="bi-square"></span>
        <p>${todo.description}</p>
        <p>${todo.completed}</p>
      </div>
    </li>`;
});

todosListEl.innerHTML = content;
