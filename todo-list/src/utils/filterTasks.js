export const filterTasks = (tasks, filterBy) => {
  if (filterBy === "active") return tasks.filter((t) => !t.done);
  if (filterBy === "completed") return tasks.filter((t) => t.done);
  return tasks; // all
};
