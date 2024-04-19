import React from 'react';
import NavBarForm from '../Components/NavBarForm'
import {Box} from '@mui/material'
import HomeForm from '../Components/HomeForm'


function LandingPage() {
  return (
    <Box sx={{}}>
      <NavBarForm/>
      <Box>
        <HomeForm/>
      </Box>
      
      
    </Box>
  )
}

export default LandingPage
