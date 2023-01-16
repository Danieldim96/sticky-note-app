import { NoteType } from "../types";
import { getRandomColor } from "../utils";
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
    /**
     * the aim here is to manually add position and size atrributes to the note when creating the note.
     * we also needed to prevent each new note from rendering ontop each other, so we calculate the last
     * Y position of the last note and add it's height and a 10px spacing veritically.
     * We also generate randomly a bg color for each new note.
     */
    case DISPATCH_TYPES.addNote:
      let notes;
      const oldState = [...(state?.notes ?? [])];
      if (oldState.length === 0) {
        note.notePosX = 20;
        note.notePosY = 300;
        note.noteWidth = 300;
        note.noteHeight = 300;
        note.color = getRandomColor();
        notes = [note];
      } else {
        const stateLen: number = oldState.length;
        const lastNote: NoteType = oldState[stateLen - 1];
        note.notePosX = 20;
        note.noteWidth = 300;
        note.noteHeight = 300;
        note.color = getRandomColor();
        note.notePosY = lastNote.notePosY! + lastNote.noteHeight! + 10;
        notes = [...oldState, note];
      }
      return { ...state, notes };

    case DISPATCH_TYPES.deleteNote:
      const filteredNotes = state.notes.filter(
        ({ noteId }) => noteId !== note?.noteId
      );
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
