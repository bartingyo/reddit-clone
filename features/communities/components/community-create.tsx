"use client";

import Plus from "@/components/icons/plus";
import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormCount,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import CommunityPreview from "@/features/communities/components/community-preview";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 21;
const TEXTAREA_ROWS = 8;

const formSchema = z.object({
  name: z.string().min(MIN_NAME_LENGTH, {
    message: `Please lengthen this text to ${MIN_NAME_LENGTH} characters or more`
  }),
  description: z.string()
});

export default function CommunityCreate() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  });

  const { name, description } = form.watch();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton>
          <span className="size-8 flex items-center justify-center">
            <Plus />
          </span>
          <span>Create Community</span>
        </SidebarMenuButton>
      </DialogTrigger>

      <DialogContent className="p-4 rounded-2xl gap-8">
        <DialogHeader className="text-left gap-8">
          <DialogTitle className="text-2xl text-[#333D42] font-bold tracking-tight">
            Tell us about your community
          </DialogTitle>
          <DialogDescription className="text-sm text-[#434343]">
            A name and description help people understand what your community is
            all about.
          </DialogDescription>
        </DialogHeader>

        {/* Preview card */}
        <CommunityPreview avatar="" banner="" withImages={false} />

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
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
              control={form.control}
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
          </form>
        </Form>

        <DialogFooter className="flex-row justify-end">
          <Button variant="secondary" size="lg">
            Cancel
          </Button>
          <Button variant="primary" size="lg">
            Next
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
