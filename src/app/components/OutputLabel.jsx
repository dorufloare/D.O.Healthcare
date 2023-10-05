import React, { useState } from "react";

export default function OutputLabel(props) {
  const dangerLevel = props.severity.toLowerCase();
  const description = props.description.toLowerCase();
  const advice = props.advice.toLowerCase();
  const problem = props.problem.toLowerCase();

  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  var warningSign;

  if (dangerLevel.includes("ușo")) {  //usoara
    warningSign = "yellowwarning.svg";
  } else if (dangerLevel.includes("mod")) { //moderata
    warningSign = "orangewarning.svg";
  } else {  //severa
    warningSign = "redwarning.svg";
  }

  const labelStyle = {
    height: expanded ? "auto" : "auto",
  };

  const textContainerStyle = {
    display: expanded ? "block" : "none", 
  };

  return (
    <div className="output-label" style={labelStyle}>
      <div onClick={toggleExpansion}>
        <img className="severity-sign" src={warningSign} alt="Severity Sign" />
        <span>{props.problem}</span>
        <span className="expand-arrow">{expanded ? " ▲" : " ▼"}</span>
      </div>
      <div className="expanded-content" style={textContainerStyle}>
        <p className="description-text">{props.description}</p>
        <p className="description-text">{props.advice}</p>
      </div>
    </div>
  );
}