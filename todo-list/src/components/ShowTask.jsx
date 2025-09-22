function ShowTask({
  tasks,
  toggleTask,
  removeTask,
  startEditing,
  saveEditing,
  editingId,
  editingText,
  setEditingText,
}) {
  return (
    <div>
      <ul className="flex flex-col">
        {tasks.map((x) => (
          <li key={x.id} className="flex border p-2 rounded">
            <div className="flex flex-1 justify-center items-center mr-4">
              {editingId === x.id ? (
                <div className="flex flex-1 items-center">
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={(e) => saveEditing(x.id, editingText)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEditing(x.id, editingText);
                      if (e.key === "Escape") setEditingText("");
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
                <div className="items-center">
                  <span
                    className={
                      x.done
                        ? "w-full line-through text-gray-400 cursor-pointer"
                        : "cursor-pointer"
                    }
                    onClick={() => startEditing(x.id, x.taskName)}
                  >
                    {x.taskName}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center">
              {/* Deadline */}
              <div>
                {x.date && (
                  <span
                    className={`text-sm ml-2 ${
                      x.done
                        ? "text-gray-500"
                        : new Date(x.date) <
                          new Date(new Date().toISOString().slice(0, 10))
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    (deadline: <br /> {x.date})
                  </span>
                )}
              </div>
              {/* Checkbox */}
              <div className="ml-4">
                <label>
                  <input
                    type="checkbox"
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
  );
}

export default ShowTask;
