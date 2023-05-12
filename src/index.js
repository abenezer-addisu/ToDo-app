import './style.css';
import Tasks from './modules/todos.js';
import CompletedTasksStatus from './modules/tasksCompleted.js';

const tasks = new Tasks();
const status = new CompletedTasksStatus();

// display the todo list from storage
tasks.displayList();

// add new task
const newInput = document.querySelector('#new-todo');
newInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && newInput.value) {
    tasks.add(newInput.value);
    newInput.value = '';
  }
});

// refresh the list
const refreshBtn = document.querySelector('#refresh-list');
refreshBtn.addEventListener('click', () => {
  document.location.reload();
});

// delete all tasks completed
status.clearCompleted(tasks);
