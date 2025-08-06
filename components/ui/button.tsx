import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const buttonVariants = cva(
  cn(
    "flex items-center justify-center cursor-pointer rounded-full",
    "data-[shape='circle']:px-0"
  ),
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        plain: "bg-transparent hover:bg-[#DBE4E9] active:bg-[#bbc2c5]"
      },
      size: {
        sm: cn("h-8 px-3", "data-[shape='circle']:size-8"),
        md: cn("h-10 px-4", "data-[shape='circle']:size-10"),
        lg: ""
      }
    },
    defaultVariants: {
      variant: "plain",
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
