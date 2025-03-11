import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { moduleServices } from '../../services/moduleServices';


export default function UpdateModule() {
  const [message, setMessage] = useState('');

const [isTrue, setIstrue] = useState(false);
const idfilier = useParams().idfilier;
const idsemestre= useParams().idsemestre;
const idmodule =useParams().idmodule;
console.log(idmodule)
console.log(idfilier)
console.log(idsemestre)

let navigate=useNavigate()
const [module, setModule] = useState({
  nom:"",
});


useEffect(()=>{

  moduleServices.getModule(idfilier,idsemestre,idmodule)
  .then(res=>{
    setModule(res.data);
    console.log(res.data);
    
  })
  .catch(err=>{
    console.log(err.data)
  })

}, [idmodule]);



function handleChange(e){
  setModule({
    ...module,
    [e.target.name]:e.target.value,
  })
}


function handleSubmit(e){
  e.preventDefault();
  console.log(module)
  moduleServices.updateModule(idfilier,idsemestre,idmodule,module)
   .then(res=>{
    console.log(res.data)
    setMessage(res.data.message);
    setIstrue(true);}
    )
   .catch(err=>{console.log(err.data)
    setMessage("Erreur lors de la modification du module");
    setIstrue(false)
   })
  
  }


  return (
    <section id='admin-add-filier-container-etudiant' className='admin-add-filier-container'>
    <div className='add-content'>
        <div className='title-add-filier'>
              <h2 className="">Modifier module <i class='bx bxs-edit bx-md'></i></h2>
            </div>
            {message && <p className={isTrue ? "true" : "false"}>{message}</p>}

            <form onSubmit={handleSubmit} className='form-add-filier'>
               <input className='input-add-filier input-add-module' type='text' name='nom' placeholder='nom de module...' value={module.nom} onChange={handleChange} required/>
               <button className='btnadd'>Modifier</button>
            </form>
        </div>
    </section>
  )
}
