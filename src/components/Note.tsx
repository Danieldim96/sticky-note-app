import { NoteType } from "../types";
import { AddPointerCursor, StyledNote } from "./styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PencilSquare } from "react-bootstrap-icons";
import { MouseEventHandler, useRef } from "react";
import { NoteResizer } from "./NoteResizer";
import { MOUSE_DIRECTIONS } from "../constants";

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
  const noteRef = useRef<any>(null);

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
    if (!noteRef.current) return;

    const { width, height, x, y } = noteRef.current.getBoundingClientRect();

    switch (direction) {
      case MOUSE_DIRECTIONS.right:
        noteRef.current.style.width = `${width + movementX}px`;
        break;
      case MOUSE_DIRECTIONS.left:
        noteRef.current.style.width = `${width - movementX}px`;
        noteRef.current.style.left = `${x + movementX}px`;
        break;
      case MOUSE_DIRECTIONS.bottom:
        noteRef.current.style.height = `${height + movementY}px`;
        break;
      case MOUSE_DIRECTIONS.top:
        noteRef.current.style.height = `${height - movementY}px`;
        noteRef.current.style.top = `${y + movementY}px`;
        break;

      default:
        break;
    }
  };

  return (
    <StyledNote height={noteHeight} width={noteWidth} ref={noteRef}>
      <NoteResizer onMouseResize={onMouseResize} />
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
          <Col>{noteContent}</Col>
        </Row>
      </AddPointerCursor>
    </StyledNote>
  );
};
