import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";

function MyBookings() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/getbookingsbyuserid', {
          userid: user._id,
        });
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching bookings:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`, padding: '20px' }}>
      <h2 style={{ fontWeight: '600', marginBottom: '20px' }}>My Bookings</h2>
      {loading && <Loader />}
      {error && <Error />}

      <div className="row">
        {bookings && bookings.map((booking, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              padding: '20px',
              background: '#fff',
              borderLeft: `5px solid ${booking.status === 'cancelled' ? '#e74c3c' : '#2ecc71'}`
            }}>
              <h4 style={{ fontWeight: '600' }}>{booking.venue}</h4>
              <p><strong>Booking ID:</strong> {booking._id}</p>
              <p><strong>From:</strong> {booking.fromdate}</p>
              <p><strong>To:</strong> {booking.todate}</p>
              <p><strong>Days:</strong> {booking.totaldays}</p>
              <p><strong>Amount:</strong> ₱{booking.totalamount}</p>
              <p><strong>Status:</strong> 
                <span style={{
                  fontWeight: 'bold',
                  color: booking.status === 'cancelled' ? '#e74c3c' : '#2ecc71',
                  marginLeft: '5px'
                }}>
                  {booking.status.toUpperCase()}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
