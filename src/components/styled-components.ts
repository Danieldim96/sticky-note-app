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
`;

export const FlexEllipsis = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const EditIconWrapper = styled.div`
  cursor: pointer;
`;
