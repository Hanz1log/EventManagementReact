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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/getbookingsbyuserid', {
        userid: user._id,
      });
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(true);
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingid, venueid) => {
    try {
      setLoading(true);
      await axios.post('/api/cancelbooking', { bookingid, venueid });
      alert("Booking cancelled successfully");
      setBookings(prev =>
        prev.map(b =>
          b._id === bookingid ? { ...b, status: "cancelled" } : b
        )
      );
      setLoading(false);
    } catch (error) {
      console.error("Cancel booking error:", error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`, padding: '20px' }}>
      <h2 style={{ fontWeight: '600', marginBottom: '20px' }}>My Bookings</h2>
      {loading && <Loader />}
      {error && <Error />}

      <div className="row">
        {bookings.map((booking, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="booking-card" style={{
              borderLeft: `5px solid ${booking.status === 'cancelled' ? '#e74c3c' : '#2ecc71'}`
            }}>
              <h4>{booking.venue}</h4>
              <p><strong>Booking ID:</strong> {booking._id}</p>
              <p><strong>Check In:</strong> {booking.fromdate}</p>
              <p><strong>Check Out:</strong> {booking.todate}</p>
              <p><strong>Amount:</strong> ₱{booking.totalamount}</p>
              <p><strong>Status:</strong>
                <span className={booking.status === 'cancelled' ? 'status-cancelled' : 'status-booked'}>
                  {booking.status.toUpperCase()}
                </span>
              </p>

              {booking.status !== 'cancelled' && (
                <div style={{ textAlign: 'right', marginTop: '15px' }}>
                  <button
                    className="cancel-btn"
                    onClick={() => cancelBooking(booking._id, booking.venueid)}
                  >
                    ❌ Cancel Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
