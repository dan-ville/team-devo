import "./Passage.css";
import React from "react";
import { Markup } from "interweave";

const Passage = ({ passage }) => {
  return (
    <div className="passage-wrapper">
      <Markup content={passage} />
    </div>
  );
};

export default Passage;
