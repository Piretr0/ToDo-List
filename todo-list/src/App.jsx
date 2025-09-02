import { useEffect, useState } from 'react'

import './App.css'

function App() {

  const [tasks, setTasks] = useState(() => {
    const load = localStorage.getItem("tasks")
    return load ? JSON.parse(load) : []
  })

  const [text, setText] = useState("")

  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState("")

  useEffect(()=> {
    localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks]
  )


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

  const startEditing = (id, currentText) => {
    setEditingId(id)
    setEditingText(currentText)
  }

  const saveEditing = (id, changedText) => {
    setTasks(tasks.map(x => x.id === id ? { ...x, text: changedText } : x))
    setEditingId(null)
    setEditingText("")
  }

  

  return (
    <>
     <div>
      <div>
        <h1 className=' text-2xl'>To do list</h1>
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
          <li key={x.id} className='grid grid-cols-[1rem_auto_2rem] justify-stretch border p-2 rounded'>

            <label className="flex items-center gap-2" >
              <input
                type='checkbox'
                checked={x.done}
                onChange={() => toggleTask(x.id)}
              />
            </label>

            {editingId === x.id ? (
              <input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={(e) => saveEditing(x.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEditing(x.id, e.target.value)
                  if (e.key === "Escape") setEditingId(null)
                }}
                autoFocus
                className="border rounded px-1"
              />
            ) : (
              <span
                className={x.done ? "line-through text-gray-400 cursor-pointer" : "cursor-pointer"}
                onClick={() => startEditing(x.id, x.text)}
              >
                {x.text}
              </span>
            )}
            
            <button className="border rounded px-1" onClick={() => removeTask(x.id)}>X</button>

          </li>
        ))}
      </ul>
     </div>
     </div>
    </>
  )
}

export default App
