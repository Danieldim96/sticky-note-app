import { useEffect, useState } from "react";
import { TopDragWrapper } from "../styled-components";
import { ArrowsMove } from "react-bootstrap-icons";

export const NoteTopDrager = ({
  onMouseDrag,
  onMouseUp,
}: {
  onMouseDrag: Function;
  onMouseUp: Function;
}) => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  useEffect(() => {
    const ratio = window.devicePixelRatio;

    const handleMouseMove = (e: MouseEvent) => {
      const { movementX, movementY } = e;
      onMouseDrag(movementX / ratio, movementY / ratio);
    };

    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, onMouseDrag]);

  useEffect(() => {
    const handleMouseUp = () => {
      setMouseDown(false);
      onMouseUp();
    };

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.addEventListener("mouseup", handleMouseUp);
    };
  }, [onMouseUp]);

  return (
    <TopDragWrapper
      onMouseDown={() => setMouseDown(true)}
      title="Place Note Anywhere on Page"
    >
      <ArrowsMove />
    </TopDragWrapper>
  );
};
