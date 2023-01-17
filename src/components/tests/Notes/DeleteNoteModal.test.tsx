import { render, screen, fireEvent } from "@testing-library/react";
import { DeleteNoteModal } from "../../Notes/DeleteNoteModal";

const onClose = jest.fn();
const onPrimaryButtonClick = jest.fn();
const props = {
  showModal: true,
  noteTitle: "Test Title",
  onClose,
  onPrimaryButtonClick,
};

test("renders modal with title", () => {
  render(<DeleteNoteModal {...props} />);
  const modalTitle = screen.getByLabelText("Modal Title");
  expect(modalTitle).toBeInTheDocument();
});

test("calls the onPrimaryButtonClick function when delete button is clicked", () => {
  render(<DeleteNoteModal {...props} />);
  fireEvent.click(screen.getByLabelText("Primary Modal Button"));
  expect(onPrimaryButtonClick).toBeCalled();
});
