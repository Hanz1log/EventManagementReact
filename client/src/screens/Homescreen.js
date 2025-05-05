import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Venue from '../components/Venue';

const Homesceen = () => {

  const [venues, setVenue] = useState([])
  const [loading, setloading] = useState(false);
const [error, seterror] = useState(null);


  useEffect(() => {
    const fetchData = async () => {

      try {
        setloading(true)
        const { data: response } = await axios.get('/api/venues/getallvenues');

        setVenue(response);
        setloading(false)

      } catch (error) {
        seterror(error)
        console.error(error.message);
        setloading(false)

      }

    }

    fetchData();
  }, []);


  return (
    <div className='container'>
      <div className="row justify-content mt-5">
        {loading ? (
          <h1>loading....</h1>
        ) : error ? (
        <h1>Error</h1>
        ) : (
          venues.map(venue => (
            <div key={venue._id} className="col-md-9 mt-2">
              <Venue venue={venue} />
            </div>
          ))
          
        )}
      </div>
    </div>
  )
}


export default Homesceen;