import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import './style.css';
export default function App() {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
