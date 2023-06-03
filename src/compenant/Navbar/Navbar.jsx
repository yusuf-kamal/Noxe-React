import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar({user,logout}) {
  console.log(user);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">Noxe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>


    <div className="collapse navbar-collapse" id="navbarSupportedContent">

{user!=null?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="home">Home</NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="about">About</NavLink>
        </li> */}
        {/* <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="tvshow">Tvshow</NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="movie">movies</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="people">people</NavLink>
        </li>
        
        
        <li className="nav-item">
          <span className='nav-link logout'onClick={logout}>Logout</span>
        </li>
        
      </ul>:<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item  d-flex align-items-center">
          <i className='fa-brands fa-facebook mx-2'></i>
          <i className='fa-brands fa-youtube  mx-2'></i>
          <i className='fa-brands fa-instagram  mx-2'></i>
          <i className='fa-brands fa-google  mx-2'></i>

        </li>
        
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive?'nav-link active':"nav-link"} aria-current="page" to="login">login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive?'nav-link active':"nav-link"} aria-current="page" to="register">register</NavLink>
        </li>
        
       
        
        
        
    
       
        
      </ul>}

      


      
     
    </div>
  </div>
</nav>
  )
}
