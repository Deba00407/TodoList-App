import React, { useState } from 'react'
import { useTodoContext } from '../contexts/TodoContext'
import { v4 as uuidv4 } from 'uuid'

function TodoForm() {
    const [todo, setTodo] = useState('')
    const { addTodo } = useTodoContext()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!todo) return
        addTodo({
            id: uuidv4(),
            content: todo,
            isCompleted: false,
            isEditing: false
        })
        setTodo('') 
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center p-4 rounded-lg shadow-md w-full md:w-[80%] lg:w-[60%] mx-auto"
        >
            <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                onMouseOver={(e) => (e.target.style.width = '60%')}
                onMouseOut={(e) => (e.target.style.width = '40%')}
                className="w-full px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out duration-300"
                placeholder="Type here..."
            />
            <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add Todo
            </button>
        </form>

    )
}

export default TodoForm