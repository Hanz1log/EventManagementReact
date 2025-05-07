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

  const totalAmount = venue ? totaldays * venue.rentperday : 0;

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
            <p>Name:</p>
            <p>From Date: {fromdate}</p>
            <p>To Date: {todate}</p>
            <p>Max Count: {venue.maxcount}</p>

            <h5 className="mt-4">Amount</h5>
            <hr />
            <p>Total days: {totaldays}</p>
            <p>Rent per day: {venue.rentperday}</p>
            <p>Total Amount: {totalAmount}</p>

            <div style={{ float: 'right' }}>
              <button className="btn btn-primary mt-3">Pay Now</button>
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
