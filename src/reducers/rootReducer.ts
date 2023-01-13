import { combineReducers } from "redux";
import { NotesReducer } from "./NotesReducer";

export const rootReducers = combineReducers({
  notes: NotesReducer,
});
