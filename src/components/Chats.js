import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const Chats = (props) => {
  const [loading, setloading] = useState(true);
  const Auth = useContext(AuthContext);
  const { user } = Auth;
  console.log(user);

  const history = useHistory();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) {
      history.push('/');
      return;
    }
    axios
      .get('https://api.chatengine.in/users/me', {
        headers: {
          projectId: '9ecf036e-628b-4568-99f3-02eb06e9be52',
          'user-name': user.email,
          'user-secret': user.uid,
        },
      })
      .then(setloading(false))
      .catch(() => {
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);

        axios
          .post('https://api.chatengine.in/users/', formdata, {
            headers: {
              'private-key': '23a1a02f-75e6-41ec-b5a0-c3465c235c83',
            },
          })
          .then(() => setloading(false))
          .catch((err) => console.log(err));
      });
  }, [user, history]);

  if (!user || loading) return 'loading...';

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>Lchat</div>
        <div onClick={handleLogout} className='logout-tab'>
          Logout
        </div>
      </div>

      <ChatEngine
        height='calc(100vh -66px)'
        projectID='9ecf036e-628b-4568-99f3-02eb06e9be52'
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};
export default Chats;
