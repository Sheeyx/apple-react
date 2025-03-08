import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';

const ProductGrid = () => {
  const products = [
    {
      title: 'SMART WATCHES',
      price: 'FROM $45',
      image: '/img/iwatch.png',
      backgroundColor: '#f3f0ed',
    },
    {
      title: 'IPAD & IPAD AIR',
      price: 'FROM $99',
      image: '/img/ipad.png',
      backgroundColor: '#d1d8e0',
    },
    {
      title: 'Iphone & Iphone Pro',
      price: 'FROM $17',
      image: '/img/iphone14.png',
      backgroundColor: '#e4e4e4',
    },
  ];

  return (
    <Container className="product-grid" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid
            item
            xs={12} // Full width on small screens
            sm={6} // Half width on tablets
            md={4} // One-third width on medium to large screens
            key={index}
            className="card"
          >
            <Box
              sx={{
                backgroundColor: product.backgroundColor,
                padding: 3,
                borderRadius: 2,
                textAlign: 'center',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' }, // Stack content on small screens
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                height: { xs: 'auto', md: '220px' }, // Adjust height based on screen size
              }}
            >
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, flex: 1 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    fontSize: { xs: '1.2rem', md: '1.5rem' }, // Adjust font size for different screens
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    mb: 2,
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', md: '1.2rem' }, // Adjust font size
                  }}
                >
                  {product.price}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: { xs: 2, sm: 0 },
                  flexShrink: 0,
                }}
              >
                <img
                  className="img"
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: '100%',
                    maxWidth: '120px', // Control image size
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductGrid;
