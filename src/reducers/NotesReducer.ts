import { NOTE_CONSTANTS } from "../constants";
import { NoteType } from "../types";
import { getRandomColor } from "../utils";
import { DISPATCH_TYPES, InitialState } from "./types";

export const NotesReducer = (
  state: any = InitialState,
  action: {
    type: string;
    note: NoteType;
  }
) => {
  const { type, note } = action;

  switch (type) {
    /**
     * the aim here is to manually add position and size atrributes to the note when creating the note.
     * we also needed to prevent each new note from rendering ontop each other, so we determine if any more notes can
     * be fitted on the same line. If yes, we add new note next to the previous note with a 15px gap.
     * else we jump to a new row.
     */
    case DISPATCH_TYPES.addNote:
      let notes;
      const oldState = [...(state?.notes ?? [])];
      note.noteWidth = NOTE_CONSTANTS.width;
      note.noteHeight = NOTE_CONSTANTS.height;
      note.notePosX = NOTE_CONSTANTS.PosX;
      note.notePosY = NOTE_CONSTANTS.PosY;
      note.color = note?.color ? note.color : getRandomColor();

      if (oldState.length > 0) {
        const stateLen: number = oldState.length;
        const lastNote: NoteType = oldState[stateLen - 1];
        let totalUsedWidth = 0;
        oldState.every(
          ({ noteWidth }: { noteWidth: number }) =>
            (totalUsedWidth += noteWidth)
        );
        // determine how many more notes van be fitted on the current row.
        const numberLeft = Math.floor(
          (window.innerWidth - totalUsedWidth) / NOTE_CONSTANTS.width
        );

        if (numberLeft === 0) {
          note.notePosY =
            lastNote.notePosY! + lastNote.noteHeight! + NOTE_CONSTANTS.gap;
        } else {
          note.notePosX =
            lastNote.notePosX! + lastNote.noteWidth! + NOTE_CONSTANTS.gap;
        }
      }
      notes = [...oldState, note];
      return { ...state, notes };

    case DISPATCH_TYPES.deleteNote:
      const filteredNotes = state.notes.filter(
        ({ noteId }: { noteId: string }) => noteId !== note?.noteId
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
