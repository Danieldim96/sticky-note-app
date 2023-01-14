import { NoteType } from "../types";
import { DISPATCH_TYPES, InitialState } from "./types";

export const NotesReducer = (
  state = InitialState,
  action: {
    type: string;
    note: NoteType;
  }
) => {
  const { type, note } = action;

  switch (type) {
    case DISPATCH_TYPES.addNote:
      const notes = [...(state?.notes ?? []), note];
      return { ...state, notes };

    case DISPATCH_TYPES.deleteNote:
      const filteredNotes = state.notes.filter(({ id }) => id === note?.noteId);
      return { ...state, notes: filteredNotes };

    case DISPATCH_TYPES.editNote:
      state.notes.forEach((stateNode: NoteType) => {
        if (stateNode.noteId === note?.noteId) {
          stateNode.noteContent = note?.noteContent;
          stateNode.noteTitle = note?.noteTitle;
          stateNode.noteWidth = note?.noteWidth;
          stateNode.noteHeight = note?.noteHeight;
        }
      });
      return state;

    default:
      return state;
  }
};
