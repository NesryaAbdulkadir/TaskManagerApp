const form = document.getElementById("form");
const input = document.getElementById("input");
const priority = document.getElementById("priority");
const status = document.getElementById("status");
const todoTasks = document.getElementById("todo-tasks");
const doingTasks = document.getElementById("doing-tasks");
const doneTasks = document.getElementById("done-tasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to add drag-and-drop listeners
const addDragnDropListeners = () => {
  const draggableItems = document.querySelectorAll(".task");

  draggableItems.forEach((task) => {
    task.addEventListener("dragstart", handleDragStart);
  });

  [todoTasks, doingTasks, doneTasks].forEach((container) => {
    container.addEventListener("dragenter", () => handleDragEnter(container));
    container.addEventListener("dragover", handleDragOver);
    container.addEventListener("dragleave", () => handleDragLeave(container));
    container.addEventListener("drop", handleContainerDrop);
  });
};

const slugify = (text) => {
  return text.toString().toLowerCase().replace(/\s+/g, "-");
};

// Function to render tasks
const renderTasks = () => {
  todoTasks.innerHTML = "";
  doingTasks.innerHTML = "";
  doneTasks.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskHtml = `<li class="task" id="${index}" draggable="true">
    <div class="task-header">
    <h3 class="task-title">${task.title}</h3>
    <span id="delete" class="delete">x</span>  
    </div>
        <p class="task-priority ${slugify(task.priority)}"> ${task.priority}</p>
    </li>`;

    if (task.status === "Todo") {
      todoTasks.innerHTML += taskHtml;
    } else if (task.status === "Doing") {
      doingTasks.innerHTML += taskHtml;
    } else if (task.status === "Done") {
      doneTasks.innerHTML += taskHtml;
    }
  });

  // Call to add drag-and-drop listeners
  addDragnDropListeners();
};

// Function to handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = {
    title: input.value,
    priority: priority.value,
    status: status.value,
  };
  if (input.value === "") {
    alert("Please enter a task");
    return;
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  input.value = "";
  priority.value = "Low priority";
  status.value = "Todo";
});

// Drag and drop event handlers
const handleDragStart = (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDragEnter = (container) => {
  container.classList.add("drag-over");
};

const handleDragLeave = (container) => {
  container.classList.remove("drag-over");
};

const handleContainerDrop = (e) => {
  e.preventDefault();
  const index = e.dataTransfer.getData("text/plain");
  const task = tasks[index];
  const container = e.target.closest("ul");

  if (task) {
    const newStatus = e.target.closest("div").querySelector("h2").innerText;
    task.status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
  container.classList.remove("drag-over");
};

// Initial rendering of tasks
renderTasks();
