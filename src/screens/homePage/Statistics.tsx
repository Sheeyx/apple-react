import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCreditCard, faEdit } from '@fortawesome/free-solid-svg-icons';

const Statistics = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      gap: 4, // Adjust the gap between items as needed
      padding: '100px', // Optional padding for the container
      backgroundColor: '#f0f0f0', // Optional background color for the container
    }}
  >
    <div className="info-item" style={{ display: 'flex', alignItems: 'center', flexDirection:"column",textAlign: "center"  }}>
      <FontAwesomeIcon icon={faTruck} className="icon" style={{ fontSize: '64px', marginRight: '10px', textAlign: "center"  }} />
      <Box>
        <Typography variant="h3" sx={{mt:2}}>Free delivery</Typography>
        <Typography variant="body1" sx={{mt:2}}>And free returns. See checkout for delivery dates.</Typography>
      </Box>
    </div>
    <div className="info-item" style={{ display: 'flex', alignItems: 'center', flexDirection:"column",textAlign: "center"  }}>
      <FontAwesomeIcon icon={faCreditCard} className="icon" style={{ fontSize: '64px', marginRight: '10px' }} />
      <Box>
        <Typography variant="h3" sx={{mt:2}}>Pay monthly at 0% APR</Typography>
        <Typography variant="body1" sx={{mt:2}}>Choose to check out with Apple Card Monthly Installments.</Typography>
      </Box>
    </div>
    <div className="info-item" style={{ display: 'flex', alignItems: 'center', flexDirection:"column",textAlign: "center" }}>
      <FontAwesomeIcon icon={faEdit} className="icon" style={{ fontSize: '64px', marginRight: '10px' }} />
      <Box>
        <Typography variant="h3" sx={{mt:2}}>Personalize it</Typography>
        <Typography variant="body1" sx={{mt:2}}>Engrave your device with your name or a personal note.</Typography>
      </Box>
    </div>
  </Box>
);

export default Statistics;
