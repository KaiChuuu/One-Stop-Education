import React from "react";
import CourseList from "../components/CourseList";
import AppAppBar from '../components/AppAppBar';
import FAQ from '../components/FAQ';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

function Home() {
  return (
    <React.StrictMode>
      <AppAppBar />
      <Box sx={{ bgcolor: 'background.default' }}>
        <CourseList />
        <Divider />
        <FAQ/>
      </Box>
    </React.StrictMode>
  );
}

export default Home;