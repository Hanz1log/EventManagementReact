import React, { useState } from 'react';
import axios from "axios";
import Loader from "../components/Loader";
import Error from '../components/Error';
import Success from '../components/Success';
import './Registerscreen.css'; 

function Registerscreen() {
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [email, setemail] = useState('');
  const [contact, setcontact] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  async function register() {
    if (password === cpassword) {
      const user = { name, password, email, contact };
      try {
        setLoading(true);
        const result = await axios.post('/api/users/register', user);
        setLoading(false);
        setSuccess(true);

        localStorage.setItem('currentUser', JSON.stringify(result.data));

        setname('');
        setemail('');
        setpassword('');
        setcpassword('');
        setcontact('');
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    } else {
      alert('Passwords do not match');
    }
  }

  return (
    <div className="register-wrapper">
      {loading && <Loader />}
      {error && <Error />}
      <div className="register-container">
        <div className="register-card">
          <h2 className="text-center mb-4">Create an Account</h2>

          <input type="text" className="form-control mb-3" placeholder="Full Name"
            value={name} onChange={(e) => setname(e.target.value)} />

          <input type="email" className="form-control mb-3" placeholder="Email"
            value={email} onChange={(e) => setemail(e.target.value)} />

          <input type="text" className="form-control mb-3" placeholder="Contact Number"
            value={contact} onChange={(e) => setcontact(e.target.value)} />

          <input type="password" className="form-control mb-3" placeholder="Password"
            value={password} onChange={(e) => setpassword(e.target.value)} />

          <input type="password" className="form-control mb-4" placeholder="Confirm Password"
            value={cpassword} onChange={(e) => setcpassword(e.target.value)} />

          <button className="register-btn w-100" onClick={register}>Register</button>

          <div className='text-center mt-3'>
            {success && <Success message='Registration successful' />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
