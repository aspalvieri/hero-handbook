import React, { useState, useEffect, useContext } from "react";
import axios from "axios"
import { AuthContext } from "../../providers/AuthProvider";

function Home() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (loading) {
      axios.get(`/api/users`).then(res => {
        const users = res.data;
        setUsers(users);

        axios.get(`/api/roles`).then(res => {
          const roles = res.data;
          setRoles(roles);

          setLoading(false);
        }).catch(err => {
          setLoading(false);
        });
      }).catch(err => {
        setLoading(false);
      });
    }
  }, [loading]);

  return (
    <>
      <div className="bg-white shadow-md col-span-12 md:col-span-8 lg:col-span-6
        md:col-start-3 lg:col-start-4 md:p-6 p-4"
      >
        <h1 className="text-xl md:text-2xl font-bold">{auth.user ? <>Welcome <span className="text-heroblue-500">{auth.user.username}</span>!</> : "Welcome Guest!"}</h1>
        {loading ? <h1 style={{textAlign: "center"}}>Loading Data . . .</h1>
        : 
        <div>
          <h1>Users</h1>
          {users.length === 0 ? <h1 style={{textAlign: "center"}}>Insufficient Permissions to view Users</h1>
          :
          <table className="w-full text-center">
            <thead>
              <tr>
                <td style={{width: "20%", fontWeight: "bold", border: "1px solid black"}}>ID</td>
                <td style={{width: "20%", fontWeight: "bold", border: "1px solid black"}}>Username</td>
                <td style={{width: "40%", fontWeight: "bold", border: "1px solid black"}}>Email</td>
                <td style={{width: "20%", fontWeight: "bold", border: "1px solid black"}}>Role</td>
              </tr>
            </thead>
            <tbody>
              {users.map((row, index) => {
                return (
                  <tr key={index} className="odd:bg-gray-100 hover:bg-gray-200 break-all">
                    <td>{row.id}</td>
                    <td>{row.username}</td>
                    <td>{row.email}</td>
                    <td>{row.role_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          }
        </div>
        }
      </div>
      <div className="bg-white shadow-md col-span-12 md:col-span-8 lg:col-span-6
        md:col-start-3 lg:col-start-4 md:p-6 p-4 mt-3"
      >
        <h1>Roles</h1>
        {loading ? <h1 style={{textAlign: "center"}}>Loading Data . . .</h1>
        :
        <div>
          {roles.length === 0 ? <h1 style={{textAlign: "center"}}>Insufficient Permissions to view Roles</h1>
          :
          <table className="w-full text-center">
            <thead>
              <tr>
                <td style={{width: "30%", fontWeight: "bold", border: "1px solid black"}}>Role</td>
                <td style={{width: "70%", fontWeight: "bold", border: "1px solid black"}}>Permissions</td>
              </tr>
            </thead>
            <tbody>
              {roles.map((row, index) => {
                return (
                  <tr key={index} className="odd:bg-gray-100 hover:bg-gray-200 break-all">
                    <td>{row.name}</td>
                    <td>{row.permissions.map(permission => permission.name).join(", ")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          }
        </div>
        }
      </div>
    </>
  )
}

export default Home;
