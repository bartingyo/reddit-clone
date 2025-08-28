"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ComponentProps, useId } from "react";

type Props = {
  label?: string;
} & ComponentProps<"input">;

function Input({ className, type, label, ...props }: Props) {
  const labelId = useId();

  return (
    <Label
      className={cn(
        "group",
        "bg-[#E5EBEE] hover:bg-[#DBE4E9]",
        "h-14 px-4 rounded-[20px]",
        "flex items-center",
        "focus-within:outline",
        "cursor-text",
        className
      )}
    >
      <div
        className={cn("relative w-full", label && "focus-within:translate-y-2")}
      >
        {label && (
          <span
            id={labelId}
            className={cn(
              "absolute text-[#5C6C74] text-base",
              "group-focus-within:-translate-y-4 group-focus-within:text-xs",
              "duration-300"
            )}
          >
            {label}
          </span>
        )}
        <input
          type={type}
          data-slot="input"
          className={cn("outline-none w-full")}
          aria-labelledby={label && labelId}
          {...props}
        />
      </div>
    </Label>
  );
}

export { Input };
