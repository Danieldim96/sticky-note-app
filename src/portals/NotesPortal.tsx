import { useRef } from "react";
import { createPortal } from "react-dom";
import { Note } from "../components";
import { NoteContainer } from "../components/styled-components";

let prevNoteId = "";
let prevZIndex = "1";

export const NotesPortal = (props: any) => {
  const noteRef = useRef<HTMLInputElement>(null);

  const onMouseDrag = (movementX: number, movementY: number) => {
    if (!noteRef.current) return;
    const { x, y } = noteRef.current.getBoundingClientRect();
    const {
      y: trashZoneY,
      height,
      width,
    } = props.trashZoneRef.current.getBoundingClientRect();

    if (prevNoteId !== props.note.noteId) {
      const newZIndex = String(parseInt(prevZIndex) + 1);
      noteRef.current.style.zIndex = newZIndex;
      prevZIndex = newZIndex;
      prevNoteId = props.note.noteId;
    }

    const newX = x + movementX;
    const newY = y + movementY;
    const minTrashZoneX = window.innerWidth / 2 - width / 2;
    const maxTrashZoneX = window.innerWidth / 2 + width / 2;
    const maxTrashZoneY = trashZoneY + height;
    const minTrashZoneY = trashZoneY;

    // determine if note entered trash zone
    if (
      newX >= minTrashZoneX &&
      newX <= maxTrashZoneX &&
      newY >= minTrashZoneY &&
      newY <= maxTrashZoneY
    ) {
      props.getDraggedNote(props.note);
    }

    noteRef.current.style.left = `${newX}px`;
    noteRef.current.style.top = `${newY}px`;
  };

  const newProps = { ...props, onMouseDrag };

  return createPortal(
    <NoteContainer ref={noteRef}>
      <Note {...newProps} />
    </NoteContainer>,
    document.getElementById("notes-section")!
  );
};
