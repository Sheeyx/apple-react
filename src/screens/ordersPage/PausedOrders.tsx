import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Order, OrderItem, OrderUpdateInput } from "../../lib/types/order";
import { Product } from "../../lib/types/product";
import { Messages, serverAPI } from "../../lib/config";
import { useGlobals } from "../../app/hooks/useGlobals";
import { OrderStatus } from "../../lib/enums/order.enum";
import OrderService from "../../app/services/OrderService";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import { T } from "../../lib/common";

/** REDUX SLICE & SELECTOR **/
const pasuedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);
interface PausedOrderProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrderProps) {
  const { authMember, setOrderBuilder } = useGlobals();
  const { setValue } = props;
  const { pausedOrders } = useSelector(pasuedOrdersRetriever);

  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm(
        "Are you sure you want to delete the order?"
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      //PAYMENT
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm(
        "Are you sure you want to proceed with payment?"
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value={"1"}>
      <Stack>
      {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>              
            <Box className={"order-box-scroll"}>
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order?.productData.filter(
                    (ele: Product) => (item.productId === ele._id)
                  )[0];
                  const imagePath = `${serverAPI}/${product?.productImages[0]}`;
                  return (
                    <Box key={item._id} className={"orders-name-price"}>
                      <img src={imagePath} className={"order-dish-img"} />
                      <p className={"title-dish"}>{product?.productName}</p>{" "}
                      <Box className={"price-box"}>
                        <p>${item?.itemPrice}</p>{" "}
                          <img src={"/icons/close.svg"} />
                        <p>{item?.itemQuantity}</p>{" "}
                          <img src={"/icons/pause.svg"} />
                        <p style={{ marginLeft: "15px" }}>
                          ${item?.itemQuantity * item?.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total-price-box"}>
                <Box className={"box-total"}>
                  <p>Product price</p>
                  <p>${order?.orderTotal - order?.orderDelivery}</p>{" "}
                  <img
                    src={"/icons/plus.svg"}
                    style={{ marginLeft: "20px" }}
                    alt=""
                  />
                  <p>Delivery cost</p>
                  <p style={{marginRight: "10px"}}>${order?.orderDelivery}</p>
                  <img src={"/icons/pause.svg"} alt="" /> 
                  <p>Total</p>
                  <p>${order?.orderTotal}</p>{" "}                
                </Box>
                <Stack display={"flex"} justifyContent={"space-between"} flexDirection={"row"} mt={4}>
                  <Button
                    value={order?._id}
                    variant="contained"
                    color="secondary"
                    className={"cancel-button"}
                    onClick={deleteOrderHandler}
                    style={{marginRight:"100px"}}
                  >
                    Cancel
                  </Button>
                  <Button 
                    value={order._id}
                    variant="contained" 
                    className={"pay-button"}
                    onClick={processOrderHandler}>
                    Payment
                  </Button>
                </Stack>
              </Box>
            </Box>
          );
        })}
        {!pausedOrders ||
          (pausedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src={"/icons/noimage-list.svg"}
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}