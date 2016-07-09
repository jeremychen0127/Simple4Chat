import React from 'react';
import Navbar from '../components/Navbar'

export const Layout =  ({content}) => (
  <div className="app-root">
    <Navbar />
    <br />
    <div className="container">
      {content}
    </div>
  </div>
);