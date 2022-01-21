import "./profile.css";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function Profile() {

  return (
   <Container maxWidth="md">
      <Box id = "avatarBox" sx={{ flexDirection:'column'}}><Avatar sx={{maxHeight:'md'}} id="avatar" src="/broken-image.jpg" /><h2>&nbsp;John Doe</h2></Box>
      <Box sx={{ flexDirection: 'column', bgcolor: '#e8e8e8', width: '135vh' , height: '100vh' }}>
        <p id = "basicInfo">
          <br></br>Age: 30
          <br></br>Birthday: 1 July 1991
          <br></br>Weight: 150 lb
          <br></br>Address: 101 Brooke, Montreal L5L 9T9
        </p>
      </Box>
    </Container>
  );
}

export default Profile;
