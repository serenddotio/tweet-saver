import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./Draggable.scss";

const grid = 8;
const tweeterCreateAtToJSDate = (stringDate) => {
  return new Date(stringDate).toISOString().split("T")[0];
};

const getItemStyle = (isDragging, draggableStyle) => ({
  /**
   * Basic styles
   */
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "#dfdfdf" : "#ffffff",
  ...draggableStyle,
});

export const Drag = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          {item.user ? (
            <div className="twitter-container">
              <p className="twitter-date">
                {tweeterCreateAtToJSDate(item.createdAt)}
              </p>
              <img
                src={item.user.profileImageUrlHttps}
                alt={item.user.screenName}
                className="twitter-image"
              />
              <h5 className="twitter-name">{item.user.name}</h5>
              <h6 className="twitter-sname">@{item.user.screenName}</h6>
              <p className="twitter-tweet">{item.text}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </Draggable>
  );
};
