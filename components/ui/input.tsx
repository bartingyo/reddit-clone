import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <Label
      className={cn(
        "group",
        "bg-[#E5EBEE] hover:bg-[#DBE4E9]",
        "h-14 px-4 rounded-[20px]",
        "flex items-center",
        "focus-within:outline"
      )}
    >
      <div className={cn("focus-within:translate-y-2")}>
        <span
          className={cn(
            "absolute text-[#5C6C74] text-base",
            "group-focus-within:-translate-y-4 group-focus-within:text-xs",
            "duration-300"
          )}
        >
          Label
        </span>
        <input
          type={type}
          data-slot="input"
          className={cn("outline-none", className)}
          {...props}
        />
      </div>
    </Label>
  );
}

export { Input };
