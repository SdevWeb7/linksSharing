import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../hooks/AuthContext";
import PhoneImg from '../../images/illustration-phone-mockup.svg'
import PhoneExample from '../../images/illustration-empty.svg'
import AddLink from "../components/AddLink";
import IconClipBoard from "../../images/icon-changes-saved.svg";
import eventBus from "../hooks/EventBus";
import LinkPreview from "../components/LinkPreview";
import { copyLink } from "../hooks/copyLink";
import { Link } from "react-router-dom";

const Links = () => {

   const {user} = useContext(AuthContext)
   const [listLinks, setListLinks] = useState([])
   const [linksCount, setLinksCount] = useState(0)
   const [message, setMessage] = useState('')

   useEffect(() => {
      const linksComponents = user.links.map((link, index) => (
         <AddLink key={index} id={index} removeLink={removeLink} selected={link.platform} />
      ));
      setListLinks(linksComponents);
      setLinksCount(linksComponents.length);
   }, [])

   const removeLink = (e) => {
      const id = e.currentTarget.parentElement.parentElement.id
      setLinksCount(v => v - 1)
      setListLinks(v => v.filter(item => item.key !== id))
   }
   const addLink = () => {
      setLinksCount(v => v + 1)
      setListLinks(v => [...v, <AddLink key={linksCount + 1} id={linksCount + 1} removeLink={removeLink} />])
   }

   const handleSave = () => {
      let links = new Map()
      document.querySelectorAll('.data-link').forEach((link) => {
         links.set(link.parentElement.parentElement.children[1].children[2].value, link.value)
      })
      fetch('/api/update-links', {
         method: 'POST',
         body: JSON.stringify([...links])
      }).then(r => r.json()).then(d => {
         eventBus.emit('userUpdatedLinks', d)
      })

      setMessage('Your changes have been successfully saved!')
      setTimeout(() => {
         setMessage('')
      }, 4000)
   };

   console.log(linksCount)
   return (
      <div className={'container'}>
         <div className="apercu">
            <div className="illustration-img">
               <img src={user.picture.length > 0 ? user.picture : '/smiley.png'} alt="a"/>
            </div>

            <p className="fullname" style={{backgroundColor: user.firstname.length > 0 ? 'white' : 'transparent'}}>
               {user.firstname.length > 0 && <span>{user.firstname} {user.lastname}</span>}
            </p>

            <p className="email">{user.email}</p>

            {user.links.map((link, index) => <LinkPreview key={index} copyLink={e => copyLink(e, setMessage)} platform={link.platform} lien={link.lien} />)}

            <img className={'phone-img'} src={PhoneImg} alt="a"/>
         </div>

         <div className="settings">
            <h1>Customize your links</h1>
            <p>Add/edit/remove links below and then share all your profiles with the world!</p>

            <button onClick={addLink} className={'add-link'}>+ Add new link</button>

            {linksCount <= 0 &&
               <div className="get-started">
                  <img className={'phone-example'} src={PhoneExample} alt="a" width={250} height={160} />
                  <h1>Let's get you started</h1>
                  <p>Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profiles with everyone!</p>
               </div>}
            {listLinks}

            <div className="save-links-container">
               <button className={'save-links'} onClick={handleSave}>Save</button>
            </div>

            {message.length > 0 && <div className="message"><img src={IconClipBoard} alt="a" style={{marginRight: '15px'}} /> {message}</div>}
         </div>
      </div>
   )
}

export default Links;