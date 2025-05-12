import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";

const { TabPane } = Tabs;

function Adminscreen() {
  return (
    <div className="mt-5 ml-3 mr-3">
      <h1 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Admin Panel</h1>

      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Users" key="1">
          <h3>Users Management</h3>
        </TabPane>

        <TabPane tab="Venues" key="2">
          <Venues />
        </TabPane>

        <TabPane tab="Bookings" key="3">
          <Bookings />
        </TabPane>

        <TabPane tab="Add Venue" key="4">
          <h3>Add a New Venue</h3>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

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
        console.log(err);
        setError(err);
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="p-4" style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '950px',
        width: '100%'
      }}>
        <h3 className="text-center mb-4" style={{ fontWeight: 'bold' }}>All Bookings</h3>
        {loading && <Loader />}
        {error && <Error />}

        <div className="table-responsive">
          <table className="table table-sm table-striped table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>Booking ID</th>
                <th>User ID</th>
                <th>Venue</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
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

        {bookings.length > 0 && (
          <p className="text-end mt-3 mb-0"><strong>Total:</strong> {bookings.length}</p>
        )}
      </div>
    </div>
  );
}

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
        console.log(err);
        setError(err);
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="p-4" style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '950px',
        width: '100%'
      }}>
        <h3 className="text-center mb-4" style={{ fontWeight: 'bold' }}>All Venues</h3>
        {loading && <Loader />}
        {error && <Error />}

        <div className="table-responsive">
          <table className="table table-sm table-striped table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>Venue ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent / Day</th>
                <th>Max Count</th>
              </tr>
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

        {venues.length > 0 && (
          <p className="text-end mt-3 mb-0"><strong>Total:</strong> {venues.length}</p>
        )}
      </div>
    </div>
  );
}
