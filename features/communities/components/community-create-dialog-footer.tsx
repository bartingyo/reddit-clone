import Button from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { CommunityCreateStage } from "@/features/communities/types";

type Props = {
  stage: CommunityCreateStage;
  isNextDisabled: boolean;
  onBackClick: () => void;
  onNextClick: () => void;
};

export default function CommunityCreateDialogFooter({
  stage,
  isNextDisabled,
  onBackClick,
  onNextClick
}: Props) {
  return (
    <DialogFooter className="flex-row justify-end">
      {stage === CommunityCreateStage.One && (
        <DialogClose asChild>
          <Button variant="secondary" size="lg">
            Cancel
          </Button>
        </DialogClose>
      )}
      {stage !== CommunityCreateStage.One && (
        <Button variant="secondary" size="lg" onClick={onBackClick}>
          Back
        </Button>
      )}
      <Button
        variant="primary"
        size="lg"
        disabled={isNextDisabled}
        onClick={onNextClick}
      >
        Next
      </Button>
    </DialogFooter>
  );
}
