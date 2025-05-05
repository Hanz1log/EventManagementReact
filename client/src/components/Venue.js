import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Venue({venue}) {
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
                    <button className='btn btn-primary'>View Details</button>

                </div>
        </div>
        <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Venue
