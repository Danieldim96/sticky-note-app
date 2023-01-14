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
  ${({ height, width }: { height: number; width: number }) =>
    `height: ${height}px; width: ${width}px;`};
  border: 1px solid gray;
  padding: 10px;
  margin: 1.5rem;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
`;

export const AddPointerCursor = styled.div`
  cursor: pointer;
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
export const LeftSideResizer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  cursor: col-resize;
`;

export const TopSideResizer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  cursor: row-resize;
`;

export const BottomSideResizer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  cursor: row-resize;
`;
