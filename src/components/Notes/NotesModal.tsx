import { useState } from "react";
import { Modal } from "../Modal";
import { NoteType } from "../../types";
import { getUniqueId } from "../../utils";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

export const NotesModal = ({
  title,
  onClose,
  showModal,
  onSubmit,
  primaryButtonText,
  noteData,
}: {
  title: string;
  onClose: Function;
  showModal: boolean;
  onSubmit: Function;
  primaryButtonText: string;
  noteData: NoteType | null;
}) => {
  const [note, setNoteData] = useState<NoteType>({
    noteContent: noteData?.noteContent ?? "",
    noteHeight: noteData?.noteHeight ?? 300,
    noteTitle: noteData?.noteTitle ?? "",
    noteWidth: noteData?.noteWidth ?? 200,
    noteId: noteData?.noteId ?? getUniqueId(5),
  });
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
      title={title}
      onPrimaryButtonClick={handleSubmit}
      primaryButtonText={primaryButtonText}
    >
      <>
        {!!error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Note Title</Form.Label>
            <Form.Control
              placeholder="Enter Note Title"
              onChange={(e) =>
                setNoteData({ ...note, noteTitle: e.target.value })
              }
              required
              value={note.noteTitle}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Note Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Note Content"
              onChange={(e) =>
                setNoteData({ ...note, noteContent: e.target.value })
              }
              required
              value={note.noteContent}
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Note Width</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Note Width"
                onChange={(e) =>
                  setNoteData({ ...note, noteWidth: parseInt(e.target.value) })
                }
                required
                value={note.noteWidth}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Note Height</Form.Label>
              <Form.Control
                value={note.noteHeight}
                placeholder="Enter Note Height"
                type="number"
                onChange={(e) =>
                  setNoteData({ ...note, noteHeight: parseInt(e.target.value) })
                }
                required
              />
            </Form.Group>
          </Row>
        </Form>
      </>
    </Modal>
  );
};
