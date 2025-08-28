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
export const Required = {
  args: {
    required: true
  }
} satisfies Story;
export const Focused = {
  play: async ({ canvas, userEvent }) => {
    // grab input element
    const inputElement = canvas.getByTestId("test-input");

    // click element
    userEvent.click(inputElement);
  }
} satisfies Story;
export const Typed = {
  args: {
    defaultValue: "typed"
  }
} satisfies Story;
export const Error = {
  args: {
    "aria-invalid": true
  }
} satisfies Story;
