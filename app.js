const input = document.getElementById("task-input");
const button = document.getElementById("add-btn");
const list = document.getElementById("task-list");

button.addEventListener("click", () => {
  const taskText = input.value;

  if (taskText === "") return;

  const li = document.createElement("li");

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  checkbox.addEventListener("change", () => {
    li.classList.toggle("done");
  });

  // tekst
  const span = document.createElement("span");
  span.textContent = taskText;

  // przycisk usuwania
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Usuń";

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  list.appendChild(li);

  input.value = "";
});