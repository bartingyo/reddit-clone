import { Dropzone, DropzoneButton } from "@/components/ui/dropzone";
import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

const meta = {
  title: "Design System/Dropzone",
  component: Dropzone
} satisfies Meta<typeof Dropzone>;

export default meta;

type Story = StoryObj<typeof Dropzone>;

export const Default = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
    };
    console.log(files);

    return (
      <Dropzone onDrop={onDrop}>
        <DropzoneButton />
      </Dropzone>
    );
  }
} satisfies Story;
