import { CommunityCreateStage } from "@/features/communities/types";

export const MIN_NAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 21;
export const MIN_DESCRIPTION_LENGTH = 1;
export const TEXTAREA_ROWS = 8;
export const COMMUNITY_MEDIA_TYPES = ["banner", "avatar"] as const;
export const COMMUNITY_CREATE_DIALOG_HEADER_TEXT = {
  [CommunityCreateStage.One]: {
    title: "Tell us about your community",
    description:
      "A name and description help people understand what your community is all about."
  },
  [CommunityCreateStage.Two]: {
    title: "Style your community",
    description:
      "Adding visual flair will catch new members attention and help establish your community’s culture! You can update this at any time."
  },
  [CommunityCreateStage.BannerStage]: {
    title: "Style your community",
    description: "Banners must be 1028px x 128px"
  },
  [CommunityCreateStage.AvatarStage]: {
    title: "Style your community",
    description: "Icon must be 1:1"
  },
  [CommunityCreateStage.Three]: {
    title: "Add topics",
    description:
      "Add up to 3 topics to help interested redditors find your community."
  },
  [CommunityCreateStage.Four]: {
    title: "What kind of community is this?",
    description:
      "Decide who can view and contribute in your community. Only public communities show up in search. Important: Once set, you will need to submit a request to change your community type."
  }
};
export const COMMUNITY_IMAGE_ASPECTS = {
  banner: 1028 / 128,
  avatar: 1
};
