import { useEffect, useState } from "react";
import { MOUSE_DIRECTIONS } from "../../constants";
import { BottomSideResizer, RightSideResizer } from "../styled-components";

export const NoteResizer = ({
  onMouseResize,
  onMouseUp,
}: {
  onMouseResize: Function;
  onMouseUp: Function;
}) => {
  const [direction, setDirection] = useState<string>("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!direction) return;
      const { movementX, movementY } = e;
      const ratio = window.devicePixelRatio;
      onMouseResize(movementX / ratio, movementY / ratio, direction);
    };

    if (direction) window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [direction, onMouseResize]);

  useEffect(() => {
    const handleMouseUp = () => {
      setDirection("");
      onMouseUp();
    };

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onMouseUp]);

  return (
    <>
      <BottomSideResizer
        onMouseDown={() => setDirection(MOUSE_DIRECTIONS.bottom)}
      />
      <RightSideResizer
        onMouseDown={() => setDirection(MOUSE_DIRECTIONS.right)}
      />
    </>
  );
};
