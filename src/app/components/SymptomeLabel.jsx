"use client"

import React from 'react';

export default function SymptomeLabel(props) {
  const handleEraseClick = () => {
    if (props.eraseLabel) {
      props.eraseLabel();
    }
  };

  return (
    <label className="symptome-label">
      {props.symptome}
      {props.eraseLabel && (
        <span
          className="erase-label"
          onClick={handleEraseClick}
        >
          &#10006;
        </span>
      )}
    </label>
  );
}
