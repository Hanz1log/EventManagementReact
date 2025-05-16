import React, { useState } from 'react';
import axios from "axios";
import Error from '../components/Error';
import Success from '../components/Success';
import Loader from '../components/Loader';
import '../screens/LandingPage.css'; 

function Loginscreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function login() {
    const user = { email, password };
    try {
      setLoading(true);
      const result = await axios.post('/api/users/login', user);
      setLoading(false);
      localStorage.setItem('currentUser', JSON.stringify(result.data));
      window.location.href = '/home';
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className="login-wrapper">
      {loading && <Loader />}
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-btn mt-3" onClick={login}>Login</button>
          {error && <div className="mt-3"><Error message="Invalid Credentials" /></div>}
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;