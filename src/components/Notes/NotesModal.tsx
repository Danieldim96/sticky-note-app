import { useState } from "react";
import { Modal } from "../Modal";
import { NoteType } from "../../types";
import { getUniqueId } from "../../utils";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export const NotesModal = ({
  onClose,
  showModal,
  onSubmit,
  noteData,
}: {
  onClose: Function;
  showModal: boolean;
  onSubmit: Function;
  noteData: NoteType | null;
}) => {
  const primaryText = !!noteData ? "Edit Note" : "Create Note";
  const Title = !!noteData
    ? `Edit ${noteData.noteTitle} Note`
    : "Create New Note";
  const noteObject = !!noteData
    ? {
        noteContent: noteData?.noteContent,
        noteTitle: noteData?.noteTitle,
        noteId: noteData?.noteId,
        noteWidth: noteData?.noteWidth,
        noteHeight: noteData?.noteHeight,
      }
    : { noteContent: "", noteTitle: "", noteId: getUniqueId(5) };

  const [note, setNoteData] = useState<NoteType>(noteObject);

  const [error, setError] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError("");
    // validate errors
    const errors = Object.values(note).some((value) => !value);
    if (errors) {
      return setError("Please ensure all fields are filled");
    }
    onSubmit(note);
  };

  return (
    <Modal
      showModal={showModal}
      onClose={onClose}
      title={Title}
      onPrimaryButtonClick={handleSubmit}
      primaryButtonText={primaryText}
    >
      <>
        {!!error && (
          <Alert variant="danger" aria-label="Modal Alert">
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Note Title</Form.Label>
            <Form.Control
              placeholder="Enter Note Title"
              onChange={(e) =>
                setNoteData({ ...note, noteTitle: e.target.value })
              }
              required
              value={note?.noteTitle}
              aria-label="Note Title"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Note Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Note Content"
              onChange={(e) => {
                setNoteData({ ...note, noteContent: e.target.value });
              }}
              required
              value={note.noteContent}
              aria-label="Note Content"
            />
          </Form.Group>
        </Form>
      </>
    </Modal>
  );
};
