import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useEffect, useState } from 'react';

const items = [
  {
    faqQuestions: "test",
    faqAnswer: "testResponse"
  },
  {
    faqQuestions: "Test2",
    faqAnswer: "testResponse2"
  }
]

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [questions, setQuestions] = useState([]);
  const makeAPICall = async () => {
    try {
      const response = await fetch(`https://onestopedc.us.to/faqservice/questions`, {mode:'cors'});
      const res = await response.json();
      console.log(res);
      setQuestions(res.faq);
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    makeAPICall();
  }, [])

  return (
    <Container
      id="faq"
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
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: '100%' }}>
        {questions.map((item, index) => (
          <Accordion
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1d-content"
              id="paneld-header"
            >
              <Typography component="h3" variant="subtitle2">
                {item.faqQuestions}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ maxWidth: { sm: '100%', md: '70%' } }}
              >
                {item.faqAnswer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}