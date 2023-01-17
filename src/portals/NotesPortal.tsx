import { createPortal } from "react-dom";
import { NoteContainer } from "../components";
import { NoteType } from "../types";

export const NotesPortal = (props: {
  setSelctedNote: Function;
  setModalOpen: Function;
  trashZoneRef: any;
  getDraggedNote: Function;
  onNoteResizeChange: Function;
  note: NoteType;
}) => {
  return createPortal(
    <NoteContainer {...props} />,
    document.getElementById("notes-section")!
  );
};
