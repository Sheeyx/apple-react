import { Box, Container, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProductImagesSlider from '../components/ProductSlidder';
import ProductService from '../../app/services/ProductService';

export default function ProductView() {
    const [activeCategory, setActiveCategory] = useState<string>('IPHONE'); // State to track active
    const [data, setData] = useState<any>();

    useEffect(()=>{
      const product = new ProductService();
  
      product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: activeCategory as any,
      })
      .then((data)=>{
        console.log("data passed here, Popular dishes", data);
        setData(data);
      })
      .catch(err => console.log(err));
    }, [activeCategory]);

    const handleCategoryClick = (category:any) => {
        setActiveCategory(category);
    };
    return (
        <Container className='product-main'>
          <Stack direction="row" spacing={4} className='heading'>
            <Box
            className = {"new-arrival"}
            >
              New Arrival
            </Box>
            <Box
              className={`category-title ${activeCategory === 'IPHONE' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('IPHONE')}
            >
              Iphone
            </Box>
            <Box
              className={`category-title ${activeCategory === 'MACBOOK' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('MACBOOK')}
            >
              Macbook
            </Box>
            <Box
              className={`category-title ${activeCategory === 'APPLE_WATCH' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('APPLE_WATCH')}
            >
              Watch
            </Box>
          </Stack>
          <Stack className='views'>
          {data?.map((item:any) => (
              <ProductImagesSlider images={item} />
            ))}
          </Stack>
        </Container>
      );
}
