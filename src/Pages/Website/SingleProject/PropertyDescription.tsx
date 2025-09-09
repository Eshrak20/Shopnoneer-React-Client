interface Description {
  description?: string;
}
const PropertyDescription: React.FC<Description> = ({ description }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">সামগ্রিক ধারণা</h3>
      <p className="text-gray-700 text-sm md:text-base">{description || "বর্ণনা উপলব্ধ নেই।"}</p>
    </div>
  );
};

export default PropertyDescription;
