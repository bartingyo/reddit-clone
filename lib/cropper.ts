import { PercentCrop, centerCrop, makeAspectCrop } from "react-image-crop";

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
