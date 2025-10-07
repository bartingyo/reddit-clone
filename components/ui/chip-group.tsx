// 1. create context

import { cn } from "@/lib/utils";
import { ChangeEvent, createContext, ReactNode, useContext } from "react";

type ChipGroupContextType = {
  isChecked: (value: string) => boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ChipGroupContext = createContext<ChipGroupContextType | undefined>(
  undefined
);
// 2. provide provider
// 3. use context
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
      <div className={cn("flex flex-wrap items-center gap-2", className)}>
        {children}
      </div>
    </ChipGroupContext.Provider>
  );
}
