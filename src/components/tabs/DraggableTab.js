import * as React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function DraggableTab(props) {
  return (
    <Draggable
      draggableId={`${props.index}`}
      index={props.index}
      disableInteractiveElementBlocking
    >
      {(draggableProvided) => (
        <div 
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
        >
          {React.cloneElement(props.child, {
            ...props,
            ...draggableProvided.dragHandleProps,
            style: { cursor: "inherit", width: "fit-content", whiteSpace: "nowrap" }
          })}
        </div>
      )}
    </Draggable>
  );
}
