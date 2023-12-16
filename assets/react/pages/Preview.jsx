import React, { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import AuthContext from "../hooks/AuthContext";
import Loading from "./Loading";
import copy from 'clipboard-copy'
import IconClipBoard from '../../images/icon-link-copied-to-clipboard.svg'
import LinkPreview from "../components/LinkPreview";
import { copyLink } from "../hooks/copyLink";

const Preview = () => {

   const {user, isLoading} = useContext(AuthContext)
   const [message, setMessage] = useState('')


   if (isLoading) {
      return <Loading />
   }
   if (!user) {
      return <Navigate to={"/"} />
   }

   const handleCopy = () => {
      copy('/show/' + user.email).then(() => setMessage('The link has been copied to your clipboard!'))
      setTimeout(() => {
         setMessage('')
      }, 4000)
   }

   return (
      <div className="container-show">
         <div className="background"></div>

         <div className="nav-header">
            <Link to={'/profil'} className="back">Back to editor</Link>
            <button className="share" onClick={handleCopy}>Share link</button>
         </div>

         <div className="card-profil">
            <div className="photo-profil">
               <img src={user.picture.length > 0 ? user.picture : '/smiley.png'} alt="a" />
            </div>
            <div className="fullname-profil"><h1><strong>{user.firstname} {user.lastname}</strong></h1></div>
            <div className="email-profil">{user.email}</div>
            <div className="links-profil">
               {user.links.map((link, index) => <LinkPreview key={index} copyLink={e => copyLink(e, setMessage)} platform={link.platform} lien={link.lien} />)}
            </div>
         </div>

         {message.length > 0 && <div className="message"><img src={IconClipBoard} alt="a" style={{marginRight: '5px'}} /> {message}</div>}
      </div>
   )
}

export default Preview;