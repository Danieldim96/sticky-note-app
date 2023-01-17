import "@testing-library/jest-dom";
import { addNote, deleteNote, editNote } from "./stickynotes";
import { NOTE_CONSTANTS } from "../constants";
import { DISPATCH_TYPES } from "../reducers";

const note = {
  noteId: "test_id",
  noteContent: "test content",
  noteTitle: "test title",
  noteHeight: NOTE_CONSTANTS.height,
  notePosX: NOTE_CONSTANTS.PosX,
  notePosY: NOTE_CONSTANTS.PosY,
};

test("returns the right action payload", () => {
  expect(addNote(note)).toEqual({ type: DISPATCH_TYPES.addNote, note });
  expect(editNote({ ...note, noteTitle: "Edited Title" })).toEqual({
    type: DISPATCH_TYPES.editNote,
    note: { ...note, noteTitle: "Edited Title" },
  });
  expect(deleteNote(note.noteId)).toEqual({
    type: DISPATCH_TYPES.deleteNote,
    note: { noteId: note.noteId },
  });
});
