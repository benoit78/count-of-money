import React from 'react';
import { isLogged } from '../../../services/authentification';
import {useNavigate} from 'react-router-dom';

export const useLogged = () => {

  const [logged, setLogged] = React.useState(isLogged());
  const navigate = useNavigate();

  const handleConnect = () => {
    setLogged(true);
    navigate('/?justLogged=true');
  };

  return { handleConnect, setLogged, logged };
}