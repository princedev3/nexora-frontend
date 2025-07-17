"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/navbar'
import { usePathname } from 'next/navigation';
import { Provider } from "react-redux";
import { persistor, store } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

const LayoutProvider = ({children}:{children:React.ReactNode}) => {
  const [isClient, setIsClient] = useState(false);
 
     const authRoute = [
    "/register",
    "/login",
    "/forgot-password",
    "/enter-new-password",
    "/verify-email",
  ];
  const pathName = usePathname();

useEffect(() => {
    setIsClient(true);
  }, []);

  
 if (!isClient) return null;
    return (
       <Provider store={store}>
        <PersistGate loading={<div>loading...</div>} persistor={persistor} >
         {!authRoute.includes(pathName) && <Navbar />}
          {children}
          <ToastContainer/>
        </PersistGate>
     </Provider>
    )
}

export default LayoutProvider