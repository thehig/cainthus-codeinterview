import React from 'react';
import { Link } from 'react-router-dom';

const Links = () => (
  <nav className="navbar navbar-default">
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
  </nav>
);

export default Links;
