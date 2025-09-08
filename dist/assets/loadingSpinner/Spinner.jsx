const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-10">
      <div className="flex flex-col items-center space-y-4">
        <p className="text-xl sm:text-2xl md:text-3xl text-teal-700 font-semibold animate-pulse">
          <span className="loading loading-spinner loading-lg text-teal-500"></span>
        </p>
      </div>
    </div>
  );
};

export default Spinner;
