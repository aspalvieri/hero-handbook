import React from "react";
import { Link } from "react-router-dom";

function NotFound(props) {
  return (
    <>
      <h2>Page Not Found</h2>
      <p>The page you have requested was not found.</p>
      <Link to="/">Back to home</Link>
    </>
  )
}

export default NotFound;
