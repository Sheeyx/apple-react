import React, { useEffect, useState } from "react";
import Statistics from "./Statistics";
import NewDishes from "./NewDishes";
import Advertisment from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../css/home.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../lib/types/product";
import { Member } from "../../lib/types/member";
import ProductView from "./Products";
import Exclusive from "./Exclusive";
import MemberService from "../../app/services/MemberService";
import ProductGrid from "./PoductGrid";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

const popularDishesRetrieve = createSelector(
  retrievePopularDishes, 
  (popularDishes) => ({ popularDishes })
  );

export function HomePage(){
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(useDispatch());

  useEffect(()=>{
    const member = new MemberService();
    member
    .getTopUsers()
    .then((data)=>{
      console.log("data passed here, getTopUsers", data);
      setTopUsers(data);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div className="homepage">
      <ProductGrid/>
      <ProductView/>
      <Exclusive/>
      <NewDishes />
      <Advertisment />
      <ActiveUsers />
      <Statistics />
    </div>
  );
  }