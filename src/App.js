import React, { useEffect } from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
import Loader from './Loader'

const AddTodo = React.lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('./Todo/AddTodo'))
      }, 100)
    })
)

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/DenysSepta/demo/posts')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2000)
      })
  }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false
        }
      ])
    )
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className='wrapper'>
        <h1>React ToDo </h1>
        

        <React.Suspense fallback={<Loader />}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <h1>No todos!</h1>
        )}
      </div>
    </Context.Provider>
  )
}

export default App
