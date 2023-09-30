import React, { useState } from 'react';
import SymptomeLabel from './SymptomeLabel';
import Prompt from './Prompt';

export default function Input() {

  const [inputText, setInputText] = useState('');
  const [labels, setLabels] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const buttonAddClick = () => {
    if (inputText.trim() !== '') {
      setLabels([...labels, inputText]);
      setInputText('');
    }
  };

  const eraseLabel = (label) => {
    const updatedLabels = labels.filter((item) => item !== label);
    setLabels(updatedLabels);
  };

  const buttonDiagnosisClick = () => {
    const prompt = new Prompt(labels);
    console.log(prompt.generatePrompt());
  };

  return (
    <div>
      {labels.map((label, index) => (
        <SymptomeLabel
          key={index}
          symptome={label}
          eraseLabel={() => eraseLabel(label)}
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