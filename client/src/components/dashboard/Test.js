import axios from "axios";
import React, { useContext, useReducer, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { config, requestConf } from "../../utils/Configs";

function Test() {
  const inputRef = useRef();
  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        return [
          ...state,
          {
            id: state.length,
            name: action.name
          }
        ];
      case "remove":
        // keep every item except the one we want to remove
        return state.filter((_, index) => index !== action.index);
      case "clear":
        return [];
      default:
        return state;
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: "add",
      name: inputRef.current.value
    });
    inputRef.current.value = "";
  }

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  function handleLogin(e) {
    e.preventDefault();
    axios.post(`${config.SERVER_URL}/api/users/login`, inputs, requestConf).then(res => {
      auth.setUser(res.data.user);
      console.log(res.data.user);
      navigate("/");
    }).catch(err => {
      console.log(err.response.data.message);
    });
  }
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInputs(inputs => {
      return {
        ...inputs,
        [id]: value
      };
    });
  };

  return (
    <div style={{margin: "0 auto", padding: "16px", width: "768px", backgroundColor: "#EEE"}}>
      <img src={require("../../assets/logo.png")} style={{width: "250px", margin: "0 auto", marginBottom: "30px", display: "block"}} alt="logo" />
      {auth.user ? <h1>Logged in as: {auth.user.email}</h1> : null}
      <Link to="/">Home</Link>
      &nbsp;
      <Link to="/test">Test</Link>
      &nbsp;
      {auth.user ? <Link to="/test2">Test 2</Link> : null}
      &nbsp;
      {auth.user ? <Link to="/logout">Logout</Link> : null}
      <hr/>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input id="email" type="text" onChange={handleInputChange} />
        <input id="password" type="password" onChange={handleInputChange} />
        <input type="submit" />
      </form>
      <br/>
      <h3>Task List</h3>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
      </form>
      <button onClick={() => dispatch({ type: "clear" })}>Clear</button>
      &nbsp;
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            {item.name}{" "}
            <button onClick={() => dispatch({ type: "remove", index })}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Test;
