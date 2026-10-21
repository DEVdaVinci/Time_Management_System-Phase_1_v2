import React from 'react'
import { useNavigate } from "react-router";


function Homepage() {

    const navigate = useNavigate();

  return (
    <>
        <button type="button" className="btn btn-primary" onClick={() => {
            navigate("/categories");}}> Categories</button>
         <button type="button" className="btn btn-primary" onClick={() => {
            navigate("/tags");}}> Tag</button>
    </>
  )
}

export default Homepage