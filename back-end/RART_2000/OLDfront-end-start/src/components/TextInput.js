import React from "react";

function TextInput({ label, type = "text", placeholder, value, onChange, name }) {
  return (
    <div className="m-3">
      {label && <label className="block text-white text-lg font-semibold m-1">{label}</label>}
      <input
        className="h-5 w-96 p-5 text-lg border rounded-sm focus:outline-none focus:ring focus:ring-blue-500"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextInput;
