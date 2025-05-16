import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import MyBookings from './MyBookings';

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
          <div className="profile-card">
            <h2>My Profile</h2>
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
