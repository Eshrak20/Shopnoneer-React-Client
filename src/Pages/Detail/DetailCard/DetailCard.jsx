import { Link } from "react-router-dom";
const DetailCard = ({ sortedProjects }) => {
  return (
    <>
      <div className="flex flex-col mb-10 w-full">
        <div className="grid grid-cols-1 p-5 md:p-0 md:grid-cols-2 gap-6 ">
          {sortedProjects.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-md p-4 bg-white transition-transform duration-300 transform"
            >
              <div className="flex flex-col">
                <Link to={`/detailsPropMain/${item.id}`}>
                  <img
                    src={
                      item.images[0] || "https://via.placeholder.com/350x200"
                    }
                    alt="Project"
                    className="rounded-lg w-[450px] h-[270px] md:w-[720px] md:h-[450px]"
                  />
                </Link>

                <Link
                  to={`/detailsPropMain/${item.id}`}
                  className="text-xl md:text-2xl font-bold text-teal-600 mt-2"
                >
                  {item.title}
                </Link>

                <h4 className="text-sm md:text-base font-medium text-gray-700 mt-1 mb-3">
                  Road {item.housing}, Block {item.block}, Plot {item.plot}
                </h4>
                <p className="hidden md:block text-gray-600 text-base my-2 line-clamp-5 overflow-hidden">
                  {item.description?.length > 135
                    ? `${item.description
                        .substring(0, 135)
                        .trim()
                        .replace(/[,;:.!?]$/, "")}...`
                    : item.description || ""}
                </p>

                {/* Additional Property Details with Icons */}
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-teal-600">
                      BDT{" "}
                      {item.total_price
                        ? item.total_price.toLocaleString()
                        : "0"}
                    </h1>
                    <div className="mt-4 flex space-x-2">
                      <a
                        href={`mailto:${item.owner_email}`}
                        className="bg-teal-500 text-white text-sm text-center px-4 py-2 md:text-lg hover:bg-teal-600 transition duration-300 shadow-lg rounded-md"
                      >
                        Email
                      </a>
                      <button className="bg-teal-500 text-white text-sm text-center px-4 py-2 md:text-lg hover:bg-teal-600 transition duration-300 shadow-lg rounded-md">
                        Call
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailCard;
