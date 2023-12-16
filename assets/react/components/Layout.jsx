import React, { useContext } from 'react';
import Navbar from "./Navbar";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../hooks/AuthContext";
import Loading from "../pages/Loading";

const Layout = () => {

   const {user, isLoading} = useContext(AuthContext)


   if (isLoading) {
      return <Loading />
   }
   if (Object.keys(user).length > 0) {
      return <Navigate to={"/profil"} />
   }

   return (
      <>
         <Navbar />
         <Outlet />
      </>
   )
}

export default Layout;