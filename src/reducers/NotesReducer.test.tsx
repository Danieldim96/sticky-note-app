import { NOTE_CONSTANTS } from "../constants";
import { NotesReducer } from "./NotesReducer";
import { DISPATCH_TYPES } from "./types";

const state = { notes: [] };
const action = {
  type: DISPATCH_TYPES.addNote,
  note: {
    noteId: "test_id",
    noteContent: "test content",
    noteTitle: "test title",
    color: "#000000",
  },
};

const oldState = {
  ...action.note,
  noteHeight: NOTE_CONSTANTS.height,
  noteWidth: NOTE_CONSTANTS.width,
  notePosX: NOTE_CONSTANTS.PosX,
  notePosY: NOTE_CONSTANTS.PosY,
};

const newstate = { notes: [oldState] };
const newNote = {
  ...action.note,
  noteTitle: "Edited Title",
  noteContent: "Edited Content",
  noteHeight: NOTE_CONSTANTS.height,
  noteWidth: NOTE_CONSTANTS.width,
  notePosX: NOTE_CONSTANTS.PosX,
  notePosY: NOTE_CONSTANTS.PosY,
};

const result = {
  ...action.note,
  ...newNote,
  noteHeight: NOTE_CONSTANTS.height,
  noteWidth: NOTE_CONSTANTS.width,
  notePosX: NOTE_CONSTANTS.PosX,
  notePosY: NOTE_CONSTANTS.PosY,
};

test("should return an hydrated state with new note", () => {
  // add default height, width, posX and PosY when adding a new note
  const result = {
    ...action.note,
    noteHeight: NOTE_CONSTANTS.height,
    noteWidth: NOTE_CONSTANTS.width,
    notePosX: NOTE_CONSTANTS.PosX,
    notePosY: NOTE_CONSTANTS.PosY,
  };
  expect(NotesReducer(state, action)).toMatchObject({ notes: [result] });

  // test for when initial state is not empty

  const newstate = { notes: [oldState] };
  const expected = {
    notes: [
      ...newstate.notes,
      {
        ...oldState,
        notePosX: oldState.noteWidth + NOTE_CONSTANTS.gap + NOTE_CONSTANTS.PosX,
      },
    ],
  };
  expect(NotesReducer(newstate, action)).toMatchObject(expected);
});

test("should return an hydrated state with edited note contents", () => {
  expect(
    NotesReducer(newstate, { note: newNote, type: DISPATCH_TYPES.editNote })
  ).toMatchObject({ notes: [result] });
});

test("should remove note whose noteId is passed", () => {
  const note = { ...newNote, noteId: "test_id_2" };
  const newstate = { notes: [oldState, note] };
  const expected = { notes: [oldState] };

  expect(
    NotesReducer(newstate, { note, type: DISPATCH_TYPES.deleteNote })
  ).toMatchObject(expected);
});
