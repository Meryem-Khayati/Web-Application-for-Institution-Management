import React, { useState, useEffect, useRef } from 'react';
import '../../csspartiepublic/StyleCardsAcctualites.css';
import { annonceServices } from '../../../services/annonceServices';
import { fileServices } from '../../../services/fileServices';
import { useNavigate } from 'react-router-dom';

export default function CardAcctualite(props) {
  const titreEventRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const delay = props.delay;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (titreEventRef.current && titreEventRef.current.classList) {
        titreEventRef.current.classList.add('appear');
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

 const [file,setFile]=useState([])
 const [type,setType]=useState("")
  const idannonce=props.id;

  useEffect(()=>{
    fileServices.getAllFiles(idannonce)
    .then(res=>{
      console.log(res.data)
      setFile(res.data[0].file);
      setType(res.data[0].type);
      
     })
    .catch(err=>{
      console.log(err.data)
    })
  },[])

  console.log(file)
  const navigate=useNavigate();
  function handelNavigate(){
   navigate(`annonces/${idannonce}/files`)
  
  }
  
  return (
    <div className="card">
      <div className='titre-annonce'>
      <h3>{props.titre}</h3>
      
     </div>
     <div className='image-annonce'>
      {type ==='vidio' && file && <video controls className='vido-annonce'>
            <source  src={`data:video/mp4;base64,${file}`} type="video/mp4" />
        </video>}
        {type ==='image' && file && <img  src={`data:image/png;base64,${file}`} alt="" className='image-annonce' />}
     </div>
     <div className='date-annonce'>
      <p>{props.datePublication}</p>
      <button onClick={handelNavigate} className='btn-annonces'>voir plus</button>
     </div>
      
    </div>
  );
}
