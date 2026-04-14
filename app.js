const input = document.getElementById("task-input");
const button = document.getElementById("add-btn");
const list = document.getElementById("task-list");

// wczytaj zapisane zadania
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// funkcja do renderowania
function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.done) {
      span.classList.add("done");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Usuń";

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

// zapis do localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// dodawanie zadania
button.addEventListener("click", () => {
  const text = input.value;

  if (text === "") return;

  tasks.push({
    text: text,
    done: false
  });

  saveTasks();
  renderTasks();

  input.value = "";
});

const toggleBtn = document.getElementById("theme-toggle");

// załaduj zapisany tryb
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "Dark Mode";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "Light Mode";
  }
});

// start
renderTasks();