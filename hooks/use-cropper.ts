import Cropper from "@/components/ui/cropper";
import { getCroppedImageBlob } from "@/lib/canvas";
import { getAspectCenterCrop, getPixelCrop } from "@/lib/cropper";
import { OriginalImage } from "@/types/cropper";
import { ComponentProps, SyntheticEvent, useRef, useState } from "react";
import { PercentCrop, PixelCrop } from "react-image-crop";

type Options = {
  aspect?: number;
  onReset?: () => void;
  onCropComplete?: (file: File, url: string) => void;
};

export default function useCropper<T extends PercentCrop | PixelCrop>({
  aspect,
  onReset,
  onCropComplete
}: Options) {
  const ref = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<T>();
  const [originalImage, setOriginalImage] = useState<OriginalImage | null>(
    null
  );
  const [croppedImage, setCroppedImage] = useState<string | undefined>();

  const addOriginalImage = (file: File) => {
    setOriginalImage({ file, url: URL.createObjectURL(file) });
  };

  const removeCroppedImage = () => {
    setCroppedImage(undefined);
  };

  const reset = () => {
    setOriginalImage(null);
    onReset?.();
  };
  const onLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { naturalWidth: width, naturalHeight: height } =
        event.currentTarget;

      const aspectCenterCrop = getAspectCenterCrop(aspect, width, height);

      setCrop(aspectCenterCrop as T);
    }
  };

  const onChange = (pixelCrop: PixelCrop, percentCrop: PercentCrop) => {
    if (crop?.unit === "%") {
      setCrop(percentCrop as T);
    } else {
      setCrop(pixelCrop as T);
    }
  };

  const cropImage = async () => {
    const imageElement = ref.current;
    if (!imageElement || !crop || !originalImage) {
      throw new Error(
        "Not enough information, missing image, imageElement, or percentCrop ...."
      );
    }

    const { naturalWidth, naturalHeight } = imageElement;

    const blob = await getCroppedImageBlob(
      imageElement,
      getPixelCrop(crop, naturalWidth, naturalHeight)
    );

    const { name: filename, type: filetype } = originalImage.file;
    const url = URL.createObjectURL(blob);
    const file = new File([blob], filename, { type: filetype });

    setCroppedImage(url);
    onCropComplete?.(file, url);
    setOriginalImage(null);
  };

  const props = {
    ref,
    crop,
    onChange,
    aspect,
    src: originalImage?.url || "",
    alt: "image for cropping",
    width: 500,
    height: 500,
    onLoad
  } satisfies ComponentProps<typeof Cropper>;

  return {
    props,
    originalImage,
    croppedImage,
    addOriginalImage,
    removeCroppedImage,
    cropImage,
    reset
  };
}
