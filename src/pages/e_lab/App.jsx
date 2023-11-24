import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Your other component imports here
import Home from './components/Home';
// import About from './components/About';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        {/* Navigation Links can go here */}
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav> */}

        {/* Define Routes */}
        <Routes>
          <Route path="/about" element={<div>About Page</div>} /> {/* Replace <div>About Page</div> with your actual About Component, e.g., <About /> */}
          <Route path="/" element={<Home />} /> {/* Replace <div>Home Page</div> with your actual Home Component, e.g., <Home /> */}
          {/* Add more Routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
