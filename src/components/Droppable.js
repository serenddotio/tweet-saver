import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Drag } from "./Draggable";

const getListStyle = (isDraggingOver) => ({
  /**
   * Basic styles
   */
  background: isDraggingOver ? "#f4f5f7" : "#EBECF0",
});

export const Drop = ({ id, items, title }) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          className="drag-pillar ui segment"
        >
          <h4>{title}</h4>
          {items.length > 0 ? (
            items.map((item, index) => (
              <Drag item={item} index={index} key={index} />
            ))
          ) : (
            <span className="center-text">Nothing to display</span>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
