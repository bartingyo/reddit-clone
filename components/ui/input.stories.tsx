import { Input } from "@/components/ui/input";
import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Design System/Input",
  component: Input,
  args: {
    label: "Label"
  }
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Default = {} satisfies Story;
export const WithoutLabel = {
  args: {
    label: undefined
  }
} satisfies Story;
