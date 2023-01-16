import { useSelector } from "react-redux";
import { NotesPortal } from "../../portals";
import { NoteType } from "../../types";
import { NoteWrapper } from "../styled-components";

export const Notes = ({
  setSelctedNote,
  setModalOpen,
  trashZoneRef,
  getDraggedNote,
}: {
  setSelctedNote: Function;
  setModalOpen: Function;
  trashZoneRef: any;
  getDraggedNote: Function;
}) => {
  const notes = useSelector((state: any) => state?.notes?.notes);

  return (
    <NoteWrapper>
      {notes?.map((note: NoteType) => {
        return (
          <NotesPortal
            note={note}
            key={note.noteId}
            setSelctedNote={setSelctedNote}
            setModalOpen={setModalOpen}
            trashZoneRef={trashZoneRef}
            getDraggedNote={getDraggedNote}
          />
        );
      })}
    </NoteWrapper>
  );
};
