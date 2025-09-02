import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const buttonVariants = cva(
  cn(
    "flex items-center justify-center cursor-pointer rounded-full font-semibold",
    "data-[shape='circle']:px-0 disabled:bg-[#f3f3f3] disabled:text-[#b7b7b7]"
  ),
  {
    variants: {
      variant: {
        primary:
          "text-[#ffffff] bg-[#0A449B] hover:bg-[#0A2F6C] active:bg-[#09285c]",
        secondary: "bg-[#E5EBEE] hover:bg-[#DBE4E9] active:bg-[#bbc2c5]",
        plain: "bg-transparent hover:bg-[#DBE4E9] active:bg-[#bbc2c5]"
      },
      size: {
        sm: cn("h-8 px-3", "data-[shape='circle']:size-8"),
        md: cn("h-10 px-4", "data-[shape='circle']:size-10"),
        lg: cn("h-12 px-3.5", "data-[shape='circle']:size-12")
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    isIcon?: boolean;
  };

export default function Button({
  isIcon = false,
  variant,
  className,
  size,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      data-shape={isIcon ? "circle" : "pill"}
      {...buttonProps}
    />
  );
}
