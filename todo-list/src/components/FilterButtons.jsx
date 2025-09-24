function FilterButtons({ filterBy, setFilterBy }) {

  const options = [
    { buttonFilter: "all", label: "all" },
    { buttonFilter: "active", label: "active" },
    { buttonFilter: "completed", label: "done" },
  ];

  const getClass = (value) =>
    `cursor-pointer capitalize ${
      filterBy === value ? "text-yellow-300" : "text-white"
    }`;
    
  return (
    <div className="colsetTest flex justify-center gap-2">
       {options.map((opt) => (
        <div
          key={opt.buttonFilter}
          className={getClass(opt.buttonFilter)}
          onClick={() => setFilterBy(opt.buttonFilter)}
        >
          {opt.label}
        </div>
      ))}
    </div>
  );
}

export default FilterButtons;
