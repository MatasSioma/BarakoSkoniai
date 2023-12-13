import React, { useEffect, useState } from "react";
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Logout } from './Logout'
import { useAuth } from './AuthContext';

function Users () {
  const navigate = useNavigate();
  const { logout } = useAuth();

    const checkTokenExpiration = () => {
        const token = localStorage.getItem('token');
    
        if (token) {
          const decodedToken = jwt_decode(token);
          const currentTime = Date.now() / 1000;
    
          if (decodedToken.exp < currentTime) {
            // Token has expired
            Logout(navigate, toast);
            logout();
          }
        }
      };
    
      useEffect(() => {
        checkTokenExpiration();
        // Set up an interval to check token expiration every minute
        const intervalId = setInterval(checkTokenExpiration, 60000);
        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
      },);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Netwrok is nekazka bro");
      const data = await response.json();
      console.log(data, typeof(data));
      setData(data);
    } catch (error) {
      // console.log(error);
      console.log("failed... Make sure server running (npm start in when in server directory)");
    }
  }

  function renderUsers() {
    return data.map((user, i) => {
      return (<li key={i} >Username: {user.username}; admin: {JSON.stringify(user.admin)}</li>);
    });
  }

  return (
    <div>
      <h3>Users</h3>
      { data ? (
        <ul>{renderUsers()}</ul>
      ):(
        <p>loading</p>
      )}

      <br></br>
      Cia is duomenu bazes
    </div>
  );
}

export default Users;