import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import estfbs from '../../images/estfbs.png';
import buvette from '../../images/buvette.jpg';
import buvette2 from '../../images/buvette2.jpg';
import coloir from '../../images/coloire.jpg';
import emphi from '../../images/emphi.jpg';
import emphi2 from '../../images/emphi2.jpg';
import idara from '../../images/idara.jpg';
import betwen from '../../images/betwenclass.jpg';
import cour from '../../images/cour.jpg';
import bio from '../../images/biologie.jpg';
import est from '../../images/est.jpg';
import coloirebio from '../../images/coloirebio.jpg';
import prebio from '../../images/prebio.jpg';
import '../csspartiepublic/StyleImageSlider.css'
import { useNavigate } from "react-router-dom";



export default function Acceuil() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const slideRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleClickNext = () => {
    let items = slideRef.current.querySelectorAll(".itemA");
    slideRef.current.appendChild(items[0]);
  };

  const handleClickPrev = () => {
    let items = slideRef.current.querySelectorAll(".itemA");
    slideRef.current.prepend(items[items.length - 1]);
  };

  function hanedelNavigate(){
    navigate("/detail")
  }
  const data = [
   
    {
      id: 1,
      imgUrl: buvette,
      name: "EST FBS",
    },
  
    {
      id: 2,
      imgUrl:est,
      name: "EST FBS",
    },
    {
      id: 3,
      imgUrl: coloirebio,
      name: "EST FBS",
    },
    {
      id: 14,
      imgUrl: cour,
      name: "EST FBS",
    },
    {
      id: 5,
      imgUrl: emphi,
      name: "EST FBS",
    },
    {
      id: 12,
      imgUrl: emphi2,
      name: "EST FBS",
    },
    {
      id: 15,
      imgUrl: prebio,
      name: "EST FBS",
    },

    {
      id: 7,
      imgUrl: idara,
      name: "EST FBS",
    },
    {
      id: 8,
      imgUrl: betwen,
      name: "EST FBS",
    },
  
    {
      id: 10,
      imgUrl: bio,
      name: "EST FBS",
    },
    {
      id: 11,
      imgUrl: estfbs,
      name: "EST FBS",
    },
    {
      id: 16,
      imgUrl: buvette2,
      name: "EST FBS",
    },
  ];
 
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="containerA">
      <div className="loadbarA" style={{ width: `${loadingProgress}%` }}></div>
      <div id="slideA" ref={slideRef}>
        {data.map((item) => (
          <div 
            key={item.id}
            className="itemA"
            style={{ backgroundImage: `url(${item.imgUrl})` }}
          >
            <div className="contentA">
              <div className="nameA">{item.name}</div>
              <button onClick={handleExpandClick} aria-label="show more" className='plus'>
            <span onClick={hanedelNavigate}>plus de détails</span>
          </button>
     
            </div>
          </div>
        ))}
      </div>
      <div className="buttonsA">
        <button id="prevA" onClick={handleClickPrev}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button id="nextA" onClick={handleClickNext}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div> 
  
  );
};



