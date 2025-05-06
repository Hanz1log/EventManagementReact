import React, { useState } from 'react';

function Loginscreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    const user = {
      email,
      password
    };
    console.log(user);
  }

  return (
    <div>
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
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
