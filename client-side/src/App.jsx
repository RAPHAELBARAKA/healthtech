import React from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import AppointmentBookingForm from "./Components/AppointmentBookingForm.jsx"
import AdminDashboard from "./Components/AdminDashboard.jsx"

function App() {
 

  return (
    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/dash' element={< AppointmentBookingForm/>} />
        <Route path='/admin-dash' element={< AdminDashboard/>} />
      </Routes>
      </BrowserRouter>
      
  )
}

export default App
