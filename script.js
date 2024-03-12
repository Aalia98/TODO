const todos = [];
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const check = document.querySelector(".check");
const itemsLeft = document.querySelector("#items-left");

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let todo = {
    id: Date.now(),
    todo: todoInput.value,
    isCompleted: false,
  };
  todos.push(todo);
  todo = todoInput.value = "";
  console.log(todos);
  showTodo();
});

function showTodo() {
  let html = "";
  todos.map((item) => {
    html += `<div class="todo-li" onclick="toggleCompleted(${item.id})">
        <div class="${
          item.isCompleted ? "check active-check" : "check"
        }"><img src="./images/icon-check.svg" alt=""></div>
        <p class=${item.isCompleted ? "complete" : "ptag"}>${item.todo}</p>
        <button class="close"><img src="./images/icon-cross.svg" alt=""></button>
      </div>`;
  });
  document.querySelector(".todo-con").innerHTML = html;
  countItemsLeft();
}

function toggleCompleted(id) {
  const todo = todos.find((item) => item.id === id);
  todo.isCompleted = !todo.isCompleted;
  showTodo();
}

function countItemsLeft() {
  let cnt = 0;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].isCompleted == false) {
      cnt++;
    }
  }

  itemsLeft.innerHTML = cnt;
}
