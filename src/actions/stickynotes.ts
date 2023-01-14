import { DISPATCH_TYPES } from "../reducers";
import { NoteType } from "../types";

export const addNote = (note: NoteType) => ({
  type: DISPATCH_TYPES.addNote,
  note,
});

export const editNote = (note: NoteType) => ({
  type: DISPATCH_TYPES.editNote,
  note,
});

export const deleteNote = (noteId: number) => ({
  type: DISPATCH_TYPES.deleteNote,
  note: { noteId },
});

