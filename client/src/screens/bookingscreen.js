import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Loader from "../components/Loader";

function Bookingscreen() {
  const { venueid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [venue, setVenue] = useState();

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/venues/getvenuebyid", { venueid });
        setVenue(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);

      } catch (err) {
        console.error("Booking fetch error:", err.response?.data || err.message);
        setError(true);
        setLoading(false);
      }
    };

    fetchVenue();
  }, [venueid]);

  return (
    <div className="container mt-5">
      {loading ?
        (<Loader />) : error ? (
          <h1>Error...</h1>
        ) : (
          <div className="row bs">
            <div className="col-md-6">
              <h5>{venue.name}</h5>
              <img src={venue.imageurls[0]} className="bigimg" alt="Venue" />
            </div>
            <div className="col-md-5">
              <h5>Booking Details</h5>
              <hr />
              <p>Name:</p>
              <p>From Date:</p>
              <p>To Date:</p>
              <p>Max Count: {venue.maxcount}</p>

              <h5 className="mt-4">Amount</h5>
              <hr />
              <p>Total days:</p>
              <p>Rent per day: {venue.rentperday}</p>
              <p>Total Amount:</p>

              <div style={{ float: 'right' }}>
                <button className="btn btn-primary mt-3">Pay Now</button>
              </div>

            </div>
          </div>
        )}
    </div>
  );
}

export default Bookingscreen;
