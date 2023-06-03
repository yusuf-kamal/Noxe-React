import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import joi from "joi";

export default function Login({saveUser}) {
  // console.log(saveUser);
  let [user, setuser] = useState(
    {

      email: '',
      password: '',


    })
  let [loading, setLoaading] = useState(false)
  let navigate = useNavigate()
  let [errorApi, setErrorApi] = useState("")
  let [errorList, setErrorlist] = useState([])


  function addUser(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setuser(myUser)
    // console.log(myUser);
  }


  async function submitDate(e) {

    e.preventDefault()
    let valid = validation()
    console.log(valid);

    if (valid.error == null) {

      setLoaading(true)
      let { data } = await axios.post('https://route-movies-api.vercel.app/signin', user)

      console.log(data);
      setLoaading(false)
      if (data.message == "success") {
        navigate("/home")
        localStorage.setItem("token", data.token)
        saveUser()

      }
      else {
        setErrorApi(data.message)
        // setLoaading(false)

      }


    }
    else {
      setErrorlist(valid.error.details)
    }


  }


  function validation() {

    let scheme = joi.object(
      {

        email: joi.string().required().email({ tlds: { allow: ["com", "net"] } }),
        password: joi.string().required().min(3).max(30)





      })
    return scheme.validate(user, { abortEarly: false })
  }

  return (
    <div> <h2>login form</h2>
      {errorList.length > 0 ? errorList.map((el,i) => <div key={i} className='alert alert-danger'>{el.message}</div>) : ""}
      {errorApi == '' ? '' : <div className="alert alert-danger">{errorApi}</div>}
      <form onSubmit={submitDate}>



        <div className='my-2'>
          <label htmlFor="email">email</label>
          <input type="email" onChange={addUser} name="email" className='form-control mt-2 bg-transparent text-white' placeholder='email' id='email' />
        </div>

        <div className='my-2'>
          <label htmlFor="password">password</label>
          <input type="password" onChange={addUser} name="password" className='form-control mt-2 bg-transparent text-white' placeholder='password' id='password' />
        </div>
        {loading ? <button className='btn btn-outline-info'><i className='fa-solid fa-spinner fa-spin '></i></button>
          : <button type='submit' className='btn btn-outline-danger'>Login</button>}

      </form>
    </div>
  )
}