import { Link } from "react-router-dom";

const DetailCard = ({ sortedProjects }) => {
  return (
    <div className="flex flex-col mb-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
        {sortedProjects.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-lg p-6 bg-white transition-transform duration-300 transform"
          >
            <Link to={`/detailsPropMain/${item.id}`}>
              <img
                src={item.images[0] || "https://via.placeholder.com/350x200"}
                alt="Project"
                className="rounded-lg w-full h-[250px] md:h-[350px] object-cover"
              />
            </Link>

            <Link
              to={`/detailsPropMain/${item.id}`}
              className="text-xl font-semibold text-teal-600 mt-4 block hover:text-teal-700"
            >
              {item.title}
            </Link>

            <h4 className="text-sm font-medium text-gray-700 mt-1">
              Road {item.housing}, Block {item.block}, Plot {item.plot}
            </h4>

            <p className="text-gray-600 text-base my-2 line-clamp-5 overflow-hidden">
              {item.description?.length > 135
                ? `${item.description.substring(0, 135).trim()}...`
                : item.description || "No description available."}
            </p>

            <div className="flex justify-between items-center mt-6">
              <h1 className="text-lg font-semibold text-teal-600">
                BDT{" "}
                {item.total_price
                  ? item.total_price.toLocaleString()
                  : "0"}
              </h1>

              <div className="flex space-x-2">
                <a
                  href={`mailto:${item.owner_email}`}
                  className="bg-teal-500 text-white text-sm px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300"
                >
                  Email
                </a>
                <button className="bg-teal-500 text-white text-sm px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300">
                  Call
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailCard;
