"use client"

import React, { useState } from 'react';
import SymptomeLabel from './components/SymptomeLabel';
import Prompt from './components/Prompt';
import axios from 'axios';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [inputLabels, setInputLabels] = useState([]);
  const [outputLabels, setOutputLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    if (inputLabels.length === 0) {
      window.alert("Trebuie sa adaugi cel putin un simptom.");
      return;
    }
    setIsLoading(true); 

    try {
      const prompt = new Prompt(inputLabels);
      const response = await prompt.getResponse();
      console.log(response);
      setOutputLabels(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); 
    }
    setInputText('');

  };

  const buttonResetClick  = () => {
    setInputText('');
    setInputLabels([]);
    setOutputLabels([]);
  }

  return (
    <div> 
      <div>
        <div className="symptome-input">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Adauga un simptom"
          />
        </div>
        <div className="buttons-container">
          <button className="white-button" onClick={buttonAddClick}>Adauga</button>
          <button className="white-button" onClick={buttonDiagnosisClick}> Diagnostic </button>
          <button  className="white-button" onClick={buttonResetClick}> Reseteaza </button>
        </div>
      </div>
      <div className="main-container">
        <div className="half-container">
        {inputLabels.map((label, index) => (
          <SymptomeLabel
            key={index}
            symptome={label}
            eraseInputLabel={() => eraseInputLabel(label)}
          />
        ))}
        </div>
        <div className="half-container">
        {outputLabels.map((label, index) => (
          <SymptomeLabel
            key={index}
            symptome={label.PROBLEMA}
            eraseInputLabel={() => eraseInputLabel(label)}
          />
        ))}
        {isLoading && <div className="loading-animation">Loading...</div>}
        </div>
        
      </div>  

    </div>
  );
}
