"use client";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ComponentProps, ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
} & ComponentProps<typeof SidebarMenuButton>;

export default function AppSidebarMenuButton({ title, icon, ...props }: Props) {
  return (
    <SidebarMenuButton {...props}>
      <span className="size-8 flex items-center justify-center">{icon}</span>
      <span>{title}</span>
    </SidebarMenuButton>
  );
}
