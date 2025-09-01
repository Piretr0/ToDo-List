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
      {tasks.map((x) => (
        <div key={x.id}>
          <input
            type='checkbox'
            checked={x.done}
            onChange={() => toggleTask(x.id)}
          />
          {x.text}
          <button onClick={() => removeTask(x.id)}>x</button>
        </div>
      ))}
     </div>
    </>
  )
}

export default App
