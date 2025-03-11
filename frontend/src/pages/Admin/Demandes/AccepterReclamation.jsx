import React,{useState} from 'react'
import { demandeServices } from '../../services/demandeServices';
import { useParams } from 'react-router-dom';

export default function AccepterReclamation() {
    const id =useParams().id;
    const [message, setMessage] = useState('');
    const [isTrue, setIstrue] = useState(false);
    const [reclamatioInfo, setReclamationInfo] = useState({
        body: "",
        subject: ""
    });
    function resetData(){
        setReclamationInfo({
            body: "",
            subject: ""
        })
    
      }
const [files,setFiles]=useState(null)
    function handleChange(e) {
      setReclamationInfo(
        {
            ...reclamatioInfo,
            [e.target.name]:e.target.value
        }
      )
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('files', files);
        formData.append('body', reclamatioInfo.body);
        formData.append('subject', reclamatioInfo.subject);
        
        demandeServices.AccepterReclamation(id,formData)
            .then(res => {console.log(res.data)
                setMessage(res.data.message)
                setIstrue(true)
                resetData();

               
            })
            .catch(err => {console.log(err)
                setMessage("erreur")
                setIstrue(false)
                
            });
    }

    return (
        <section className='admin-add-filier-container'>
        <div className='add-content'>
            <div className='title-add-filier'>
                    <h2 className="lora-myuniqueclass">Ajouter Email</h2>
                </div>
                {message && <p className={isTrue ? "true" : "false"}>{message}</p>}

                <form onSubmit={handleSubmit} className='form-add-filier'>
                    <input className='input-add-filier' type="text" name='body' value={reclamatioInfo.body} onChange={handleChange} placeholder="entrer le body" required />
                    <input className='input-add-filier' type="text" name='subject' value={reclamatioInfo.subject} onChange={handleChange} placeholder="subject" required />
                    <label className="label-file-upload">
                    Choisissez le fichie
                    <input id='file-upload' type="file" name='files' onChange={(e)=>{setFiles(e.target.files[0])}} placeholder="file" required />
                    </label>
                    <button type="submit" className='btnadd'>Envoyer</button>
                </form>
                </div>
        </section>
            
        
    );
};
