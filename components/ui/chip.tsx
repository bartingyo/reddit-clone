import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const chipVariants = cva(
  cn(
    "border",
    "h-8 px-2.5 rounded-full",
    "inline-flex items-center",
    "text-[#000000] text-xs font-semibold"
  ),
  {
    variants: {
      variant: {
        default: cn("border-transparent bg-[#E5EBEE]"),
        bordered: cn(" border-[#00000033]")
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

type Props = VariantProps<typeof chipVariants> & ComponentProps<"span">;

export default function Chip({
  variant,
  children,
  className,
  ...props
}: Props) {
  return (
    <span className={cn(chipVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}
