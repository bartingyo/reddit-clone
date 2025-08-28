"use client";

import ExclamationCircleOutline from "@/components/icons/exclamation-circle-outline";
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
        "flex items-center gap-2",
        "focus-within:outline",
        "cursor-text",
        "has-[input[aria-invalid=true]]:outline has-[input[aria-invalid=true]]:outline-destructive",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full",
          label && "focus-within:translate-y-2",
          "group-has-[input:not(:placeholder-shown)]:translate-y-2"
        )}
      >
        {label && (
          <span
            id={labelId}
            className={cn(
              "absolute text-[#5C6C74] text-base",
              "group-focus-within:-translate-y-4 group-focus-within:text-xs",
              "group-has-[input:not(:placeholder-shown)]:-translate-y-4 group-has-[input:not(:placeholder-shown)]:text-xs",
              "duration-300"
            )}
          >
            {label}
          </span>
        )}
        <input
          type={type}
          data-slot="input"
          data-testid="test-input"
          className={cn("outline-none w-full")}
          placeholder=""
          aria-labelledby={label && labelId}
          {...props}
        />
      </div>

      <ExclamationCircleOutline
        className={cn(
          "hidden",
          "group-has-[input[aria-invalid=true]]:block ",
          "group-has-[input[aria-invalid=true]]:text-destructive"
        )}
      />
    </Label>
  );
}

export { Input };
