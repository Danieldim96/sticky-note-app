import { useEffect } from "react";


export const NoteResizer = (direction: string, setDirection: Function, onMouseResize: Function) => {

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!direction) return;
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
  }, [setDirection]);

  return []
}
