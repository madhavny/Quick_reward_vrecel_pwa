import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Controller } from "react-hook-form"
import { useState } from "react"

export function FormSelect({
  label,
  name,
  control,
  error,
  options = [],
  required = false,
  disabled = false,
  className = "w-full",
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value || ""}
            onValueChange={(val) => field.onChange(val)}
            disabled={disabled}
          >
            <SelectTrigger
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`${className}  bg-white py-3 border focus:ring-blue-500 focus:border-transparent peer appearance-none px-4 pb-2 text-black border-section-background rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all
                ${error ? "border-red-500 focus:ring-red-400" : "border-section-background focus:ring-blue-400"}
                ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-background"}`}
            >
              <SelectValue />
            </SelectTrigger>

            <label
              className={`absolute left-4 text-gray-500 transition-all duration-200 pointer-events-none
                ${isFocused || field.value
                  ? "text-xs  -top-2 bg-white px-1"
                  : "top-2 text-sm"}`}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <SelectContent className="rounded-lg border shadow-lg">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  )
}
