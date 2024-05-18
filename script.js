document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todoInput');
  const addButton = document.getElementById('addButton');
  const todoList = document.getElementById('todoList');
  const clearButton = document.getElementById('clearButton');

  // Load tasks from local storage on page load
  loadTasks();

  addButton.addEventListener('click', addTodo);
  todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTodo();
    }
  });

  clearButton.addEventListener('click', () => {
    todoList.innerHTML = '';
    saveTasks();
  });

  function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
      const li = createTodoItem(todoText, false);
      todoList.appendChild(li);
      todoInput.value = '';

      saveTasks();
    }
  }

  function createTodoItem(todoText, completed) {
    const li = document.createElement('li');
    li.classList.add('task-item');
    if (completed) {
      li.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
      saveTasks();
    });

    const taskSpan = document.createElement('span');
    taskSpan.textContent = todoText;

    const editIcon = document.createElement('span');
    editIcon.classList.add('edit-icon');
    editIcon.innerHTML = '<i class="fas fa-edit"></i>';
    editIcon.addEventListener('click', () => {
      editTask(li, taskSpan);
    });

    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.innerHTML = '<i class="fas fa-trash"></i>';
    deleteIcon.addEventListener('click', () => {
      todoList.removeChild(li);
      saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(editIcon);
    li.appendChild(deleteIcon);

    return li;
  }

  function editTask(li, taskSpan) {
    const newTodoText = prompt('Edit your task:', taskSpan.textContent);
    if (newTodoText) {
      taskSpan.textContent = newTodoText;
      saveTasks();
    }
  }

  function saveTasks() {
    const tasks = [];
    todoList.querySelectorAll('li').forEach(li => {
      tasks.push({
        text: li.querySelector('span').textContent,
        completed: li.querySelector('input').checked
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      const li = createTodoItem(task.text, task.completed);
      todoList.appendChild(li);
    });
  }
});
