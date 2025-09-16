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
import { getAspectCenterCrop } from "@/lib/cropper";
import { zodResolver } from "@hookform/resolvers/zod";
import { MouseEvent, SyntheticEvent, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { PercentCrop, PixelCrop, type Crop } from "react-image-crop";
import z from "zod";

export default function CommunityCreateDialog() {
  const [stage, setStage] = useState<CommunityCreateStage>(
    CommunityCreateStage.Two
  );
  const [crop, setCrop] = useState<Crop>();
  const [image, setImage] = useState<CommunityImage | null>(null);
  const [bannerImage, setBannerImage] = useState<string | undefined>(undefined);
  const [avatarImage, setAvatarImage] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof communityFormSchema>>({
    mode: "onTouched",
    resolver: zodResolver(communityFormSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  });

  const { name, description, banner, avatar } = form.watch();
  const isNameInvalid = name.length < MIN_NAME_LENGTH;
  const isDescriptionInvalid = description.length < MIN_DESCRIPTION_LENGTH;
  const isPreviewVisible =
    stage === CommunityCreateStage.One || stage === CommunityCreateStage.Two;
  const isCropping =
    (stage === CommunityCreateStage.BannerStage ||
      stage === CommunityCreateStage.AvatarStage) &&
    !!image;

  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    if (isCropping) {
      event.preventDefault();
      setStage(CommunityCreateStage.Two);
      setImage(null);
    }
  };
  const handleBack = () => {
    setStage((prev) => prev - 1);
  };
  const handleNext = () => {
    setStage((prev) => prev + 1);
  };

  const handleFile = async (file: File, type: CommunityMediaType) => {
    // set image stage with the file and type, we do not have it yet.
    setImage({ file, type });
    // set stage either banner cropping or avatar cropping
    if (type === "banner") setStage(CommunityCreateStage.BannerStage);
    if (type === "avatar") setStage(CommunityCreateStage.AvatarStage);
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

    if (type === "avatar") setAvatarImage(undefined);
    if (type === "banner") setBannerImage(undefined);
  };

  const onSubmit = (values: z.infer<typeof communityFormSchema>) => {
    console.log(values);
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

    setCrop(aspectCenterCrop);
  }

  const onCropChange = (_: PixelCrop, percentageCrop: PercentCrop) =>
    setCrop(percentageCrop);

  const imageURL = useMemo(
    () => (image ? URL.createObjectURL(image.file) : ""),
    [image]
  );

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
        {isPreviewVisible && (
          <CommunityPreview
            name={name}
            description={description}
            avatar={avatarImage}
            banner={bannerImage}
            withImages={stage === CommunityCreateStage.Two}
          />
        )}

        {isCropping && (
          <Cropper
            crop={crop}
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
          onSave={() => {}} // TODO: add functionality
          onClose={handleClose}
          onBack={handleBack}
          onNext={handleNext}
        />
      </DialogContent>
    </Dialog>
  );
}
