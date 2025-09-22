export const sortTasks = (tasks, sortBy) => {
  return [...tasks]
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
