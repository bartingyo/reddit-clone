"use client";

import Plus from "@/components/icons/plus";
import AppSidebarMenuButton from "@/components/layouts/app-sidebar-menu-button";
import Cropper from "@/components/ui/cropper";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import CommunityCreateDialogFooter from "@/features/communities/components/community-create-dialog-footer";
import CommunityCreateDialogHeader from "@/features/communities/components/community-create-dialog-header";
import CommunityCreateStageOne from "@/features/communities/components/community-create-stage-one";
import CommunityCreateStageThree from "@/features/communities/components/community-create-stage-three";
import CommunityCreateStageTwo from "@/features/communities/components/community-create-stage-two";
import CommunityPreview from "@/features/communities/components/community-preview";
import { COMMUNITY_CREATE_DIALOG_HEADER_TEXT } from "@/features/communities/constants";
import useCommunityCreateForm from "@/features/communities/hooks/use-community-create-form";
import useCommunityCreateStageOne from "@/features/communities/hooks/use-community-create-stage-one";
import useCommunityCreateStageTwo from "@/features/communities/hooks/use-community-create-stage-two";
import { CommunityCreateStage } from "@/features/communities/types";
import useStage from "@/hooks/use-stage";

export default function CommunityCreateDialog() {
  const { form, onSubmit } = useCommunityCreateForm();
  const { stage, handleBack, handleNext, moveTo } =
    useStage<CommunityCreateStage>({
      initialState: CommunityCreateStage.One
    });
  const { name, description, isStageOne, isStageOneInvalid } =
    useCommunityCreateStageOne({ form, stage });
  const {
    banner,
    avatar,
    isStageTwo,
    isCropping,
    activeCropper,
    croppedAvatar,
    croppedBanner,
    handleFile,
    handleClose,
    handleFileError,
    handleFileDelete
  } = useCommunityCreateStageTwo({
    form,
    stage,
    moveTo
  });

  const isStageThree = stage === CommunityCreateStage.Three;
  const isStageFour = stage === CommunityCreateStage.Four;

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
            avatar={croppedAvatar}
            banner={croppedBanner}
            withImages={isStageTwo}
          />
        )}

        {!!activeCropper && <Cropper {...activeCropper.props} />}

        {/* Form */}
        {!isCropping && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {isStageOne && (
                <CommunityCreateStageOne
                  formControl={form.control}
                  name={name}
                  description={description}
                />
              )}

              {isStageTwo && (
                <CommunityCreateStageTwo
                  formControl={form.control}
                  banner={banner}
                  avatar={avatar}
                  onFileChange={handleFile}
                  onFileDelete={handleFileDelete}
                  onFileError={handleFileError}
                />
              )}

              {isStageThree && (
                <CommunityCreateStageThree
                  formControl={form.control}
                  onTopicChange={() => form.trigger("topics")}
                  onTopicError={(error) =>
                    form.setError("topics", {
                      message: error.message
                    })
                  }
                />
              )}
            </form>
          </Form>
        )}

        {/* Footer */}
        <CommunityCreateDialogFooter
          isCancelable={isStageOne || isCropping}
          isSavable={isCropping}
          isSubmittable={isStageFour}
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
