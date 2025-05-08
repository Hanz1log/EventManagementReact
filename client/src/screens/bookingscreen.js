import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Loader from "../components/Loader";
import Error from '../components/Error';
import moment from 'moment';

function Bookingscreen() {
  const { venueid, fromdate, todate } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [venue, setVenue] = useState();

  const formattedFromDate = moment(fromdate, 'DD-MM-YYYY');
  const formattedToDate = moment(todate, 'DD-MM-YYYY');
  const totaldays = formattedToDate.diff(formattedFromDate, 'days') + 1;
  const totalAmount = venue ? totaldays * venue.rentperday : 0;

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/venues/getvenuebyid", { venueid });
        setVenue(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Booking fetch error:", err.response?.data || err.message);
        setError(true);
        setLoading(false);
      }
    };

    fetchVenue();
  }, [venueid]);

  async function bookVenue() {
    const bookingDetails = {
      venue,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id, 
      fromdate: formattedFromDate.format('DD-MM-YYYY'),
      todate: formattedToDate.format('DD-MM-YYYY'),
      totalamount: totalAmount,
      totaldays: totaldays,
    };
    

    try {
      const result = await axios.post('/api/bookings/bookvenue', bookingDetails);
      console.log(result.data); // Should show: { message: 'Room Booked Successfully' }
      alert("Booking Successful!");
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      alert("Booking Failed. Please try again.");
    }
    
  }

  return (
    <div className="container mt-5">
      {loading ? (
        <Loader />
      ) : venue ? (
        <div className="row bs">
          <div className="col-md-6">
            <h5>{venue.name}</h5>
            <img src={venue.imageurls[0]} className="bigimg" alt="Venue" />
          </div>
          <div className="col-md-5">
            <h5>Booking Details</h5>
            <hr />
            <p><strong>Name:</strong> {JSON.parse(localStorage.getItem('currentUser'))?.name}</p>
            <p><strong>From Date:</strong> {fromdate}</p>
            <p><strong>To Date:</strong> {todate}</p>
            <p><strong>Max Count:</strong> {venue.maxcount}</p>

            <h5 className="mt-4">Amount</h5>
            <hr />
            <p><strong>Total days:</strong> {totaldays}</p>
            <p><strong>Rent per day:</strong> {venue.rentperday}</p>
            <p><strong>Total Amount:</strong> {totalAmount}</p>

            <div style={{ float: 'right' }}>
              <button className="btn btn-primary mt-3" onClick={bookVenue}>
                Pay Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
