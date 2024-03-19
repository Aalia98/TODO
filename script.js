let todos = [];
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const check = document.querySelector(".check");
const itemsLeft = document.querySelector("#items-left");
const completed = document.querySelector(".completed");
const clear = document.querySelector(".clear");
const all = document.querySelector(".all");
const active = document.querySelector(".active");
const darkLightModeBtn = document.querySelector(".dark-light");

let lightMode = false;
let activeLink = ".all";

darkLightModeBtn.addEventListener("click", function() {
  let list = document.querySelectorAll(".todo-li");
  let pList = document.querySelectorAll(".ptag");
  if(lightMode) {
    document.getElementById("image").src = "./images/icon-sun.svg";
    document.body.style.backgroundColor = "hsl(235, 21%, 11%)"
    document.querySelector(".banner").style.backgroundImage = "url('./images/bg-desktop-dark.jpg')";
    document.getElementById("todo-input").style.background = "hsl(235, 24%, 19%)";
    document.getElementById("todo-input").style.color = "#fff"
    document.querySelector(".info").style.background = "hsl(235, 24%, 19%)"
    for(let i = 0; i < list.length; i++) {
      list[i].style.backgroundColor = "hsl(235, 24%, 19%)";
    }
    for(let i = 0; i < pList.length; i++) {
      pList[i].style.color = "#fff";
    }
    lightMode = false;
  }else {
    document.getElementById("image").src = "./images/icon-moon.svg";
    document.body.style.backgroundColor = "#fff";
    document.querySelector(".banner").style.backgroundImage = "url('./images/bg-desktop-light.jpg')"
    document.getElementById("todo-input").style.background = "#fff";
    document.getElementById("todo-input").style.color = "#000";
    document.querySelector(".info").style.background = "#fff"
    for(let i = 0; i < list.length; i++) {
      list[i].style.backgroundColor = "#fff";
    }
    for(let i = 0; i < pList.length; i++) {
      pList[i].style.color = "#000";
    }
    lightMode = true;
  }
})

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let todo = {
    id: Date.now(),
    todo: todoInput.value,
    isCompleted: false,
  };
  todos.push(todo);
  todo = todoInput.value = "";
  showTodo(todos);
});

completed.addEventListener("click", function() {
  document.querySelector(activeLink).style.color = "hsl(234, 11%, 52%)"
  activeLink = ".completed"
  const val = todos.filter((item) => item.isCompleted == true);
  showTodo(val);
})

clear.addEventListener("click", function() {
  const val = todos.filter((item) => item.isCompleted == false);
  todos = val;
  showTodo(todos)
})

active.addEventListener("click", function() {
  document.querySelector(activeLink).style.color = "hsl(234, 11%, 52%)"
  activeLink = ".active"
  const val = todos.filter((item) => item.isCompleted == false);
  showTodo(val);
})

all.addEventListener("click", function() {
  document.querySelector(activeLink).style.color = "hsl(234, 11%, 52%)"
  activeLink = ".all"
  showTodo(todos);
})

function showTodo(items) {
  document.querySelector(activeLink).style.color = "hsl(220, 98%, 61%)"
  let html = "";
  items.map((item) => {
    html += `<div style="background-color: ${lightMode ? '#fff' : 'hsl(235, 24%, 19%)'}" class="todo-li" onclick="toggleCompleted(${item.id})">
        <div class="${
          item.isCompleted ? "check active-check" : "check"
        }"><img src="./images/icon-check.svg" alt=""></div>
        <p style="color: ${lightMode ? '#000' : '#fff'}" class=${item.isCompleted ? "complete" : "ptag"}>${item.todo}</p>
        <button class="close" onclick="deleteTodo(${item.id})"><img src="./images/icon-cross.svg" alt=""></button>
      </div>`;
  });
  document.querySelector(".todo-con").innerHTML = html;
  countItemsLeft();
}

function deleteTodo(id) {
  const findTodo = todos.findIndex((item) => item.id == id)
  const val = todos.splice(findTodo, 1);
  showTodo(todos)
}

function toggleCompleted(id) {
  const todo = todos.find((item) => item.id === id);
  todo.isCompleted = !todo.isCompleted;
  showTodo(todos);
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
