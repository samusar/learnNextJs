import React, {useState, useCallback, useEffect} from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../src/hook/AuthContext';

const LoginPage = () => {

  const [phoneLogin , setPhoneLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const { singin, userlogged } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if( userlogged ) {
      router.push('arealogada');
    }
  }, []);

  const login = useCallback(async event => {
    event.preventDefault();
    
    const params = {
      phone_number: phoneLogin,
      password: passwordLogin,
    };

    console.log('params', params);

    await singin(params);
    

  }, [phoneLogin, passwordLogin]);



  return (
    <form onSubmit={login}>
      <input value={phoneLogin} onChange={event => setPhoneLogin(event.target.value)} placeholder="(DD)99999-00000" />
      <input value={passwordLogin} onChange={event => setPasswordLogin(event.target.value)} type="password" placeholder="*****" />
      <button type="submit">ENTRAR</button>
    </form>
  )
}

export default LoginPage;