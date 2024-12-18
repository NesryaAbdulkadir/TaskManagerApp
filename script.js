const form = document.getElementById("form");
const input = document.getElementById("input");
const priority = document.getElementById("priority");
const status = document.getElementById("status");
const todoTasks = document.getElementById("todo-tasks");
const doingTasks = document.getElementById("doing-tasks");
const doneTasks = document.getElementById("done-tasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const renderTasks = () => {
  todoTasks.innerHTML = "";
  doingTasks.innerHTML = "";
  doneTasks.innerHTML = "";
  tasks.forEach((task) => {
    const taskHtml = `<li class="task" draggable="true">
        <h3 class="task-title">${task.title}</h3>
        <p class="task-priority ${task.priority}"> ${task.priority}</p>
    </li>`;

    if (task.status === "Todo") {
      todoTasks.innerHTML += taskHtml;
    } else if (task.status === "Doing") {
      doingTasks.innerHTML += taskHtml;
    } else if (task.status === "Done") {
      doneTasks.innerHTML += taskHtml;
    }
  });
};
renderTasks();

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
  priority.value = "low";
  status.value = "Todo";
});
