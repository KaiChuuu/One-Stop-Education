import React from "react";
import CourseList from "../components/CourseList";
import AppAppBar from '../components/AppAppBar';
import FAQ from '../components/FAQ';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {useParams} from "react-router-dom";
import {useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import CardContent from '@mui/material/CardContent';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';

function UserHome() {
  const params = useParams();

  const [info, setInfo] = useState([]);

  const makeAPICall = async () => {
    try {
      const response = await fetch(`https://onestopedc.us.to/userservice/homeinformation/${params.userId}`, {mode:'cors'});
      const res = await response.json();
      console.log(res);
      setInfo(res.curStudies);
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    makeAPICall();
  }, [])

  return (
    <React.StrictMode>
      <AppAppBar />
      <Box sx={{ bgcolor: 'background.default' }}>

      <Box
        id="currentTopics"
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          color: 'white',
        }}
        >    
          <Container
            sx={{
              pt: { xs: 4, sm: 12 },
              pb: { xs: 8, sm: 16 },
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: { xs: 3, sm: 6 },
            }}
          >
            <Typography component="h2" variant="h4" color="text.primary">
              Welcome back, {params.username}    
            </Typography>
            <Typography component="h2" variant="h5" color="text.primary">
              Resume Topics    
            </Typography>
            <Grid container spacing={2}>
              {info.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flexGrow: 1,
                      p: 1,
                      textDecoration: 'none',
                    }}
                    component={Link}
                    to={`/oneStopEd/courses/${item.topicCourse}/${item.topicGrade}`}
                  >
                    
                    
                    <CardContent>
                      <Box sx={{ opacity: '50%' }}><ConstructionRoundedIcon /></Box>
                      <Typography fontWeight="medium" gutterBottom>
                        {item.topicTitle}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        {item.topicCourse}, {item.topicGrade}
                      </Typography>
                    </CardContent>


                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <CourseList />
        <Divider />
        <FAQ/>
      </Box>
    </React.StrictMode>
  );
}

export default UserHome;