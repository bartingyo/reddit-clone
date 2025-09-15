import {
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

type Props = {
  title: string;
  description: string;
};

export default function CommunityCreateDialogHeader({
  title,
  description
}: Props) {
  return (
    <DialogHeader className="text-left gap-8">
      <DialogTitle className="text-2xl text-[#333D42] font-bold tracking-tight">
        {title}
      </DialogTitle>
      <DialogDescription className="text-sm text-[#434343]">
        {description}
      </DialogDescription>
    </DialogHeader>
  );
}
