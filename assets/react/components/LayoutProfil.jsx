import React, { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import NavbarProfil from "./NavbarProfil";
import AuthContext from "../hooks/AuthContext";
import Loading from "../pages/Loading";

const LayoutProfil = () => {

   const {user, isLoading} = useContext(AuthContext)


   if (isLoading) {
      return <Loading />
   }
   if (Object.keys(user).length <= 0) {
      return <Navigate to={"/"} />
   }

   return (
      <>
         <NavbarProfil />
         <Outlet />
      </>
   )
}

export default LayoutProfil;