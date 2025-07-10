import Bar3 from "@/components/icons/bar3";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/ui/button";

export default function HomePage() {
  return (
    <div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <Button>Delete Me!!</Button>
      <Button isIcon>
        <Bar3 />
      </Button>
    </div>
  );
}
