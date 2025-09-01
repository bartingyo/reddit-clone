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
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import CommunityPreview from "@/features/communities/components/community-preview";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters."
  })
});

export default function CommunityCreate() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ""
    }
  });

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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input label="Community Name" required {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
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
