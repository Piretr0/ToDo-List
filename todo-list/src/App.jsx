import { useState } from 'react'

import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState("")

  const addTask = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setTasks([{
      id: Date.now(),
      text: text,
      done: false
    },
    ...tasks
  ])
  setText("")
  }
  const toggleTask = (id) => {
    setTasks(tasks.map(x => x.id === id ? { ...x, done: !x.done } : x))
  }

  const removeTask = (id) => {
    setTasks(tasks.filter(x => x.id !== id))
  }
  

  return (
    <>
     <div>
      <h1>To do list</h1>
      <form onSubmit={addTask} >
        <input 
          value = {text}
          onChange={(e) => setText(e.target.value)}
        />
        <button> Add </button>
      </form>
     </div>
     <div>
      <ul>
        {tasks.map((x) => (
          <li key={x.id} className='flex justify-between items-center border p-2 rounded'>
            <label className="flex items-center gap-2" >
              <input
                type='checkbox'
                checked={x.done}
                onChange={() => toggleTask(x.id)}
              />
              <span className={x.done ? "line-through text-gray-400" : ""}>
                {x.text}
              </span>
            </label>
            <button onClick={() => removeTask(x.id)}>x</button>
          </li>
        ))}
      </ul>
     </div>
    </>
  )
}

export default App
