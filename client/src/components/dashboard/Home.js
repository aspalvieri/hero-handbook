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
    <div className="bg-white rounded-lg shadow col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-4
    xl:col-start-5 lg:col-start-4 md:col-start-3 p-6">
      {loading ? <h1 style={{textAlign: "center"}}>Loading Data . . .</h1>
      : <div>
        <table className="w-full text-center">
          <thead>
            <tr>
              <td style={{width: "30%", fontWeight: "bold", border: "1px solid black"}}>ID</td>
              <td style={{width: "70%", fontWeight: "bold", border: "1px solid black"}}>Email</td>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              return (
                <tr key={index} className="odd:bg-gray-100">
                  <td>{row.id}</td>
                  <td>{row.email}</td>
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
