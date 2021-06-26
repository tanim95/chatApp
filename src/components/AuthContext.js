import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

export const AuthContext = React.createContext({
  loading: true,
});

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState();
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((userData) => {
      setUser(userData);
      setLoading(false);
      if (user) history.push('/chats');
    });
  }, [user, history]);

  return (
    <AuthContext.Provider value={user}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
