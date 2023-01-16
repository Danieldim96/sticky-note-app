import { MouseEventHandler } from "react";
import { Modal } from "../Modal";
import { JustifyText } from "../styled-components";

export const DeleteNoteModal = ({
  showModal,
  noteTitle,
  onClose,
  onPrimaryButtonClick,
}: {
  showModal: boolean;
  noteTitle?: string;
  onPrimaryButtonClick: MouseEventHandler<HTMLButtonElement>;
  onClose: Function;
}) => {
  if (!showModal) return null;
  return (
    <Modal
      showModal={showModal}
      onClose={onClose}
      title={`Delete ${noteTitle} note`}
      onPrimaryButtonClick={onPrimaryButtonClick}
      primaryButtonText="Delete Note"
      variant="danger"
    >
      <JustifyText>Do you want to delete {noteTitle} note? </JustifyText>
    </Modal>
  );
};
