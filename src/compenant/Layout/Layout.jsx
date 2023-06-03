import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './../Navbar/Navbar';

export default function Layout({user,logout}) {
  return (
    <div>
      <Navbar user={user} logout={logout}/>
      <div className="container">
      <Outlet/>

      </div>
    </div>
  )
}
