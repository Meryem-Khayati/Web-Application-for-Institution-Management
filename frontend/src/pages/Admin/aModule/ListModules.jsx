import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { moduleServices } from '../../services/moduleServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function ListModules() {
  let navigate = useNavigate();
  
  const { idfilier, idsemestre } = useParams();
 
  const [modules, setModules] = useState([]);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    moduleServices.getAllModules(idfilier, idsemestre)
      .then(res => {
        setModules(res.data);
        console.log(modules);
      })
      .catch(err => {
        console.log(err);
      });
  }, [idfilier, idsemestre]);

  function modifier(idfilier, idsemestre, mid) {
    navigate(`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/modules/${mid}`);
  }

  function openDeleteDialog(module) {
    setModuleToDelete(module);
    setShowDialog(true);
  }

  function closeDeleteDialog() {
    setModuleToDelete(null);
    setShowDialog(false);
  }

  function confirmDelete() {
    if (moduleToDelete) {
      moduleServices.deleteModule(idfilier, idsemestre, moduleToDelete.id)
        .then(res => {
          setModules(current => current.filter(module => module.id !== moduleToDelete.id));
          closeDeleteDialog();
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          closeDeleteDialog();
        });
    }
  }

  function Voir(idfilier, idsemestre, idemploi,nomModule) {
    navigate(`/dashboard/filieress/${idfilier}/semestres/${idsemestre}/modules/${idemploi}/notes?name=${nomModule}`);
  }

  const listModules = modules.map(element => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.nom}</td>
      <td><FontAwesomeIcon icon={faEye} onClick={() => Voir(idfilier, idsemestre, element.id,element.nom)} /></td>
      <td><i className='bx bxs-edit-alt' onClick={() => modifier(idfilier, idsemestre, element.id)}></i></td>
      <td><i className='bx bxs-trash' onClick={() => openDeleteDialog(element)}></i></td>
    </tr>
  ));

  return (
    <div className='admin-dashboard-container'>
      <section className='admin-list-data'>
        <div className='admin-list-tab-container'>
          <div className="admin-info-tab">
            <h3>Liste des Modules</h3>
            <button className='list-add-element'>
              <Link to={`/dashboard/filieres/${idfilier}/semestres/${idsemestre}/modules/add`}>Ajouter Module</Link>
            </button>
            <br />
          </div>
          <table className='admin-tab'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nom du module</th>
                <th>Voir liste des Notes</th>
                <th>Éditer</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {listModules}
            </tbody>
          </table>
        </div>
      </section>
      {showDialog && (
        <div className="confirmation-dialog">
          <div className="dialog-content">
            <p>Êtes-vous sûr de vouloir supprimer ce module ?</p>
            <button onClick={confirmDelete}>Confirmer</button>
            <button onClick={closeDeleteDialog}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}
