"use client"

import React, { useEffect, useState } from 'react';
import SymptomeLabel from './components/SymptomeLabel';
import Prompt from './components/Prompt';
import axios from 'axios';
import OutputLabel from './components/OutputLabel';
import NavBar from './components/NavMenu';

export default function Home() {
  const [username, setUsername] = useState('');
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/getUser"
    }).then(res=>{setUsername(res.data.username)}).catch(err =>console.log(err));
  };

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
      <NavBar username={username}/>
      <img className="logo-image" src="logo.svg"></img>
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
          <button className="red-button" onClick={buttonAddClick}>Adauga</button>
          <button className="red-button" onClick={buttonDiagnosisClick}> Diagnostic </button>
          <button  className="red-button" onClick={buttonResetClick}> Reseteaza </button>
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
          <OutputLabel
            key={index}
            problem={label.PROBLEMA}
            severity={label.SEVERITATE}
            description={label.DESCRIERE}
            advice={label.SFAT}
          />
        ))}
        {isLoading && <div className="loader"><div className="spinner"></div></div>}
        </div>
      </div>  
    </div>
  );
}
