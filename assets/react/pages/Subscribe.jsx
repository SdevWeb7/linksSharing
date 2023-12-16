import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import iconEmail from "../../images/icon-email.svg";
import iconPass from "../../images/icon-password.svg";

const Subscribe = () => {

   const [userEmail, setUserEmail] = useState('')
   const [userPass, setUserPass] = useState('')
   const [errors, setErrors] = useState({})
   const [formValid, setFormValid] = useState(false)
   const [emailValid, setEmailValid] = useState(false)
   const [passValid, setPassValid] = useState(false)
   const regexEmail = /[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i;


   useEffect(() => {
      const isEmailValid = regexEmail.test(userEmail);
      const isPasswordValid = userPass.length >= 6;

      setEmailValid(isEmailValid);
      setPassValid(isPasswordValid);
      setFormValid(isEmailValid && isPasswordValid);
   }, [userEmail, userPass]);


   const handleSubmit = (e) => {
      e.preventDefault()
      fetch('/api/register', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({email: userEmail, password: userPass})
      }).then(r => r.json()).then(data => {
         if (Object.keys(data).length > 0) {
            setErrors(data)
         } else {
            window.location.reload()
         }
      })
   };


   return (
      <form className={'form-auth'}>
         <h1>Create Account</h1>
         <p>Let's get you started sharing your links!</p>

         {Object.keys(errors).length > 0 && (
            <div className={'div-error'}>
               {Object.entries(errors).map(([key, value]) => (
                  <div key={key}>{`${key}: ${value}`}</div>
               ))}
            </div>
         )}


         <label htmlFor="inputEmail">Email address <img
            src={iconEmail} className={'icons-input'} alt="a" width={20} height={20} /></label>
         <input type="email" value={userEmail} required autoFocus onChange={e => setUserEmail(e.target.value)} placeholder={"example@email.fr"} autoComplete={"current-username"} />
         {!emailValid && <p className={'notations'}>Enter a valid e-mail address</p>}

         <label htmlFor="inputPassword">Password <img
            src={iconPass} className={'icons-input'} alt="a" width={20} height={20} /></label>
         <input type="password" value={userPass} placeholder={'Enter your password'} autoComplete={"current-password"} required onChange={e => setUserPass(e.target.value)} />
         {!passValid && <p className={'notations'}>Enter a valid password (min 6)</p>}

         <button disabled={!formValid} className={`submit ${formValid ? 'valide' : ''}`} type="submit" onClick={handleSubmit}>Create new account</button>
         <div className="links-auth">
            <p>Already have an account?</p>
            <Link to={'/'}>Login</Link>
         </div>
      </form>
   )
}

export default Subscribe;