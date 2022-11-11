// let todos = [];
const form = document.querySelector("#form")
const input = document.querySelector("#input")
const todoList = document.querySelector("#todo-list")
const clearAll = document.querySelector("#clear")
// chạy mỗi khi reload
window.onload = function () {
    showTodos();
}
//them todo
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valueInput = input.value;
    const localStore = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    // const newTodos = {
    //     name: valueInput,
    //     iscompleted: false,
    //     id: todos.length,
    // }; // khi k dùng localstorage
    const newTodos = {
        name: valueInput,
        iscompleted: false,
        id: localStore.length,
    };
    //them todo
    // todos.push(newTodos); cách này dùng khi khai báo bằng const
    // todos = [...todos, newTodos]; //khi khai báo bằng let và k dùng localstorage
    localStorage.setItem("todos", JSON.stringify([...localStore, newTodos]))
    showTodos();

    //clearr & input
    input.value = "";
})
//tạo ra hàm để render 
const showTodos = () => {
    //cách reset sau mỗi lần tạo todo
    const localStore = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    todoList.innerHTML = "";
    localStore.forEach((item) => {
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
    const localStore = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    const newlocalStore = localStore.filter((t) => t.id !== id)
    //lưu
    localStorage.setItem("todos", JSON.stringify(newlocalStore))
    showTodos();
}

//make completed
const handleCompleted = (id) => {
    const localStore = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    const newlocalStore = localStore.map(el => el.id === id ? { ...el, iscompleted: true } : el)

    //lưu 
    localStorage.setItem("todos", JSON.stringify(newlocalStore))
    showTodos();
}

//xóa tất cả
clearAll.addEventListener("click", () => {
    localStorage.removeItem("todos");
    showTodos();
})