function FilterButtons({ filterBy, setFilterBy }) {

  const options = [
    { buttonFilter: "all", label: "All" },
    { buttonFilter: "active", label: "Active" },
    { buttonFilter: "completed", label: "Done" },
  ];

  const getClass = (buttonFilter) => 
    `${filterBy === buttonFilter ? "text-yellow-300" : ""} cursor-pointer`;

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
