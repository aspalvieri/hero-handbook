import React, { useState, useEffect, useContext } from "react";
import axios from "axios"
import { config, requestConf } from "../../utils/Configs";
import { AuthContext } from "../../providers/AuthProvider";

function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (loading) {
      axios.get(`${config.SERVER_URL}/users/test`, requestConf).then(res => {
        setData(res.data);
        setLoading(false);
      });
    }
  }, [loading]);

  return (
    <div className="bg-white shadow-md col-span-12 md:col-span-8 lg:col-span-6
      md:col-start-3 lg:col-start-4 md:p-6 p-4"
    >
      <h1 className="text-xl md:text-2xl font-bold">{auth.user ? <>Welcome <span className="text-heroblue-500">{auth.user.username}</span>!</> : "Welcome Guest!"}</h1>
      {loading ? <h1 style={{textAlign: "center"}}>Loading Data . . .</h1>
      : <div>
        <table className="w-full text-center">
          <thead>
            <tr>
              <td style={{width: "30%", fontWeight: "bold", border: "1px solid black"}}>ID</td>
              <td style={{width: "30%", fontWeight: "bold", border: "1px solid black"}}>Username</td>
              <td style={{width: "40%", fontWeight: "bold", border: "1px solid black"}}>Email</td>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              return (
                <tr key={index} className="odd:bg-gray-100 hover:bg-gray-200">
                  <td>{row.id}</td>
                  <td>{row.username}</td>
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
