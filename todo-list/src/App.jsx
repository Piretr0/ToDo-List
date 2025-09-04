import { useEffect, useState } from 'react'

import './App.css'

function App() {

  const [tasks, setTasks] = useState(() => {
    const load = localStorage.getItem("tasks")
    return load ? JSON.parse(load) : []
  })

  const [text, setText] = useState("")
  const [date, setDate] = useState("")

  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState("")

  const [sortBy, setSortBy] = useState("added");




  useEffect(()=> {
    localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks]
  )


  const addTask = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setTasks([{
      id: Date.now(),
      text,
      done: false,
      date
    },
    ...tasks
  ])
  setText("")
  setDate("")
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

   const removeAllCheckedTask = () => {
    setTasks(tasks.filter(x => x.done !== true))
  }

  const sortTasks = (tasksList, sortBy) => {
  return [...tasksList].sort((a, b) => {
    if (sortBy === "added") {
      return b.id - a.id;
    } else if (sortBy === "deadline") {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setTasks(prevTasks => sortTasks(prevTasks, newSort));
  };
  

  return (
    <>
     <div>
      
      <div>
        <div className='flex flex-row justify-center mb-4'>
        <h1 className=' text-2xl'>To do list</h1>
        <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
        <option value="added">Added</option>
        <option value="deadline">Deadline</option>
      </select>
      </div>
        <form onSubmit={addTask} className=' flex '>
          <input 
            value = {text}
            onChange={(e) => setText(e.target.value)}
            className='w-full border p-1 rounded'
          />
          <input 
            type='date'
            value = {date}
            onChange={(e) => setDate(e.target.value)}
            className='border p-0 rounded w-[110px] '
          />
          <button className="border px-3 py-1 rounded bg-blue-500 text-white ml-2"> Add </button>
        </form>
      </div>
     
      <div>
        <ul>
          {tasks.map((x) => (
            <li key={x.id} className='flex items-center border p-2 rounded'>

              <label className=" flex items-center mr-2" >
                <input
                  type='checkbox'
                  checked={x.done}
                  onChange={() => toggleTask(x.id)}
                />
              </label>
              
              {editingId === x.id ? (
                <div className="flex flex-1 items-center">
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={(e) => saveEditing(x.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEditing(x.id, e.target.value)
                      if (e.key === "Escape") setEditingId(null)
                    }}
                    autoFocus
                    className="border rounded px-1 w-full min-w-[120px]"
                  />
                  <button 
                    className="border rounded px-1 ml-2 relative group" 
                    onClick={() => removeTask(x.id)}
                  >
                    X
                    <span className="absolute left-1/2 -translate-x-1/2 -top-7 bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition">
                      Remove
                    </span>
                  </button>
                </div>
                
              ) : (
                <div className="flex-1">
                  <span
                  className={x.done ? " w-full line-through text-gray-400 cursor-pointer" : "cursor-pointer"}
                  onClick={() => startEditing(x.id, x.text)}
                >
                  {x.text}
                </span>
                </div>
              )}
              
              { x.date && (
                <span
                  className={`text-sm ml-2 ${
                    new Date(x.date) < new Date(new Date().toISOString().slice(0, 10)) && !x.done
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  (deadline: <br /> {x.date})
                </span>
              )}
              
              
              

            </li>
          ))}
        </ul>
      </div>
      <div>
          <button className="border rounded px-2" onClick={() => removeAllCheckedTask()}>Remove complited</button>
      </div>

     </div>
    </>
  )
}

export default App
