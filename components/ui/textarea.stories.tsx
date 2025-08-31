import { Textarea } from "@/components/ui/textarea";
import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Design System/Textarea",
  component: Textarea,
  args: {
    label: "Label"
  }
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof Textarea>;

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
    // grab textarea element
    const textareaElement = canvas.getByTestId("test-textarea");

    // click element
    userEvent.click(textareaElement);
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
export const Multiline = {
  args: {
    defaultValue: "M\nU\nL\nT\nI\nL\nI\nN\nE"
  }
} satisfies Story;
export const FixedRows = {
  args: {
    rows: 3
  }
} satisfies Story;
