import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route path="/book/:venueid/:fromdate/:todate" element={<Bookingscreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/profile" element={<Profilescreen />} />
          <Route path="/admin" element={<Adminscreen/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
