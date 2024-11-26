const FilterSection = ({ sortOption, setSortOption }) => {
  return (
    <div className="flex flex-col w-full max-w-screen-lg px-4 py-6 bg-white shadow-md rounded-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="">
          <label className="text-teal-600 font-medium p-2">Sort By</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-lg p-2 bg-white text-teal-600 w-full mt-2"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="priceLowToHigh">Price: Low to High</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
