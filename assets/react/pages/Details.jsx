import React, { useContext, useState } from "react";
import AuthContext from "../hooks/AuthContext";
import PhoneImg from "../../images/illustration-phone-mockup.svg";
import IconAddImage from '../svg/IconAddImage';
import IconClipBoard from "../../images/icon-changes-saved.svg";
import EventBus from "../hooks/EventBus";
import LinkPreview from "../components/LinkPreview";
import { copyLink } from "../hooks/copyLink";

const Details = () => {

   const {user} = useContext(AuthContext)
   const [userFirstname, setUserFirstname] = useState(user.firstname.length > 0 ? user.firstname : '')
   const [userLastname, setUserLastname] = useState(user.lastname.length > 0 ? user.lastname : '')
   const [message, setMessage] = useState('')
   const [selectedImage, setSelectedImage] = useState(null);

   const handleSave = () => {
      let formData = new FormData()
      formData.append('firstname', userFirstname)
      formData.append('lastname', userLastname)
      formData.append('image', selectedImage)

      fetch('/api/update-profil', {
         method: 'POST',
         credentials: 'include',
         body: formData
      }).then(data => data.json()).then(d => {
         setMessage(d.success)
         setTimeout(() => {
            setMessage('')
         }, 4000)
         EventBus.emit('userUpdated', {firstname: userFirstname, lastname: userLastname, picture: d.imageUrl})
      })
   }
   const handleImageChange = (e) => {
      const file = e.target.files[0];

      if (file) {
         if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            setMessage('Veuillez sélectionner une image au format JPEG ou PNG.');
            return;
         }

         if (file.size > (1024 * 1024)) {
            setMessage('L\'image est trop volumineuse. Veuillez sélectionner une image de taille inférieure à 1 Mo.');
            return;
         }
         setSelectedImage(file);
      }
   };

   return (
      <div className={'container'}>
         <div className="apercu">
            <div className="illustration-img">
               <img src={user.picture.length > 0 ? user.picture : '/smiley.png'} alt=""/>
            </div>

            <p className="fullname" style={{backgroundColor: user.firstname.length > 0 ? 'white' : 'transparent'}}>
               {user.firstname.length > 0 && <span>{user.firstname} {user.lastname}</span>}
            </p>
            <p className="email">{user.email}</p>

            {user.links.map((link, index) => <LinkPreview key={index} copyLink={e => copyLink(e, setMessage)} platform={link.platform} lien={link.lien} />)}

            <img className={'phone-img'} src={PhoneImg} alt="a"/>
         </div>

         <div className="settings">
            <h1>Profile Details</h1>
            <p>Add your details to create a personal touch to your profile.</p>

            <div className="settings-container">

               <div className="settings-item">
                  <p>Profile picture</p>

                  <div className="add-image" style={{color: selectedImage ? 'white' : '#633CFF'}}>
                     {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="a" style={{position: "absolute", inset: 0, width: '100%', height: '100%', borderRadius: '10px'}} />}

                     <div className="custom-file-input">
                        <IconAddImage />
                        <input type="file" id="fileInput" onChange={handleImageChange} />
                        <label htmlFor="fileInput" style={{color: selectedImage ? 'white' : '#633CFF'}}>{selectedImage ? 'Change image' : '+ Upload Image'}</label>
                     </div>

                  </div>

                  <p style={{fontSize: '12px'}}>Image must be below 1024x1024px.<br />Use PNG or JPG format.</p>
               </div>

            </div>



            <div className="settings-container">
               <div className="settings-item2">
                  <p>Firstname</p>
                  <input type="text" value={userFirstname} onChange={e => setUserFirstname(e.target.value)} placeholder={'e.g. John'} />
               </div>
               <div className="settings-item2">
                  <p>Lastname</p>
                  <input type="text" value={userLastname} onChange={e => setUserLastname(e.target.value)} placeholder={'e.g. Doe'} />
               </div>
               <div className="settings-item2">
                  <p>Email</p>
                  <input type="text" value={user.email} disabled={true} />
               </div>
            </div>

            <div className="save-links-container">
               <button className={'save-links'} onClick={handleSave}>Save</button>
            </div>

            {message.length > 0 && <div className="message"><img src={IconClipBoard} alt="a" style={{marginRight: '15px'}} /> {message}</div>}
         </div>
      </div>
   )
}

export default Details;