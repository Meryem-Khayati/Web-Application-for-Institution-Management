import React from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from './componentsEtd/SideMenu'

export default function EtudiantLayout() {
  return (
    <div>
        <SideMenu />
        <Outlet />
    </div>
  )
}
