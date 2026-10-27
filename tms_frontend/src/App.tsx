import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Routes, Route, useParams } from "react-router"
import Homepage from './pages/Homepage'
import ListPage from './pages/ListPage'


export function ListObjectsRoute() {

  const { model_name } = useParams()

  return <ListPage model_name={model_name}/>

}


function App() {
  

  return (
    <>
      <Routes>
        <Route index element={ <Homepage/> }/>
        <Route path="/list/:model_name" element={<ListObjectsRoute/>}/>
        <Route path="*" element={<div>Page Not Found!!!!!!</div>}/>
        
      </Routes>

    </>
  )
}

export default App
