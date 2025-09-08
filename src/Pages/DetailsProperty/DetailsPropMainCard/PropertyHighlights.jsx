const PropertyHighlights = ({ highlights }) => {
  return (
    <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <h4 className="font-semibold text-gray-800 mb-3">প্রধান বৈশিষ্ট্য</h4>
      <ul className="space-y-2">
        {highlights?.map((highlight, index) => (
          <li key={index} className="flex items-start">
            <span className="text-teal-500 mr-2 mt-0.5">•</span>
            <span className="text-gray-700">{highlight}</span>
          </li>
        )) || (
          <li className="text-gray-500">
            কোনো বৈশিষ্ট্য তালিকাভুক্ত করা হয়নি
          </li>
        )}
      </ul>
    </div>
  );
};

export default PropertyHighlights;