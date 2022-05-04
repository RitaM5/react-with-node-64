import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  // load data
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

  const handleAddUser = event => {
    event.preventDefault();//page jate reload nahoy
    const name = event.target.name.value;
    const email = event.target.email.value;
    //console.log(name,email);
    const user = { name, email };
    //post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        const newUsers = [...users, data]
        setUsers(newUsers);
        //console.log(data);
      })
  };

  return (
    <div className="App">
      <h1>My own data: {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="email" placeholder="Email" required />
        <input type="submit" value="Add User" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>name:{user.name} email:{user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;

/* import { useState } from 'react'


function App() {
  const data = {
    user: 'shahriyar',
    password: 'password'
  }

  const getUsers = () => {
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }

  return (
    <div >
      <button onClick={getUsers}>Fetch Data</button>
    </div>
  )
}

export default App */
