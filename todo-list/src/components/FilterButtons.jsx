function FilterButtons({ filterBy, setFilterBy }) {
  return (
    <div className="colsetTest flex justify-center gap-2">
      <button
        className={filterBy === "all" ? "active" : ""}
        onClick={() => setFilterBy("all")}
      >
        All
      </button>
      <button
        className={filterBy === "active" ? "active" : ""}
        onClick={() => setFilterBy("active")}
      >
        Active
      </button>
      <button
        className={filterBy === "completed" ? "active" : ""}
        onClick={() => setFilterBy("completed")}
      >
        Done
      </button>
    </div>
  );
}

export default FilterButtons;
