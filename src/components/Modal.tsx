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
}: {
  showModal: boolean;
  onClose: Function | any;
  title: string;
  children: ReactElement;
  onPrimaryButtonClick: MouseEventHandler<HTMLButtonElement>;
  primaryButtonText: string;
}): ReactElement => {
  return (
    <RModal show={showModal} onHide={onClose}>
      <RModal.Header closeButton>
        <RModal.Title>{title}</RModal.Title>
      </RModal.Header>
      <RModal.Body>{children}</RModal.Body>
      <RModal.Footer>
        <ButtonWrapper>
          <Button
            variant="success"
            onClick={onPrimaryButtonClick}
            type="submit"
          >
            {primaryButtonText}
          </Button>
        </ButtonWrapper>
      </RModal.Footer>
    </RModal>
  );
};
