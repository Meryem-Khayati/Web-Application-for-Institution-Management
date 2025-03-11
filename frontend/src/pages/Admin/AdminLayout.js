import React from 'react'
import { Outlet } from 'react-router-dom'
import Section1sidbar from './dashboard/Section1sidbar'
import Section2navbar from './dashboard/Section2navbar'

export default function AdminLayout() {
  return (
    <div>
       
        <Section1sidbar />
        <Outlet />
    </div>
  )
}
