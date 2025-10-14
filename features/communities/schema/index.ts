import { MIN_NAME_LENGTH } from "@/features/communities/constants";
import z from "zod";

export const communityFormSchema = z.object({
  name: z.string().min(MIN_NAME_LENGTH, {
    error: `Please lengthen this text to ${MIN_NAME_LENGTH} characters or more`
  }),
  description: z.string(),
  banner: z
    .file({ error: "Invalid value" })
    .mime(
      ["image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/webp"],
      { error: "Invalid MIME type" }
    )
    .optional(),
  avatar: z
    .file({ error: "Invalid value" })
    .mime(
      ["image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/webp"],
      { error: "Invalid MIME type" }
    )
    .optional(),
  topics: z.array(z.string()).max(3, { error: "Only 3 topics can be added" })
});
