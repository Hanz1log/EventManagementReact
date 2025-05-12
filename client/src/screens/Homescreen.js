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

  const [searchkey, setsearchkey] = useState('');
  const [type, settype] = useState('all');

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
        if (!(to < bookingStart || from > bookingEnd)) {
          available = false;
          break;
        }
      }
      return available;
    });

    setVenue(tempVenues);
  }

  function filterBySearch() {
    const tempvenues = duplicatevenues.filter(venue =>
      venue.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setVenue(tempvenues);
  }

  function filterByType(e) {
    settype(e.target.value);
    const selectedType = e.target.value;

    const tempvenues = duplicatevenues.filter(venue => {
      const matchesType =
        selectedType === 'all' ||
        venue.type.toLowerCase() === selectedType.toLowerCase();

      let available = true;

      if (fromdate && todate) {
        for (const booking of venue.currentbookings) {
          const bookingStart = booking.fromdate;
          const bookingEnd = booking.todate;
          if (!(todate < bookingStart || fromdate > bookingEnd)) {
            available = false;
            break;
          }
        }
      }

      return matchesType && available;
    });

    setVenue(tempvenues);
  }

  return (
    <div className='container'>
      <div className='row mt-5 bs'>
        <div className='col-md-3'>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className='form-control'
            placeholder='Search venues'
            value={searchkey}
            onChange={(e) => setsearchkey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>

        <div className="col-md-3">
          <select className='form-control' value={type} onChange={filterByType}>
            <option value="all">All</option>
            <option value="Function Hall">Function Hall</option>
            <option value="Resort">Conference Room</option>
            <option value="Garden">Garden View</option>
            <option value="Roof">Roof Top</option>
          </select>
        </div>
      </div>

      <div className='row justify-content mt-5'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : venues.length === 0 ? (
          <div className="text-center mt-5">
            <h5>No venues available for the selected filters.</h5>
          </div>
        ) : (
          venues.map((venue) => (
            <div key={venue._id} className='col-md-9 mt-2'>
              <Venue venue={venue} fromdate={fromdate} todate={todate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homesceen;
