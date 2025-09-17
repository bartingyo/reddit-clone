import { default as Image } from "next/image";
import { ComponentProps } from "react";
import ReactCrop from "react-image-crop";

type Props = Pick<
  ComponentProps<typeof Image>,
  "src" | "alt" | "width" | "height" | "onLoad" | "ref"
> &
  ComponentProps<typeof ReactCrop>;

export default function Cropper({
  ref,
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
          ref={ref}
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
