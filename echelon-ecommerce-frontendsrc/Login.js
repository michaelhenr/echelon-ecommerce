  import React, { useState } from 'react';
  import axios from 'axios';

  function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/login', { username, password });
        console.log('Login successful:', response.data);
        // Redirect based on role (e.g., to admin or product page)
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    return (
      <div>
        <h2>Login</h2>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  export default Login;
  