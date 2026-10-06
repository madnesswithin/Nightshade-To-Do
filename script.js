const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const toast = document.getElementById('self-care-toast');
const toastMessage = document.getElementById('toast-message');

// Self-care prompts to randomly display upon task completion
const carePrompts = [
  "Task done! Time for a sip of water. 💧",
  "Great job! Roll your shoulders back. 🧘‍♀️",
  "Checking things off! Rest your eyes for 20 seconds. 👁️",
  "Progress! Take a deep breath in... and out. 🌬️",
  "Boom! Give yourself a quick stretch. 🤸‍♀️"
];

let toastTimeout;

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    addTask(text);
    taskInput.value = '';
  }
});

function addTask(text) {
  const li = document.createElement('li');
  li.className = 'task-item';

  // Using a unique ID for the checkbox ensures screen readers connect the label to the input
  const uniqueId = 'task-' + Date.now();

  li.innerHTML = `
    <input type="checkbox" id="${uniqueId}" class="custom-checkbox" aria-label="Mark task as complete">
    <label for="${uniqueId}" class="task-text">${text}</label>
  `;

  const checkbox = li.querySelector('.custom-checkbox');
  checkbox.addEventListener('change', () => handleTaskCompletion(li, checkbox));

  taskList.appendChild(li);
}

function handleTaskCompletion(taskElement, checkbox) {
  if (checkbox.checked) {
    taskElement.classList.add('completed');
    
    // 70% chance to trigger a self-care prompt when a task is completed
    if (Math.random() < 0.7) {
      showSelfCarePrompt();
    }
  } else {
    taskElement.classList.remove('completed');
  }
}

function showSelfCarePrompt() {
  clearTimeout(toastTimeout);
  
  const randomPrompt = carePrompts[Math.floor(Math.random() * carePrompts.length)];
  toastMessage.textContent = randomPrompt;
  
  toast.classList.add('show');
  
  // Hide toast after 4 seconds
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
