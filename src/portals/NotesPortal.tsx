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

    if (prevNoteId !== props.note.noteId) {
      const newZIndex = String(parseInt(prevZIndex) + 1);
      noteRef.current.style.zIndex = newZIndex;
      prevZIndex = newZIndex;
      prevNoteId = props.note.noteId;
    }

    noteRef.current.style.left = `${x + movementX}px`;
    noteRef.current.style.top = `${y + movementY}px`;
  };

  const newProps = { ...props, onMouseDrag };

  return createPortal(
    <NoteContainer ref={noteRef}>
      <Note {...newProps} />
    </NoteContainer>,
    document.getElementById("notes-section")!
  );
};
