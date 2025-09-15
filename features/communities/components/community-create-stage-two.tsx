import TrashOutline from "@/components/icons/trash-outline";
import Button from "@/components/ui/button";
import { Dropzone, DropzoneButton } from "@/components/ui/dropzone";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { COMMUNITY_MEDIA_TYPES } from "@/features/communities/constants";
import { communityFormSchema } from "@/features/communities/schema";
import { CommunityMediaType } from "@/features/communities/types";
import { cn } from "@/lib/utils";
import { Control } from "react-hook-form";
import z from "zod";

type Props = {
  formControl: Control<z.infer<typeof communityFormSchema>>;
  banner?: File;
  avatar?: File;
  onFileChange: (file: File, type: CommunityMediaType) => void;
  onFileDelete: (type: CommunityMediaType) => void;
  onFileError: (error: Error, type: CommunityMediaType) => void;
};

export default function CommunityCreateStageTwo({
  formControl,
  banner,
  avatar,
  onFileChange,
  onFileDelete,
  onFileError
}: Props) {
  return COMMUNITY_MEDIA_TYPES.map((type) => (
    <FormField
      key={type}
      control={formControl}
      name={type}
      render={() => (
        <FormItem className="gap-1">
          <div
            className={cn(
              "py-2 px-4 text-sm",
              "flex items-center justify-between",
              "text-[#21272A] hover:bg-[#F6F8F9]"
            )}
          >
            <FormLabel className="capitalize">{type}</FormLabel>
            <FormControl>
              <Dropzone
                multiple={false}
                accept={{ "image/*": [] }}
                src={
                  type === "banner" && banner
                    ? [banner]
                    : type === "avatar" && avatar
                    ? [avatar]
                    : []
                }
                onDrop={(files: File[]) => {
                  onFileChange(files[0], type);
                }}
                onError={(error) => {
                  onFileError(error, type);
                }}
              >
                <DropzoneButton />
              </Dropzone>
            </FormControl>
          </div>

          {((type === "banner" && banner) || (type === "avatar" && avatar)) && (
            <div
              className={cn(
                "px-4 text-xs",
                "flex items-center justify-between",
                "text-[#5c6c74]"
              )}
            >
              <p>{type === "banner" ? banner?.name : avatar?.name}</p>
              <Button
                variant="plain"
                size="sm"
                isIcon
                onClick={() => {
                  onFileDelete(type);
                }}
              >
                <TrashOutline className="size-4" />
              </Button>
            </div>
          )}

          <FormMessage className="px-4" />
        </FormItem>
      )}
    />
  ));
}
