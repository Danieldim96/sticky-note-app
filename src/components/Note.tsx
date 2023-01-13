import { NoteType } from "../types";
import { EditIconWrapper, FlexEllipsis, StyledNote } from "./styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PencilSquare } from "react-bootstrap-icons";

export const Note = ({
  note,
  setSelctedNote,
  setModalOpen,
}: {
  note: NoteType;
  setSelctedNote: Function;
  setModalOpen: Function;
}) => {
  const { noteContent, noteHeight, noteTitle, noteWidth } = note;

  const handleEditIconClick = () => {
    setSelctedNote(note);
    setModalOpen(true);
  };

  return (
    <StyledNote height={noteHeight} width={noteWidth}>
      <EditIconWrapper title={`Edit ${noteTitle} note.`}>
        <PencilSquare onClick={handleEditIconClick} />
      </EditIconWrapper>
      <Row className="mt-3">
        <Col>
          <h5>{noteTitle}</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <FlexEllipsis>{noteContent}</FlexEllipsis>
        </Col>
      </Row>
    </StyledNote>
  );
};
