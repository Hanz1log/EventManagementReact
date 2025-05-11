import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import MyBookings from './MyBookings';
import Loader from "../components/Loader";
import Error from "../components/Error";

const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: `'Poppins', 'Segoe UI', sans-serif` }}>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Profile" key="1">
          <div
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              background: '#fff',
              borderRadius: '12px',
              padding: '30px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}
          >
            <h2 style={{ fontWeight: '600', marginBottom: '20px' }}>My Profile</h2>
            <hr />
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contact:</strong> {user.contact}</p>
            <p><strong>Admin Status:</strong> {user.isAdmin ? 'YES' : 'NO'}</p>
            <p><strong>User ID:</strong> {user._id}</p>
          </div>
        </TabPane>

        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;
