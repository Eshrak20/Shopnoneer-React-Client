const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* loading-bars with teal color */}
        <span className="loading loading-bars loading-lg text-teal-500"></span>
       
      </div>
    </div>
  );
};

export default Spinner;
