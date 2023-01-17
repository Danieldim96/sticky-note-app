import { NoteType } from "../../types";
import {
  AddPointerCursor,
  JustifyText,
  RowWrapper,
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
  onNoteResizeChange,
  onDraggerMouseUp,
}: {
  note: NoteType;
  setSelctedNote: Function;
  setModalOpen: Function;
  onMouseDrag: Function;
  onNoteResizeChange: Function;
  onDraggerMouseUp: Function;
}) => {
  const noteRef = useRef<HTMLInputElement>(null);

  const { noteContent, noteHeight, noteTitle, noteWidth, color } = note;

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

  const onResizerMouseUp = () => {
    const eleRef = noteRef?.current;
    if (!eleRef) return;
    const { width, height } = eleRef.getBoundingClientRect();
    if (note.noteHeight !== height || note.noteWidth !== width) {
      note.noteHeight = height;
      note.noteWidth = width;
      onNoteResizeChange(note);
    }
  };

  return (
    <StyledNote
      notebgColor={color}
      noteHeight={noteHeight}
      noteWidth={noteWidth}
      ref={noteRef}
      aria-label="Sticky Note"
    >
      <NoteTopDrager onMouseDrag={onMouseDrag} onMouseUp={onDraggerMouseUp} />
      <NoteResizer onMouseResize={onMouseResize} onMouseUp={onResizerMouseUp} />
      <AddPointerCursor
        title={`Edit ${noteTitle} note.`}
        aria-label="Edit Note Icon Wrapper"
      >
        <PencilSquare onClick={handleEditIconClick} aria-label='Edit Note Icon' />
      </AddPointerCursor>
      <RowWrapper>
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
      </RowWrapper>
    </StyledNote>
  );
};
