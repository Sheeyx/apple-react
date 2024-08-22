import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../app/components/divider/index";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { Product } from "../../lib/types/product";
import { setChosenProduct, setRestaurant } from "./slice";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { useParams } from "react-router-dom";
import ProductService from "../../app/services/ProductService";
import MemberService from "../../app/services/MemberService";
import { Member } from "../../lib/types/member";
import { useDispatch, useSelector } from "react-redux";
import { serverAPI } from "../../lib/config";
import { CartItem } from "../../lib/types/search";
import ProductImagesSlider from "../components/ProductSlidder";

const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenProduct, 
  (chosenProduct) => ({ chosenProduct })
  );

const restaurantRetriever = createSelector(
    retrieveRestaurant, 
    (restaurant) => ({ restaurant })
    );

interface ChosenProductProps {
    onAdd: (item : CartItem) => void;
  }

export default function ChosenProduct(props:ChosenProductProps) {
  const {onAdd} = props;
  const {productId} = useParams<{productId: string}>();
  const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());
  const {chosenProduct} = useSelector(chosenProductRetriever);
  const {restaurant} = useSelector(restaurantRetriever);
  console.log(chosenProduct, "chosenProduct");
  

  useEffect(()=>{
    const product = new ProductService();
    //product
    product
    .getProduct(productId)
    .then((data)=>setChosenProduct(data))
    .catch((err)=>console.log(err)
    );

    const member = new MemberService();

    member.getResturant()
    .then((data) => setRestaurant(data))
    .catch(err => console.log(err))
  },[])
  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <ProductImagesSlider images={chosenProduct as any}/>                    
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            
            <strong className={"product-name"}>{chosenProduct?.productName}</strong>
            <span className={"resto-name"}>{restaurant?.memberNick}</span>
            <span className={"resto-name"}>{restaurant?.memberPhone}</span>
            <span className={"availability-name"} style={{fontSize: "16px", fontWeight: 600}}>Availability: <span style = {{color: "red"}}>{chosenProduct?.productLeftCount} In Stock</span></span>
            <span style={{fontSize: "16px", fontWeight: 600}}>Storage: {chosenProduct?.productStorage}GB</span>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span >{chosenProduct?.productViews}</span>
                </div>
              </div>
            </Box>
            <p className={"product-desc"}>{chosenProduct?.productDesc ? chosenProduct?.productDesc : "No description"}</p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span>Price:</span>
              <span>${chosenProduct?.productPrice}</span>
            </div>
            <div className={"button-box"}>
            <Button 
              variant="contained"
              onClick={(e) => {
                  if (chosenProduct) {
                      onAdd({
                          _id: chosenProduct._id,
                          quantity: 1,
                          name: chosenProduct.productName,
                          price: chosenProduct.productPrice,
                          image: chosenProduct.productImages[0],
                      });
                  }
              }}
            >Add To Basket</Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}