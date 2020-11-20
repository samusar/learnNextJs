import React, {useState, useCallback, useEffect} from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../src/hook/AuthContext';

const AreaLogada = () => {

  const { userlogged } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if( !userlogged ) {
      router.push('login');
    }
  }, []);


  if( !userlogged ) {
    return (
      <h1>
        Acesso não permitido!
      </h1>
    );
  }

  return (
    <h1>Logado!! {userlogged.full_name}</h1>
  )
}

export default AreaLogada;