import { useEffect, useState } from "react";
import { TopDragWrapper } from "../styled-components";

export const NoteTopDrager = ({ onMouseDrag }: { onMouseDrag: Function }) => {
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
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.addEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return <TopDragWrapper onMouseDown={() => setMouseDown(true)} />;
};
