const express = require("express");
const app = express();

require('./db');


app.use(express.json()); 


const paymentsRoute = require('./routes/paymentsRoute');
const venueRoute = require('./routes/venueRoute');
const userRoute = require('./routes/usersRoute');
const bookingRoute = require('./routes/bookingsRoute');


app.use('/api/payments', paymentsRoute);
app.use('/api/venues', venueRoute); 
app.use('/api/users', userRoute);
app.use('/api/bookings', bookingRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
