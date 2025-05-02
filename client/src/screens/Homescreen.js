import React, { useEffect, useState} from 'react';
import axios from 'axios';

const Homesceen = () => {
 
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () =>{
 
      try {
        const {data: response} = await axios.get('/api/venues/getallvenues');
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
  
    }

    fetchData();
  }, []);

  return (
    <div>
    <h1> Home Screen </h1>
      <h1>there are {data.length} venue</h1>

    </div>
  )
}
export default Homesceen;