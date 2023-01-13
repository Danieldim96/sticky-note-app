import { NoteType } from "../types";
import {
  AddPointerCursor,
  FlexEllipsis,
  StyledNote,
} from "./styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PencilSquare } from "react-bootstrap-icons";
import { MouseEventHandler } from "react";

export const Note = ({
  note,
  setSelctedNote,
  setModalOpen,
  setViewDetails,
}: {
  note: NoteType;
  setSelctedNote: Function;
  setModalOpen: Function;
  setViewDetails: MouseEventHandler<HTMLDivElement> | any;
}) => {
  const { noteContent, noteHeight, noteTitle, noteWidth } = note;

  const handleEditIconClick = () => {
    setSelctedNote(note);
    setModalOpen(true);
  };

  return (
    <StyledNote height={noteHeight} width={noteWidth}>
      <AddPointerCursor title={`Edit ${noteTitle} note.`}>
        <PencilSquare onClick={handleEditIconClick} />
      </AddPointerCursor>
      <AddPointerCursor onClick={() => setViewDetails(note)}>
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
      </AddPointerCursor>
    </StyledNote>
  );
};
