import Chip, { ChipDeleteIcon, ChipSelectable } from "@/components/ui/chip";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Design System/Chip",
  component: Chip
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof Chip>;

export const Variants = {
  render: () => {
    return (
      <div className="flex items-center gap-2">
        <Chip>Default</Chip>
        <Chip variant={"bordered"}>Bordered</Chip>
      </div>
    );
  }
} satisfies Story;

export const Selectable = {
  render: () => {
    return (
      <div className="flex items-center gap-2">
        <Chip asChild>
          <ChipSelectable>Default</ChipSelectable>
        </Chip>
        <Chip asChild variant={"bordered"}>
          <ChipSelectable>Bordered</ChipSelectable>
        </Chip>
      </div>
    );
  }
} satisfies Story;

export const SelectableWithDeleteIcon = {
  render: () => {
    return (
      <div className="flex items-center gap-2">
        <Chip asChild>
          <ChipSelectable>
            <span>Default</span>
            <ChipDeleteIcon />
          </ChipSelectable>
        </Chip>
        <Chip asChild variant={"bordered"}>
          <ChipSelectable>
            <span>Bordered</span>
            <ChipDeleteIcon />
          </ChipSelectable>
        </Chip>
      </div>
    );
  }
} satisfies Story;
