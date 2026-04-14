const input = document.getElementById("task-input");
const button = document.getElementById("add-btn");
const list = document.getElementById("task-list");

// =====================
// TASKS (LOCAL STORAGE)
// =====================

// wczytaj zapisane zadania
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// zapis do localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// render listy
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

// start listy
renderTasks();


// =====================
// DARK MODE
// =====================

const toggleBtn = document.getElementById("theme-toggle");

// ustaw UI (tekst + zapis)
function updateThemeUI() {
  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.textContent = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
}

// wczytaj zapisany tryb
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// ustaw tekst przy starcie
updateThemeUI();

// przełączanie trybu
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  updateThemeUI();
});