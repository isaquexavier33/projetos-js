// Variables
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const deleteBtn = document.querySelector("#delete-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// Functions
function saveTodo(text, done = 0, save = 1) {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="material-symbols-outlined">done</i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="material-symbols-outlined">edit</i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="material-symbols-outlined">delete</i>';
  todo.appendChild(deleteBtn);

  // Local Storage

  if (done) {
    todo.classList.add("done");
  }

  if (save) {
    saveTodoInLocalStorage({ text, done: 0 });
  }

  todoList.appendChild(todo);

  todoInput.value = "";
}

function toggleForms() {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
}

function updateTodo(text) {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;

      updateTodoInLocalStorage(oldInputValue, text);
    }
  });
}

function searchTodo(todoTitle) {
  const todos = Array.from(document.querySelectorAll(".todo"));

  if (todoTitle == "") {
    todos.forEach((todo) => {
      todo.style = "";
    });
    return;
  }

  todos
    .filter((todo) => {
      if (
        !todo.firstChild.textContent
          .toLowerCase()
          .includes(todoTitle.toLowerCase())
      ) {
        return todo;
      }
    })
    .forEach((todo) => {
      todo.style = "display: none;";
    });
}

function deleteTodo(todoTitle) {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    if (todo.firstChild.textContent.toLowerCase() == todoTitle.toLowerCase()) {
      todo.remove();
    }
  });
}

function filterTodos(filterValue) {
  console.log(filterValue);
  const todos = document.querySelectorAll(".todo");

  switch (filterValue) {
    case "all":
      todos.forEach((todo) => (todo.style = "display: flex;"));
      break;

    case "done":
      todos.forEach((todo) => {
        todo.style = todo.classList.contains("done")
          ? "display: flex;"
          : "display: none;";
      });

      break;
    case "todo":
      todos.forEach((todo) => {
        todo.style = todo.classList.contains("done")
          ? "display: none;"
          : "display: flex;";
      });

      break;
  }
}

// Local Storage Management

function getTodosInLocalStorage() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  return todos;
}

function loadTodos() {
  const todos = getTodosInLocalStorage();

  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0);
  });
}

function saveTodoInLocalStorage(todo) {
  const todos = getTodosInLocalStorage();

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodoStatusInLocalStorage(todoText) {
  const todos = getTodosInLocalStorage();

  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodoInLocalStorage(todoOldText, todoNewText) {
  const todos = getTodosInLocalStorage();

  todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodoInLocalStorage(todoText) {
  const todos = getTodosInLocalStorage();

  const filteredTodos = todos.filter(
    (todo) => todo.text.toLowerCase() != todoText.toLowerCase()
  );

  localStorage.setItem("todos", JSON.stringify(filteredTodos));
}

// Events
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (event) => {
  const targetEl = event.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (targetEl.classList.contains("finish-todo")) {
    if (filterBtn.options[filterBtn.selectedIndex].value == "todo") {
      setTimeout(() => (parentEl.style = "display: none;"), 500);
    }

    parentEl.classList.toggle("done");
    updateTodoStatusInLocalStorage(todoTitle);
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }

  if (targetEl.classList.contains("remove-todo")) {
    parentEl.remove();
    removeTodoInLocalStorage(todoTitle);
  }
});

cancelEditBtn.addEventListener("click", (event) => {
  event.preventDefault();

  toggleForms();
});

editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
    updateTodoInLocalStorage(oldInputValue, editInput.value);
  }

  toggleForms();
});

searchInput.addEventListener("input", (event) => {
  searchTodo(searchInput.value);
});

deleteBtn.addEventListener("click", (event) => {
  event.preventDefault();

  deleteTodo(searchInput.value);
  removeTodoInLocalStorage(searchInput.value);
  searchInput.value = "";
  searchTodo(searchInput.value);
});

filterBtn.addEventListener("change", (event) => {
  const select = event.target;
  const option = select.options[select.selectedIndex].value;
  filterTodos(option);
});

loadTodos();
