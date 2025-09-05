import {
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

export default function CommunityCreateDialogHeader() {
  return (
    <DialogHeader className="text-left gap-8">
      <DialogTitle className="text-2xl text-[#333D42] font-bold tracking-tight">
        Tell us about your community
      </DialogTitle>
      <DialogDescription className="text-sm text-[#434343]">
        A name and description help people understand what your community is all
        about.
      </DialogDescription>
    </DialogHeader>
  );
}
