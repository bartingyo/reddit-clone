"use client";

import Plus from "@/components/icons/plus";
import AppSidebarMenuButton from "@/components/layouts/app-sidebar-menu-button";
import Cropper from "@/components/ui/cropper";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import CommunityCreateDialogFooter from "@/features/communities/components/community-create-dialog-footer";
import CommunityCreateDialogHeader from "@/features/communities/components/community-create-dialog-header";
import CommunityCreateStageOne from "@/features/communities/components/community-create-stage-one";
import CommunityCreateStageTwo from "@/features/communities/components/community-create-stage-two";
import CommunityPreview from "@/features/communities/components/community-preview";
import {
  COMMUNITY_CREATE_DIALOG_HEADER_TEXT,
  COMMUNITY_IMAGE_ASPECTS,
  MIN_DESCRIPTION_LENGTH,
  MIN_NAME_LENGTH
} from "@/features/communities/constants";
import { communityFormSchema } from "@/features/communities/schema";
import {
  CommunityCreateStage,
  CommunityImage,
  CommunityMediaType
} from "@/features/communities/types";
import useStage from "@/hooks/use-stage";
import { getAspectCenterCrop } from "@/lib/cropper";
import { zodResolver } from "@hookform/resolvers/zod";
import { MouseEvent, SyntheticEvent, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { convertToPixelCrop, PercentCrop, PixelCrop } from "react-image-crop";
import z from "zod";

type CommunityPreviewImages = {
  banner?: string;
  avatar?: string;
};

export default function CommunityCreateDialog() {
  // moving to stage
  const { stage, handleBack, handleNext, moveTo } =
    useStage<CommunityCreateStage>({
      initialState: CommunityCreateStage.One
    });

  // form
  const form = useForm<z.infer<typeof communityFormSchema>>({
    mode: "onTouched",
    resolver: zodResolver(communityFormSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  });
  const onSubmit = (values: z.infer<typeof communityFormSchema>) => {
    console.log(values);
  };

  // stage 1
  const { name, description } = form.watch();
  const isNameInvalid = name.length < MIN_NAME_LENGTH;
  const isDescriptionInvalid = description.length < MIN_DESCRIPTION_LENGTH;
  const isStageOne = stage === CommunityCreateStage.One;

  // copper
  const [percentCrop, setPercentCrop] = useState<PercentCrop>();
  const [image, setImage] = useState<CommunityImage | null>(null);
  const [previewImages, setPreviewImages] = useState<CommunityPreviewImages>(
    {}
  );
  const isCropping =
    (stage === CommunityCreateStage.BannerStage ||
      stage === CommunityCreateStage.AvatarStage) &&
    !!image;
  const resetCropping = (event?: MouseEvent<HTMLButtonElement>) => {
    if (isCropping) {
      event?.preventDefault();
      moveTo(CommunityCreateStage.Two);
      setImage(null);
    }
  };
  function onImageLoad(
    event: SyntheticEvent<HTMLImageElement>,
    type: CommunityMediaType
  ) {
    const { naturalWidth: width, naturalHeight: height } = event.currentTarget;

    const aspectCenterCrop = getAspectCenterCrop(
      COMMUNITY_IMAGE_ASPECTS[type],
      width,
      height
    );

    setPercentCrop(aspectCenterCrop);
  }

  const onCropChange = (_: PixelCrop, percentageCrop: PercentCrop) =>
    setPercentCrop(percentageCrop);

  const imageURL = useMemo(
    () => (image ? URL.createObjectURL(image.file) : ""),
    [image]
  );

  const imageRef = useRef<HTMLImageElement>(null);

  // stage 2
  const { banner, avatar } = form.watch();
  const isStageTwo = stage === CommunityCreateStage.Two;

  const handleFile = async (file: File, type: CommunityMediaType) => {
    // set image stage with the file and type, we do not have it yet.
    setImage({ file, type });
    // set stage either banner cropping or avatar cropping
    if (type === "banner") moveTo(CommunityCreateStage.BannerStage);
    if (type === "avatar") moveTo(CommunityCreateStage.AvatarStage);
  };

  const handleFileError = (error: Error, type: CommunityMediaType) => {
    resetField(type);
    form.setError(type, { message: error.message });
  };

  const handleFileDelete = (type: CommunityMediaType) => {
    resetField(type);
  };

  const resetField = (type: CommunityMediaType) => {
    form.resetField(type);

    setPreviewImages((prev) => ({ ...prev, [type]: undefined }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AppSidebarMenuButton title="Create Community" icon={<Plus />} />
      </DialogTrigger>

      <DialogContent className="p-4 rounded-2xl gap-8">
        {/* Header */}
        <CommunityCreateDialogHeader
          title={COMMUNITY_CREATE_DIALOG_HEADER_TEXT[stage].title}
          description={COMMUNITY_CREATE_DIALOG_HEADER_TEXT[stage].description}
        />

        {/* Preview card */}
        {(isStageOne || isStageTwo) && (
          <CommunityPreview
            name={name}
            description={description}
            avatar={previewImages.avatar}
            banner={previewImages.banner}
            withImages={stage === CommunityCreateStage.Two}
          />
        )}

        {isCropping && (
          <Cropper
            ref={imageRef}
            crop={percentCrop}
            onChange={onCropChange}
            aspect={COMMUNITY_IMAGE_ASPECTS[image.type]}
            src={imageURL}
            alt={`${name}'s ${image.type}`}
            width={500}
            height={500}
            onLoad={(event) => {
              onImageLoad(event, image.type);
            }}
          />
        )}

        {/* Form */}
        {!isCropping && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {stage === CommunityCreateStage.One && (
                <CommunityCreateStageOne
                  formControl={form.control}
                  name={name}
                  description={description}
                />
              )}

              {stage === CommunityCreateStage.Two && (
                <CommunityCreateStageTwo
                  formControl={form.control}
                  banner={banner}
                  avatar={avatar}
                  onFileChange={handleFile}
                  onFileDelete={handleFileDelete}
                  onFileError={handleFileError}
                />
              )}
            </form>
          </Form>
        )}

        {/* Footer */}
        <CommunityCreateDialogFooter
          isCancelable={stage === CommunityCreateStage.One || isCropping}
          isSavable={isCropping}
          isNextDisabled={isNameInvalid || isDescriptionInvalid}
          onSave={() => {
            // 1. get the image, canvas, and percent crop size
            // 2. use canvas to get cropped image using the drawImage method
            // 2.1 with the canvas get the context
            const canvasElement = document.createElement("canvas");
            const imageElement = imageRef.current;
            if (!imageElement || !percentCrop || !image) {
              throw new Error(
                "Not enough information, missing image, imageElement, or percentCrop ...."
              );
            }
            const context = canvasElement.getContext("2d");

            if (!context) {
              throw new Error("canvas context is not available!");
            }

            // 2.2 get the image width and height
            const { naturalWidth, naturalHeight } = imageElement;
            // 2.3 convert percentage crop object to pixel crop
            // 2.4 get the values of sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
            const {
              x: sx,
              y: sy,
              width: sWidth,
              height: sHeight
            } = convertToPixelCrop(percentCrop, naturalWidth, naturalHeight);

            canvasElement.width = sWidth;
            canvasElement.height = sHeight;
            // 2.5 draw the image
            context.drawImage(
              imageElement,
              sx,
              sy,
              sWidth,
              sHeight,
              0,
              0,
              sWidth,
              sHeight
            );
            // 3. convert the canvas to blob

            canvasElement.toBlob((blob) => {
              if (!blob) {
                throw new Error("blob is not available");
              }
              // 3.1 get the cropped image url from blob
              // 3.2 get the cropped image file from blob
              const croppedImageURL = URL.createObjectURL(blob);
              const croppedImageFile = new File([blob], image.file.name, {
                type: image.file.type
              });

              // 3.3 set the file to the form to send request to our backend to process in the future
              form.setValue(image.type, croppedImageFile);
              // 3.4 set the image url state so that we can render on preview card
              setPreviewImages((prev) => ({
                ...prev,
                [image.type]: croppedImageURL
              }));

              resetCropping();
            });
          }} // TODO: add functionality
          onClose={resetCropping}
          onBack={handleBack}
          onNext={handleNext}
        />
      </DialogContent>
    </Dialog>
  );
}
