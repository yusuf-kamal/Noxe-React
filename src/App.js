import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Layout from './compenant/Layout/Layout';
import About from './compenant/About/About';
import Tvshow from './compenant/Tvshow/Tvshow';
import People from './compenant/People/People';
import Home from './compenant/Home/Home';
import Login from './compenant/Login/Login';
import Movie from './compenant/Movie/Movie';
import Register from './compenant/Register/Register';
import Notfound from './compenant/Notfound/Notfound';
import { useState, useEffect } from "react";

import jwt_decode from "jwt-decode";
import MovieDetails from './compenant/MovieDetails/MovieDetails';






function App() {


  let [user, setuser] = useState(null)
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      saveUserDate()

    }

  }, [])


  function saveUserDate() {

    let token = localStorage.getItem("token")
    let date = jwt_decode(token)
    // console.log(date);
    setuser(date)
  }



  function logout() {
    localStorage.removeItem('token')
    setuser(null)
    return<Navigate to='/login'/>
  }



  function ProtectRouters(props) {
    if (localStorage.getItem('token') == null) {

      return <Navigate to='/login' />
    }
    else {
      return props.children

    }
  }

  let routers = createBrowserRouter([
    {
      path: '/', element: <Layout user={user} logout={logout} />, children: [
        { path: '/', element: <ProtectRouters> <Home /></ProtectRouters> },
        { path: 'home', element: <ProtectRouters> <Home /></ProtectRouters> },
        { path: 'about', element: <ProtectRouters> <About /></ProtectRouters> },
        { path: 'tvshow', element: <ProtectRouters> <Tvshow /></ProtectRouters> },
        { path: 'people', element: <ProtectRouters>  <People /> </ProtectRouters> },
        { path: 'login', element: <Login saveUser={saveUserDate} /> },
        { path: 'movie', element: <ProtectRouters> <Movie /></ProtectRouters> },
        { path: 'moviedetails/:id', element: <ProtectRouters> <MovieDetails /></ProtectRouters> },

        { path: 'register', element: <Register /> },
        { path: '*', element: <Notfound /> }


      ]
    }
  ])

  return (
    <RouterProvider router={routers} />
  );
}

export default App;
