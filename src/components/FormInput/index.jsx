import { useState } from "react";

export const FormInput = ({
  label,
  name,
  register,
  error,
  type = "text",
  className = "w-full",
  required = false,
  disabled = false,
  onChange: externalOnChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative w-full h-full">
      <input
        type={type}
        {...register(name, {

          onChange: (e) => {
            setHasValue(e.target.value.length > 0);
            if (externalOnChange) externalOnChange(e);
          },
        })}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        className={`${className} bg-white py-3 border text-black border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-transparent peer px-4  shadow-sm focus:outline-none focus:ring-2 transition-all ${
          error ? "border-red-500 focus:ring-red-400" : " focus:ring-blue-400"
        } ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-background"}`}
        {...props}
      />

      <label
        className={`absolute left-4 -foreground text-gray-500 transition-all duration-200 pointer-events-none ${
          isFocused || hasValue || disabled
            ? "text-xs -top-2 bg-white px-1"
            : "top-2 text-sm"
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
