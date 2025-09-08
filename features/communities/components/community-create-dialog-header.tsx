import {
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { CommunityCreateStage } from "@/features/communities/types";

type Props = {
  stage: CommunityCreateStage;
};

const COMMUNITY_CREATE_DIALOG_HEADER_TEXT = {
  [CommunityCreateStage.One]: {
    title: "Tell us about your community",
    description:
      "A name and description help people understand what your community is all about."
  },
  [CommunityCreateStage.Two]: {
    title: "Style your community",
    description:
      "Adding visual flair will catch new members attention and help establish your community’s culture! You can update this at any time."
  }
};

export default function CommunityCreateDialogHeader({ stage }: Props) {
  return (
    <DialogHeader className="text-left gap-8">
      <DialogTitle className="text-2xl text-[#333D42] font-bold tracking-tight">
        {COMMUNITY_CREATE_DIALOG_HEADER_TEXT[stage].title}
      </DialogTitle>
      <DialogDescription className="text-sm text-[#434343]">
        {COMMUNITY_CREATE_DIALOG_HEADER_TEXT[stage].description}
      </DialogDescription>
    </DialogHeader>
  );
}
