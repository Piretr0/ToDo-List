function SortSelect({ sortBy, setSortBy }) {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="border p-1 rounded"
    >
      <option value="added">Added</option>
      <option value="deadline">Deadline</option>
    </select>
  );
}

export default SortSelect;
