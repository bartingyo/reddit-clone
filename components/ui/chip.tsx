import XCircleSolid from "@/components/icons/x-circle-solid";
import { useChipGroup } from "@/components/ui/chip-group";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { ChangeEvent, ComponentProps } from "react";

const chipVariants = cva(
  cn(
    "group",
    "border",
    "h-8 px-2.5 rounded-full",
    "inline-flex items-center gap-1",
    "text-[#000000] text-xs font-semibold",
    "has-focus-visible:outline has-focus-visible:outline-blue-700",
    "data-[slot=chip-selectable]:cursor-pointer",
    "data-[slot=chip-selectable]:select-none",
    "has-checked:has-data-[slot=chip-delete-icon]:pr-0"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border-transparent bg-[#E5EBEE]",
          "data-[slot=chip-selectable]:hover:bg-[#DBE4E9] data-[slot=chip-selectable]:active:bg-[#bbc2c8]",
          "data-[slot=chip-selectable]:has-checked:bg-[#C9D7DE]"
        ),
        bordered: cn("border-[#00000033]")
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
  value,
  checked,
  onChange,
  ...props
}: ChipSelectableProps) {
  const context = useChipGroup();

  const isChecked = checked || context?.isChecked(value?.toString() || "");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    context?.onChange(event);
    onChange?.(event);
  };

  return (
    <label data-slot="chip-selectable" className={cn(className)}>
      {children}
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </label>
  );
}

export function ChipDeleteIcon() {
  return (
    <span
      data-slot="chip-delete-icon"
      className={cn(
        "size-8 rounded-full",
        "hidden group-has-checked:flex items-center justify-center",
        "hover:bg-[#DBE4E9] active:bg-[#bbc2c8]"
      )}
    >
      <XCircleSolid className="size-5" />
    </span>
  );
}
