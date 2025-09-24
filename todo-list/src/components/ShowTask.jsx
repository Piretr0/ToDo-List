import { useState, useRef, useEffect } from "react";

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
  const [text, setText] = useState("");
  const spanRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      // mierzymy szerokość spana z tekstem i ustawiamy width inputa
      const width = spanRef.current.offsetWidth + 20; // +20px padding/margin
      inputRef.current.style.width = width + "px";
    }
  }, [editingText]);

const [expandedId, setExpandedId] = useState(null);
 const toggleDescription = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <div className="flex flex-col">
        {tasks.map((x) => (
          <div className="flex flex-col border rounded p-2" key={x.id}>
            <div className="flex flex-row">
              <div 
                className="flex flex-1 justify-center items-center mr-4 cursor-pointer"
                onClick={(e) => toggleDescription(x.id)}
              >
                {editingId === x.id ? (
                  <div className="flex flex-1 items-center">
                    <div className="inline-block relative">
                      <span
                        ref={spanRef}
                        className="absolute invisible whitespace-pre text-base font-sans"
                      >
                        {editingText || " "} {/* zawsze coś, żeby width było mierzalne */}
                      </span>
                      <input
                        ref={inputRef}
                        value={editingText}
                        onChange={(e) =>setEditingText(e.target.value)}
                        onBlur={(e) => saveEditing(x.id, editingText)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEditing(x.id, editingText);
                          if (e.key === "Escape") setEditingText("");
                        }}
                        autoFocus
                        className="border rounded text-base px-1 w-full min-w-[120px]"
                      />
                    </div>
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
                      
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing(x.id, x.taskName)}}
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
              
            </div>
            {expandedId === x.id && (
            <div className="mt-2 text-sm text-left">
              {x.description? <><h1 className="text-lg">Description:</h1> {x.description}</> : "No description"}
            </div>
          )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowTask;
