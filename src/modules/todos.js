import CompletedTasksStatus from './tasksCompleted.js';

const status = new CompletedTasksStatus();
export default class Tasks {
  constructor() {
    this.tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  saveAndRender = () => {
    localStorage.setItem('tasks', JSON.stringify(this.tasksArray));
    this.displayList();
  }

  displayList = () => {
    // display tasks
    const todoContainer = document.querySelector('#todo-list');
    todoContainer.innerHTML = '';
    this.tasksArray.forEach((task) => {
      const li = document.createElement('li');
      li.className = 'todo-task';
      li.id = task.index;
      li.innerHTML = `<div><button class="check-task"><i class="fa-regular fa-square"></i><i class="fa-solid fa-check"></i></button> <input class="todo-input" type="text" value="${task.description}"></div><button><i class="fa-solid fa-ellipsis-vertical" style="margin-left:15rem;"></i>
      </button><button class="delete-task"><i class="fa-solid fa-trash-can"></i></button>`;
      todoContainer.insertBefore(li, todoContainer.children[task.index]);
      if (task.isCompleted) {
        li.classList.add('active');
      }
    });

    // delete item
    const deleteBtn = document.querySelectorAll('.delete-task');
    deleteBtn.forEach((button, index) => {
      button.addEventListener('click', () => {
        this.remove(index);
      });
    });

    // focus item
    const dotsIcon = document.querySelectorAll('.fa-ellipsis-vertical');
    const deleteIcon = document.querySelectorAll('.fa-trash-can');
    const editInput = document.querySelectorAll('.todo-input');
    const todoTask = document.querySelectorAll('.todo-task');

    editInput.forEach((input, index) => {
      deleteIcon[index].style.display = 'none';
      input.addEventListener('focus', () => {
        deleteIcon[index].style.display = 'block';
        dotsIcon[index].style.display = 'none';
        if (!this.tasksArray[index].isCompleted) {
          todoTask[index].classList.add('focus');
          dotsIcon[index].style.display = 'none';
          deleteIcon[index].style.display = 'block';
        }
      });
      input.addEventListener('focusout', () => {
        todoTask[index].classList.remove('focus');
        deleteIcon[index].style.display = 'none';
        dotsIcon[index].style.display = 'block';
      });
    });

    // edit item
    editInput.forEach((input, index) => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value) {
          this.update(input.value, index);
        }
      });
      input.addEventListener('change', () => {
        if (input.value) {
          this.update(input.value, index);
        }
      });
    });
    // complete task and update status
    status.completeTask(this.tasksArray);
  }

  add = (value) => {
    this.tasksArray.push({
      description: value,
      isCompleted: false,
      index: this.tasksArray.length + 1,
    });
    this.saveAndRender();
  }

  update = (value, index) => {
    this.tasksArray[index].description = value;
    this.saveAndRender();
  }

  remove = (index) => {
    this.tasksArray.splice(index, 1);
    this.tasksArray.forEach((task, i) => {
      task.index = i + 1;
    });
    this.saveAndRender();
  }
}