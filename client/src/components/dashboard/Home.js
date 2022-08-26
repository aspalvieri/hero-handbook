import React, { useState, useEffect } from "react";
import axios from "axios"
import { config, requestConf } from "../../utils/Configs";

function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (loading) {
      axios.get(`${config.SERVER_URL}/users/test`, requestConf).then(res => {
        setData(res.data);
        setLoading(false);
      });
    }
  }, [loading]);

  return (
    <div>
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
