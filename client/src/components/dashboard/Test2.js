import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

function Test2() {
  const auth = useContext(AuthContext);

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
      <h1>Private Route!!! </h1>
    </div>
  )
}

export default Test2;
