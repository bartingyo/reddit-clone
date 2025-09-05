"use client";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  url: string;
  title: string;
  icon: ReactNode;
  selected: ReactNode;
};

export default function AppSidebarMenuLink({
  icon,
  selected,
  title,
  url
}: Props) {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <SidebarMenuButton asChild isActive={isActive}>
      <Link href={url}>
        <span className="size-8 flex items-center justify-center">
          {isActive ? selected : icon}
        </span>
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  );
}
