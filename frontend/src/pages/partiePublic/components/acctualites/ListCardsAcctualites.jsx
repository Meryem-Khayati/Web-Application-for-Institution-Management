import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../csspartiepublic/StyleCardsAcctualites.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import  {Autoplay, Pagination, Navigation } from 'swiper/modules';
import CardAcctualite from './CardAcctualite';
import {annonceServices} from '../../../services/annonceServices'
export default function ListCardsAcctualites() {
  const [annonces,setAnnonces]=useState([])

   useEffect(()=>{
    annonceServices.getAllAnnonces()
    .then(res=>{console.log(res.data);
      setAnnonces(res.data)
    })

   },[])

const listAcctualites = annonces.map(element=>{
  return(
    <SwiperSlide key={element.id}> <CardAcctualite  id={element.id} titre={element.titre} datePublication={element.datePublication} description={element.description} img={element.fichiers} delay={element.delay} className='cards' /></SwiperSlide>

  );

})

    const swiperRef = useRef(null);
   
  return (
    <div className='listCards'> 
    <h1 className='acct'>Actualités</h1>
      <Swiper
        ref={swiperRef}
      navigation={true}
        slidesPerView={2}
        spaceBetween={3}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        breakpoints={{
         
          800: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          100: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {listAcctualites}
    
      </Swiper>
    </div>
  );
}