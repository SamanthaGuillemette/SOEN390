import "./profile.css";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function Profile() {

  return (
   <Container id="container" maxWidth="md">
    
    
      <Box  sx={{ flexDirection:'column', maxHeight:3/4}}><Avatar sx={{maxHeight:'md'}} id="avatar" src="/broken-image.jpg" /></Box>
      <Box sx={{ flexDirection: 'column', bgcolor: '#e8e8e8', width: '135vh' , height: '100vh' }} />
    </Container>
  
  );
}

export default Profile;
