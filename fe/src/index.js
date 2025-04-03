
import ReactDOM from 'react-dom/client';
import React from "react";
import App from './App';
import Login from "./pages/users/auth/Login";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Homepage from "./pages/users/homepage";
import RouterCustom from "./router";
import { BrowserRouter } from "react-router-dom";
import "./styles/style.scss";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <RouterCustom/>
    </BrowserRouter>
    // <Homepage/>
    // <Login/>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
