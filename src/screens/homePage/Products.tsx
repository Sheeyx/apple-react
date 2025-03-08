import { Box, Container, Stack, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductImagesSlider from '../components/ProductSlidder';
import ProductService from '../../app/services/ProductService';

export default function ProductView() {
  const [activeCategory, setActiveCategory] = useState<string>('IPHONE'); // State to track active
  const [data, setData] = useState<any>();

  useEffect(() => {
    const product = new ProductService();

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: 'productViews',
        productCollection: activeCategory as any,
      })
      .then((data) => {
        console.log('data passed here, Popular dishes', data);
        setData(data);
      })
      .catch((err) => console.log(err));
  }, [activeCategory]);

  const handleCategoryClick = (category: any) => {
    setActiveCategory(category);
  };

  return (
    <Container className="product-main" sx={{ py: 4 }}>
      {/* Header Section */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        className="heading"
        sx={{ alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}
      >
        <Box
          className="new-arrival"
          sx={{
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          New Arrival
        </Box>
        <Box
          className={`category-title ${activeCategory === 'IPHONE' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('IPHONE')}
          sx={{
            cursor: 'pointer',
            padding: '8px',
            fontSize: '1.2rem',
            fontWeight: activeCategory === 'IPHONE' ? 'bold' : 'normal',
            borderBottom: activeCategory === 'IPHONE' ? '2px solid black' : 'none',
          }}
        >
          Iphone
        </Box>
        <Box
          className={`category-title ${activeCategory === 'MACBOOK' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('MACBOOK')}
          sx={{
            cursor: 'pointer',
            padding: '8px',
            fontSize: '1.2rem',
            fontWeight: activeCategory === 'MACBOOK' ? 'bold' : 'normal',
            borderBottom: activeCategory === 'MACBOOK' ? '2px solid black' : 'none',
          }}
        >
          Macbook
        </Box>
        <Box
          className={`category-title ${activeCategory === 'APPLE_WATCH' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('APPLE_WATCH')}
          sx={{
            cursor: 'pointer',
            padding: '8px',
            fontSize: '1.2rem',
            fontWeight: activeCategory === 'APPLE_WATCH' ? 'bold' : 'normal',
            borderBottom: activeCategory === 'APPLE_WATCH' ? '2px solid black' : 'none',
          }}
        >
          Watch
        </Box>
      </Stack>

      {/* Products Section */}
      <Grid container spacing={3} className="views" sx={{ mt: 4 }}>
        {data?.map((item: any, index: number) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ProductImagesSlider images={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
