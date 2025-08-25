import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CommunityPreview() {
  return (
    <Card className="py-4 gap-2 rounded-sm border-0 shadow-[1px_2px_4px_1px_#00000030]">
      <CardHeader className="px-4 gap-1">
        <CardTitle className="text-[#181C1F] text-xl font-semibold">
          r/communityname
        </CardTitle>
        <p className="text-[#5C6C74] text-xs">1 member ·1 online</p>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-[#333D42] text-sm">Your community description</p>
      </CardContent>
    </Card>
  );
}
