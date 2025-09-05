import { MIN_NAME_LENGTH } from "@/features/communities/constants";
import z from "zod";

export const communityFormSchema = z.object({
  name: z.string().min(MIN_NAME_LENGTH, {
    message: `Please lengthen this text to ${MIN_NAME_LENGTH} characters or more`
  }),
  description: z.string()
});
