// Bookingscreen.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";

import {
  loadStripe
} from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51RMlG33EWaLSoTWPLRrSMRfR1E1a2RzT3VWG2TAbM8WrSuU3x9dxKppIymO9CEfHfGMNQmVo4ZHHCvDVyNbFGRw600OFQtyfA6");

function CheckoutForm({ bookingDetails }) {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    const { data: clientSecret } = await axios.post("/api/payments/create-payment-intent", {
      amount: bookingDetails.totalamount * 100,
    });

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: bookingDetails.username
        }
      }
    });

    if (result.error) {
      alert("Payment failed: " + result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      await axios.post("/api/bookings/bookvenue", bookingDetails);
      alert("Booking and Payment Successful!");
    }
  };

  return (
    <>
      <CardElement />
      <button className="btn btn-primary mt-3" onClick={handlePayment} disabled={!stripe}>
        Pay Now
      </button>
    </>
  );
}

function Bookingscreen() {
  const { venueid, fromdate, todate } = useParams();
  const [loading, setLoading] = useState(true);
  const [venue, setVenue] = useState(null);

  const formattedFromDate = moment(fromdate, "DD-MM-YYYY");
  const formattedToDate = moment(todate, "DD-MM-YYYY");
  const totaldays = formattedToDate.diff(formattedFromDate, "days") + 1;
  const totalAmount = venue ? totaldays * venue.rentperday : 0;

  useEffect(() => {
    const fetchVenue = async () => {
      const { data } = await axios.post("/api/venues/getvenuebyid", { venueid });
      setVenue(data);
      setLoading(false);
    };
    fetchVenue();
  }, [venueid]);

  const bookingDetails = {
    venue,
    userid: JSON.parse(localStorage.getItem("currentUser"))._id,
    username: JSON.parse(localStorage.getItem("currentUser")).name,
    fromdate,
    todate,
    totalamount: totalAmount,
    totaldays,
  };

  return loading ? (
    <Loader />
  ) : venue ? (
    <div className="container mt-5">
      <div className="row bs">
        <div className="col-md-6">
          <h5>{venue.name}</h5>
          <img src={venue.imageurls[0]} className="bigimg" alt="Venue" />
        </div>
        <div className="col-md-5">
          <h5>Booking Details</h5>
          <hr />
          <p><strong>Name:</strong> {bookingDetails.username}</p>
          <p><strong>From Date:</strong> {fromdate}</p>
          <p><strong>To Date:</strong> {todate}</p>
          <p><strong>Total Amount:</strong> ₱{totalAmount}</p>

          <Elements stripe={stripePromise}>
            <CheckoutForm bookingDetails={bookingDetails} />
          </Elements>
        </div>
      </div>
    </div>
  ) : (
    <Error />
  );
}

export default Bookingscreen;
