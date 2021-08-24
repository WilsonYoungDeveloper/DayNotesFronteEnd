import React, { useState, useEffect } from 'react';
import Main from './Components/Notes/main';
import Login from './Components/Login/index';
import Register from './Components/Login/register';

function App() {

  const [auth, setAuth] = useState(false);
  const [createUser, setCreateUser] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
    }
  }, []);

  return (
    <>
      {!auth && !createUser ?
        <Login
          setCreateUser={setCreateUser}
          setAuth={setAuth}
        />
        :
        !auth && createUser ?
          <Register
            setCreateUser={setCreateUser}
            setAuth={setAuth}
          />
          :
          <Main
            auth={auth}
            setAuth={setAuth}
          />
      }
    </>
  );
}

export default App;
