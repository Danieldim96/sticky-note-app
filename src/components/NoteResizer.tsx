import { useEffect, useState } from "react";
import { MOUSE_DIRECTIONS } from "../constants";
import {
  BottomSideResizer,
  LeftSideResizer,
  RightSideResizer,
  TopSideResizer,
} from "./styled-components";

export const NoteResizer = ({ onMouseResize }: { onMouseResize: Function }) => {
  const [direction, setDirection] = useState<string>("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { movementX, movementY } = e;
      onMouseResize(movementX, movementY, direction);
    };

    if (direction) window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [direction, onMouseResize]);

  useEffect(() => {
    const handleMouseUp = () => setDirection("");

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <TopSideResizer onMouseDown={() => setDirection(MOUSE_DIRECTIONS.top)} />
      <BottomSideResizer
        onMouseDown={() => setDirection(MOUSE_DIRECTIONS.bottom)}
      />
      <RightSideResizer
        onMouseDown={() => setDirection(MOUSE_DIRECTIONS.right)}
      />
      <LeftSideResizer
        onMouseDown={() => setDirection(MOUSE_DIRECTIONS.right)}
      />
    </>
  );
};
