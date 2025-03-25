import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCreditCard, faEdit } from '@fortawesome/free-solid-svg-icons';

const Statistics = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      px: { xs: 3, sm: 5, md: 10 },
      py: { xs: 5, sm: 8, md: 10 },
      backgroundColor: '#f0f0f0',
    }}
  >
    <Grid container spacing={4} justifyContent="center">
      {[ 
        { icon: faTruck, title: 'Free delivery', text: 'And free returns. See checkout for delivery dates.' },
        { icon: faCreditCard, title: 'Pay monthly at 0% APR', text: 'Choose to check out with Apple Card Monthly Installments.' },
        { icon: faEdit, title: 'Personalize it', text: 'Engrave your device with your name or a personal note.' }
      ].map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FontAwesomeIcon icon={item.icon} style={{ fontSize: '64px', marginBottom: '10px' }} />
            <Typography variant="h5" sx={{ mt: 2 }}>{item.title}</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>{item.text}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Statistics;
