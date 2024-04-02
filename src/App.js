import React, { useState, useEffect } from 'react';
import "./card.css";

const User = ({ name, age, sex, place, onDelete }) => {
  return (
    <div>
      <p>
        {name} - {age} - {sex} - {place}
        <button onClick={onDelete} id="btn">Delete</button>
      </p>
    </div>
  );
}

const App = () => {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userSex, setUserSex] = useState('');
  const [userPlace, setUserPlace] = useState('');

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    if (savedUsers) {
      setUsers(savedUsers);
    }
  }, []);

  const addUser = () => {
    if (!userName || !userAge || !userSex || !userPlace) return;

    const newUser = {
      name: userName,
      age: userAge,
      sex: userSex,
      place: userPlace
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setUserName('');
    setUserAge('');
    setUserPlace('');
    setUserSex('');
  };

  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div>
      <div className="card">
      <h1 >Users Registration App</h1>
      <div>
        <input type="text" placeholder="Enter User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <input type="number" placeholder="Enter user Age" value={userAge} onChange={(e) => setUserAge(e.target.value)} />
        <input type="text" placeholder="Enter user sex" value={userSex} onChange={(e) => setUserSex(e.target.value)} />
        <input type="text" placeholder="Enter user place" value={userPlace} onChange={(e) => setUserPlace(e.target.value)} />
        <button onClick={addUser} id="add">Add User</button>
      </div>
      <div>
        <h2 id="user">Users List</h2>
        {users.map((user, index) => (
          <User
            key={index}
            name={user.name}
            age={user.age}
            sex={user.sex}
            place={user.place}
            onDelete={() => deleteUser(index)}
          />
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;
