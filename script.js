document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Function to save tasks to localStorage
  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Function to render tasks
  const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;

      li.innerHTML = `
                <input type="checkbox" class="checkbox" ${
                  task.completed ? "checked" : ""
                }>
                <span class="task-text">${task.text}</span>
                <i class="fas fa-trash delete-btn"></i>
            `;

      // Handle checkbox change
      const checkbox = li.querySelector(".checkbox");
      checkbox.addEventListener("change", () => {
        tasks[index].completed = checkbox.checked;
        li.classList.toggle("completed");
        saveTasks();
      });

      // Handle delete
      const deleteBtn = li.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      taskList.appendChild(li);
    });
  };

  // Add new task
  const addTask = () => {
    const text = taskInput.value.trim();
    if (text) {
      tasks.push({ text, completed: false });
      taskInput.value = "";
      saveTasks();
      renderTasks();
    }
  };

  // Event listeners
  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  // Initial render
  renderTasks();
});
