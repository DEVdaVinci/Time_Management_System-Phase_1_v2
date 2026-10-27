import React from 'react'
import { useNavigate } from "react-router";
import type { ModelNames } from '../utils/models'
import {model_names} from '../utils/models'

function Homepage() {

    const navigate = useNavigate();

  return (
    <>
      {model_names.map((model_name) => {
        return <button type="button" className="btn btn-primary" onClick={() => {
            navigate(`/list/${model_name}`);}}> {model_name} </button>
      })}
    </>
  )
}

export default Homepage