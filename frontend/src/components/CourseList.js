import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { Link } from 'react-router-dom';
import {useEffect, useState } from 'react';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    course: 'Math',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae luctus neque, at ultricies ante.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    course: 'Science',
    description:
      'Praesent luctus erat nec urna viverra tincidunt. Sed lobortis, nisl vel tempor fermentum, massa odio dapibus leo, vel elementum felis libero et turpis.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    course: 'Chemistry',
    description:
      'Nunc odio justo, tincidunt sit amet elit at, semper bibendum felis. Fusce ultricies dolor ex, nec blandit diam condimentum id.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    course: 'Physics',
    description:
      'Suspendisse finibus feugiat lectus, vel tincidunt turpis elementum non. Suspendisse potenti.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    course: 'Biology',
    description:
      'Nunc sagittis metus eros, sit amet consectetur neque sollicitudin eu. Nulla facilisi. Maecenas magna neque, molestie in magna ac, commodo semper ligula.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    course: 'History',
    description:
      'Sed quis metus et leo posuere vestibulum. In ut facilisis sapien, in suscipit eros. Morbi ut nisl sit amet mauris cursus eleifend.',
  },
];

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const makeAPICall = async () => {
    try {
      const response = await fetch('https://onestopedc.us.to/courseservice/courses', {mode:'cors'});
      const res = await response.json();
      console.log(res);
      setCourses(res.courseNames);
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    makeAPICall();
  }, [])

  return (
    <Box
      id="courses"
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
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" color="text.primary">
            Courses
          </Typography>
          <Typography variant="body1" color="text.secondary">
            OneStopEducation covers a wide range of topics! Start by find the course you are studying for!
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {courses.map((item, index) => (
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
                to={`/oneStopEd/courses/${item}`}
              >
                <CardContent>
                  <Box sx={{ opacity: '50%' }}><ThumbUpAltRoundedIcon /></Box>
                  <Typography fontWeight="medium" gutterBottom>
                    {item}
                  </Typography>
                  {/* <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography> */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}