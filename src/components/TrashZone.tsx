import { TrashZoneWrapper } from "./styled-components";
import { Trash } from "react-bootstrap-icons";
import { forwardRef } from "react";

export const TrashZone = forwardRef((props: any, ref: any) => {
  return (
    <TrashZoneWrapper ref={ref}>
      <Trash />
    </TrashZoneWrapper>
  );
});
