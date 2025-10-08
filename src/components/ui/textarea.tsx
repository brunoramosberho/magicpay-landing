import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        data-slot="textarea"
        className={cn(
          "border-gray-300 placeholder:text-muted-foreground dark:bg-input/30 flex field-sizing-content min-h-32 w-full rounded-md border-2 bg-transparent px-3 py-2 text-base transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "hover:border-gray-400 focus:border-blue-500 focus-visible:border-blue-500",
          "aria-invalid:border-red-500 invalid:border-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
