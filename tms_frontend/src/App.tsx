import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Routes, Route, useParams } from "react-router"
import Homepage from './pages/Homepage'
import ListPage from './pages/ListPage'
import CreatePage from './pages/CreatePage'



export function ListObjectsRoute() {

  const { model_name } = useParams()

  return <ListPage model_name={model_name}/>
}

export function CreateObjectsRoute() {

  const { model_name } = useParams()

  return <CreatePage model_name={model_name}/>
}
/*
export function ReadObjectsRoute() {

  const { model_name } = useParams()
  const { id } = useParams()

  return <ReadPage model_name={model_name} id={id}/>

}

export function UpdateObjectsRoute() {

  const { model_name } = useParams()
  const { id } = useParams()

  return <UpdatePage model_name={model_name} id={id}/>
}

export function DeleteObjectsRoute() {

  const { model_name } = useParams()
  const { id } = useParams()

  return <DeletePage model_name={model_name} id={id}/>

}
*/




function App() {
  

  return (
    <>
      <Routes>
        <Route index element={ <Homepage/> }/>
        <Route path="/home" element={ <Homepage/> }/>
        <Route path="/list/:model_name" element={<ListObjectsRoute/>}/>
        <Route path="/create/:model_name" element={<CreateObjectsRoute/>}/>
        {/*
        <Route path="/read/:model_name/:id" element={<ReadObjectsRoute/>}/>
        <Route path="/update/:model_name/:id" element={<UpdateObjectsRoute/>}/>
        <Route path="/delete/:model_name/:id" element={<DeleteObjectsRoute/>}/>
        */}
        <Route path="*" element={<div>Page Not Found!!!!!!</div>}/>
        
      </Routes>

    </>
  )
}

export default App
