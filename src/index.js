import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Users from "./components/users";
import "bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Users />
  </React.StrictMode>
);


