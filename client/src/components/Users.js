import { useState, useEffect } from 'react'

function Users () {
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