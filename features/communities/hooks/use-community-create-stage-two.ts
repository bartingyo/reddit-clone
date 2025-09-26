import { COMMUNITY_IMAGE_ASPECTS } from "@/features/communities/constants";
import { communityFormSchema } from "@/features/communities/schema";
import {
  CommunityCreateStage,
  CommunityMediaType
} from "@/features/communities/types";
import useCropper from "@/hooks/use-cropper";
import { MouseEvent } from "react";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

type Options = {
  form: UseFormReturn<z.infer<typeof communityFormSchema>>;
  stage: CommunityCreateStage;
  moveTo: (stage: CommunityCreateStage) => void;
};

export default function useCommunityCreateStageTwo({
  form,
  stage,
  moveTo
}: Options) {
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
      form.setValue("avatar", file);
      moveTo(CommunityCreateStage.Two);
    }
  });

  const { banner, avatar } = form.watch();
  const isStageTwo = stage === CommunityCreateStage.Two;
  const croppers = [bannerCropper, avatarCropper];
  const activeCropper = croppers.find((cropper) => cropper.originalImage);
  const isCropping =
    (stage === CommunityCreateStage.BannerStage ||
      stage === CommunityCreateStage.AvatarStage) &&
    !!activeCropper;

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

  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    if (isCropping) {
      event?.preventDefault();
      moveTo(CommunityCreateStage.Two);
      activeCropper.reset();
    }
  };

  return {
    banner,
    avatar,
    isStageTwo,
    isCropping,
    activeCropper,
    croppedAvatar: avatarCropper.croppedImage,
    croppedBanner: bannerCropper.croppedImage,
    handleFile,
    handleClose,
    handleFileError,
    handleFileDelete
  };
}
