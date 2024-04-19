import React from 'react';
import { Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment, IconButton } from '@mui/material';

function NavBarForm() {
  return (
    <Box >
      <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}>
        <MenuIcon sx={{ marginTop: '0px' }} />
        <p style={{ marginLeft: '30px' }}>Be Happy</p>
        <TextField
          variant="outlined"
          placeholder="Search..."
          sx={{
            height: '24px',
            mt: '4px',
            ml: '12px',
            '& .MuiInputBase-input': {
              paddingTop: '2px',
              paddingBottom: '2px',
              color: 'white', // Set color to white
            },
            '& .MuiInputAdornment-root': {
              marginTop: '0',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button color="inherit" style={{ marginLeft: '200px', fontWeight: 'bold' }}>Home</Button>
        <Button color="inherit" style={{ marginLeft: '20px', fontWeight: 'bold' }}>About</Button>
        <Button color="inherit" style={{ marginLeft: '20px', fontWeight: 'bold' }}>Services</Button>
        <Button color="inherit" style={{ marginLeft: '20px', fontWeight: 'bold' }}>Articles</Button>
        <Button color="inherit" style={{ marginLeft: '20px', fontWeight: 'bold' }}>Testimonials</Button>
        <Button color="inherit" style={{ marginLeft: '20px', fontWeight: 'bold' }}>Contact</Button>
      </Box>
      <Box >
      </Box>
    </Box>
  );
}

export default NavBarForm;
