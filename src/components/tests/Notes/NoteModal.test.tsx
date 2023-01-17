import { render, screen, fireEvent } from "@testing-library/react";
import { NOTE_CONSTANTS } from "../../../constants";
import { NotesModal } from "../../Notes/NotesModal";

const onClose = jest.fn();
const onSubmit = jest.fn();

const props = {
  onClose,
  showModal: true,
  onSubmit,
  noteData: {
    noteId: "test_id",
    noteContent: "test content",
    noteTitle: "test title",
    noteHeight: NOTE_CONSTANTS.height,
    noteWidth: NOTE_CONSTANTS.width,
    notePosX: NOTE_CONSTANTS.PosX,
    notePosY: NOTE_CONSTANTS.PosY,
    color: "#000000",
  },
};
const newprops = { ...props, noteData: null };

test("renders modal title and button text depending on the process", () => {
  render(<NotesModal {...props} />);
  // render edit note modal title and button
  expect(
    screen.getByText(`Edit ${props.noteData.noteTitle} Note`)
  ).toBeInTheDocument();
  expect(screen.getByText(`Edit Note`)).toBeInTheDocument();

  // render new note modal title and button when noteData is null
  render(<NotesModal {...newprops} />);
  expect(screen.getByText(`Create New Note`)).toBeInTheDocument();
  expect(screen.getByText(`Create Note`)).toBeInTheDocument();
});

test("should perform input field validation to ensure all fields ar filled", () => {
  render(<NotesModal {...newprops} />);
  // render error if fields are empty
  fireEvent.click(screen.getByLabelText("Primary Modal Button"));
  expect(onSubmit).not.toBeCalled();
  expect(screen.getByLabelText("Modal Alert")).toBeInTheDocument();
});

test("calls onSubmit only when all input fields are filled", () => {
  // call onSubmit function and remove error alert
  render(<NotesModal {...props} />);
  fireEvent.click(screen.getByLabelText("Primary Modal Button"));
  expect(onSubmit).toBeCalledWith({
    noteId: props.noteData.noteId,
    noteContent: props.noteData.noteContent,
    noteTitle: props.noteData.noteTitle,
    noteWidth: props.noteData.noteWidth,
    noteHeight: props.noteData.noteHeight,
  });
  expect(screen.queryByLabelText("Modal Alert")).not.toBeInTheDocument();
});
