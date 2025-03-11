import React from 'react'
import Acceuil from '../components/ImgeSlider'
import ListCardsFilier from '../components/filieres/ListCardsFilier'
import ListCardsAcctualites from '../components/acctualites/ListCardsAcctualites'
import { filierServices } from '../../services/filierServices'
import Footer from '../components/Footer'

export default function AcceuilPage() {
 
  return (
    <div>
        <Acceuil />
        <ListCardsAcctualites />
        <ListCardsFilier />
        <Footer />
    </div>
  )
}
