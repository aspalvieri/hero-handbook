import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { config, requestConf } from "../../utils/Configs";
import { AuthContext } from "../../providers/AuthProvider";

function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (loading) {
      axios.get(`${config.SERVER_URL}/api/users/test`, requestConf).then(res => {
        setData(res.data);
        setLoading(false);
      });
    }
  }, [loading]);

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
      {loading ? <h1 style={{textAlign: "center"}}>Loading Data . . .</h1>
      : <div>
        <table style={{width: "50%", margin: "0 auto", textAlign: "center"}}>
          <thead>
            <tr>
              <td style={{width: "30%", fontWeight: "bold", border: "1px solid black"}}>ID</td>
              <td style={{width: "70%", fontWeight: "bold", border: "1px solid black"}}>Email</td>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              return (
                <tr key={index}>
                  <td style={{backgroundColor: "#fff"}}>{row.id}</td>
                  <td style={{backgroundColor: "#fff"}}>{row.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>}
    </div>
  )
}

export default Home;
