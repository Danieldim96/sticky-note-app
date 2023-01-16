import { NoteType } from "../../types";
import {
  AddPointerCursor,
  JustifyText,
  StyledNote,
} from "../styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PencilSquare } from "react-bootstrap-icons";
import { useRef } from "react";
import { NoteResizer } from "./NoteResizer";
import { MOUSE_DIRECTIONS } from "../../constants";
import { NoteTopDrager } from "./NoteTopDrager";

export const Note = ({
  note,
  setSelctedNote,
  setModalOpen,
  onMouseDrag,
}: {
  note: NoteType;
  setSelctedNote: Function;
  setModalOpen: Function;
  onMouseDrag: Function;
}) => {
  const noteRef = useRef<HTMLInputElement>(null);

  const { noteContent, noteHeight, noteTitle, noteWidth } = note;

  const handleEditIconClick = () => {
    setSelctedNote(note);
    setModalOpen(true);
  };

  const onMouseResize = (
    movementX: number,
    movementY: number,
    direction: string
  ) => {
    const eleRef = noteRef?.current;
    if (!eleRef) return;

    const { width, height } = eleRef.getBoundingClientRect();

    switch (direction) {
      case MOUSE_DIRECTIONS.right:
        eleRef.style.width = `${width + movementX}px`;
        break;

      case MOUSE_DIRECTIONS.bottom:
        eleRef.style.height = `${height + movementY}px`;
        break;

      default:
        break;
    }
  };

  return (
    <StyledNote height={noteHeight} width={noteWidth} ref={noteRef}>
      <NoteTopDrager onMouseDrag={onMouseDrag} />
      <NoteResizer onMouseResize={onMouseResize} />
      <AddPointerCursor title={`Edit ${noteTitle} note.`}>
        <PencilSquare onClick={handleEditIconClick} />
      </AddPointerCursor>
      <Row className="mt-3">
        <Col>
          <h5>{noteTitle}</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <JustifyText>{noteContent}</JustifyText>
        </Col>
      </Row>
    </StyledNote>
  );
};
