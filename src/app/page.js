"use client";
import React from "react";

const Home = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#f8d7da', 
      textAlign: 'center',
      color: '#721c24'
    }}>
      <div>
        <h1 style={{ fontSize: '48px' }}>Website Closed</h1>
        <p style={{ fontSize: '18px' }}>
          This website is currently closed due to unpaid maintenance fees.
        </p>
        <p style={{ fontSize: '18px' }}>
          Please check back later.
        </p>
      </div>
    </div>
  );
};

export default Home;
