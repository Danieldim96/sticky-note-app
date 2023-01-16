import { useSelector } from "react-redux";
import { NotesPortal } from "../../portals";
import { NoteType } from "../../types";
import { NoteWrapper } from "../styled-components";

export const Notes = (props: {
  setSelctedNote: Function;
  setModalOpen: Function;
  trashZoneRef: any;
  getDraggedNote: Function;
  onNoteResizeChange: Function;
}) => {
  const notes = useSelector((state: any) => state?.notes?.notes);

  /**
   * rendering each individual note in its own portal to allow for maximum positioning of each note
   * without interfering with other notes.
   */

  return (
    <NoteWrapper>
      {notes?.map((note: NoteType) => {
        const newProps = { ...props, note };
        return <NotesPortal {...newProps} key={note.noteId} />;
      })}
    </NoteWrapper>
  );
};
