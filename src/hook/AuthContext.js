import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';
import { useRouter } from 'next/router';
export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [ userlogged, setUserlogged ] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const ISSERVER = typeof window === "undefined";
    
    if(!ISSERVER) {
      // Access localStorage
      const credentialsLocalStorage = localStorage.getItem('@BlomiaApp:credentials');
      
      if(credentialsLocalStorage) {
        const credentials = JSON.parse(credentialsLocalStorage);
        singin(credentials);
      } else {
        setLoad(false);

      }

    }

  }, []);

  const router = useRouter();
  const singin = async ({ phone_number, password }) => {
    const url = "/auth/sign_in"
    const params = {
      phone_number,
      password,
    }
    try {
      const response = await api.post(url, params);
      console.log(response);
      
      const user = response.data.user;

      localStorage.setItem('@BlomiaApp:credentials', JSON.stringify(params));
      setUserlogged(user);
      
      router.push("arealogada");
      
      setTimeout(() => {
        setLoad(false);
      }, 1000)
      
    } catch(error) {
      alert("Erro no login");
    }
  }

  return (
    <AuthContext.Provider value={{singin, userlogged}} >
      {load ? (
        <span>carregando...</span>
      ) : (
        <>
          { children }
        </>
      )}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if( !context) {
    throw new Error("Para usar o useAuth utilize AuthProvider");
  }
  return context;
}