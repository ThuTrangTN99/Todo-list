let todos = [];
let getLocalStorageData = localStorage.getItem("New todo");
const form = document.querySelector("#form")
const input = document.querySelector("#input")
const todoList = document.querySelector("#todo-list")
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valueInput = input.value;
    const newTodos = {
        name: valueInput,
        iscompleted: false,
        id: todos.length,
    };
    //them todo
    // todos.push(newTodos); cách này dùng khi khai báo bằng const
    todos = [...todos, newTodos]; //khi khai báo bằng let
    showTodos();

    //clearr & input
    input.value = "";
})
//tạo ra hàm để render 
const showTodos = () => {
    //cách reset sau mỗi lần tạo todo
    todoList.innerHTML = "";
    todos.forEach((item) => {
        const divTodo = document.createElement("div")
        divTodo.innerHTML = `
        <p class="todo">${item.name}</p>
        <p class="completed">${item.iscompleted ? "Completed" : "Not Completed"}</p>
        <p class = "not-completed" onclick="handleCompleted(${item.id})">Make Completed</p>
        <p class = "delete" onclick = "handleDelete(${item.id})"><i class="fa-solid fa-trash"></i></p>
        `;
        divTodo.classList.add("todo-item")
        todoList.appendChild(divTodo);
    })
}

// xóa todo

const handleDelete = (id) => {
    todos = todos.filter((t) => t.id !== id)
    showTodos();
}

//make completed
const handleCompleted = (id) => {
    todos = todos.map(el => el.id === id ? { ...el, iscompleted: !el.iscompleted } : el)
    showTodos();
}