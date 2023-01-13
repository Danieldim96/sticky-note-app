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
      <AddStickyNoteButton onClick={() => setModalOpen(true)}>
        + Add New Note
      </AddStickyNoteButton>
    </BannerWrapper>
  );
};
