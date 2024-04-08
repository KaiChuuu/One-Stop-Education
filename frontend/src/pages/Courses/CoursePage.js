import React from "react";
import AppAppBar from '../../components/AppAppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import Grid from '@mui/material/Grid';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import {useParams} from "react-router-dom";
import {useEffect, useState } from 'react';

const items = [
  {
    id: 'gr7',
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Grade 7',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae luctus neque, at ultricies ante.',
  },
  {
    id: 'gr8',
    icon: <ConstructionRoundedIcon />,
    title: 'Grade 8',
    description:
      'Praesent luctus erat nec urna viverra tincidunt. Sed lobortis, nisl vel tempor fermentum, massa odio dapibus leo, vel elementum felis libero et turpis.',
  },
  {
    id: 'gr9',
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Grade 9',
    description:
      'Nunc odio justo, tincidunt sit amet elit at, semper bibendum felis. Fusce ultricies dolor ex, nec blandit diam condimentum id.',
  },
  {
    id: 'gr10',
    icon: <AutoFixHighRoundedIcon />,
    title: 'Grade 10',
    description:
      'Suspendisse finibus feugiat lectus, vel tincidunt turpis elementum non. Suspendisse potenti.',
  },
  {
    id: 'gr11',
    icon: <SupportAgentRoundedIcon />,
    title: 'Grade 11',
    description:
      'Nunc sagittis metus eros, sit amet consectetur neque sollicitudin eu. Nulla facilisi. Maecenas magna neque, molestie in magna ac, commodo semper ligula.',
  },
  {
    id: 'gr12',
    icon: <QueryStatsRoundedIcon />,
    title: 'Grade 12',
    description:
      'Sed quis metus et leo posuere vestibulum. In ut facilisis sapien, in suscipit eros. Morbi ut nisl sit amet mauris cursus eleifend.',
  },
];

function CoursePage() {
  const params = useParams();

  const [grades, setGrades] = useState([]);
  const makeAPICall = async () => {
    try {
      const response = await fetch(`https://onestopedc.us.to/courseservice/course-grades/${params.courseName}`, {mode:'cors'});
      const res = await response.json();
      console.log(res);
      setGrades(res.courseGrades);
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
        id="grades"
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
              Topics    
            </Typography>
            <Grid container spacing={2}>
              {grades.map((item, index) => (
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
                    to={`/oneStopEd/courses/${params.courseName}/${item}`}
                  >
                    <CardContent>
                      <Box sx={{ opacity: '50%' }}><ConstructionRoundedIcon /></Box>
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
      </Box>
    </React.StrictMode>
  );
}

export default CoursePage;