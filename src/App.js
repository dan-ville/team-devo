import "./App.css";
import { useEffect, useState } from "react";
import Passage from "./Passage";
const { REACT_APP_TOKEN } = process.env;

function App() {
  const [passage, setPassage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState(
    localStorage.lastQuery ? localStorage.lastQuery : "Genesis 1"
  );

  const handleFetchQuery = () => {
    const string = searchText;
    const book = string.match(/[0-9]? ?([A-Z])\w+/g)[0];
    const chapter = string.match(/(?![0-9] \w+ )[0-9]/)[0];
    const newQuery = `${book}+${chapter}`;
    localStorage.setItem("lastQuery", newQuery);
    setQuery(newQuery);
  };

  useEffect(() => {
    fetch(
      `https://api.esv.org/v3/passage/html/?q=${query}&include-headings=true&include-heading-horizontal-lines=true&include-footnotes=false&include-passage-references=true`,
      {
        headers: {
          Authorization: `Token ${REACT_APP_TOKEN}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPassage(data.passages[0]);
      });
  }, [query]);

  return (
    <div className="App">
      <h1>Team Devo</h1>
      <input
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
        className="search-bar"
        type="text"
      />
      <button onClick={handleFetchQuery} type="submit">
        Search
      </button>
      {passage && <Passage passage={passage} />}
    </div>
  );
}

export default App;
