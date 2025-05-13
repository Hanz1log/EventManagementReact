import React from 'react';
import './LandingPage.css';

function LandingPage() {
  return (
    <div
      className="landing-wrapper"
      style={{
        backgroundImage: `linear-gradient(rgba(23, 26, 37, 0.7), rgba(20, 24, 41, 0.7)), url("/main.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="landing-content">
        <h1>The Best Events, Perfectly Planned</h1>
        <p>
          Plan, organize, and execute unforgettable events with perfection. We make every moment count!
        </p>
        <a href="/login" className="cta-btn">Book Now</a>
      </div>
    </div>
  );
}

export default LandingPage;
