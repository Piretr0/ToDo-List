import { useState } from "react";
import { addTask } from "../utils/taskActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

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
    <form 
      className="w-full" 
      onSubmit={handleSubmit}
    >
      <div className="flex items-center mb-2 gap-2">
      {/* Pole na nazwę */}
      <input
        value={taskName}
        placeholder="Name task"
        onChange={(e) => setTaskName(e.target.value)}
        className="flex-1 border p-1 rounded min-w-0"
        required
      />

      {/* Picker daty */}
      <div className="w-[95px]">
        <DatePicker
          selected={date ? new Date(date) : null}
          onChange={(value) => setDate(format(value, "yyyy-MM-dd"))} // format z date-fns
          dateFormat="yyyy-MM-dd"
          className="w-full border p-1 rounded"
          placeholderText="Select date"
          popperPlacement="bottom-end"
          popperClassName="z-50"
        />
      </div>
    </div>
      <div className="flex full gap-2">
        <textarea
          placeholder="Description ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 border p-1 rounded"
        />
        <button className="border px-3 rounded bg-blue-500 text-white ">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddTask;
