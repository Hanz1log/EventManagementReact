import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from '../components/Success';

const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = '/home';
    }
  }, []);

  return (
    <div className="mt-5 ml-3 mr-3">
      <h1 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Admin Panel</h1>
      <div className="admin-box">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Users" key="1"><Users /></TabPane>
          <TabPane tab="Venues" key="2"><Venues /></TabPane>
          <TabPane tab="Bookings" key="3"><Bookings /></TabPane>
          <TabPane tab="Add Venue" key="4"><Addvenue /></TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Adminscreen;

// USERS
export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/users/getallusers");
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="admin-box">
        <h3>All Users</h3>
        {loading && <Loader />}
        {error && <Error />}
        <div className="table-responsive">
          <table className="table table-sm table-striped table-bordered text-center">
            <thead className="table-dark">
              <tr><th>User ID</th><th>Name</th><th>Email</th><th>Contact</th><th>Admin</th></tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.contact || '—'}</td>
                  <td>
                    <span className={`badge ${user.isAdmin ? 'bg-success' : 'bg-secondary'}`}>
                      {user.isAdmin ? 'YES' : 'NO'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length > 0 && <p className="text-end mt-3 mb-0"><strong>Total:</strong> {users.length}</p>}
      </div>
    </div>
  );
}

// VENUES
export function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVenues() {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/venues/getallvenues");
        setVenues(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchVenues();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="admin-box">
        <h3>All Venues</h3>
        {loading && <Loader />}
        {error && <Error />}
        <div className="table-responsive">
          <table className="table table-sm table-striped table-bordered text-center">
            <thead className="table-dark">
              <tr><th>Venue ID</th><th>Name</th><th>Type</th><th>Rent / Day</th><th>Max Count</th></tr>
            </thead>
            <tbody>
              {venues.map(venue => (
                <tr key={venue._id}>
                  <td>{venue._id}</td>
                  <td>{venue.name}</td>
                  <td>{venue.type}</td>
                  <td>₱{venue.rentperday}</td>
                  <td>{venue.maxcount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {venues.length > 0 && <p className="text-end mt-3 mb-0"><strong>Total:</strong> {venues.length}</p>}
      </div>
    </div>
  );
}

// BOOKINGS
export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/bookings/getallbookings");
        setBookings(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="admin-box">
        <h3>All Bookings</h3>
        {loading && <Loader />}
        {error && <Error />}
        <div className="table-responsive">
          <table className="table table-sm table-striped table-bordered text-center">
            <thead className="table-dark">
              <tr><th>Booking ID</th><th>User ID</th><th>Venue</th><th>From</th><th>To</th><th>Status</th></tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.userid}</td>
                  <td>{booking.venue}</td>
                  <td>{booking.fromdate}</td>
                  <td>{booking.todate}</td>
                  <td>
                    <span className={`badge ${booking.status === 'cancelled' ? 'bg-danger' : 'bg-success'}`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {bookings.length > 0 && <p className="text-end mt-3 mb-0"><strong>Total:</strong> {bookings.length}</p>}
      </div>
    </div>
  );
}

// ADD VENUE
export function Addvenue() {
  const [name, setName] = useState('');
  const [rentperday, setRentPerDay] = useState('');
  const [maxcount, setMaxCount] = useState('');
  const [description, setDescription] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [type, setType] = useState('');
  const [imageurl1, setImageUrl1] = useState('');
  const [imageurl2, setImageUrl2] = useState('');
  const [imageurl3, setImageUrl3] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function addVenue() {
    const venue = {
      name, rentperday, maxcount, description, phonenumber, type,
      imageurls: [imageurl1, imageurl2, imageurl3]
    };
    try {
      setLoading(true);
      await axios.post('/api/venues/addvenue', venue);
      setSuccess(true);
      setLoading(false);
      resetForm();
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  }

  const resetForm = () => {
    setName('');
    setRentPerDay('');
    setMaxCount('');
    setDescription('');
    setPhoneNumber('');
    setType('');
    setImageUrl1('');
    setImageUrl2('');
    setImageUrl3('');
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="admin-box">
        <h3>Add New Venue</h3>
        {loading && <Loader />}
        {error && <Error />}
        {success && <Success message="Venue added successfully" />}
        <div className="row">
          <div className="col-md-6">
            <input className="form-control mb-2" type="text" placeholder="Venue Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="form-control mb-2" type="text" placeholder="Rent per Day" value={rentperday} onChange={(e) => setRentPerDay(e.target.value)} />
            <input className="form-control mb-2" type="text" placeholder="Max Count" value={maxcount} onChange={(e) => setMaxCount(e.target.value)} />
            <input className="form-control mb-2" type="text" placeholder="Phone Number" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div className="col-md-6">
            <input className="form-control mb-2" type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
            <input className="form-control mb-2" type="text" placeholder="Image URL 1" value={imageurl1} onChange={(e) => setImageUrl1(e.target.value)} />
            <input className="form-control mb-2" type="text" placeholder="Image URL 2" value={imageurl2} onChange={(e) => setImageUrl2(e.target.value)} />
            <input className="form-control mb-2" type="text" placeholder="Image URL 3" value={imageurl3} onChange={(e) => setImageUrl3(e.target.value)} />
          </div>
          <div className="col-md-12 mt-2">
            <textarea className="form-control mb-3" rows="3" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={addVenue} className="btn btn-primary w-100">Add Venue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
