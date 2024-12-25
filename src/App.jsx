import React, { useState, useEffect } from 'react'
import { TodoContextProvider } from './contexts/TodoContext'
import TodoForm from './components/TodoForm'

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos')
    return storedTodos ? JSON.parse(storedTodos) : []
  })

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (todo) => {
    setTodos([...todos, todo])
  }

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    )
  }
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    )
  }

  const updateTodo = (id, content) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, content } : todo
      )
    )
  }

  return (
    <TodoContextProvider value={{ todos, addTodo, removeTodo, toggleTodo, editTodo }}>
      <div className="container mx-auto p-4">
        <TodoForm />
        {todos.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex items-center justify-between p-4 ${todo.isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  } text-black rounded-lg shadow-md w-full md:w-[80%] lg:w-[60%] mx-auto h-auto transition-all ease-in-out duration-300 animate-slide-in`}
              >
                {todo.isEditing ? (
                  <input
                    type="text"
                    value={todo.content}
                    onChange={(e) => updateTodo(todo.id, e.target.value)}
                    className="flex-1 px-2 py-1 mr-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <span className="flex-1 break-words">{todo.content}</span>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="px-2 py-1 text-white bg-gray-200 rounded-lg hover:scale-110"
                  >
                    ❌
                  </button>
                  <button
                    onClick={() => editTodo(todo.id)}
                    className="px-2 py-1 text-white bg-gray-200 rounded-lg hover:scale-110"
                  >
                    {todo.isEditing ? '📁 ' : '✏️'}
                  </button>
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="px-2 py-1 text-white bg-gray-200 rounded-lg hover:scale-110"
                  >
                    {!todo.isCompleted ? '✅' : '↩️'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 text-center text-gray-500">No todos added yet</div>
        )}
      </div>
    </TodoContextProvider>
  )
}

export default App