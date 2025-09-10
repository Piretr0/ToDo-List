import { useEffect, useState } from 'react'

import './App.css'

function App() {

  const [tasks, setTasks] = useState(() => {
    const load = localStorage.getItem("tasks")
    return load ? JSON.parse(load) : []
  })

  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState("")

  const [sortBy, setSortBy] = useState(() => {
    const load = localStorage.getItem("sortBy")
    return load ? JSON.parse(load) : []
  })
  const [filterBy, setFilterBy] = useState(() => {
    const load = localStorage.getItem("filterBy")
    return load ? JSON.parse(load) : []
  })
  const [filteredTasks, setFilteredTasks] = useState(tasks)


  useEffect(()=> {
    localStorage.setItem("tasks",JSON.stringify(tasks))
    localStorage.setItem("sortBy",JSON.stringify(sortBy))
    localStorage.setItem("filterBy",JSON.stringify(filterBy))
  },[tasks, sortBy, filterBy]
  )

  useEffect(() => {
    handleFilterChange(filterBy);
  }, [tasks, filterBy, sortBy]);

  const toggleTask = (id) => {
    setTasks(tasks.map(x => x.id === id ? { ...x, done: !x.done } : x))
    setFilteredTasks(tasks.map(x => x.id === id ? { ...x, done: !x.done } : x))
    handleFilterChange(filterBy);
  }

  const removeTask = (id) => {
    console.log("Removing task with id:", id);
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
    setFilteredTasks(prevTasks => sortTasks(prevTasks, newSort));
  };

  const handleFilterChange = (newFilter, baseTasks = tasks) => {
    setFilterBy(newFilter);

    let filtered = [];
    if (newFilter === "all") {
      filtered = baseTasks;
    } else if (newFilter === "active") {
      filtered = baseTasks.filter(task => !task.done);
    } else if (newFilter === "completed") {
      filtered = baseTasks.filter(task => task.done);
    }

    setFilteredTasks(sortTasks(filtered, sortBy));
  };


  const DivColsetTest = () => {
    return (
      <div className="colsetTest flex justify-center gap-2">
        <button onClick={() => handleFilterChange("all")}>All</button>
        <button onClick={() => handleFilterChange("active")}>Active</button>
        <button onClick={() => handleFilterChange("completed")}>Done</button>
      </div>
    );
  };


  const FormTaskAdd = ()=>{

  const [taskName, setTaskName] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")

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
  handleFilterChange(filterBy);
  setTaskName("")
  setDate("")
  setDescription("")
  }
    
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
          {filteredTasks.map((x) => (
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
                        onMouseDown={(e) => e.preventDefault()} 
                        onClick={() => {
                          removeTask(x.id);
                          setEditingId(null);
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
                      className={x.done ? " w-full line-through text-gray-400 cursor-pointer" : "cursor-pointer max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[600px] xl:max-w-[800px] 2xl:max-w-[1000px]"}
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
                          x.done
                            ? "text-gray-500" 
                            : new Date(x.date) < new Date(new Date().toISOString().slice(0, 10))
                              ? "text-red-500" 
                              : "text-green-500" 
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
        
        <div className='flex flex-row justify-center mb-4 mt-4'>
          <h1 className=' text-2xl mr-3'>To do list</h1>
          <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
            <option value="added">Added</option>
            <option value="deadline">Deadline</option>
          </select>
        </div>
        <FormTaskAdd/>
        <DivColsetTest/>
        <TaskMap/>
      
        {tasks.some(x => x.done) && (
          <div>
            <button 
              className="border rounded px-2" 
              onClick={removeAllCheckedTask}
            >
              Remove completed
            </button>
          </div>
      )}

     </div>
    </>
  )
}

export default App
