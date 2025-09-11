import { COMMUNITY_MEDIA_TYPES } from "@/features/communities/constants";

export enum CommunityCreateStage {
  One = 1,
  Two
}
export type CommunityMediaType = (typeof COMMUNITY_MEDIA_TYPES)[number];
export enum ReadAs {
  ReadAsText = "readAsText",
  ReadAsArrayBuffer = "readAsArrayBuffer",
  ReadAsDataURL = "readAsDataURL"
}
