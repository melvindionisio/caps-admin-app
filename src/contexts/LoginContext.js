import { createContext } from "react";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const LoginContext = createContext();

function LoginContextProvider(props) {
   const [isAdminLoggedIn, setIsAdminLoggedIn] = useLocalStorage(
      "isAdminLoggedIn",
      false
   );

   const [currentAdmin, setCurrentAdmin] = useLocalStorage(
      "currentLoggedInAdmin",
      {
         id: null,
         name: null,
         username: null,
      }
   );
   const handleAdminLogout = () => {
      setIsAdminLoggedIn(false);
      setCurrentAdmin({
         id: null,
         name: null,
         username: null,
      });
      console.log(isAdminLoggedIn);
   };

   const value = {
      isAdminLoggedIn,
      setIsAdminLoggedIn,
      currentAdmin,
      setCurrentAdmin,
      handleAdminLogout,
   };

   return (
      <LoginContext.Provider value={value}>
         {props.children}
      </LoginContext.Provider>
   );
}

export default LoginContextProvider;
