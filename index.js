const formEl = document.querySelector('#todo-form')
const titleEl = document.querySelector('#title')

function listToTodoForm() {  
  formEl.addEventListener('submit', function(event) {
    event.preventDefault()

    const todo = {
      title: titleEl.value,
      completed: false
    }

    const options = {
        method: 'POST', 
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(todo)
      }
      fetch("http://localhost:3000/todos", options)
      .then(function(response) {
        return response.json()
      }).then(function(todo) {
        createToDo(todo)
      })
  })
}

function createTodo(todo) {
  
  const liEl = document.createElement('li')
  liEl.innerText = todo.title
   if (todo.completed) {
       liEl.style.color = "grey"
       liEl.style.textDecoration = "line-through"
   }

  const ulEl = document.querySelector('#todo-list')
  ulEl.append(liEl)
}

function createTodos(todos) {
  console.log(todos)
  for(const todo of todos) {
     createTodo(todo)
  }
}

function init() {
  listToTodoForm()
  fetch("http://localhost:3000/todos")
    .then(function(response) {
      return response.json()
    }).then(function(todos) {
      createTodos(todos)
    })
}

init()