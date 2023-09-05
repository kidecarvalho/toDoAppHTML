const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

// Load todos from localStorage
const todos = JSON.parse(localStorage.getItem('todos')) || []

// Add existing todos to the frontend
todos.forEach(todo => addTodo(todo))

// Prevent the form from reloading
form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
})

// Add new todos to the list
function addTodo(todo) {
    let todoText = input.value.trim()

    if (todo) {
        todoText = todo.text
    }

    if (todoText) {
        const todoEl = document.createElement('li')
        if (todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        })

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            todoEl.remove()
            updateLS()
        })

        todosUL.appendChild(todoEl)

        input.value = ''

        updateLS()
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll('li')
    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}
