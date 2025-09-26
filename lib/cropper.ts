import {
  Crop,
  PercentCrop,
  centerCrop,
  convertToPercentCrop,
  convertToPixelCrop,
  makeAspectCrop
} from "react-image-crop";

export const getAspectCenterCrop = (
  aspect: number,
  width: number,
  height: number
): PercentCrop => {
  const aspectCrop = makeAspectCrop(
    { unit: "%", width: 100 },
    aspect,
    width,
    height
  );

  return centerCrop(aspectCrop, width, height);
};

export const getPixelCrop = (crop: Crop, width: number, height: number) => {
  const percentCrop =
    crop.unit === "%" ? crop : convertToPercentCrop(crop, width, height);

  return convertToPixelCrop(percentCrop, width, height);
};
