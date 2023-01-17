import { render, screen, fireEvent } from "@testing-library/react";
import { Banner } from "../Banner";

const setModalOpen = jest.fn();

test("should call setModalOpen when add note button is clicked", () => {
  render(<Banner setModalOpen={setModalOpen} />);
  fireEvent.click(screen.getByLabelText("Add New Note Button"));
  expect(setModalOpen).toBeCalledWith(true);
});
