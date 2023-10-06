"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "../components/NavMenu";



export default function Profile() {
  const [username, setUsername] = useState('');
  const [id, setId] = useState();
  const [excludedProblems, setExcludedProblems] = useState('');
  const [age, setAge] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();

  

  const getUser = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/getUser"
    }).then(res=>{
      setUsername(res.data.username);
      setId(res.data.id);
    }).catch(err =>console.log(err));
  };

  const excludeProblems = () => {
    axios
    .put(`http://localhost:3001/updateExcluded/${id}/${excludedProblems}`,  { withCredentials: true })
      .then((response) => {
        console.log("updated excluded problems!");
        console.log(id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateAge = () => {
    axios
    .put(`http://localhost:3001/updateAge/${id}/${age}`, { withCredentials: true })
    .then((response) => {
      console.log("updated age");
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const updateHeight = () => {
    axios
    .put(`http://localhost:3001/updateHeight/${id}/${height}`, { withCredentials: true })
    .then((response) => {
      console.log("updated height");
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const updateWeight = () => {
    axios
    .put(`http://localhost:3001/updateWeight/${id}/${weight}`, { withCredentials: true })
    .then((response) => {
      console.log("updated weight");
    })
    .catch((error) => {
      console.log(error);
    })
  };

  function updateEverything() {
    excludeProblems();
    updateAge();
    updateHeight();
    updateWeight();
  }
  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <div>
      <NavBar  username={username}/>
      <h1 className="greeting"> Salut {username} ! </h1>
      <div className="main-profile-div">
        <div className="screen-split">
          <div className="data-container">
            <div>
            Introdu-ti varsta aici(ani): 
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="data-input"
            />
            </div>
            <div>
            Introdu-ti greutatea aici(kg): 
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="data-input"
            />
            </div>
            <div>
            Introdu-ti inaltimea aici(cm):
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="data-input"
            />
            </div>
          </div>
          <div className="excluded-container">
            <p>Adauga aici boli(separate prin ,) pe care doriti sa le excludeti</p>
            <textarea
              type="text"
              placeholder="boli excluse"
              value={excludedProblems}
              onChange={(e) => setExcludedProblems(e.target.value)}
              rows={4}
              cols={60}
            />
          </div>

          <button className="update-button red-button" onClick={updateEverything}>Actualizeaza</button>
        </div>
        <img className="cross-img" src="cross.png"></img>
      </div>
    </div>
  );
}