import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import joi  from "joi";

export default function Register() {

  let [user, setuser] = useState(
    {
      first_name: '',
      last_name: '',
      age: '',
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
    let valid=validation()
    console.log(valid);
    
if (valid.error==null) {

      setLoaading(true)
    let { data } = await axios.post('https://route-movies-api.vercel.app/signup', user)
    console.log(data);
    if (data.message == "success") {
      navigate("/login")
      setLoaading(false)

    }
    else 
    {
      setErrorApi(data.message)
      // setLoaading(false)

    }

  
}
else
{
  setErrorlist ( valid.error.details )
}


  }


  function validation() {

    let scheme=joi.object(
      {
        first_name:joi.string().required().min(3).max(30).alphanum(),
        last_name:joi.string().required().min(3).max(30).alphanum(),
        age:joi.number().required().min(18).max(90),
        email:joi.string().required().email({tlds:{allow:["com","net"]}}),
        password:joi.string().required().min(3).max(30),

        



      })
     return scheme.validate(user,{abortEarly:false})
  }

  return (
    <div> <h2>Registration form</h2>
    {errorList.length>0?errorList.map((el)=>  <div className='alert alert-danger'>{el.message}</div>):""}
      {errorApi == '' ? '' : <div className="alert alert-danger">{errorApi}</div>}
      <form onSubmit={submitDate}>
        <div className='my-2'>
          <label htmlFor="first_name">First_name</label>
          <input type="text" onChange={addUser} name="first_name" className='form-control mt-2 bg-transparent text-white' placeholder='Firstname' id='first_name' />
        </div>
        <div className='my-2'>
          <label htmlFor="last_name">last_name</label>
          <input type="text" onChange={addUser} name="last_name" className='form-control mt-2 bg-transparent text-white' placeholder='lastname' id='last_name' />
        </div>
        <div className='my-2'>
          <label htmlFor="age">age</label>
          <input type="number" onChange={addUser} name="age" className='form-control mt-2 bg-transparent text-white' placeholder='age' id='age' />
        </div>
        <div className='my-2'>
          <label htmlFor="email">email</label>
          <input type="email" onChange={addUser} name="email" className='form-control mt-2 bg-transparent text-white' placeholder='email' id='email' />
        </div>

        <div className='my-2'>
          <label htmlFor="password">password</label>
          <input type="password" onChange={addUser} name="password" className='form-control mt-2 bg-transparent text-white' placeholder='password' id='password' />
        </div>
        {loading ? <button className='btn btn-outline-info'><i className='fa-solid fa-spinner fa-spin '></i></button>
          : <button type='submit' className='btn btn-outline-danger'>Register</button>}

      </form>
    </div>
  )
  
}
