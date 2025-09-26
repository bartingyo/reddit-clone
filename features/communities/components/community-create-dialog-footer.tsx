import Button from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { MouseEvent } from "react";

type Props = {
  isCancelable: boolean;
  isSavable: boolean;
  isNextDisabled: boolean;
  onClose: (event: MouseEvent<HTMLButtonElement>) => void;
  onSave?: () => void;
  onBack: () => void;
  onNext: () => void;
};

export default function CommunityCreateDialogFooter({
  isNextDisabled,
  isCancelable,
  isSavable,
  onClose,
  onBack,
  onSave,
  onNext
}: Props) {
  return (
    <DialogFooter className="flex-row justify-end">
      {isCancelable && (
        <DialogClose asChild>
          <Button variant="secondary" size="lg" onClick={onClose}>
            Cancel
          </Button>
        </DialogClose>
      )}
      {!isCancelable && (
        <Button variant="secondary" size="lg" onClick={onBack}>
          Back
        </Button>
      )}
      {isSavable && (
        <Button variant="primary" size="lg" onClick={onSave}>
          Save
        </Button>
      )}
      {!isSavable && (
        <Button
          variant="primary"
          size="lg"
          disabled={isNextDisabled}
          onClick={onNext}
        >
          Next
        </Button>
      )}
    </DialogFooter>
  );
}
