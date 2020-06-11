import React, { useState, useCallback, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { SearchBar } from "./SearchBar";
import { Drop } from "./Droppable";
import { reorder, move } from "./Helpers";
import "./App.scss";

function App() {
  /**
   * Set states
   */
  const [searched, setSearched] = useState({});
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("savedTweets")) || {}
  );

  /**
   * Make wrapper function to give child
   */
  const wrapperSetParentState = useCallback(
    (items) => {
      setSearched(items);
    },
    [setSearched]
  );

  /**
   *  Part of react-beautiful-dnd logic
   * /
  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  const id2List = {
    droppable: searched,
    droppable2: selected,
  };

  const getList = (id) => id2List[id];

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      source.droppableId === "droppable2"
        ? setSelected(items)
        : setSearched(items);
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setSearched(result.droppable);
      setSelected(result.droppable2);
    }
  };
  /**
   *  End of react-beautiful-dnd logic
   */

  useEffect(() => {
    localStorage.setItem("savedTweets", JSON.stringify(selected));
  }, [selected]);

  return (
    <div className="twitter-save-wrapper">
      <h1>Tweet Saver</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <SearchBar parentStateSetter={wrapperSetParentState} />
        <div className="drag-container">
          <Drop
            id="droppable"
            items={searched}
            key="1"
            title="Search Results"
          />
          <Drop id="droppable2" items={selected} key="2" title="Saved Tweets" />
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
