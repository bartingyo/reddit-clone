"use client";

import ImageOutline from "@/components/icons/image-outline";
import Button from "@/components/ui/button";
import type { MouseEvent, ReactNode } from "react";
import { createContext, useContext } from "react";
import type { DropEvent, DropzoneOptions, FileRejection } from "react-dropzone";
import { useDropzone } from "react-dropzone";

type DropzoneContextType = {
  src?: File[];
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  accept?: DropzoneOptions["accept"];
  maxSize?: DropzoneOptions["maxSize"];
  minSize?: DropzoneOptions["minSize"];
  maxFiles?: DropzoneOptions["maxFiles"];
};

const DropzoneContext = createContext<DropzoneContextType | undefined>(
  undefined
);

const useDropzoneContext = () => {
  const context = useContext(DropzoneContext);

  if (!context) {
    throw new Error("useDropzoneContext must be used within a Dropzone");
  }

  return context;
};

export type DropzoneProps = Omit<DropzoneOptions, "onDrop"> & {
  src?: File[];
  className?: string;
  onDrop?: (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  children?: ReactNode;
};

export const Dropzone = ({
  accept,
  maxFiles = 1,
  maxSize,
  minSize,
  onDrop,
  onError,
  disabled,
  src,
  children,
  ...props
}: DropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onError,
    disabled,
    onDrop: (acceptedFiles, fileRejections, event) => {
      if (fileRejections.length > 0) {
        const message = fileRejections.at(0)?.errors.at(0)?.message;
        onError?.(new Error(message));
        return;
      }

      onDrop?.(acceptedFiles, fileRejections, event);
    },
    ...props
  });

  const { onClick, ...rootProps } = getRootProps();

  return (
    <DropzoneContext.Provider
      key={JSON.stringify(src)}
      value={{ src, accept, maxSize, minSize, maxFiles, onClick }}
    >
      <div {...rootProps}>
        <input {...getInputProps()} disabled={disabled} />
        {children}
      </div>
    </DropzoneContext.Provider>
  );
};

export function DropzoneButton() {
  const { src, onClick } = useDropzoneContext();
  const hasFiles = (src?.length ?? 0) > 0;

  return (
    <Button
      variant={hasFiles ? "bordered" : "secondary"}
      size="sm"
      onClick={onClick}
    >
      <ImageOutline className="size-5" />
      <span>{hasFiles ? "Change" : "Add"}</span>
    </Button>
  );
}
