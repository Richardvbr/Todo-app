// Get and display current date
const ul = document.querySelector('ul-todoList')
const currentDate = new Date();
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('currentDate').innerHTML = currentDate.toLocaleDateString('en-us', dateOptions);

// Contains all functions
const todoList = {
  todos: [],
  // Adds a todo item as an object instead of just text and displays updated array
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText
    });
  },
  // Deletes a todo item and displays updated array
  deleteTodo: function(start) {
    this.todos.splice(start, 1);
    view.displayTodos();
  },
}

// Button: Add todo
const addTodoBtn = document.getElementById('addTodoBtn');
const addTodoTextInput = document.getElementById('addTodoTextInput');
addTodoBtn.addEventListener('click', function(e){
  if (addTodoTextInput.value === '' || e.keyCode == 32) {
    return false;
  }
  else {
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  }
});

// Add item on enter
document.getElementById('addTodoTextInput').onkeydown = function(e){
  if(e.keyCode == 13){
    e.preventDefault();
    if (addTodoTextInput.value === '') {
      return false;
    }
    else {
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
    }
  }
};

// Button: Clear All
const clearAllBtn = document.getElementById('clearAllBtn');
clearAllBtn.addEventListener('click', function () {
  todoList.todos = [];
  view.displayTodos();
});

let view = {
  displayTodos: function () {
    let todosUl = document.getElementById('ul-todoList');
    todosUl.innerHTML = '';
    for (let i = 0  ; i < todoList.todos.length; i++) {
      let todosLi = document.createElement('li');
      let todo = todoList.todos[i];
      todoTextLi = todo.todoText;
      todosLi.id = i;
      todosLi.textContent = todoTextLi;
      todosLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todosLi);
    }
  },
  createDeleteButton: function() {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = '';
    deleteButton.className = 'deleteButton fas fa-times fa-lg';
    return deleteButton;
  },
  setUpEventListeners: function() {
    let myToDoList = document.querySelector('ul');
    myToDoList.addEventListener('click', function(e) {
      let elementClicked = e.target;

      // Check for delete button
      if (elementClicked.className === 'deleteButton fas fa-times fa-lg') {
        todoList.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    })
  }
};
view.setUpEventListeners();

// Prevent user to start to-do item with space
const preventSpaceStart = document.getElementById('addTodoTextInput');
preventSpaceStart.addEventListener('keyup', function() {
  if (preventSpaceStart.value.charCodeAt(0) === 32)
    preventSpaceStart.value = preventSpaceStart.value.slice(1);
});