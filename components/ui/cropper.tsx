import { default as Image } from "next/image";
import { ComponentProps } from "react";
import ReactCrop from "react-image-crop";

type Props = Pick<
  ComponentProps<typeof Image>,
  "src" | "alt" | "width" | "height" | "onLoad"
> &
  ComponentProps<typeof ReactCrop>;

export default function Cropper({
  src,
  alt,
  width,
  height,
  onLoad,
  ...props
}: Props) {
  return (
    <div className="w-full min-h-[416px] bg-[#000000] p-2 flex items-center justify-center">
      <ReactCrop {...props}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={onLoad}
        />
      </ReactCrop>
    </div>
  );
}
