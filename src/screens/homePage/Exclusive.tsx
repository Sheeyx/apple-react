import React from "react";
import { Container, Stack, Box } from "@mui/material";
import Typography from "@mui/joy/Typography";

export default function Exclusive() {
  return (
    <div className="exclusive-collection">
        <Container>
        <Stack className="main">
            <Typography sx={{color: "#333333", fontSize: "32px"}}>FOR ALL EXCLUSIVE COLLETIONS</Typography>
            <Typography sx={{color: "#333333", fontSize: "54px", fontWeight: "600"}}>Count down is going on...</Typography>
            <Stack className="time-box">
                <Stack>
                    <Box>07</Box>
                    <Box>Days</Box>
                </Stack>
                <Stack>
                    <Box>24</Box>
                    <Box>Hr</Box>
                </Stack>
                <Stack>
                    <Box>30</Box>
                    <Box>Min</Box>
                </Stack>
                <Stack>
                    <Box>00</Box>
                    <Box>Sec</Box>
                </Stack>
            </Stack>
            <Typography sx={{color: "#333333", fontSize: "32px", fontWeight: 400, marginTop: "60px"}}>DON'T MISS THE OFFER</Typography>
            <Typography sx={{color: "#333333", fontSize: "32px", fontWeight: 400}}>BUY NOW!</Typography>
            <img src={"/img/ipad.png"} alt="Ipad" className="ipad"/>
            <img src={"/img/iphone.png"} alt="Iphone" className="iphone"/>
            <img src={"/img/iwatch.png"} alt="Iwatch" className="iwatch"/>
            <img src={"/img/airpods.png"} alt="Airpods" className="airpods"/>
        </Stack>
        </Container>
    </div>
  );
}