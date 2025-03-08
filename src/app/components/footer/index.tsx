import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  padding: 50px 0;
  background: #f5f5f7;
  background-size: cover;
`;

export function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container maxWidth="lg">
        <Stack 
          flexDirection={{ xs: "column", md: "row" }} 
          sx={{ mt: "50px", gap: { xs: 4, md: 8 }, justifyContent: "space-between" }}
        >
          {/* Left Section */}
          <Stack flexDirection="column" sx={{ width: { xs: "100%", md: "340px" }, textAlign: { xs: "center", md: "left" } }}>
            <NavLink to="/" style={{ fontSize: "32px", color: "#000", fontWeight: "400" }}>
              <img src="/icons/logo.png" style={{ width: "250px", height: "80px", margin: "0 auto" }} alt="Logo" />
            </NavLink>
            <Box className="foot-desc-txt" sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: { xs: "28px", md: "34px" } }}>
              Apple Education Pricing is available to current and newly accepted university students and their parents, as well as teachers and staff at all levels. Quantity limits apply.
            </Box>
            <Box className="sns-context" sx={{ justifyContent: "center", gap: 2, mt: "15px" }}>
              <img src="/icons/facebook.svg" alt="Facebook" />
              <img src="/icons/twitter.svg" alt="Twitter" />
              <img src="/icons/instagram.svg" alt="Instagram" />
              <img src="/icons/youtube.svg" alt="YouTube" />
            </Box>
          </Stack>

          {/* Navigation Links */}
          <Stack flexDirection={{ xs: "column", sm: "row" }} sx={{ gap: { xs: 4, sm: 10 }, textAlign: { xs: "center", sm: "left" } }}>
            <Stack>
              <Box className="foot-category-title">Bo'limlar</Box>
              <Box className="foot-category-link">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                {authMember && <Link to="/orders">Orders</Link>}
                <Link to="/help">Help</Link>
              </Box>
            </Stack>

            {/* Contact Information */}
            <Stack>
              <Box className="foot-category-title">Find us</Box>
              <Box sx={{ mt: "20px", display: "flex", flexDirection: "column", gap: 2 }}>
                <Box className="find-us">
                  <span>L.</span>
                  <div>Downtown, Dubai</div>
                </Box>
                <Box className="find-us">
                  <span>P.</span>
                  <div>+971 4 554 7777</div>
                </Box>
                <Box className="find-us">
                  <span>E.</span>
                  <div>devexuz@gmail.com</div>
                </Box>
                <Box className="find-us">
                  <span>H.</span>
                  <div>Visit 24 hours</div>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        {/* Divider */}
        <Box sx={{ borderTop: "1px solid #C5C8C9", opacity: 0.2, my: 5 }} />

        {/* Copyright */}
        <Stack className="copyright-txt" sx={{ textAlign: "center", fontSize: { xs: "12px", md: "16px" } }}>
          © Copyright Ilmnoor Tech, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
