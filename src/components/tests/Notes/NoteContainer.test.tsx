import { render, screen, fireEvent } from "@testing-library/react";
import { NOTE_CONSTANTS } from "../../../constants";
import { NoteContainer } from "../../Notes/NoteContainer";

const setSelctedNote = jest.fn();
const setModalOpen = jest.fn();
const onNoteResizeChange = jest.fn();
const getDraggedNote = jest.fn();

const props = {
  note: {
    noteId: "test_id",
    noteContent: "test content",
    noteTitle: "test title",
    noteHeight: NOTE_CONSTANTS.height,
    noteWidth: NOTE_CONSTANTS.width,
    notePosX: NOTE_CONSTANTS.PosX,
    notePosY: NOTE_CONSTANTS.PosY,
    color: "#000000",
  },
  setSelctedNote,
  setModalOpen,
  trashZoneRef: { current: <div>test</div> },
  onNoteResizeChange,
  getDraggedNote,
};

test("renders note container with styles passed to it", () => {
  render(<NoteContainer {...props} />);
  expect(screen.getByLabelText("Sticky Notes Container")).toHaveStyle(
    `top: ${props.note.notePosY}px; left: ${props.note.notePosX}px;`
  );
});

test("changes cursor appropriately when draggers are hovered upon", () => {
  render(<NoteContainer {...props} />);

  fireEvent.mouseOver(screen.getByLabelText("Note Dragger"));
  expect(screen.getByLabelText("Note Dragger")).toHaveStyle("cursor: move;");
});
