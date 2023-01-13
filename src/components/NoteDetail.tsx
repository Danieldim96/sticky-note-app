import { MouseEventHandler } from "react";
import { NoteType } from "../types";
import { Modal } from "./Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { JustifyText } from "./styled-components";

export const NoteDetail = ({
  note: { noteContent, noteTitle },
  onClose,
  showModal,
}: {
  note: NoteType;
  onClose: MouseEventHandler<HTMLButtonElement>;
  showModal: boolean;
}) => {
  return (
    <Modal
      showModal={showModal}
      onClose={onClose}
      title={noteTitle}
      onPrimaryButtonClick={onClose}
      primaryButtonText="Close"
    >
      <Row>
        <Col>
          <JustifyText>{noteContent}</JustifyText>
        </Col>
      </Row>
    </Modal>
  );
};
