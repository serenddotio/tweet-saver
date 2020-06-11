import React, { useState, useEffect } from "react";
import Jsonp from "jsonp";

export const SearchBar = ({ parentStateSetter }) => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState({});

  const onInputChane = (event) => {
    setTerm(event.target.value);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    Jsonp(
      `https://tweetsaver.herokuapp.com/?q=${term}&callback=yourJSONPCallbackFn&count=10`,
      { name: "yourJSONPCallbackFn" },
      (err, data) => {
        if (err) throw err;
        data.tweets.forEach((item) => {
          item.id = `item-${item.id}`;
        });
        setResults(data.tweets);
      }
    );
  };

  useEffect(() => {
    parentStateSetter(results);
  }, [parentStateSetter, results]);

  return (
    <div className="search-bar ui segment">
      <form onSubmit={onFormSubmit} className="ui form">
        <div className="field">
          <label>Tweet Search</label>
          <input
            onChange={onInputChane}
            type="text"
            value={term}
            placeholder="Search Twitter"
          />
        </div>
        <button onClick={onFormSubmit}>Search</button>
      </form>
    </div>
  );
};
