import { useEffect, useState } from "react";
import "./App.css";

import AddTask from "./components/AddTask";
import ShowTask from "./components/ShowTask";
import FilterButtons from "./components/FilterButtons";
import SortSelect from "./components/SortSelect";

import { sortTasks } from "./utils/sortTasks";
import { filterTasks } from "./utils/filterTasks";
import {
  toggleTask,
  removeTask,
  removeAllCheckedTask,
  saveEditing,
} from "./utils/taskActions";

import AutoWidthInput from "./components/AutoWidthInput";

function App() {
  const [tasks, setTasks] = useState(() => {
    const load = localStorage.getItem("tasks");
    return load ? JSON.parse(load) : [];
  });

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [sortBy, setSortBy] = useState(() => {
    const savedSort = localStorage.getItem("sortBy");
    return savedSort ? JSON.parse(savedSort) : "added";
  });
  const [filterBy, setFilterBy] = useState(() => {
    const savedFilter = localStorage.getItem("filterBy");
    return savedFilter ? JSON.parse(savedFilter) : "all";
  });


  useEffect(() => {
    localStorage.setItem("tasks", tasks ? JSON.stringify(tasks) : []);
    localStorage.setItem("sortBy", JSON.stringify(sortBy));
    localStorage.setItem("filterBy", JSON.stringify(filterBy));
  }, [tasks, sortBy, filterBy]);

  const filteredTasks = sortTasks(filterTasks(tasks, filterBy), sortBy);

  return (
    <div className="m-1 container">
      <div className="flex w-full flex-row justify-center mb-4 mt-4">
        <h1 className="text-2xl mr-3">To do list</h1>
        <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <AddTask tasks={tasks} setTasks={setTasks} />
      <FilterButtons filterBy={filterBy} setFilterBy={setFilterBy} />

      <ShowTask
        tasks={filteredTasks}
        toggleTask={(id) => setTasks(toggleTask(tasks, id))}
        removeTask={(id) => setTasks(removeTask(tasks, id))}
        startEditing={(id, currentText) => {
          setEditingId(id);
          setEditingText(currentText);
        }}
        saveEditing={(id, changedText) => {
          setTasks(saveEditing(tasks, id, changedText));
          setEditingId(null);
          setEditingText("");
        }}
        editingId={editingId}
        editingText={editingText}
        setEditingText={setEditingText}
      />

      {tasks.some((x) => x.done) && (
        <div>
          <button
            className="border rounded px-2"
            onClick={() => setTasks(removeAllCheckedTask(tasks))}
          >
            Remove completed
          </button>
          
        </div>
      )}
    </div>
  );
}

export default App;
