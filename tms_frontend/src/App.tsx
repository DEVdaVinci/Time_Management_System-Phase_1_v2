import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Routes, Route, useParams } from "react-router"
import Homepage from './pages/Homepage'


export function ListObjectsRoute() {

  const { model_name } = useParams()

  return <div> Wassup {model_name} </div>

}


function App() {
  

  return (
    <>
      <Routes>
        <Route index element={ <Homepage/> }/>
        <Route path="/:model_name" element={<ListObjectsRoute/>}/>
        <Route path="*" element={<div>Page Not Found!!!!!!</div>}/>
        
      </Routes>

    </>
  )
}

export default App
