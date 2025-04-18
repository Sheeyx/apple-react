import React, { ChangeEvent, useEffect, useState } from "react";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Product, ProductInquire } from "../../lib/types/product";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import ProductService from "../../app/services/ProductService";
import { ProductCollection } from "../../lib/enums/products.enum";
import { useDispatch, useSelector } from "react-redux";
import { serverAPI } from "../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../lib/types/search";
import ProductImagesSlider from "../components/ProductSlidder";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(
  retrieveProducts, 
  (products) => ({ products })
  );

  interface ProductsProps {
    onAdd: (item : CartItem) => void;
  }


export default function Products(props: ProductsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('IPHONE'); // State to track active

    const handleCategoryClick = (category:any) => {
        setActiveCategory(category);
    };
    
  const {onAdd} = props;
  const {setProducts} = actionDispatch(useDispatch());
  const {products} = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquire>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.IPHONE,
  });

  console.log(productSearch, "productSearch")

  const [searchText, setSearchText] = useState<string>("");

  const history = useHistory();

  useEffect(()=>{
    const product = new ProductService();
    console.log(productSearch, "productSearch useEffect")
    product
    .getProducts(productSearch)
    .then((data)=>{
      setProducts(data);
    })
    .catch(err => console.log(err));
    console.log("productSearch UseEffect")
  },[productSearch]);

  useEffect(()=>{
    if(searchText === ""){
      productSearch.search = "";
      setProductSearch({...productSearch})
    }
  },[searchText]);

  /*** Handlers ***/

  const searchCollectionHandler = (collection?: any) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setActiveCategory(collection);
    setProductSearch({...productSearch});
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({...productSearch})
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({...productSearch});
  };

  const paginationHandler = (e:ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({...productSearch});
  }

  const chooseDishHandler = (id:string) => {
    history.push(`/products/${id}`);
  }

  return (
    <div className={"products"}>
      <img src="/img/apple-store.webp"/>
      <Container>
        <Stack flexDirection={"column"}>
          <Stack>
            <Stack className={"top-text"}>
              <p>Apple Products</p>
            </Stack>
          </Stack>

            <Stack className="product-container">
              <Stack className="product-list-right">
                <Stack className={"product-list"}>
                  <Box
                  className = {"new-arrival"}
                  >
                    Apple Store
                  </Box>
                  <Box
                className={`category-title ${activeCategory === 'IPHONE' ? 'active' : ''}`}
                onClick={() => searchCollectionHandler('IPHONE')}
              >
                Iphone
              </Box>
              <Box
                className={`category-title ${activeCategory === 'MACBOOK' ? 'active' : ''}`}
                onClick={() => searchCollectionHandler('MACBOOK')}
              >
                Macbook
              </Box>
              <Box
                className={`category-title ${activeCategory === 'APPLE_WATCH' ? 'active' : ''}`}
                onClick={() => searchCollectionHandler('APPLE_WATCH')}
              >
                Watch
              </Box>
                </Stack>
                <Stack className='views'>
                {products?.map((item:any) => (
                    <ProductImagesSlider images={item}/>                    
                  ))}
                </Stack>
                <Stack className={"pagination-section"}>
            <Pagination
              count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
              page={productSearch.page}
              renderItem={(item) => ( 
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
              </Stack>
              <Stack className="product-list-left">
                <Stack className={"single-search-big-box"}>
                  <input
                    type={"search"}
                    className={"single-search-input"}
                    name={"singleResearch"}
                    placeholder={"Type here"}
                    value={searchText}
                    onChange={(e)=>
                      setSearchText(e.target.value)
                    }
                    onKeyDown={(e)=>{
                      if(e.key === "Enter"){
                        searchProductHandler();
                      }
                    }}
                  />
                  <Button
                    className={"single-button-search"}
                    variant="contained"
                    endIcon={<SearchIcon />}
                    onClick={searchProductHandler}
                  >
                    Search
                  </Button>
                </Stack>
                <Stack className={"dishes-filter-box"}>
                  <Button
                    variant={"contained"}
                    className={"order"}
                    color={productSearch.order === "createdAt" ? "primary" : "secondary"}
                    onClick={()=>
                      searchOrderHandler("createdAt")
                    }
                  >
                    New
                  </Button>
                  <Button
                    variant={"contained"}
                    className={"order"}
                    color={productSearch.order === "productPrice" ? "primary" : "secondary"}
                    onClick={()=>
                      searchOrderHandler("productPrice")
                    }
                  >
                    Price
                  </Button>
                  <Button
                    variant={"contained"}
                    className={"order"}
                    color={productSearch.order === "productViews" ? "primary" : "secondary"}
                    onClick={()=>
                      searchOrderHandler("productViews")
                    }
                  >
                    Views
                  </Button>
                </Stack>
              </Stack>
          </Stack>

          
        </Stack>
      </Container>

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9c5015eab678e435!2z0KDQsNC50YXQvtC9!5e0!3m2!1sko!2skr!4v1655461169573!5m2!1sko!2skr"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}