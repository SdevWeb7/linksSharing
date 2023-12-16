import React from 'react'
import IconGithub from "../../images/icon-github.svg";
import IconFacebook from "../../images/icon-facebook.svg";
import IconYoutube from "../../images/icon-youtube.svg";
import IconArrow from "../../images/icon-arrow-right.svg";

const LinkPreview = ({platform, lien, copyLink}) => {

   let icon, style;

   switch (platform) {
      case 'GitHub':
         style = {backgroundColor: '#000000', color: 'white'}
         icon = IconGithub
         break

      case 'Facebook':
         style = {backgroundColor: '#2D68FF', color: 'white'}
         icon = IconFacebook
         break

      case 'Youtube':
         style = {backgroundColor: '#EE3939', color: 'white'}
         icon = IconYoutube
         break

      default:
         style = {backgroundColor: '#000000'}
         icon = IconGithub
         break
   }

   return (
      <div className="illustration-links" style={style}>
         <img src={icon} alt="a" />
         <p>{platform}</p>
         <img src={IconArrow} data-link={lien} onClick={copyLink} style={{cursor: 'pointer'}} />
      </div>
   )
}

export default LinkPreview;