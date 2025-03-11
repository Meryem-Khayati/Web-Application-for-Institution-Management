import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { semestreServices } from '../../services/semestreServices';

export default function CardFilierEtdEmploi(props) {
  const [annee, setAnnee] = useState("");
  const [years, setYears] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    semestreServices.getSemestresYears()
      .then(response => {
        setYears(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the years!", error);
      });
  }, []);

  function handlClick() {
    navigate(`/dashboard/filierr/${props.id}/semestres/?annee=${annee}`);
  }
  return (
    <div className="block-dashboard-admin">
      <div className='card-element'>
        <i className='bx bx-library'></i>
        <div className='content-card-list-filier'>
          <h1 className='filiereTitree'>{props.nom}</h1>
          <div>
            <select 
              className='input-card-list-filiers' 
              value={annee} 
              onChange={(e) => setAnnee(e.target.value)} 
              required
            >
              <option value="" disabled>Choisir l'année</option>
              {years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <button 
            className={`btn-card-list-filier ${!annee ? 'disabled' : ''}`} 
            onClick={handlClick}
            disabled={!annee} 
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

