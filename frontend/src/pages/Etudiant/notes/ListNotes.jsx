import React, { useEffect, useState } from 'react';
import { etudiantServices } from '../../services/etudiantServices';
import { countServices } from '../../services/countServices';

export default function ListNotes() {
  const apogee = countServices.getApogie();
  console.log(apogee);

  const [detailsEtd, setDetailsEtd] = useState([]);

  useEffect(() => {
    etudiantServices
      .getEtudiantNoteByApogee(apogee)
      .then(res => {
        console.log(res.data);
        setDetailsEtd(res.data);
      })
      .catch(err => {
        console.log('erreur');
      });
  }, [apogee]);

  const calculateSemesterAverage = (semesterModules) => {
    const sum = semesterModules.reduce((total, module) => total + module.note, 0);
    return sum / semesterModules.length;
  };

  // Group modules by semester
  const groupedBySemester = detailsEtd.reduce((acc, module) => {
    if (!acc[module.semestre]) {
      acc[module.semestre] = [];
    }
    acc[module.semestre].push(module);
    return acc;
  }, {});

  const semesterTables = Object.entries(groupedBySemester).map(([semester, modules]) => (
    <div key={semester}>
      <h2>Semestre {semester}</h2>
      <table className='admin-tab'>
        <thead>
          <tr>
            <th>Module</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {modules.map(module => (
            <tr key={module.module}>
              <td>{module.module}</td>
              <td>{module.note}</td>
            </tr>
          ))}
          <tr>
            <th>Resultat</th>
            <td>{calculateSemesterAverage(modules)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ));

  return (
    <div className='admin-dashboard-container'>
      <section className='admin-list-data'>
        <div className='admin-list-tab-container'>
          <div className='admin-info-tab'>
            <h3>Les notes</h3>
          </div>
          {semesterTables}
        </div>
      </section>
    </div>
  );
}
