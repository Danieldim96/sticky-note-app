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
let selectedNote: NoteType | null = null;

export const StickyNotes = ({ actions }: any) => {
  const [showModal, setModalOpen] = useState<boolean>(false);
  const [showDeleteNoteModal, setDeleteNoteModalOpen] =
    useState<boolean>(false);
  const trashZoneRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (note: NoteType) => {
    if (!!selectedNote) actions.editNote(note);
    else actions.addNote(note);
    handleCloseModal();
  };

  const getSelectedNote = (note: NoteType) => {
    selectedNote = note;
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    selectedNote = null;
    setDeleteNoteModalOpen(false);
  };

  const handleDeleteNote = () => {
    actions.deleteNote(draggedNote?.noteId);
    handleCloseModal();
  };

  const getDraggedNote = (note: NoteType) => {
    if (draggedNote?.noteId !== note.noteId) {
      draggedNote = note;
    }
    setDeleteNoteModalOpen(true);
  };

  const handleNoteResizeSave = (note: NoteType) => {
    actions.editNote(note);
  };

  return (
    <>
      {showModal && (
        <NotesModal
          onClose={handleCloseModal}
          showModal={showModal}
          onSubmit={handleSubmit}
          noteData={selectedNote}
        />
      )}
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
        setSelctedNote={getSelectedNote}
        setModalOpen={setModalOpen}
        trashZoneRef={trashZoneRef}
        getDraggedNote={getDraggedNote}
        onNoteResizeChange={handleNoteResizeSave}
      />
    </>
  );
};
