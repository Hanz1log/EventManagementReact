import React, { useState } from 'react';
import { Modal, Button} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from 'react-router-dom';

function Venue({venue, fromdate, todate}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  return (
    <div className='row bs'>
        <div className="col-md-4">
            <img src={venue.imageurls[0]} className='smallimg'/>
        </div>
        <div className="col-md-7 ">
                <h1>{venue.name}</h1>
              
                       {" "}
                     <p><b>Max Count :</b> {venue.maxcount}</p>
                     <p><b>Phone Number :</b> {venue.phonenumber}</p>
                     <p><b>Type :</b> {venue.type}</p>
               
                <div style={{float: 'right'}}>
                <Link to={`/book/${venue._id}/${fromdate}/${todate}`}>
                    <button className='btn btn-primary m-2'>Book Now</button>
                  </Link>
                    <button className="btn btn-primary" onClick={handleShow}>
                      View Details</button>

                </div>
        </div>
      
      <Modal show={show} onHide={handleClose} size = 'lg'>
        <Modal.Header>
          <Modal.Title>{venue.name}</Modal.Title>
        </Modal.Header>  
        <Modal.Body>

                  <Carousel>
                       {venue.imageurls.map(url => {
                        return <Carousel.Item>
                           <img
                           className="d-block w-100 bigimg"
                            src={url}
       
                              />
                    </Carousel.Item>
                                })}
                    </Carousel>

        </Modal.Body>
        <p>{venue.description}</p>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Venue
