import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Venue from '../components/Venue';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker, Space } from 'antd';
import 'antd/dist/reset.css';
import moment from 'moment'

const { RangePicker } = DatePicker;

function Homesceen  (){

  const [venues, setVenue] = useState([])
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const [fromdate, setfromdate] = useState()
  const [todate, settodate] = useState()


useEffect(() => {
  const fetchData = async () => {
    try {
      setloading(true);
      const { data: response } = await axios.get('/api/venues/getallvenues');

      setVenue(response);
    
      setTimeout(() => {
        setloading(false);
      }, 800); 
    } catch (error) {
      seterror(error);
      console.error(error.message);
      setloading(false); 
    }
  };

  fetchData();
}, []);


function filterByDate(dates)
{
  setfromdate(dates[0].format('DD-MM-YYYY'))
  settodate(dates[1].format('DD-MM-YYYY'))
}
  return (
    <div className='container'>

      <div className='row mt-5'>

      <div className='col-md-3'>

        <RangePicker format='DD-MM-YYYY' onChange={filterByDate}/>

        </div>

      </div>

      <div className="row justify-content mt-5">
        {loading ? (
          <Loader/>
        ) : venues.length>1 ? (
          venues.map((venue) => {
            return (
              <div key={venue._id} className="col-md-9 mt-2">
                <Venue venue={venue} fromdate={fromdate} todate= {todate} />
              </div>
            );
          })
          
        ) : (
          <Error/>
        )}
      </div>
    </div>
  )
}


export default Homesceen;