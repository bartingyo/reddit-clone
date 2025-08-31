"use client";

import ExclamationCircleOutline from "@/components/icons/exclamation-circle-outline";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ComponentProps, useId } from "react";

type Props = {
  label?: string;
} & ComponentProps<"textarea">;

function Textarea({ className, label, required, rows, ...props }: Props) {
  const labelId = useId();

  return (
    <Label
      className={cn(
        "group",
        "bg-[#E5EBEE] hover:bg-[#DBE4E9]",
        "min-h-14 p-4 rounded-[20px]",
        "flex items-center gap-2",
        "focus-within:outline",
        "cursor-text",
        "has-[textarea[aria-invalid=true]]:outline has-[textarea[aria-invalid=true]]:outline-destructive",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full flex",
          label &&
            "focus-within:translate-y-2 group-has-[textarea:not(:placeholder-shown)]:translate-y-2"
        )}
      >
        {label && (
          <span
            id={labelId}
            className={cn(
              "absolute text-[#5C6C74] text-base",
              "group-focus-within:-translate-y-4 group-focus-within:text-xs",
              "group-has-[textarea:not(:placeholder-shown)]:-translate-y-4 group-has-[textarea:not(:placeholder-shown)]:text-xs",
              "duration-300"
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </span>
        )}
        <textarea
          data-slot="textarea"
          data-testid="test-textarea"
          className={cn(
            "outline-none w-full resize-none",
            !rows && "field-sizing-content"
          )}
          placeholder=""
          required={required}
          rows={rows}
          aria-labelledby={label && labelId}
          {...props}
        />
      </div>

      <ExclamationCircleOutline
        className={cn(
          "hidden",
          "group-has-[textarea[aria-invalid=true]]:block ",
          "group-has-[textarea[aria-invalid=true]]:text-destructive"
        )}
      />
    </Label>
  );
}

export { Textarea };
