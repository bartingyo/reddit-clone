import { PixelCrop } from "react-image-crop";

export const drawCroppedImage = (
  imageElement: HTMLImageElement,
  { x, y, width, height }: PixelCrop
): HTMLCanvasElement => {
  const canvasElement = document.createElement("canvas");
  const context = canvasElement.getContext("2d");

  if (!context) {
    throw new Error("canvas context is not available!");
  }

  canvasElement.width = width;
  canvasElement.height = height;

  context.drawImage(imageElement, x, y, width, height, 0, 0, width, height);

  return canvasElement;
};

export const convertToBlob = (
  canvasElement: HTMLCanvasElement
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvasElement.toBlob((blob) => {
      if (!blob) {
        reject(new Error("blob is not available"));
      } else {
        resolve(blob);
      }
    });
  });
};

export const getCroppedImageBlob = (
  imageElement: HTMLImageElement,
  pixelCrop: PixelCrop
): Promise<Blob> => {
  const canvasElement = drawCroppedImage(imageElement, pixelCrop);

  return convertToBlob(canvasElement);
};
