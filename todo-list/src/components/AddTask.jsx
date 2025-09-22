import { useState } from "react";
import { addTask } from "../utils/taskActions";

function AddTask({ tasks, setTasks }) {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    setTasks(
      addTask(tasks, {
        taskName,
        description,
        date: date || "none",
      })
    );

    setTaskName("");
    setDate("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex mb-2 gap-2">
        <input
          value={taskName}
          placeholder="Name task"
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full border p-1 rounded"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-0 rounded w-[110px]"
        />
      </div>
      <div className="flex full">
        <textarea
          placeholder="Description ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-1 rounded"
        />
        <button className="border px-3 py-1 rounded bg-blue-500 text-white ml-2">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddTask;
