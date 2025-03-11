import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone,faFax,faEnvelope,faGlobe,faLocationCrosshairs} from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/logoest.png'
export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="part-footer">
                    <img src={logo} alt="" className="img-footer" />
                    <p className="para-footer">Ecole Supérieure de Technologie de Fkih Ben Salah</p>
                </div>
                <div className="part-footer">
                    <h2>Contactez nouz</h2>
                    <ul className="list-footer">
                        <li><FontAwesomeIcon icon={faPhone} className='icon-footer navigatin-list'/>05 23 43 46 66</li>
                        <li><FontAwesomeIcon icon={faFax} className='icon-footer navigatin-list' />05 23 43 49 99</li>
                        <li><FontAwesomeIcon icon={faEnvelope} className='icon-footer navigatin-list' /> estfbs@usms.ma</li>
                        <li><NavLink className='navigatin-list' to='http://estfbs.usms.ac.ma/'><FontAwesomeIcon icon={faGlobe} className='icon-footer' />estfbs.usms.ac.ma </NavLink></li>
                        <li><NavLink className='navigatin-list' to='https://www.google.com/maps/place/EST+:+%C3%89cole+Sup%C3%A9rieure+de+FBS/@32.5190261,-6.6600677,19.66z/data=!4m6!3m5!1s0xda46bc6644b9563:0x6ee82fe090e3e2f6!8m2!3d32.5163125!4d-6.6659375!16s%2Fg%2F11fq5xl88q?entry=ttu'><FontAwesomeIcon icon={faLocationCrosshairs} className='icon-footer' />Localisation</NavLink></li>
                    </ul>
                </div>
                <div className="part-footer">
                    <h2>Accés rapide</h2>
                    <ul className="list-footer">
                        <li><NavLink to='/' className='navigatin-list'><i className='bx bxs-home'></i>Acceuil</NavLink></li>
                        <li><NavLink to='/'  className='navigatin-list'><i className='bx bxl-mastercard'></i>Acctualités</NavLink></li>
                        <li><NavLink to='/filier'  className='navigatin-list'><i class='bx bx-time-five'></i>Emploi de temps</NavLink></li>
                        <li><NavLink to='/espaceetudiant'  className='navigatin-list'><i className='bx bxs-group'></i>Espace etudiant</NavLink></li>
                    </ul>
                </div>
            </div>
            <div className="copy-footer">
                <p> &copy; Ecole Supérieure de Technologie de Fkih Ben Salah 2019 - Tous droits réservés. </p>
                <p>Site web Created by : Meryem & Halima</p>
            </div>

        </footer>
    )
}