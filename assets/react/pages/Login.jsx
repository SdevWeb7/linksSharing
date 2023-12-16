import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../hooks/AuthContext";
import Loading from "./Loading";
import iconEmail from '../../images/icon-email.svg'
import iconPass from '../../images/icon-password.svg'

const Login = () => {

   const [userEmail, setUserEmail] = useState('')
   const [userPass, setUserPass] = useState('')
   const [errors, setErrors] = useState('')
   const [formValid, setFormValid] = useState(false)
   const regexEmail = /[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i;
   const [emailValid, setEmailValid] = useState(false)
   const [passValid, setPassValid] = useState(false)

   useEffect(() => {
      const isEmailValid = regexEmail.test(userEmail);
      const isPasswordValid = userPass.length >= 6;

      setEmailValid(isEmailValid);
      setPassValid(isPasswordValid);
      setFormValid(isEmailValid && isPasswordValid);
   }, [userEmail, userPass]);

   const handleSubmit = (e) => {
      e.preventDefault()
      fetch('/api/login', {
         method: 'POST',
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({username: userEmail, password: userPass})
      }).then(r => r.json()).then(datas => {
         if (datas && datas.error) {
            setErrors(datas.error)
            throw new Error('Bad Credentials')
         } else {
            window.location.reload()
         }
      })
   };


   return (
         <form className={'form-auth'}>
            <h1>Login</h1>
            <p>Add your details below to get back into the app</p>
            {errors && <div className={'div-error'}>{errors}</div>}

            <label htmlFor="inputEmail">Email address <img
               src={iconEmail} className={'icons-input'} alt="a" width={20} height={20} /></label>
            <input type="email" value={userEmail} required autoFocus onChange={e => setUserEmail(e.target.value)} placeholder={"example@email.fr"} autoComplete={"current-username"} />
            {!emailValid && <p className={'notations'}>Enter a valid e-mail address</p>}

            <label htmlFor="inputPassword">Password <img
               src={iconPass} className={'icons-input'} alt="a" width={20} height={20} /></label>
            <input type="password" value={userPass} placeholder={'Enter your password'} autoComplete={"current-password"} required onChange={e => setUserPass(e.target.value)} />
            {!passValid && <p className={'notations'}>Enter a valid password (min 6)</p>}


            <button disabled={!formValid} className={`submit ${formValid ? 'valide' : ''}`} type="submit" onClick={handleSubmit}>Login</button>
            <div className={'links-auth'}>
               <p>Don't have an account? </p>
               <Link to={'/subscribe'}>Create account</Link>
            </div>
      </form>
   )
}

export default Login;