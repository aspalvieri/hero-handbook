import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { config, requestConf } from "../../utils/Configs";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";

function Login(props) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState({
    slot: "",
    message: ""
  });

  function handleChange(event) {
    const { id, value } = event.target;
    setUser(state => {
      return {
        ...state,
        [id]: value
      };
    });
    setError({slot: "", message: ""});
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!submit) {
      setSubmit(true);
      axios.post(`${config.SERVER_URL}/users/login`, user, requestConf).then(res => {
        auth.setUser(res.data.user);
        navigate("/");
      }).catch(err => {
        setError(err.response.data);
      }).finally(() => {
        setSubmit(false);
      });
    }
  }
  
  return(
    <div className="bg-white rounded-lg shadow col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-4
      xl:col-start-5 lg:col-start-4 md:col-start-3"
    >
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
            Login to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email:</label>
            <input type="email" name="email" id="email" autoComplete="email" onChange={handleChange} 
              disabled={submit ? true : false} required
              className={classNames(`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
              block w-full p-2.5 disabled:opacity-50`, { "border-red-500": error.slot === "email" })}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password:</label>
            <input type="password" name="password" id="password" autoComplete="current-password" onChange={handleChange} 
              disabled={submit ? true : false} required
              className={classNames(`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
              block w-full p-2.5 disabled:opacity-50`, { "border-red-500": error.slot === "password" })}
            />
          </div>
          <div className="text-red-500">
            {error.message !== "" ? `ERROR: ${error.message}!` : null}
          </div>
          <div className="flex items-center justify-between">
              <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</Link>
          </div>
          <button type="submit" disabled={submit ? true : false}
            className="w-full text-white bg-bsblue-500 hover:bg-bsblue-600
            font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
          >
            Login
          </button>
          <p className="text-sm font-light text-gray-500">
              Don't have an account yet? <Link to="/register" className="font-medium text-blue-600 hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
