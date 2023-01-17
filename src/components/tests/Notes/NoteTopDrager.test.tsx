import { render, screen, fireEvent } from "@testing-library/react";
import { NoteTopDrager } from "../../Notes/NoteTopDrager";

const onMouseDrag = jest.fn();
const onMouseUp = jest.fn();

const props = { onMouseDrag, onMouseUp };

test("renders title when section is hovered upon", () => {
  render(<NoteTopDrager {...props} />);
  fireEvent.mouseOver(screen.getByLabelText("Note Dragger"));
  expect(screen.getByTitle(`Place Note Anywhere on Page`)).toBeInTheDocument();
});

test("calls onMouseUp function when a mouseup event is triggered", () => {
  render(<NoteTopDrager {...props} />);

  const draggerEl = screen.getByLabelText("Note Dragger");
  fireEvent.mouseUp(draggerEl);
  expect(onMouseUp).toBeCalled();
});

test("calls onMouseDrag function when a mouseover event is triggered", () => {
  render(<NoteTopDrager {...props} />);

  const draggerEl = screen.getByLabelText("Note Dragger");
  fireEvent.mouseDown(draggerEl);
  fireEvent.mouseMove(draggerEl);
  expect(onMouseDrag).toBeCalled();
});
