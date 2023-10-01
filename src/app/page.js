"use client"

import React, { useState } from 'react';
import SymptomeLabel from './components/SymptomeLabel';
import Prompt from './components/Prompt';
import axios from 'axios';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [inputLabels, setInputLabels] = useState([]);
  const [outputLabels, setOutputLabels] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const buttonAddClick = () => {
    if (inputText.trim() !== '') {
      setInputLabels([...inputLabels, inputText]);
      setInputText('');
    }
  };

  const eraseInputLabel = (label) => {
    const updatedLabels = inputLabels.filter((item) => item !== label);
    setInputLabels(updatedLabels);
  };

  const buttonDiagnosisClick = async () => {
    const prompt = new Prompt(inputLabels);
    const response = await prompt.getResponse();
    console.log(response);
    setInputText('');
    setOutputLabels(response);
  };

  return (
    <div>
      {inputLabels.map((label, index) => (
        <SymptomeLabel
          key={index}
          symptome={label}
          eraseInputLabel={() => eraseInputLabel(label)}
        />
      ))}

      {outputLabels.map((label, index) => (
        <SymptomeLabel
          key={index}
          symptome={label.PROBLEMA}
          eraseInputLabel={() => eraseInputLabel(label)}
        />
      ))}

      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Adauga un simptom"
      />
      <button onClick={buttonAddClick}>Adauga</button>
      <button onClick={buttonDiagnosisClick}> Diagnostic </button>

    </div>
  );
}
