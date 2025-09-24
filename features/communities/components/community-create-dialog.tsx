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
  COMMUNITY_IMAGE_ASPECTS
} from "@/features/communities/constants";
import useCommunityCreateForm from "@/features/communities/hooks/use-community-create-form";
import useCommunityCreateStageOne from "@/features/communities/hooks/use-community-create-stage-one";
import {
  CommunityCreateStage,
  CommunityMediaType
} from "@/features/communities/types";
import useCropper from "@/hooks/use-cropper";
import useStage from "@/hooks/use-stage";
import { MouseEvent } from "react";

export default function CommunityCreateDialog() {
  // form
  const { form, onSubmit } = useCommunityCreateForm();
  // moving to stage
  const { stage, handleBack, handleNext, moveTo } =
    useStage<CommunityCreateStage>({
      initialState: CommunityCreateStage.One
    });

  // stage 1
  const { name, description, isStageOne, isStageOneInvalid } =
    useCommunityCreateStageOne({ form, stage });

  // copper
  const bannerCropper = useCropper({
    aspect: COMMUNITY_IMAGE_ASPECTS["banner"],
    onCropComplete: (file) => {
      form.setValue("banner", file);
      moveTo(CommunityCreateStage.Two);
    }
  });
  const avatarCropper = useCropper({
    aspect: COMMUNITY_IMAGE_ASPECTS["avatar"],
    onCropComplete: (file) => {
      form.setValue("banner", file);
      moveTo(CommunityCreateStage.Two);
    }
  });

  // stage 2
  const { banner, avatar } = form.watch();
  const isStageTwo = stage === CommunityCreateStage.Two;

  const handleFile = async (file: File, type: CommunityMediaType) => {
    if (type === "banner") {
      moveTo(CommunityCreateStage.BannerStage);
      bannerCropper.addOriginalImage(file);
    }
    if (type === "avatar") {
      moveTo(CommunityCreateStage.AvatarStage);
      avatarCropper.addOriginalImage(file);
    }
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

    if (type === "banner") {
      bannerCropper.removeCroppedImage();
    }

    if (type === "avatar") {
      avatarCropper.removeCroppedImage();
    }
  };

  const croppers = [bannerCropper, avatarCropper];
  const activeCropper = croppers.find((cropper) => cropper.originalImage);
  const isCropping =
    (stage === CommunityCreateStage.BannerStage ||
      stage === CommunityCreateStage.AvatarStage) &&
    !!activeCropper;

  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    if (isCropping) {
      event?.preventDefault();
      moveTo(CommunityCreateStage.Two);
      activeCropper.reset();
    }
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
            avatar={avatarCropper.croppedImage}
            banner={bannerCropper.croppedImage}
            withImages={stage === CommunityCreateStage.Two}
          />
        )}

        {isCropping && <Cropper {...activeCropper.props} />}

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
          isNextDisabled={isStageOneInvalid}
          onSave={activeCropper?.cropImage}
          onClose={handleClose}
          onBack={handleBack}
          onNext={handleNext}
        />
      </DialogContent>
    </Dialog>
  );
}
