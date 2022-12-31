import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [credentials,setCredentials] =useState({email:"",password:""})   // useHistory == useNavigate (changes in version 5-6)
    let navigate= useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            ,
            body: JSON.stringify({ email:credentials.email,password:credentials.password })
        });

        const json = await response.json();
        console.log(json);
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token',json.authtoken) /// what?? --> token storing in local storage 
            // localStorage.removeItem("authtoken");
            props.showAlert("Logged in successfully","success")
            navigate("/")
        }
        else {
            props.showAlert("invalid credentials","danger")
        }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
      }
    return (
        <div className='mt-2'>
            <h2>Login to continue into iLogbook</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3" >
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credentials.email} className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} className="form-control" onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
// {
//     "email":"krishna@gmail.com",
//     "password":"jayshriram"
//   }