import { MouseEventHandler, ReactElement } from "react";
import Button from "react-bootstrap/Button";
import RModal from "react-bootstrap/Modal";
import { ButtonWrapper } from "./styled-components";

export const Modal = ({
  showModal,
  onClose,
  title,
  children,
  onPrimaryButtonClick,
  primaryButtonText,
  variant = "success",
}: {
  showModal: boolean;
  onClose: Function | any;
  title: string;
  children: ReactElement;
  onPrimaryButtonClick: MouseEventHandler<HTMLButtonElement>;
  primaryButtonText: string;
  variant?: string;
}): ReactElement => {
  return (
    <RModal show={showModal} onHide={onClose}>
      <RModal.Header closeButton>
        <RModal.Title aria-label="Modal Title">{title}</RModal.Title>
      </RModal.Header>
      <RModal.Body>{children}</RModal.Body>
      <RModal.Footer>
        <ButtonWrapper>
          <Button
            variant={variant}
            onClick={onPrimaryButtonClick}
            type="submit"
            aria-label="Primary Modal Button"
          >
            {primaryButtonText}
          </Button>
        </ButtonWrapper>
      </RModal.Footer>
    </RModal>
  );
};
