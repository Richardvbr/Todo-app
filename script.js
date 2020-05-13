// Set main ul variable
const ul = document.querySelector('ul-todoList')

// Local storage
// Check if todos exists in local storage, if not --> create empty array
let todos = localStorage.getItem('items') ? 
JSON.parse(localStorage.getItem('items')) : []

// Local storage
// Set local storage todo items and store todo items in data variable
localStorage.setItem('items', JSON.stringify(todos))
const data = JSON.parse(localStorage.getItem('items'))

// Get and display current date
const currentDate = new Date();
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('currentDate').innerHTML = currentDate.toLocaleDateString('en-us', dateOptions);

// Main Functions
function addTodo(todoText) {
  todos.push(todoText);
  localStorage.setItem('items', JSON.stringify(todos))
  toggleClearBtn();
};

function deleteTodo(start) {
  todos.splice(start, 1);
  view.displayTodos();
  toggleClearBtn();
};

function toggleClearBtn() {
  if (todos.length !== 0) {
    document.getElementById('clearAllBtn').style.display = 'inline-block';
  }
  else {
    document.getElementById('clearAllBtn').style.display = 'none';
  }
}

// Prevent user to start to-do item with a space
document.body.onload = function preventSpace() {
  const inputEl = document.getElementById('addTodoTextInput');
  inputEl.addEventListener('keydown', function(e) {
      if (inputEl.value.length === 0) {
          if (e.keyCode === 32) {
              e.preventDefault();
          }
      }
  });
}

// Add item on enter
// If input is empty = prevent submit
// If input is valid = add to-do item, reset input field and display list
document.getElementById('addTodoTextInput').onkeydown = function(e){
  if(e.keyCode == 13){
    e.preventDefault();
    if (addTodoTextInput.value === '') {
      return false;
    }
    else {
      addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
    }
  }
};

// Button: Add todo
// If input is empty = prevent submit
// If input is valid = add to-do item, reset input field and display list
const addTodoBtn = document.getElementById('addTodoBtn');
const addTodoTextInput = document.getElementById('addTodoTextInput');
addTodoBtn.addEventListener('click', function() {
  if (addTodoTextInput.value === '') {
    return false;
  }
  else {
    addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  }
});

// Button: Clear All
const clearAllBtn = document.getElementById('clearAllBtn');
clearAllBtn.addEventListener('click', function() {
  todos = [];
  view.displayTodos();
  localStorage.clear();
  toggleClearBtn();
});

// Create li elements
let view = {
  displayTodos: function () {
    let todosUl = document.getElementById('ul-todoList');
    todosUl.innerHTML = '';
    for (let i = 0  ; i < todos.length; i++) {
      let todosLi = document.createElement('li');
      let todo = todos[i];
      todoTextLi = todo;
      todosLi.id = i;
      todosLi.textContent = todoTextLi;
      todosLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todosLi);
    }
  },
  // Create delete button element
  createDeleteButton: function() {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = '';
    deleteButton.className = 'deleteButton fas fa-times fa-lg';
    return deleteButton;
  },
  // Listen for clicks on delete button
  setUpEventListeners: function() {
    let myToDoList = document.querySelector('ul');
    myToDoList.addEventListener('click', function(e) {
      let elementClicked = e.target;

      // Delete corresponding to-do item when its delete button was pressed
      if (elementClicked.classList.contains('deleteButton')) {
        deleteTodo(parseInt(elementClicked.parentNode.id));
        // Remove item from local storage and updates local storage
        data.splice(elementClicked.parentNode.id, 1);
        localStorage.setItem('items', JSON.stringify(todos));
      }
    })
  }
};
view.setUpEventListeners();

// Loop over local storage
for (let i = 0; i < data.length; i++) {
  if(data === 0) {
    false;
  }
  else {
    document.getElementById('clearAllBtn').style.display = 'inline-block';
    view.displayTodos();
  }
};