import {
  MIN_DESCRIPTION_LENGTH,
  MIN_NAME_LENGTH
} from "@/features/communities/constants";
import { communityFormSchema } from "@/features/communities/schema";
import { CommunityCreateStage } from "@/features/communities/types";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

type Options = {
  form: UseFormReturn<z.infer<typeof communityFormSchema>>;
  stage: CommunityCreateStage;
};

export default function useCommunityCreateStageOne({ form, stage }: Options) {
  const { name, description } = form.watch();

  const isNameInvalid = name.length < MIN_NAME_LENGTH;
  const isDescriptionInvalid = description.length < MIN_DESCRIPTION_LENGTH;
  const isStageOne = stage === CommunityCreateStage.One;
  return {
    name,
    description,
    isStageOne,
    isStageOneInvalid: isStageOne && (isNameInvalid || isDescriptionInvalid)
  };
}
