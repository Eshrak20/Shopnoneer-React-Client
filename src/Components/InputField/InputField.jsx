const InputField = ({ placeholder, type, value, onChange }) => {
  return (
    <div className="input-container py-2">
      <input
        type={type}
        value={value ?? ''}
        onChange={onChange}
        placeholder=""
        className="input-field"
      />
      <label className="input-label">{placeholder}</label>
    </div>
  );
};

export default InputField;
