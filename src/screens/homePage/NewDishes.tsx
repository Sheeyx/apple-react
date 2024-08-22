import { Box, Container, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProductImagesSlider from '../components/ProductSlidder';
import ProductService from '../../app/services/ProductService';
import { ProductCollection } from '../../lib/enums/products.enum';

export default function Watches() {
    const [activeCategory, setActiveCategory] = useState<string>('APPLE_WATCH '); // State to track active
    const [data, setData] = useState<any>();

    useEffect(()=>{
      const product = new ProductService();
  
      product
      .getProducts({
        page: 1,
        limit: 6,
        order: "productViews",
        productCollection: ProductCollection.APPLE_WATCH,
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
        <Stack className='watch-main'>
          <Stack>
            <img src="/img/newwatch.webp" alt="fdsf" />
          </Stack>
          <div className='views'>
          {data?.map((item:any) => (
                <ProductImagesSlider images={item} />
            ))}
          </div>
        </Stack>
      );
}
