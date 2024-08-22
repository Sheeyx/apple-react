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
    <Container className='product-grid'>
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} md={4} key={index} className='card'>
            <Box
              sx={{
                backgroundColor: product.backgroundColor,
                padding: 3,
                borderRadius: 2,
                textAlign: 'center',
                display: "flex",
                position: "relative",
                height: "220px",
              }}
            >
                <Box mt={6}>
                    <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {product.title}
                    </Typography>
                    <Typography variant="body1" component="div" sx={{ mb: 2, fontWeight: "bold" }}>
                        {product.price}
                    </Typography>
                </Box>
              
                <img className='img' src={product.image} alt={product.title} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductGrid;
