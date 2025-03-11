import React, { useEffect, useState } from 'react';
import { emploiServices } from '../../../services/emploiServices';
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload,faEye} from '@fortawesome/free-solid-svg-icons';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function CardFileEtd() {
    const idFilier = useParams().idFilier;
    const idsemestre = useParams().idsemestre;
    const [fileContent, setFileContent] = useState(null);
    const [emploi, setEmploi] = useState([]);

    useEffect(() => {
        emploiServices.getAllEmploi(idFilier, idsemestre)
            .then(res => {
                console.log(res.data);
                setFileContent(res.data[0].file);
                setEmploi(res.data[0]);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

   

    return (
        <div className="emploi-file-container">
          
                <div className='file-content'>
                    <iframe
                        title="PDF Viewer"
                        src={fileContent ? `data:application/pdf;base64,${fileContent}` : "null"}
                        width="100%"
                        height="600"
                        onError={(e) => console.error('Erreur lors du chargement du PDF:', e)}
                    />
                </div>
           
        </div>
    );
}
