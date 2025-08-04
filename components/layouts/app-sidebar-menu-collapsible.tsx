import ChevronUp from "@/components/icons/chevron-up";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

export default function AppSidebarMenuCollapsible({ title, children }: Props) {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarMenuButton className="justify-between" asChild>
          <CollapsibleTrigger>
            <span className="text-[#576F76] uppercase text-xs tracking-widest">
              {title}
            </span>
            <span className="h-8 flex items-center">
              <ChevronUp className="size-4 stroke-1 group-data-[state='closed']/collapsible:-rotate-180 transition-all" />
            </span>
          </CollapsibleTrigger>
        </SidebarMenuButton>
        <CollapsibleContent className="data-[state='open']:animate-collapsible-down data-[state='closed']:animate-collapsible-up overflow-hidden">
          <SidebarGroupContent>{children}</SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
