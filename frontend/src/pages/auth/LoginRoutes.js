import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import PublicLayout from '../partiePublic/PublicLayout'


export default function LoginRoutes() {
  return (
    <div>
        <Routes>
          <Route element={<PublicLayout/>}>
            <Route index element={<Login />} />
            <Route path='/login' element={<Login />} />
            </Route>
        </Routes>
    </div>
  )
}
