export const FormSubmitButton = ({
  children = "Submit",
  isLoading = false,
  disabled = false,
  className = "w-full",
  variant = "primary", // "primary", "secondary", "danger"
  size = "md", // "sm", "md", "lg"
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    orange: "bg-orange-400 hover:bg-orange-700 text-white focus:ring-red-500",
  };

  const sizeClasses = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-4",
    lg: "py-4 px-6 text-lg",
  };

  const disabledClasses =
    "bg-gray-400 cursor-not-allowed text-gray-600 hover:bg-gray-400";

  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className={`${className} ${baseClasses} ${sizeClasses[size]} ${
        isLoading || disabled ? disabledClasses : variantClasses[variant]
      }`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};
