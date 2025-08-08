import DefaultCommunityAvatar from "@/components/icons/default-community-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import CommunityFavoriteButton from "@/features/communities/components/community-favorite-button";
import Link from "next/link";

const MOCK_COMMUNITIES = [
  {
    id: 0,
    title: "r/bartingyo",
    url: "r/bartingyo",
    avatar:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png",
    color: "red",
    isFavorite: false
  },
  {
    id: 1,
    title: "r/random",
    url: "r/random",
    avatar: "",
    color: "blue",
    isFavorite: true
  }
];

export default function CommunityNavItems() {
  return MOCK_COMMUNITIES.map(
    ({ id, title, url, avatar, color, isFavorite }) => (
      <SidebarMenuItem key={id}>
        <SidebarMenuButton className="justify-between" asChild>
          <Link href={url}>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={avatar} alt={`${title} community's avatar`} />
                <AvatarFallback style={{ color: color }}>
                  <DefaultCommunityAvatar />
                </AvatarFallback>
              </Avatar>
              <span>{title}</span>
            </div>

            <CommunityFavoriteButton isFavorite={isFavorite} />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  );
}
