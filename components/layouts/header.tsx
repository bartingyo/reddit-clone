import Bell from "@/components/icons/bell";
import Plus from "@/components/icons/plus";
import Search from "@/components/icons/search";
import Button from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed z-60 w-full border-b bg-background h-14 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger />

        <Link href="/">
          <Image src={logo} alt="Reddit clone logo" width={32} height={32} />
        </Link>
      </div>

      <div className="flex items-center">
        <Button variant="plain" size="md" isIcon>
          <Search />
        </Button>
        <Button variant="plain" size="md" isIcon>
          <Plus />
        </Button>
        <Button variant="plain" size="md" isIcon>
          <Bell />
        </Button>
      </div>
    </header>
  );
}
