const express = require("express");
const app = express();

require('./db');
app.use(express.json());

const venueRoute = require('./routes/venueRoute');
app.use('/api/venues', venueRoute); 

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
