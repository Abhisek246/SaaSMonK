import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Movies from "./components/Movies"
import Reviews from "./components/Reviews"
import NewMovie from "./components/NewMovie"
import NewReview from "./components/NewReview"

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Movies/>}/>
      <Route path="/reviews/:id" element={<Reviews/>}/>
      <Route path="/movie" element={<NewMovie/>}/>
      <Route path="/review" element={<NewReview/>}/>
    </Routes>
    </>
   
  )
}

export default App