import { useEffect, useState, useRef } from 'react'

import './App.css'

function App() {

  const [tasks, setTasks] = useState(() => {
    const load = localStorage.getItem("tasks")
    return load ? JSON.parse(load) : []
  })

  const [taskName, setTaskName] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")

  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState("")

  const [sortBy, setSortBy] = useState("added");
  const [isRemoving, setIsRemoving] = useState(false);

  const [filter, setFilter] = useState("all");

  useEffect(()=> {
    localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks]
  )

  const addTask = (e) => {
    e.preventDefault()
    if (!taskName.trim()) return
    setTasks([{
      id: Date.now(),
      taskName,
      description: description ? description : "",
      done: false,
      date: date ? date : "none"
    },
    ...tasks
  ])
  setTaskName("")
  setDate("")
  setDescription("")
  }
  const toggleTask = (id) => {
    setTasks(tasks.map(x => x.id === id ? { ...x, done: !x.done } : x))
  }

  const removeTask = (id) => {
    setTasks(tasks.filter(x => x.id !== id))
  }

  const removeAllCheckedTask = () => {
    setTasks(tasks.filter(x => x.done !== true))
  }

  const startEditing = (id, currentText) => {
    setEditingId(id)
    setEditingText(currentText)
  }

  const saveEditing = (id, changedText) => {
    if (isRemoving) return;
    setTasks(tasks.map(x => x.id === id ? { ...x, taskName: changedText } : x))
    setEditingId(null)
    setEditingText("")
  }

  const sortTasks = (tasksList, sortBy) => {
  return [...tasksList]
  .sort((a, b) => {
    if (sortBy === "added") {
      return b.id - a.id;
    } else if (sortBy === "deadline") {
      const aDate = a.date === "none" ? null : a.date;
      const bDate = b.date === "none" ? null : b.date;
      if (!aDate) return 1;
      if (!bDate) return -1;
      return new Date(aDate) - new Date(bDate);
    }
    return 0;
  })
  .sort((a, b) => a.done - b.done);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setTasks(prevTasks => sortTasks(prevTasks, newSort));
  };

  const filteredTasks = tasks.filter(x => {
    if (filter === "active") return !x.done;
    if (filter === "completed") return x.done;
    return true; // all
  });
  const sotredTasks = sortTasks(filteredTasks, sortBy);

  const DivColsetTest = () => {
    return (
      <div className="colsetTest flex gap-2">
        <button
          className={`chip ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`chip ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`chip ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Done
        </button>
      </div>
    );
  };


  const FormTaskAdd = ()=>{
    return (
      <div>
        <form onSubmit={addTask}>
          <div className='flex mb-2 gap-2'>
            <input 
              value = {taskName}
              placeholder='Name task'
              onChange={(e) => setTaskName(e.target.value)}
              className='w-full border p-1 rounded'
              required
            />
            <input 
              type='date'
              value = {date}
              onChange={(e) => setDate(e.target.value)}
              className='border p-0 rounded w-[110px] '
            />
          </div>
          <div className='flex full'>
            <textarea 
              placeholder='Description ...' 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full border p-1 rounded'
              />
            <button className="border px-3 py-1 rounded bg-blue-500 text-white ml-2"> Add </button>
          </div>
          
        </form>
      </div>
    )
  }

  const TaskMap = ()=>{
    return(
      <div>
        <ul className='flex flex-col'>
          {sotredTasks.map((x) => (
            <li key={x.id} className='flex border p-2 rounded'>
                {/* <div>
                  <details className='mr-2'>
                    <summary className='cursor-pointer select-none'></summary>
                    <p className='border p-2 rounded '>{x.description}</p>
                  </details>
                </div>  */}

                {/* Task name */}
                <div className="flex flex-1 justify-center items-center mr-4">
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
                        onMouseDown={() => setIsRemoving(true)}
                        onClick={() => {
                          removeTask(x.id);
                          setEditingId(null);
                          setIsRemoving(false);
                        }}
                      >
                        X
                        <span className="absolute left-1/2 -translate-x-1/2 -top-7 bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition">
                          Remove
                        </span>
                      </button>
                    </div>
                  
                  ) : (
                    <div className="items-center">
                      <span
                      className={x.done ? " w-full line-through text-gray-400 cursor-pointer" : "cursor-pointer"}
                      onClick={() => startEditing(x.id, x.taskName)}
                      >
                        {x.taskName}
                      </span>
                    </div>
                  )}
                </div>

                {/* Deadline and checkbox */}
                <div className='flex items-center'>
                {/* Deadline */}
                  <div className="">
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
                  </div>
                {/* Checkbox */}
                  <div className='ml-4'>
                    <label>
                      <input
                        type='checkbox'
                        checked={x.done}
                        onChange={() => toggleTask(x.id)}
                      />
                    </label>
                  </div>
                </div>

            </li>
          ))}
        </ul>
      </div>
    )
  }


  

  return (
    <>
     <div>
        <DivColsetTest/>
        <div className='flex flex-row justify-center mb-4'>
          <h1 className=' text-2xl mr-3'>To do list</h1>
          <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
            <option value="added">Added</option>
            <option value="deadline">Deadline</option>
          </select>
        </div>
        <FormTaskAdd/>
      
        <TaskMap/>
      
      <div>
          <button className="border rounded px-2" onClick={() => removeAllCheckedTask()}>Remove complited</button>
      </div>

     </div>
    </>
  )
}

export default App
