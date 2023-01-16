import { useRef } from "react";
import { createPortal } from "react-dom";
import { Note } from "../components";
import { NoteContainer } from "../components/styled-components";

export const NotesPortal = (props: any) => {
  const noteRef = useRef<HTMLInputElement>(null);

  const onMouseDrag = (movementX: number, movementY: number) => {
    if (!noteRef.current) return;
    const { x, y } = noteRef.current.getBoundingClientRect();

    const zIndex = window.getComputedStyle(noteRef?.current).zIndex;
console.log(window.getComputedStyle(noteRef?.current))
    noteRef.current.style.left = `${x + movementX}px`;
    noteRef.current.style.top = `${y + movementY}px`;
    noteRef.current.style.zIndex = String(
      Number(isNaN(parseInt(zIndex)) ? 0 : zIndex) + 1
    );
  };

  const newProps = { ...props, onMouseDrag };

  return createPortal(
    <NoteContainer ref={noteRef}>
      <Note {...newProps} />
    </NoteContainer>,
    document.getElementById("notes-section")!
  );
};
