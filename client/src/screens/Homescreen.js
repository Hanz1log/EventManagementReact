import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Venue from '../components/Venue';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker } from 'antd';
import 'antd/dist/reset.css';

const { RangePicker } = DatePicker;

function Homesceen() {
  const [venues, setVenue] = useState([]);
  const [duplicatevenues, setDuplicateVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [fromdate, setFromDate] = useState();
  const [todate, setToDate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/venues/getallvenues');
        setVenue(data);
        setDuplicateVenues(data);
        setTimeout(() => {
          setLoading(false);
        }, 800);
      } catch (error) {
        setError(error);
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function formatDate(date) {
    const day = String(date.date()).padStart(2, '0');
    const month = String(date.month() + 1).padStart(2, '0');
    const year = date.year();
    return `${day}-${month}-${year}`;
  }

  function filterByDate(dates) {
    const from = formatDate(dates[0]);
    const to = formatDate(dates[1]);

    setFromDate(from);
    setToDate(to);

    const tempVenues = duplicatevenues.filter(venue => {
      let available = true;

      for (const booking of venue.currentbookings) {
        const bookingStart = booking.fromdate;
        const bookingEnd = booking.todate;

        // Check for date overlap
        if (!(to < bookingStart || from > bookingEnd)) {
          available = false;
          break;
        }
      }

      return available;
    });

    setVenue(tempVenues);
  }

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-md-3'>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>
      </div>

      <div className='row justify-content mt-5'>
        {loading ? (
          <Loader />
        ) : venues.length > 0 ? (
          venues.map((venue) => (
            <div key={venue._id} className='col-md-9 mt-2'>
              <Venue venue={venue} fromdate={fromdate} todate={todate} />
            </div>
          ))
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default Homesceen;
