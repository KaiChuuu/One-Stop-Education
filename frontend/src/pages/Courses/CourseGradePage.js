import React from "react";
import AppAppBar from '../../components/AppAppBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import {useEffect, useState } from 'react';
import {useParams} from "react-router-dom";


const items = [
  {
    id: '',
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Proportional relationships',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae luctus neque, at ultricies ante.',
  },
  {
    id: '',
    icon: <ConstructionRoundedIcon />,
    title: 'Rates and Percentages',
    description:
      'Praesent luctus erat nec urna viverra tincidunt. Sed lobortis, nisl vel tempor fermentum, massa odio dapibus leo, vel elementum felis libero et turpis.',
  },
  {
    id: '',
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Addition and Subtraction',
    description:
      'Nunc odio justo, tincidunt sit amet elit at, semper bibendum felis. Fusce ultricies dolor ex, nec blandit diam condimentum id.',
  },
  {
    id: '',
    icon: <AutoFixHighRoundedIcon />,
    title: 'Rational Numbers: addition and subtraction',
    description:
      'Suspendisse finibus feugiat lectus, vel tincidunt turpis elementum non. Suspendisse potenti.',
  },
  {
    id: '',
    icon: <SupportAgentRoundedIcon />,
    title: 'Negative numbers: multiplication and division',
    description:
      'Nunc sagittis metus eros, sit amet consectetur neque sollicitudin eu. Nulla facilisi. Maecenas magna neque, molestie in magna ac, commodo semper ligula.',
  },
  {
    id: '',
    icon: <QueryStatsRoundedIcon />,
    title: 'Expressions, equations, & inequalities',
    description:
      'Sed quis metus et leo posuere vestibulum. In ut facilisis sapien, in suscipit eros. Morbi ut nisl sit amet mauris cursus eleifend.',
  },
];

function CourseGradePage() {
  const params = useParams();

  const [topics, setTopics] = useState([]);
  const makeAPICall = async () => {
    try {
      const response = await fetch(`https://onestopedc.us.to/courseservice/topics/${params.courseName}/${params.gradeNumber}`, {mode:'cors'});
      const res = await response.json();
      console.log(res);
      setTopics(res.topics);
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
        id="topics"
        sx={{
          pt: { xs: 4, sm: 12 },
          color: 'white',
        }}
        >    
          <Container
            sx={{
              pt: { xs: 4, sm: 12 },
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: { xs: 3, sm: 6 },
            }}
          >
            <Typography component="h2" variant="h4" color="text.primary">
              Grades    
            </Typography>
            <Grid container spacing={2}>
              {topics.map((item, index) => (
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
                  >
                    <CardContent>
                      <Box sx={{ opacity: '50%' }}><ConstructionRoundedIcon /></Box>
                      <Typography fontWeight="medium" gutterBottom>
                        {item.topicTitle}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        {item.topicDescription}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        
        <Box
        id="resources"
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          color: 'white',
        }}
        >    
          <Container
            sx={{
              pt: { xs: 4, sm: 8 },
              pb: { xs: 8, sm: 16 },
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: { xs: 3, sm: 6 },
            }}
          >
            <Typography component="h2" variant="h4" color="text.primary">
              Resources    
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Work" secondary="Jan 7, 2014" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Vacation" secondary="July 20, 2014" />
              </ListItem>
            </List>
          </Container>
        </Box>
      </Box>
    </React.StrictMode>
  );
}

export default CourseGradePage;