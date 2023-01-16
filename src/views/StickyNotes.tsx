import { useRef, useState } from "react";
import {
  NotesModal,
  Banner,
  Notes,
  TrashZone,
  DeleteNoteModal,
} from "../components";
import { NoteType } from "../types";
import { TrashZoneContainer } from "./styled-components";

let draggedNote: NoteType | null = null;

export const StickyNotes = ({ actions }: any) => {
  const [showModal, setModalOpen] = useState<boolean>(false);
  const [showDeleteNoteModal, setDeleteNoteModalOpen] =
    useState<boolean>(false);
  const [selectedNote, setSelctedNote] = useState<NoteType | null>(null);
  const trashZoneRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (note: NoteType) => {
    if (!!selectedNote) actions.editNote(note);
    else actions.addNote(note);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelctedNote(null);
    setDeleteNoteModalOpen(false);
  };

  const handleDeleteNote = () => {
    actions.deleteNote(draggedNote?.noteId);
    handleCloseModal();
  };

  const getDraggedNote = (note: NoteType) => {
    if (draggedNote?.noteId !== note.noteId) {
      draggedNote = note;
      setDeleteNoteModalOpen(true);
    }
  };

  return (
    <>
      <NotesModal
        title="Add New Note"
        onClose={handleCloseModal}
        showModal={showModal}
        onSubmit={handleSubmit}
        primaryButtonText={!!selectedNote ? "Edit Note" : "Create Note"}
        noteData={selectedNote}
      />
      <DeleteNoteModal
        showModal={showDeleteNoteModal}
        noteTitle={draggedNote?.noteTitle}
        onClose={handleCloseModal}
        onPrimaryButtonClick={handleDeleteNote}
      />
      <Banner setModalOpen={setModalOpen} />
      <TrashZoneContainer>
        <TrashZone ref={trashZoneRef} />
      </TrashZoneContainer>
      <Notes
        setSelctedNote={setSelctedNote}
        setModalOpen={setModalOpen}
        trashZoneRef={trashZoneRef}
        getDraggedNote={getDraggedNote}
      />
    </>
  );
};
