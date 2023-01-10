/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { getUserById } from '../../services/user';

export const useUser = () => {

  const [user, setUser] = React.useState([]);

  const userId = JSON.parse(localStorage.getItem("user"));

  const loadUser = React.useCallback(() => {
      (async () => {
        const user =  userId ? await getUserById(userId._id) : [];
        setUser(user)
      })();
  }, [userId ? userId._id : null]);

  React.useEffect(() => loadUser(), [loadUser]);

  return { user, setUser };
}