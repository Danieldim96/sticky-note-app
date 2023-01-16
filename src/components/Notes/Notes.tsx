import { useSelector } from "react-redux";
import { NotesPortal } from "../../portals";
import { NoteType } from "../../types";
import { NoteWrapper } from "../styled-components";

export const Notes = ({
  setSelctedNote,
  setModalOpen,
}: {
  setSelctedNote: Function;
  setModalOpen: Function;
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
          />
        );
      })}
    </NoteWrapper>
  );
};
