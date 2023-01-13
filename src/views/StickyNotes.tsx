import { useState } from "react";
import { useSelector } from "react-redux";
import { Note, NotesModal, Banner, NoteDetail } from "../components";
import { NoteType } from "../types";
import { NoteWrapper } from "./styled-components";

export const StickyNotes = ({ actions }: any) => {
  const notes = useSelector((state: any) => state?.notes?.notes);
  const [showModal, setModalOpen] = useState<boolean>(false);
  const [selectedNote, setSelctedNote] = useState<NoteType | null>(null);
  const [viewDetails, setViewDetails] = useState<NoteType | null>(null);

  const handleSubmit = (note: NoteType) => {
    if (!!selectedNote) actions.editNote(note);
    else actions.addNote(note);
    setModalOpen(false);
    setSelctedNote(null);
  };

  const handleCloseDetailModal = () => {
    setModalOpen(false);
    setViewDetails(null);
  };

  return (
    <>
      {!!viewDetails && (
        <NoteDetail
          note={viewDetails}
          onClose={handleCloseDetailModal}
          showModal={!!viewDetails}
        />
      )}
      {showModal && (
        <NotesModal
          title="Add New Note"
          onClose={() => setModalOpen(false)}
          showModal={showModal}
          onSubmit={handleSubmit}
          primaryButtonText={!!selectedNote ? "Edit Note" : "Create Note"}
          noteData={selectedNote}
        />
      )}
      <Banner setModalOpen={setModalOpen} />
      <NoteWrapper>
        {notes?.map((note: NoteType) => {
          return (
            <Note
              note={note}
              key={note.noteId}
              setSelctedNote={setSelctedNote}
              setModalOpen={setModalOpen}
              setViewDetails={setViewDetails}
            />
          );
        })}
      </NoteWrapper>
    </>
  );
};
