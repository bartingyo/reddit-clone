import {
  FormControl,
  FormCount,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MAX_NAME_LENGTH,
  TEXTAREA_ROWS
} from "@/features/communities/constants";
import { communityFormSchema } from "@/features/communities/schema";
import { cn } from "@/lib/utils";
import { Control } from "react-hook-form";
import z from "zod";

type Props = {
  formControl: Control<z.infer<typeof communityFormSchema>>;
  name: string;
  description: string;
};

export default function CommunityCreateStageOne({
  formControl,
  description,
  name
}: Props) {
  return (
    <div className="space-y-8">
      <FormField
        control={formControl}
        name="name"
        render={({ field: { onChange, ...restFields } }) => (
          <FormItem className="gap-1">
            <FormControl>
              <Input
                label="Community Name"
                prefix="r/"
                required
                onChange={(event) => {
                  const valueLength = event.target.value.length;

                  if (valueLength <= MAX_NAME_LENGTH) {
                    onChange(event);
                  }
                }}
                {...restFields}
              />
            </FormControl>

            <div
              className={cn(
                "flex flex-row-reverse justify-between gap-2",
                "px-4"
              )}
            >
              <FormCount length={name.length} max={MAX_NAME_LENGTH} />
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={formControl}
        name="description"
        render={({ field }) => (
          <FormItem className="gap-1">
            <FormControl>
              <Textarea
                label="Description"
                rows={TEXTAREA_ROWS}
                required
                {...field}
              />
            </FormControl>

            <div
              className={cn(
                "flex flex-row-reverse justify-between gap-2",
                "px-4"
              )}
            >
              <FormCount length={description.length} />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
