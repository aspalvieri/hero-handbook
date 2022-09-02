import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { config, requestConf } from "../../utils/Configs";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";

function Register(props) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
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
      axios.post(`${config.SERVER_URL}/users/register`, user, requestConf).then(res => {
        auth.setUser(res.data.user);
        navigate("/");
      }).catch(err => {
        setError(err.response.data);
      }).finally(() => {
        setSubmit(false);
      });
    }
  }

  return (
    <div className="bg-white shadow-md col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-4
      xl:col-start-5 lg:col-start-4 md:col-start-3"
    >
      <div className="md:p-6 p-4 space-y-4 md:space-y-6">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
            Register a new account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="account" className="block mb-2 text-sm font-medium text-gray-900">Username or Email:</label>
            <input type="text" name="account" id="account" autoComplete="account" onChange={handleChange} 
              disabled={submit ? true : false} required
              className={classNames(`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
              block w-full p-2.5 disabled:opacity-50`, { "border-red-500": error.slot === "account" })}
            />
            <span className="text-red-500 block mt-1">
              {(error.slot === "account" && error.message !== "") ? `${error.message}!` : null}
            </span>
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password:</label>
            <input type="password" name="password" id="password" autoComplete="current-password" onChange={handleChange} 
              disabled={submit ? true : false} required
              className={classNames(`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
              block w-full p-2.5 disabled:opacity-50`, { "border-red-500": error.slot === "password" })}
            />
            <span className="text-red-500 block mt-1">
              {(error.slot === "password" && error.message !== "") ? `${error.message}!` : null}
            </span>
          </div>
          <button type="submit" disabled={submit ? true : false}
            className="w-full text-white bg-heroblue-500 hover:bg-heroblue-600
            font-medium text-sm px-5 py-2.5 text-center disabled:opacity-50"
          >
            Register
          </button>
          <p className="text-sm font-light text-gray-500">
              Already have an account? <Link to="/login" className="font-medium text-heroblue-500 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
