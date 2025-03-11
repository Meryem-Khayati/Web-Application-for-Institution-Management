import React from 'react'
import imgp from './people.png'


export default function Section4table() {
  return (
    <div>
         <section className='section-4'>
        <div className='section-4-container'>
        <div className="info">
            <h3>List des utilisateurs les plus recent</h3>
            <span><i className='bx bx-list-ul'></i></span>
        </div>
        <table className='tab1'>
            <thead>
                <tr>
                    <th>Profil</th>
                    <th>Appogie</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                </tr>
            </thead>
            <tbody>

                <tr>
                    <td><img src={imgp} alt="user"  className='tab-profil'/></td>
                    <td>G1323233</td>
                    <td>user1</td>
                    <td>user1</td>
                </tr>
                <tr>
                <td><img src={imgp} alt="user"  className='tab-profil'/></td>
                    <td>G16373233</td>
                    <td>user2</td>
                    <td>user2</td>
                </tr>
                <tr>
                <td><img src={imgp} alt="user"  className='tab-profil'/></td>
                    <td>G1323643</td>
                    <td>user3</td>
                    <td>user3</td>
                </tr>

            </tbody>
        </table>
        </div>
    </section>

    </div>
  )
}
