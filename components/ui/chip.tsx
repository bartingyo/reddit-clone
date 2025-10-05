import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const chipVariants = cva(
  cn(
    "border",
    "h-8 px-2.5 rounded-full",
    "inline-flex items-center",
    "text-[#000000] text-xs font-semibold",
    "has-focus-visible:outline has-focus-visible:outline-blue-700",
    "data-[slot=chip-selectable]:cursor-pointer",
    "data-[slot=chip-selectable]:select-none"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border-transparent bg-[#E5EBEE]",
          "data-[slot=chip-selectable]:hover:bg-[#DBE4E9] data-[slot=chip-selectable]:active:bg-[#bbc2c8]",
          "has-checked:data-[slot=chip-selectable]:bg-[#C9D7DE]"
        ),
        bordered: cn(" border-[#00000033]")
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

type ChipProps = VariantProps<typeof chipVariants> &
  ComponentProps<"span"> & { asChild?: boolean };

export default function Chip({
  variant,
  children,
  className,
  asChild,
  ...props
}: ChipProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="chip"
      className={cn(chipVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

type ChipSelectableProps = Pick<
  ComponentProps<"label">,
  "children" | "className"
> &
  Omit<ComponentProps<"input">, "children" | "className">;

export function ChipSelectable({
  children,
  className,
  ...props
}: ChipSelectableProps) {
  return (
    <label data-slot="chip-selectable" className={cn("", className)}>
      <span>{children}</span>
      <input type="checkbox" className="sr-only" {...props} />
    </label>
  );
}
