import { createContext, useEffect, useState } from "react";
import { config, requestConf } from "../utils/Configs";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider(props) {

  const [user, setUser] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(true);

  useEffect(() => {
    axios.get(`${config.SERVER_URL}/api/users/fetchUser`, requestConf).then(res => {
      setUser(res.data.user);
    }).catch(err => {
      console.log(`No user session exists.`);
    }).finally(() => {
      setFetchingUser(false);
    });
  }, []);

  const userData = {
    user, setUser
  };

  if (fetchingUser) {
    return (
      <h1>
        LOADING . . .
      </h1>
    )
  }
  return (
    <AuthContext.Provider value={userData}>
      {props.children}
    </AuthContext.Provider>
  );
}

export {
  AuthContext
}

export default AuthProvider;
