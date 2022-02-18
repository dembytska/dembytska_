const classNames = {
    TODO_ITEM: 'todo-container',
    TODO_CHECKBOX: 'todo-checkbox',
    TODO_TEXT: 'todo-text',
    TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = [];
let id = 0;
document.addEventListener("DOMContentLoaded", function () {
  todos = getTodosFromLocalStorage() || [];
  id = getIdFromLocalStorage();
  render();
});

class Todo {
    constructor() {
        this.id = id++;
        this.text = this.getText();
        this.checked = false;
    }
    getText() {
        return prompt('Enter a Todo task:')
    }
}

{
    /*
        <li>
            <input type = "checkbox" >
            <button > delete </button> 
            <span > text </span> 
            </li>
*/
}

function newTodo() {
    //alert('New TODO button clicked!')
    // get text

    // create li
    //create checkbox
    //create button
    //create span

    //append to list
    //update counts

    const todo = new Todo();
    todos.push(todo);
    render();
}

function render() {
    list.innerHTML = "";
    todos.map((todo) => renderTodo(todo)).forEach((todo) => list.appendChild(todo));
    itemCountSpan.textContent = todos.length;
    uncheckedCountSpan.textContent = todos.filter((todo) => !todo.checked).length;
    if (todos.length === 0)id = 0;
        saveToLocalStorage();
}

function renderTodo(todo) {
    const li = document.createElement("li");
    li.className = classNames.TODO_ITEM;
    li.innerHTML = `
      <input type="checkbox" class="${classNames.TODO_CHECKBOX}" onchange="changeTodo(${todo.id})"${todo.checked ? "checked" : ""}>
      <button class="${classNames.TODO_DELETE}" onclick="deleteTodo(${todo.id})">delete</button>
      <span class="${classNames.TODO_TEXT}">${todo.text}</span>`;
    return li;
}

function deleteTodo(id) {
    //find todo to del
    //del
    //update counts
    console.log('from deleteTodo')
    todos = todos.filter(todo => todo.id !== id)
    render();
}

function changeTodo(id) {
    todos = todos.map(todo => todo.id === id ? {id: todo.id, text: todo.text, checked: !todo.checked} : todo);

    /*for(let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos[i].checked = !todos[i].checked;
            break;
        }
    }*/
    uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("id", id);
}
  
function getTodosFromLocalStorage() {
    const rawTodos = localStorage.getItem("todos");
    const todosfromlocal = JSON.parse(rawTodos);
    return todosfromlocal;
}
  
function getIdFromLocalStorage() {
    const rawId = localStorage.getItem("id");
    const idFromLocal = JSON.parse(rawId);
    return idFromLocal;
}
  