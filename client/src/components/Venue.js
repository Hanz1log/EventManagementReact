import React from 'react'

function Venue({venue}) {
  return (
    <div className='row'>
        <div className="col-md-4">
            <img src={venue.imageurls[0]} className='smallimg'/>
        </div>
        <div className="col-md-7 ">
                <h1>{venue.name}</h1>
                <p>Max Count : {venue.maxcount}</p>
                <p>Phone Number : {venue.phonenumber}</p>
                <p>Type : {venue.type}</p>

                <div>
                    <buttonclassName='btn'></div>View Details</button>

                </div>
        </div>
    </div>
  )
}

export default Venue
