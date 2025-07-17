// import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './PagesRouting/Routingpages';
import { Toaster } from 'react-hot-toast';
import '../src/Pages/Language/i18n';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import React from 'react';

function App() {
  return (
    <div className="App" >

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <PrimeReactProvider>
        <RouterProvider router={router} ></RouterProvider>
      </PrimeReactProvider>

    </div>
  );
}

export default App;
