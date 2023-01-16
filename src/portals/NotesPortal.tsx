import { useRef } from "react";
import { createPortal } from "react-dom";
import { Note } from "../components";
import { NoteContainer } from "../components/styled-components";
import { NoteType } from "../types";

let prevNoteId = "";
let prevZIndex = "1";

export const NotesPortal = (props: {
  setSelctedNote: Function;
  setModalOpen: Function;
  trashZoneRef: any;
  getDraggedNote: Function;
  onNoteResizeChange: Function;
  note: NoteType;
}) => {
  const noteRef = useRef<HTMLInputElement>(null);

  const onMouseDrag = (movementX: number, movementY: number) => {
    if (!noteRef.current) return;
    const { x, y, width: elWidth } = noteRef.current.getBoundingClientRect();
    const {
      x: trashZoneX,
      y: trashZoneY,
      height,
      width,
    } = props.trashZoneRef.current.getBoundingClientRect();

    // only update zIndex if a new element is being dragged
    // we do this by storing the last zindex and then updating it by 1.
    // this ensure the new pin being dragged has the highest zIndex on the page.
    if (prevNoteId !== props.note.noteId) {
      const newZIndex = String(parseInt(prevZIndex) + 1);
      noteRef.current.style.zIndex = newZIndex;
      prevZIndex = newZIndex;
      prevNoteId = props.note.noteId;
    }

    /**
     * to calculate minTrashZoneX, we substract the note's width from the x position of the trashZone. 
     * This is to ensure that the tip of the note is recognised immediately it crosses the zone.
     * Similarly, the maxTrashZoneX is calculated below so as to ensure we detect immediately the pin leaves the zone.
     */

    const newX = x + movementX;
    const newY = y + movementY;
    const minTrashZoneX = trashZoneX - elWidth;
    const maxTrashZoneX = trashZoneX + width + elWidth;
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

  const onDraggerMouseUp = () => {
    if (!noteRef.current) return;
    const { x, y } = noteRef.current.getBoundingClientRect();

    // only update position in redux store if position changed
    if (props.note.notePosX !== x || props.note.notePosY !== y) {
      props.note.notePosX = x;
      props.note.notePosY = y;
      props.onNoteResizeChange(props.note);
    }
  };

  const newProps = { ...props, onMouseDrag, onDraggerMouseUp };

  return createPortal(
    <NoteContainer
      ref={noteRef}
      top={props.note.notePosY}
      left={props.note.notePosX}
    >
      <Note {...newProps} />
    </NoteContainer>,
    document.getElementById("notes-section")!
  );
};
