import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

export const AuthContext = React.createContext({
  loading: true,
});

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(true);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((usr) => {
      setUser(usr);
      setLoading(false);
      if (user === null) history.push('/chats');

      return function cleanup() {
        setMounted(false);
      };
    });
  }, [user, history]);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
