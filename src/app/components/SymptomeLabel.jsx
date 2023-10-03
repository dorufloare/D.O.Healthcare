"use client"

import React from 'react';

export default function SymptomeLabel(props) {
  const handleEraseClick = () => {
    if (props.eraseInputLabel) {
      props.eraseInputLabel();
    }
  };

  return (
    <label className="symptome-label">
      {props.eraseInputLabel && (
        <span
          className="erase-label"
          onClick={handleEraseClick}
        >
          &#10006;
        </span>
      )}
      {props.symptome}
    </label>
  );
}
