import { render, screen, fireEvent } from "@testing-library/react";
import { NOTE_CONSTANTS } from "../../../constants";
import { Note } from "../../Notes/Note";

const setSelctedNote = jest.fn();
const setModalOpen = jest.fn();
const onMouseDrag = jest.fn();
const onNoteResizeChange = jest.fn();
const onDraggerMouseUp = jest.fn();

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
  onMouseDrag,
  onNoteResizeChange,
  onDraggerMouseUp,
};

test("renders note with styles passed to it", () => {
  render(<Note {...props} />);
  expect(screen.getByLabelText("Sticky Note")).toHaveStyle(
    `height: ${props.note.noteHeight}px; width: ${props.note.noteWidth}px; background-color: ${props.note.color};`
  );
});

test("renders title when edit icon wrapper is hovered upon", () => {
  render(<Note {...props} />);
  fireEvent.mouseOver(screen.getByLabelText("Edit Note Icon Wrapper"));
  expect(
    screen.getByTitle(`Edit ${props.note.noteTitle} note.`)
  ).toBeInTheDocument();
});

test("changes cursor appropriately when resizers are hovered upon", () => {
  render(<Note {...props} />);

  // hover over bottom side resizer
  fireEvent.mouseOver(screen.getByLabelText("Bottom Side Resizer"));
  expect(screen.getByLabelText("Bottom Side Resizer")).toHaveStyle(
    "cursor: row-resize;"
  );

  // hover over right side resizer
  fireEvent.mouseOver(screen.getByLabelText("Right Side Resizer"));
  expect(screen.getByLabelText("Right Side Resizer")).toHaveStyle(
    "cursor: col-resize;"
  );
});

test("increases note height when bottom side resizer is dragged down", () => {
  render(<Note {...props} />);

  const bottomEl = screen.getByLabelText("Bottom Side Resizer");
  fireEvent.mouseDown(bottomEl);
  fireEvent.mouseMove(bottomEl, { clientY: props.note.notePosY });
  fireEvent.mouseUp(bottomEl);
  expect(onNoteResizeChange).toBeCalled();

  // expect height of note to have increased by props.note.notePosY
  const newNoteProps = {
    ...props.note,
    noteHeight: props.note.noteHeight + props.note.notePosY,
  };
  expect(screen.getByLabelText("Sticky Note")).toHaveStyle(
    `height: ${newNoteProps.noteHeight}px;`
  );
});


test("calls setSelctedNote and setModalOpen with appropriate props when edit icon is clicked", () => {
  render(<Note {...props} />);
  fireEvent.click(screen.getByLabelText("Edit Note Icon"));
  expect(setSelctedNote).toBeCalledWith(props.note);
  expect(setModalOpen).toBeCalledWith(true);
});

test("renders title and note content", () => {
  render(<Note {...props} />);
  expect(screen.getByText(props.note.noteTitle)).toBeInTheDocument();
  expect(screen.getByText(props.note.noteContent)).toBeInTheDocument();
});
