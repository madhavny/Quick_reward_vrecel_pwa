import React from "react"
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert"
import {
  CheckCircle2Icon,
  AlertCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  X,
} from "lucide-react"

const variantConfig = {
  success: {
    icon: <CheckCircle2Icon className="text-green-600" />,
    titleClass: "text-green-700",
    descriptionClass: "text-green-600",
  },
  error: {
    icon: <AlertCircleIcon className="text-red-600" />,
    titleClass: "text-red-700",
    descriptionClass: "text-red-600",
  },
  warning: {
    icon: <AlertTriangleIcon className="text-yellow-600" />,
    titleClass: "text-yellow-700",
    descriptionClass: "text-yellow-600",
  },
  info: {
    icon: <InfoIcon className="text-blue-600" />,
    titleClass: "text-blue-700",
    descriptionClass: "text-blue-600",
  },
}

export function CustomAlert({ type = "info", title, description, onClose }) {
  const config = variantConfig[type]

  return (
    <Alert
      variant={type === "error" ? "destructive" : "default"}
      className="relative pr-10" // extra padding for close button
    >
      {config.icon}
      <AlertTitle className={config.titleClass}>{title}</AlertTitle>
      {description && (
        <AlertDescription className={config.descriptionClass}>
          {description}
        </AlertDescription>
      )}

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </Alert>
  )
}
