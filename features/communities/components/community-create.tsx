import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";

export default function CommunityCreate() {
  return (
    <SidebarMenuButton>
      <span className="size-8 flex items-center justify-center">
        <Plus />
      </span>
      <span>Create Community</span>
    </SidebarMenuButton>
  );
}
