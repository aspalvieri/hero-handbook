import React, { useEffect, useState } from "react";
import axios from "axios"
import { config } from "./utils/configs";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (loading) {
      axios.get(`${config.SERVER_URI}/api/users/test`).then(res => {
        setData(res.data);
        setLoading(false);
      });
    }
  }, [loading]);

  return (
    <div style={{margin: "0 auto", padding: "16px", width: "768px", backgroundColor: "#EEE"}}>
      <img src={require("./assets/logo.png")} style={{width: "250px", margin: "0 auto", marginBottom: "30px", display: "block"}} alt="logo" />
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
  );
}

export default App;
