import DefaultCommunityAvatar from "@/components/icons/default-community-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type Props = {
  name: string;
  description: string;
  withImages: boolean;
  banner?: string;
  avatar?: string;
};

export default function CommunityPreview({
  name,
  description,
  avatar,
  banner,
  withImages
}: Props) {
  return (
    <Card className="pt-0 pb-4 gap-2 rounded-sm border-0 shadow-[1px_2px_4px_1px_#00000030] overflow-hidden">
      {withImages && (
        <div className="h-10 bg-[#fceee8]">
          {banner && (
            <Image
              className="size-full object-cover"
              src={banner}
              alt="Community Banner"
              width={500}
              height={50}
            />
          )}
        </div>
      )}

      <CardHeader className="px-4 pt-4 flex items-center gap-4">
        {withImages && (
          <Avatar className="size-12">
            <AvatarImage
              className="object-cover"
              src={avatar}
              alt="Community Avatar"
            />
            <AvatarFallback>
              <DefaultCommunityAvatar className="size-full text-[#D93900]" />
            </AvatarFallback>
          </Avatar>
        )}

        <div>
          <CardTitle className="text-[#181C1F] text-xl font-semibold mb-1">
            r/{name || "communityname"}
          </CardTitle>
          <p className="text-[#5C6C74] text-xs">1 member ·1 online</p>
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-[#333D42] text-sm">
          {description || "Your community description"}
        </p>
      </CardContent>
    </Card>
  );
}
