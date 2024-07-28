import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [meals, setMeals] = useState([]);
  const [mealDay, setMealDay] = useState('20210201');
  const [inputDay, setInputDay] = useState('20210201');

  const fetchMeals = (day) => {
    const apiKey = '0c46370c128d4531bcfe738563dfa01b';
    const apiURL = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${apiKey}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010253&MLSV_YMD=${day}`;
    
    axios.get(apiURL)
    .then((response)=>{
      const object = response.data;
      if(object && object.mealServiceDietInfo){
      const mealData = object.mealServiceDietInfo[1].row[0].DDISH_NM;
      const mealsArray = mealData.split('<br/>');
      setMeals(mealsArray);
      }
    })
    .catch((Error)=>{
      console.log(Error);
    })
  };
  
  const buttonClick = () => {
    setMealDay(inputDay);
    fetchMeals(inputDay);
  };

  return (
    <div className="App container">
      <input type='date' className='input-group-text col-12' value={inputDay} onChange={(e) => setInputDay(e.target.value.replace(/-/g, ''))} />
      <button type='button' className='col-12 btn btn-outline-danger' onClick={buttonClick}>Get meals</button>
      <ul>
      {meals.map((meal, index) => (
        <li key={index}>{meal}</li>
      ))}
      </ul>
    </div>
  );
}

export default App;
