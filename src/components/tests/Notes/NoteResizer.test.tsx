import { render, screen, fireEvent } from "@testing-library/react";
import { NOTE_CONSTANTS } from "../../../constants";
import { NoteResizer } from "../../Notes/NoteResizer";

const onMouseResize = jest.fn();
const onMouseUp = jest.fn();

const props = { onMouseResize, onMouseUp };

test("calls onMouseResize when reiser is dragged", () => {
  render(<NoteResizer {...props} />);

  const bottomEl = screen.getByLabelText("Bottom Side Resizer");
  fireEvent.mouseDown(bottomEl);
  fireEvent.mouseMove(bottomEl, { clientY: NOTE_CONSTANTS.PosY });
  expect(onMouseResize).toBeCalled();
});

test("calls onMouseUp when reiser is dragged", () => {
  render(<NoteResizer {...props} />);

  const bottomEl = screen.getByLabelText("Bottom Side Resizer");
  fireEvent.mouseDown(bottomEl);
  fireEvent.mouseMove(bottomEl, { clientY: NOTE_CONSTANTS.PosY });
  fireEvent.mouseUp(bottomEl);
  expect(onMouseUp).toBeCalled();
});
