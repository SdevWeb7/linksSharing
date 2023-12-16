import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import copy from 'clipboard-copy'
import IconClipBoard from '../../images/icon-link-copied-to-clipboard.svg'
import LinkPreview from "../components/LinkPreview";
import { copyLink } from "../hooks/copyLink";
import Loading from "./Loading";

const Show = () => {

   const email = document.querySelector('#react-show').dataset.email
   const [user, setUser] = useState({})
   const [message, setMessage] = useState('')
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      fetch('/api/show/' + email).then(r => r.json()).then(d => setUser(d)).finally(setLoading(false))
   }, [email])


   if (loading) {
      return <Loading />
   }

   console.log(user)

   return (
      <div className="container-show">
          <div className="background"></div>

          <div className="card-profil">
             <div className="photo-profil">
                <img src={user.picture && user.picture.length > 0 ? user.picture : '/smiley.png'} alt="a" />
             </div>
             <div className="fullname-profil"><h1><strong>{user.firstname} {user.lastname}</strong></h1></div>
             <div className="email-profil">{user.email}</div>
             <div className="links-profil">
                {Object.keys(user).length > 0 && user.links.map((link, index) => <LinkPreview key={index} copyLink={e => copyLink(e, setMessage)} platform={link.platform} lien={link.lien} />)}
             </div>
          </div>

          {message.length > 0 && <div className="message"><img src={IconClipBoard} alt="a" style={{marginRight: '5px'}} /> {message}</div>}
      </div>
   )
}

export default Show;