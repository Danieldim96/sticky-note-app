import { useState } from "react";
import { NotesModal, Banner, Notes } from "../components";
import { NoteType } from "../types";

export const StickyNotes = ({ actions }: any) => {
  const [showModal, setModalOpen] = useState<boolean>(false);
  const [selectedNote, setSelctedNote] = useState<NoteType | null>(null);

  const handleSubmit = (note: NoteType) => {
    if (!!selectedNote) actions.editNote(note);
    else actions.addNote(note);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelctedNote(null);
  };

  return (
    <>
      {showModal && (
        <NotesModal
          title="Add New Note"
          onClose={handleCloseModal}
          showModal={showModal}
          onSubmit={handleSubmit}
          primaryButtonText={!!selectedNote ? "Edit Note" : "Create Note"}
          noteData={selectedNote}
        />
      )}
      <Banner setModalOpen={setModalOpen} />
      <Notes setSelctedNote={setSelctedNote} setModalOpen={setModalOpen} />
    </>
  );
};
