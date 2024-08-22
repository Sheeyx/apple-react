import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import TabContext from "@mui/lab/TabContext";
import FinishedOrders from "./FinishedOrders";
import "../../css/orders.css";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders,setFinishedOrders } from "./slice";
import { Order, OrderInquiry, OrderItem } from "../../lib/types/order";
import { OrderStatus } from "../../lib/enums/order.enum";
import OrderService from "../../app/services/OrderService";
import { useGlobals } from "../../app/hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverAPI } from "../../lib/config";
import { MemberType } from "../../lib/enums/member.enum";

/** REDUX SLICE & SELECTOR */
const actionDistatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export function OrdersPage() {
  const [value, setValue] = useState("1");
  const { setPausedOrders, setProcessOrders, setFinishedOrders } = 
  actionDistatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();

  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });
  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry,orderBuilder]);

  /**HANDLERS */

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");
  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Stack className={"order-left"}>
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders setValue={setValue}/>
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img
                  src={
                    authMember?.memberImage
                      ? `${serverAPI}/${authMember.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  className={"order-user-avatar"}
                  alt=""
                />
                

                <div className={"order-user-icon-box"}>
                  <img
                  src={
                    authMember?.memberType === MemberType.RESTAURANT
                      ? "/icons/restaurant.svg"
                      : "/icons/user-badge.svg"
                  }
                    className={"order-user-prof-img"}
                    alt=""
                  />
                </div>
              </div>
              <span className={"order-user-name"}>
                {authMember?.memberNick}
              </span>
              <span className={"order-user-prof"}>
                {authMember?.memberType}
              </span>
            </Box>
            <Box className={"liner"}></Box>
            <Box className={"order-user-address"}>
              <div style={{ display: "flex" }}>
                <LocationOnIcon />
                
              </div>
              <div className={"spec-address-txt"}>
                {authMember?.memberAddress
                  ? authMember.memberAddress
                  : "Do not exist "}
              </div>            
            </Box>
          </Box>
          <Box className={"order-info-box"} sx={{ mt: "15px" }}>
            <input
              type={"text"}
              name={"cardNumber"}
              placeholder={"Card number: **** 9860 0707 7070"}
              className={"card-input"}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <input
                type={"text"}
                name={"cardPeriod"}
                placeholder={"09/29"}
                className={"card-half-input"}
              />
              <input
                type={"text"}
                name={"cardCVV"}
                placeholder={"CVV : 010"}
                className={"card-half-input"}
              />
            </div>
            <input
              type={"text"}
              name={"cardCreator"}
              placeholder={"Sheeyx"}
              className={"card-input"}
            />
            <div className={"cards-box"}>
              <img src={"/icons/western-card.svg"} alt="" />
              <img src={"/icons/master-card.svg"} alt="" />
              <img src={"/icons/paypal-card.svg"} alt="" />
              <img src={"/icons/visa-card.svg"} alt="" />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}