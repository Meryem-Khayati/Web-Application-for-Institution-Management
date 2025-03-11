import React, { useEffect, useState } from 'react';
import {fileServices} from '../../services/fileServices';
import { useNavigate, useParams,useLocation } from 'react-router-dom';



export default function ShowFile() {
 
    const idannonce=useParams().idannonce;
    const idfile=useParams().idfile;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type');
   
    const [file,setFile]=useState("");
 
    useEffect(() => {
        fileServices.getFile(idannonce, idfile)
            .then(res => {
                console.log(res.data);
                setFile(res.data.file);
            })
            .catch(err => {
                console.log(err.data);
            });
    }, []);
    

return (
    <div className='admin-dashboard-annonce-file-container'>
        {type ==='vidio' && file && <video controls className='vido-annonce'>
            <source  src={`data:video/mp4;base64,${file}`} type="video/mp4" />
        </video>}
        {type ==='image' && file && <img  src={`data:image/png;base64,${file}`} alt="" className='image-annonce' />}
        
    </div>
);

}
