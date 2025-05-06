const express = require("express");
const app = express();

require('./db');


const venueRoute = require('./routes/venueRoute');
const userRoute = require('./routes/usersRoute')

app.use(express.json());

app.use('/api/venues', venueRoute); 
app.use('/api/users', require('./routes/usersRoute'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
