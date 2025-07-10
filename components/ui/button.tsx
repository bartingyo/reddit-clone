import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const buttonVariants = cva("flex items-center justify-center cursor-pointer", {
  variants: {
    variant: {
      primary: "",
      secondary: "",
      plain: "bg-transparent hover:bg-[#DBE4E9] active:bg-[#bbc2c5]"
    },
    size: {
      sm: "",
      md: "h-10 px-4 rounded-full ",
      lg: ""
    },
    isIcon: {
      true: "data-[shape='circle']:size-10 data-[shape='circle']:px-0"
    }
  },
  defaultVariants: {
    variant: "plain",
    size: "md"
  }
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export default function Button({
  isIcon,
  variant,
  size,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, isIcon })}
      data-shape={isIcon ? "circle" : "pill"}
      {...buttonProps}
    />
  );
}
