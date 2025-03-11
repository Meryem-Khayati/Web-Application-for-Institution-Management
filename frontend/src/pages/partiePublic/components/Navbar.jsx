import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../csspartiepublic/navbar.css'
import logo from '../../images/logoestFBS.png'


export default function Navbar() {
  const [isNavVisible, setIsNavVisible] = useState(true);

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <>

    <div className="containerNav">

      <div className='divpartie1'>
        <img src={logo}  className='logonavbarest'/>
      </div>

      <nav className={`navClass ${isNavVisible?'':'newNavClass'}`}>
        <ul className='ulClass'>
          <li className='liClass'> <NavLink to='/' className="navLinkClass">Accueil</NavLink></li>
          <li className='liClass'> <NavLink to='espaceetudiant' className="navLinkClass"> Espace Étudiant</NavLink></li>
          <li className='liClass'> <NavLink to='/filier' className="navLinkClass">Emploi du temps</NavLink></li>
          <li className='liClass'><NavLink to='/auth'  className="navLinkClass">Connexion</NavLink></li>
        </ul>
      </nav>
      <div onClick={toggleNavVisibility}><i class='bx bx-menu-alt-left'></i></div>

    </div>
   
    </>
    
  )
}
