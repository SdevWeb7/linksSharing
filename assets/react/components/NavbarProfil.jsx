import React, { useEffect, useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import LogoDevLinksSmall from "../../images/logo-devlinks-small.svg"
import IconLinks from '../svg/IconLinks'
import IconProfileDetails from '../svg/IconProfileDetails'
import { debounce } from "../hooks/debounce";
import IconPreview from '../../images/icon-preview-header.svg'

const NavbarProfil = () => {

   const [pathname, setPathName] = useState(window.location.pathname)
   const [windowWidth, setWindowWidth] = useState(window.innerWidth)

   useEffect(() => {
      const handleResize = () => {
         setWindowWidth(window.innerWidth)
      };
      const debounceResize = debounce(handleResize, 100);
      window.addEventListener('resize', debounceResize);

      return () => {
         window.removeEventListener('resize', debounceResize);
      };
   }, [])

   const handlePathName = () => {
      setPathName(window.location.pathname)
   }

   return (
      <header className={'header-profil'}>
         <div className="logo-profil">
            <img src={LogoDevLinksSmall} alt="a" />
            <h1 className={"title"}>{windowWidth > 440 ? "devlinks" : ''}</h1>
         </div>

         <div className="navigation">
            <div onClick={handlePathName} className={`navlinks ${pathname === '/profil' ? 'active' : ""}`}>
               <Link to={'/profil'}>
                  <IconLinks className={"icons-nav"} onClick={() => <Navigate to={'/profil'} />} />
               </Link>
               <Link to={'/profil'}>{windowWidth > 600 ? 'Links' : ''}</Link>
            </div>

            <div onClick={handlePathName} className={`navlinks ${pathname === '/profil/details' ? 'active' : ""}`}>
               <Link to={'/profil/details'}>
                  <IconProfileDetails className={'icons-nav'} onClick={() => <Navigate to={'/profil/details'}/>} />
               </Link>
               <Link to={'/profil/details'}>{windowWidth > 600 ? 'Profile Details' : ''}</Link>
            </div>
         </div>

         <Link to={'/preview'} className="preview-button">{windowWidth > 520 ? 'Preview' : <img src={IconPreview} alt="a" />}</Link>
      </header>
   )
 }

 export default NavbarProfil;