let pendingTasks = [];
let completedTasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const newTask = {
    text: taskText,
    timestamp: new Date()
  };

  pendingTasks.push(newTask);
  taskInput.value = '';
  renderTasks();
}

function toggleComplete(index) {
  const task = pendingTasks.splice(index, 1)[0];
  task.completed = true;
  completedTasks.push(task);
  renderTasks();
}

function deleteTask(index, type) {
  if (type === 'pending') {
    pendingTasks.splice(index, 1);
  } else {
    completedTasks.splice(index, 1);
  }
  renderTasks();
}

function renderTasks() {
  const pendingTasksList = document.getElementById('pendingTasks');
  const completedTasksList = document.getElementById('completedTasks');

  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  pendingTasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${task.text}</span>
      <button onclick="toggleComplete(${index})">Complete</button>
      <button onclick="deleteTask(${index}, 'pending')">Delete</button>
    `;
    pendingTasksList.appendChild(listItem);
  });

  completedTasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class="completed">${task.text}</span>
      <button onclick="deleteTask(${index}, 'completed')">Delete</button>
    `;
    completedTasksList.appendChild(listItem);
  });
}

renderTasks();