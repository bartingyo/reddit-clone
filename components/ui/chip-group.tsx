import { cn } from "@/lib/utils";
import {
  ChangeEvent,
  ComponentProps,
  createContext,
  ReactNode,
  useContext
} from "react";

type ChipGroupContextType = {
  isChecked: (value: string) => boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ChipGroupContext = createContext<ChipGroupContextType | undefined>(
  undefined
);

export const useChipGroup = () => useContext(ChipGroupContext);

type Props = {
  children: ReactNode;
  className?: string;
  values?: string[];
  onChange?: (values: string[]) => void;
};

export function ChipGroup({
  children,
  className,
  values = [],
  onChange
}: Props) {
  const isChecked = (value: string) => values.includes(value);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const itemChanged = event.currentTarget.value;

      onChange(
        isChecked(itemChanged)
          ? values.filter((item) => item !== itemChanged)
          : [...values, itemChanged]
      );
    }
  };

  return (
    <ChipGroupContext.Provider value={{ isChecked, onChange: handleChange }}>
      <div
        data-slot="chip-group"
        className={cn(
          "flex flex-wrap items-center gap-2",
          "has-data-[slot=chip-sub-group]:block",
          className
        )}
      >
        {children}
      </div>
    </ChipGroupContext.Provider>
  );
}

export function ChipSubGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="chip-sub-group"
      className={cn("mb-6", className)}
      {...props}
    />
  );
}

export function ChipSubGroupContent({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="chip-sub-group-content"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  );
}

export function ChipGroupTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <div
      data-slot="chip-group-title"
      className={cn(
        "flex items-center gap-2",
        "text-sm font-bold text-[#333D42]",
        "mb-1",
        "[&_svg]:size-5",
        className
      )}
      {...props}
    />
  );
}
