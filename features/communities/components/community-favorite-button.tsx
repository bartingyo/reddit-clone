"use client";

import StarOutline from "@/components/icons/star-outline";
import StarSolid from "@/components/icons/star-solid";
import Button from "@/components/ui/button";
import { MouseEvent, useState } from "react";

type Props = {
  isFavorite?: boolean;
};

export default function CommunityFavoriteButton({ isFavorite = false }: Props) {
  const [_isFavorite, setIsFavorite] = useState<boolean>(isFavorite);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsFavorite((prev) => !prev);

    // server action
  };

  return (
    <Button
      variant="plain"
      size="sm"
      isIcon
      className="[&_svg]:size-5"
      onClick={handleClick}
    >
      {_isFavorite ? <StarSolid /> : <StarOutline className="stroke-1" />}
    </Button>
  );
}
