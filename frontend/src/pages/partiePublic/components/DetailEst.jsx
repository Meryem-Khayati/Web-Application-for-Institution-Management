import { useEffect, useState } from 'react';
import estfbs from '../../images/est.jpg';
import logo from '../../images/logoestFBS.png';
import { filierServices } from '../../services/filierServices';
import { useNavigate } from 'react-router-dom';

export default function DetailEst() {
  const [filiereCards, setFiliereCards] = useState([]);

  useEffect(() => {
    filierServices.getAllFilier()
      .then(res => {
        setFiliereCards(res.data);
      })
      .catch(err => {
        console.error(err.data);
      });
  }, []);

  const navigate = useNavigate();

  function voirDetail(id) {
    navigate('/filiers/' + id);
  }

  const listFiliereCards = filiereCards.map(element => (
    <li key={element.id} className="filiere-item" onClick={() => voirDetail(element.id)}>
      {element.nom}
    </li>
  ));

  return (
    <div className="detail-est-containerrr">
      <header className="header">
        <img src={logo} alt="Logo EST FBS" className="logo" />
        <h1 className="title">Ecole Supérieure de Technologie Fkih Ben Salah</h1>
      </header>
      <div className="main-content">
        <div className="content-card">
          <img src={estfbs} alt="Image EST FBS" className="est-image" />
          <div className="description">
            <p>
              L'Ecole Supérieure de Technologie de Fkih Ben Salah (EST-FBS) est une nouvelle structure que le Conseil du Gouvernement a approuvé sa création le 11 avril 2019, composante de l’Université Sultan Moulay Slimane. Elle a ouvert ses portes en septembre 2019. C’est un établissement qui propose aux nouveaux bacheliers des formations bac+2 (DUT) ou bac+3 (licence professionnelle) dans des domaines techniques variés.
            </p>
            <h3 className="desc-title">Mission:</h3>
            <ul>
              <li>Offrir des formations qui correspondent parfaitement au milieu professionnel.</li>
              <li>Une démarche pédagogique qui vise le renouvellement fréquent des filières et l’enrichissement du contenu.</li>
              <li>Conduire des activités de recherche et d’innovation technologiques avec le secteur de l’industrie.</li>
              <li>Promouvoir la coopération régionale, nationale et internationale.</li>
            </ul>
          </div>
        </div>
        <div className="content-card reverse">
          <div className="desFilier">
            <div className='divcentrep'>
              <h3>Filières ouvertes à l’EST-FBS</h3>
            <h4>Diplôme Universitaire de Technologie (DUT) :</h4>
            </div>
            
            <h3 className="desc-title">Filières:</h3>
            <ul className="filiere-list">
              {listFiliereCards}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
