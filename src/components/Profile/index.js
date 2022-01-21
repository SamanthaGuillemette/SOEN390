import "./profile.css";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function Profile() {

  return (
    <React.Fragment>
    <CssBaseline />
    <Avatar id="avatar" src="/broken-image.jpg" />
    <Container id="container" maxWidth="md">
      <Box sx={{ bgcolor: '#e8e8e8', width: '135vh' , height: '100vh' }} />
    </Container>
  </React.Fragment>
  );
}

export default Profile;
