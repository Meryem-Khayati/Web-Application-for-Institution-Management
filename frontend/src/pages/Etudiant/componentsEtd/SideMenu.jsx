import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {countServices} from '../../services/countServices'
import {etudiantServices} from '../../services/etudiantServices'
import logo from '../../images/logoetd.png'



export default function SideMenu() {
    const [etudiant, setEtudiant] = useState({});
    const sub = countServices.getId();
    console.log(sub)
    const idetudiant=sub
   

    useEffect(()=>{
        etudiantServices.getEtudiantData(idetudiant)
        .then(res=>{console.log(res.data);
                    setEtudiant(res.data.etudiant);
                   
        })
        .catch(err=>{console.log(err.data)})
    },[])


    console.log(etudiant)
  function handelClik(e){
    countServices.logOut();
}
const [isSectionVisible, setIsSectionVisible] = useState(true);

const toggleSectionVisibility = () => {
    setIsSectionVisible(!isSectionVisible);
    
};
function handelClik(e){
    countServices.logOut();
}
return (
  <div className='admin-dashboard-container'>
     <div className='admin-dashboard-container'>
     <section  className={`container-nav-admin-dashboard ${isSectionVisible?'':'new-container-nav-admin-dashboard'}`} >
                <nav className='nav-admin-dashoard'>
                <div className='burgar-admin-dashboard'  onClick={toggleSectionVisibility}>
                        <i className='bx bx-menu'></i>
                    </div>
                    <div className='nav-connection nav-conn-etd'>
                        <h3>{etudiant.lastName} {etudiant.firstName}</h3>
                    </div>
                </nav>
            </section>
    </div>
    <section className={`section-dashoard-admin ${isSectionVisible?'':'new-section-dashoard-admin'}`}>
          <div className="header-dashboard-admin">
              <Link to='/etudiant/dashboard'>
                  <i className='bx bxs-dashboard icon-dashboard-admin'></i>
                  <span className='spans-dashboard-admin'>Profil</span>
              </Link>
          </div>
          <ul className='list-dashboard-admin class2-of-list'>
              <li className='li-dashboard-admin'>
                  <Link to='/'>
                      <i className='bx bxs-home-alt-2 home-dashboard-admin'></i>
                      <span className='spans-dashboard-admin'>Acceuil</span>
                  </Link>
              </li>
              <li className='li-dashboard-admin'>
                  <Link to='/etudiant/profile'>
                      <i className='bx bxs-user-pin'></i>
                      <span className='spans-dashboard-admin'>Profil</span>
                  </Link>
              </li>

              <li className='li-dashboard-admin'>
                  <Link to='/etudiant/notes'>
                      <i className='bx bx-library'></i>
                      <span className='spans-dashboard-admin'>Consultation des notes</span>
                  </Link>
              </li>

              <li className='li-dashboard-admin'>
                  <Link to='/etudiant/demande/add'>
                  <i className='bx bx-mail-send'></i>
                      <span className='spans-dashboard-admin'>Demande</span>
                  </Link>
              </li>

              <li className='li-dashboard-admin'>
                  <Link to='/etudiant/reclamation/add'>
                  <i className='bx bx-mail-send'></i>
                      <span className='spans-dashboard-admin'>Reclamation</span>
                  </Link>

              </li>
              <li className='li-dashboard-admin logout-dashboard-admin'onClick={handelClik}>
                  <Link to='/auth/login'>
                      <i className='bx bxs-log-out-circle' ></i>
                      <span className='spans-dashboard-admin'>Se deconnecter</span>
                  </Link>

              </li>
          </ul>
      </section>


  </div>
)
}
