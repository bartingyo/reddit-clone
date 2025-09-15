import Button from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { MouseEvent } from "react";

type Props = {
  isCancelable: boolean;
  isSavable: boolean;
  isNextDisabled: boolean;
  onCloseClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onSaveClick: () => void;
  onBackClick: () => void;
  onNextClick: () => void;
};

export default function CommunityCreateDialogFooter({
  isNextDisabled,
  isCancelable,
  isSavable,
  onCloseClick,
  onBackClick,
  onSaveClick,
  onNextClick
}: Props) {
  return (
    <DialogFooter className="flex-row justify-end">
      {isCancelable && (
        <DialogClose asChild>
          <Button variant="secondary" size="lg" onClick={onCloseClick}>
            Cancel
          </Button>
        </DialogClose>
      )}
      {!isCancelable && (
        <Button variant="secondary" size="lg" onClick={onBackClick}>
          Back
        </Button>
      )}
      {isSavable && (
        <Button variant="primary" size="lg" onClick={onSaveClick}>
          Save
        </Button>
      )}
      {!isSavable && (
        <Button
          variant="primary"
          size="lg"
          disabled={isNextDisabled}
          onClick={onNextClick}
        >
          Next
        </Button>
      )}
    </DialogFooter>
  );
}
