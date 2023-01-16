import styled from "styled-components";

export const BannerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 7rem 2rem 5rem;
  background: green;
`;

export const Header = styled.header`
  font-size: 1.5rem;
  color: white;
`;

export const AddStickyNoteButton = styled.button`
  padding: 10px;
  border: 1px solid black;
  background-color: black;
  color: white;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  border: none;
`;

export const StyledNote = styled.div`
  ${({
    noteHeight,
    noteWidth,
    notebgColor,
  }: {
    noteHeight?: number;
    noteWidth?: number;
    notebgColor?: string;
  }) =>
    `height: ${noteHeight}px; width: ${noteWidth}px; background-color: ${notebgColor};`};
  border: 1px solid gray;
  position: relative;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const AddPointerCursor = styled.div`
  cursor: pointer;
  padding: 10px;
`;

export const RowWrapper = styled.div`
  cursor: pointer;
  padding: 10px;
`;

export const JustifyText = styled.div`
  text-align: justify;
  text-justify: inter-word;
`;

export const RightSideResizer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  height: 100%;
  cursor: col-resize;
`;

export const BottomSideResizer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  cursor: row-resize;
`;

export const NoteWrapper = styled.div`
  display: flex;
  margin: 1.5rem;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const TopDragWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  padding: 10px;
  cursor: move;
  background: #f0f0f0;
`;

export const NoteContainer = styled.div`
  position: fixed;
  z-index: 1;
  ${({ top = 0, left = 0 }: { top?: number; left?: number }) =>
    `top: ${top < 0 ? 0 : top}px; left: ${left < 0 ? 0 : left}px;`}
`;

export const TrashZoneWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 150px;
  border: 3px dotted red;
  font-size: 2rem;
`;
