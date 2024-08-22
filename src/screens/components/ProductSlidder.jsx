import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import "./styles.scss"
import { Icon } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { serverAPI } from '../../lib/config';
import useBasket from '../../app/hooks/useBasket';
import { useHistory } from 'react-router-dom';
// Install Swiper modules
SwiperCore.use([Navigation, Thumbs]);

const ProductImagesSlider = (props) => {
  const history = useHistory();
  const data = props.images;
  const {onAdd} = useBasket();
  const [mainSwiper, setMainSwiper] = useState(null); // State for main Swiper instance
  const [thumbsSwiper, setThumbsSwiper] = useState(null); // State for thumbs Swiper instance

  // Function to handle main Swiper instance initialization
  const handleMainSwiper = (swiper) => {
    setMainSwiper(swiper);
  };

  // Function to handle thumbs Swiper instance initialization
  const handleThumbsSwiper = (swiper) => {
    setThumbsSwiper(swiper);
  };

  // Function to synchronize main Swiper with thumbs Swiper on thumb click
  const handleThumbClick = (index) => {
    if (mainSwiper && thumbsSwiper) {
      mainSwiper.slideTo(index); // Slide main Swiper to the clicked thumb index
      mainSwiper.update(); // Update main Swiper after sliding
    }
  };

  const chooseDishHandler = (id) => {
    history.push(`/products/${id}`);
  }

  return (
    <div className='product-swipper'>
      <div className='prod-swipper' onClick = {()=>chooseDishHandler(data?._id)}>
        {/* Main Swiper for large images */}
        <Swiper
          onSwiper={handleMainSwiper}
          loop={true}
          spaceBetween={10}
          className='product-images-slider'
        >
          {data?.productImages.map((item, index) => {
          const imgUrl = `${serverAPI}/${item}`
          return (
          <SwiperSlide key={index}>
            <img src={imgUrl} alt={`Product Image ${index}`} />
          </SwiperSlide>
          )
          })
        }
        </Swiper>

        {/* Thumbs Swiper for thumbnails */}
        <Swiper
          onSwiper={handleThumbsSwiper}
          loop={false} // Disable looping
          spaceBetween={10}
          slidesPerView={4} // Number of thumbnails per view
          className='product-images-slider-thumbs'
        >
          {data?.productImages.map((item, index) => {
          const imgUrl = `${serverAPI}/${item}`
          return(
          <SwiperSlide key={index}>
              <div
              className="product-images-slider-thumbs-wrapper"
              onClick={(e) => {
                handleThumbClick(index + 1);
                e.stopPropagation();
              }}
            >
                <img src={imgUrl} alt={`Thumbnail ${index}`} />
              </div>
            </SwiperSlide>
          )
            
          })}
        </Swiper>
        <div className="product-icons">
            <Icon component={ShoppingBasketIcon} className="basket-icon" style={{color: "#fff", fontSize: "32px"}} 
            onClick={(e)=>{
              onAdd({
                _id: data?._id,
                quantity: 1,
                name: data?.productName,
                price: data?.productPrice,
                image: data?.productImages[0],
              })
              e.stopPropagation();
            }}
            > </Icon>
            <div className='view-icon-box'>
              <Icon component={VisibilityIcon} className="view-icon" style={{color: "#fff", fontSize: "32px", marginTop: "10px"}} />
              {
                data?.productViews !==0 &&
                <div className='product-view' style={{color: "#fff", marginTop: "10px"}}>
                  <p style={{color:"#fff", fontWeight: "bold"}}>{data?.productViews}</p></div>
              }
              </div> 
        </div>
      </div>
      <p style={{fontSize: "18px", fontWeight: 600, marginBottom: "0"}}>{data?.productName}</p>
      <p style={{fontSize: "16px", fontWeight: 400, marginTop: "4px"}}>${data?.productPrice}</p>
    </div>
    
  );
};

ProductImagesSlider.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ProductImagesSlider;
