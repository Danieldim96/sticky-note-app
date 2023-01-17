import { ReactElement } from "react";
import {
  AddStickyNoteButton,
  BannerWrapper,
  Header,
} from "./styled-components";

export const Banner = ({
  setModalOpen,
}: {
  setModalOpen: Function;
}): ReactElement => {
  return (
    <BannerWrapper>
      <Header>Sticky Notes App</Header>
      <AddStickyNoteButton
        onClick={() => setModalOpen(true)}
        aria-label="Add New Note Button"
      >
        + Add New Note
      </AddStickyNoteButton>
    </BannerWrapper>
  );
};
