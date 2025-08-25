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
import { SidebarMenuButton } from "@/components/ui/sidebar";
import CommunityPreview from "@/features/communities/components/community-preview";

export default function CommunityCreate() {
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
        <CommunityPreview />

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
