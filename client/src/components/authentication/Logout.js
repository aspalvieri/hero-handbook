import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { config, requestConf } from "../../utils/Configs";

function Logout(props) {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    axios.post(`${config.SERVER_URL}/users/logout`, null, requestConf).then(() => {
      auth.setUser(null);
      navigate("/");
    });
  }, [auth, navigate]);

  return (
    <h1>
      Imagine a loading circle here . . .
    </h1>
  )
}

export default Logout;
