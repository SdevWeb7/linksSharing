import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Subscribe from "./pages/Subscribe";
import Links from "./pages/Links";
import NotFound from "./pages/NotFound";
import AuthContext from "./hooks/AuthContext";
import LayoutProfil from "./components/LayoutProfil";
import Details from "./pages/Details";
import Preview from "./pages/Preview";
import EventBus from "./hooks/EventBus";
import Show from "./pages/Show";

const Hello = () => {

   const [auth, setAuth] = useState({})
   const [loading, setLoading] = useState(true)

   const authValue = {
      user: auth,
      isLoading: loading
   }
   useEffect(() => {
      setLoading(true)
      fetch('/me', {
         credentials: 'include'
      }).then(r => r.json()).then(data => setAuth(data)).finally(() => setLoading(false))
      EventBus.on('userUpdated', handleUserUpdate)
      EventBus.on('userUpdatedLinks', handleUserUpdateLinks)


      return () => {
         EventBus.off('userUpdated', handleUserUpdate)
         EventBus.on('userUpdatedLinks', handleUserUpdateLinks)
      }
   }, [])

   const handleUserUpdate = (datas) => {
      setAuth((prevAuth) => ({
         ...prevAuth,
         firstname: datas.firstname,
         lastname: datas.lastname,
         picture: datas.picture
      }));
   }
   const handleUserUpdateLinks = (datas) => {
      const links = datas.map(([platform, link]) => ({ platform, link }));

      setAuth((prevAuth) => ({
         ...prevAuth,
         links: links
      }));
   }

    return (
       <AuthContext.Provider value={authValue}>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Layout />}>
                   <Route path={'/'} element={<Login />} />
                   <Route path={'/subscribe'} element={<Subscribe />} />
                </Route>

               <Route path={'/profil'} element={<LayoutProfil />}>
                   <Route path={'/profil'} element={<Links />}/>
                   <Route path={'/profil/details'} element={<Details />}/>
                </Route>
               <Route path={'/preview'} element={<Preview />}/>
               <Route path={'/*'} element={<NotFound />} />
            </Routes>
        </BrowserRouter>
       </AuthContext.Provider>
    )
}

export default Hello;