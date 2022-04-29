import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header">
      <ul className="menus">
        <li>
          <Link to="react-redux">react-redux</Link>
        </li>
        <li>
          <Link to="reselect">reselect</Link>
        </li>
        <li>
          <Link to="immer">immer</Link>
        </li>
        <li>
          <Link to="rtk">Redux Toolkit</Link>
        </li>
      </ul>
    </div>
  );
}
