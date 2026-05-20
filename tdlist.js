const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 1. load data
chrome.storage.local.get(['tasks'], (result) => {
  const savedTasks = result.tasks || [];
  savedTasks.forEach(task => renderTask(task));
});

// function rendering list of task 
function renderTask(taskText) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <span class="delete-btn">X</span>
  `;
  
  // delete task
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
}

// 2. add new task
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text) {
    renderTask(text);
    saveTasks();
    taskInput.value = ''; // clean input
  }
});

// allow add by enter
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

// 3. Function saving list state to Chrome Storage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li span:first-child').forEach(span => {
    tasks.push(span.innerText);
  });
  chrome.storage.local.set({ tasks: tasks });
}