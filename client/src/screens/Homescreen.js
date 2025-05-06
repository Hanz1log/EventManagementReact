import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Venue from '../components/Venue';
import Loader from '../components/Loader';
import Error from '../components/Error';
const Homesceen = () => {

  const [venues, setVenue] = useState([])
  const [loading, setloading] = useState(false);
const [error, seterror] = useState(null);


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



  return (
    <div className='container'>
      <div className="row justify-content mt-5">
        {loading ? (
          <Loader/>
        ) : venues.length>1 ? (
          venues.map((venue) => {
            return (
              <div key={venue._id} className="col-md-9 mt-2">
                <Venue venue={venue} />
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