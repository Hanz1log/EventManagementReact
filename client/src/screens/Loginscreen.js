import React, { useState } from 'react';
import axios from "axios";
import Error from '../components/Error';
import Success from '../components/Success';
import Loader from '../components/Loader';
function Loginscreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function login() {
    const user = {
      email,
      password
    }
    try {
      setLoading(true)
      const result = await axios.post('/api/users/login', user);
      setLoading(false);
      localStorage.setItem('currentUser', JSON.stringify(result.data));
      window.location.href = '/home';


    } catch (error) {

      console.log(error)
      setLoading(false)
      setError(true)
    }
    
  }

  return (
    <div>
      {loading && (<Loader/>)}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className='bs'>
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
              className="form-control mt-2" 
              placeholder="Password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />

            <button className='btn btn-primary mt-3' onClick={login}>Login</button>
          </div>
          <div className='mt-3'>
            {error && (<Error message='Invalid Crendentials'/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
