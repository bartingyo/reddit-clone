"use client";

import Plus from "@/components/icons/plus";
import AppSidebarMenuButton from "@/components/layouts/app-sidebar-menu-button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import CommunityCreateDialogFooter from "@/features/communities/components/community-create-dialog-footer";
import CommunityCreateDialogHeader from "@/features/communities/components/community-create-dialog-header";
import CommunityCreateStageOne from "@/features/communities/components/community-create-stage-one";
import CommunityCreateStageTwo from "@/features/communities/components/community-create-stage-two";
import CommunityPreview from "@/features/communities/components/community-preview";
import {
  MIN_DESCRIPTION_LENGTH,
  MIN_NAME_LENGTH
} from "@/features/communities/constants";
import { communityFormSchema } from "@/features/communities/schema";
import {
  CommunityCreateStage,
  CommunityMediaType,
  ReadAs
} from "@/features/communities/types";
import { readFileAsync } from "@/lib/read-file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function CommunityCreateDialog() {
  const [stage, setStage] = useState<CommunityCreateStage>(
    CommunityCreateStage.Two
  );
  const [bannerImage, setBannerImage] = useState<string>("");
  const [avatarImage, setAvatarImage] = useState<string>("");

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

  const handleBack = () => {
    setStage((prev) => prev - 1);
  };
  const handleNext = () => {
    setStage((prev) => prev + 1);
  };

  const handleFile = async (file: File, type: CommunityMediaType) => {
    try {
      const result = await readFileAsync(file, ReadAs.ReadAsDataURL);

      if (typeof result === "string") {
        if (type === "banner") setBannerImage(result);
        if (type === "avatar") setAvatarImage(result);
      }
    } catch (error) {
      if (error instanceof Error) {
        form.setError(type, { message: error.message });
      }
    }
  };

  const handleFileError = (error: Error, type: CommunityMediaType) => {
    form.resetField(type);
    form.setError(type, { message: error.message });
  };

  const handleFileDelete = (type: CommunityMediaType) => {
    form.resetField(type);
  };

  const onSubmit = (values: z.infer<typeof communityFormSchema>) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AppSidebarMenuButton title="Create Community" icon={<Plus />} />
      </DialogTrigger>

      <DialogContent className="p-4 rounded-2xl gap-8">
        {/* Header */}
        <CommunityCreateDialogHeader stage={stage} />

        {/* Preview card */}
        {(stage === CommunityCreateStage.One ||
          stage === CommunityCreateStage.Two) && (
          <CommunityPreview
            name={name}
            description={description}
            avatar={avatarImage}
            banner={bannerImage}
            withImages={stage === CommunityCreateStage.Two}
          />
        )}

        {/* Form */}
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

        {/* Footer */}
        <CommunityCreateDialogFooter
          stage={stage}
          isNextDisabled={isNameInvalid || isDescriptionInvalid}
          onBackClick={handleBack}
          onNextClick={handleNext}
        />
      </DialogContent>
    </Dialog>
  );
}
