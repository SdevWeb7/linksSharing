import './styles/app.scss';
import React from "react";
import ReactDOM from 'react-dom/client'
import Hello from "./react/Hello";


ReactDOM.createRoot(document.querySelector('#react')).render(
   <React.StrictMode>
      <Hello />
   </React.StrictMode>
)