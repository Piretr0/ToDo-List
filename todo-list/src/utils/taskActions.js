// utils/taskActions.js

// Przełączanie statusu "done"
export const toggleTask = (tasks, id) => {
  return tasks.map((x) => (x.id === id ? { ...x, done: !x.done } : x));
};

// Usuwanie konkretnego taska
export const removeTask = (tasks, id) => {
  return tasks.filter((x) => x.id !== id);
};

// Usuwanie wszystkich ukończonych
export const removeAllCheckedTask = (tasks) => {
  return tasks.filter((x) => !x.done);
};

// Zapisywanie edytowanego taska
export const saveEditing = (tasks, id, changedText) => {
  return tasks.map((x) =>
    x.id === id ? { ...x, taskName: changedText } : x
  );
};

// Dodawanie nowego taska
export const addTask = (tasks, task) => {
  return [
    {
      id: Date.now(),
      ...task,
      done: false,
    },
    ...tasks,
  ];
};
