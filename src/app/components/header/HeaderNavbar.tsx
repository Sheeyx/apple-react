import React, { Component, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { serverAPI } from "../../../lib/config";
import { Logout } from "@mui/icons-material";
import { useGlobals } from "../../hooks/useGlobals";
import VideoSlider from "./VideoSlider";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../../assets/icons/logos.svg";

interface HeaderNavbarProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
    setSignupOpen: (isOpen: boolean) => void;
    setLoginOpen: (isOpen: boolean) => void;
    handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
    anchorEl: HTMLElement | null;
    handleCloseLogout: () => void;
    handleLogoutRequest: () => void;
  }
  
export function HeaderNavbar(props: HeaderNavbarProps){
    const {
        cartItems,
        onAdd,
        onRemove,
        onDelete,
        onDeleteAll,
        setSignupOpen,
        setLoginOpen,
        handleLogoutClick,
        anchorEl,
        handleCloseLogout,
        handleLogoutRequest,
      } = props;    
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(true);
    const { authMember } = useGlobals();
    const [open, setOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleDrawer = () => setMobileOpen(prev => !prev);
  

    useEffect(()=>{
        console.log("ComponentDidMount"); // Data fetch
        setCount(count + 1);

        return () => {
            console.log("componentWillUnmount");
        };
    }, [value])

    // Handlers

    const buttonHandler = () => {
        setCount(count + 1);
    };
    
    return (
    <div className="home-navbar">
        <Container className="navbar-container">
            <Stack 
                className="menu"
            >
                <Box>
                    <NavLink className={"logo"}  to="/">
                        <img src={Logo} alt="" />
                    </NavLink>
                </Box>
                <Stack
                    className={`mobile-links ${mobileOpen ? 'active' : ''}`}
                >
                    <Box className = {"hover-line"}>
                        <NavLink  to="/" activeClassName = {"underline"}>
                            Home
                        </NavLink>
                    </Box>
                    <Box className = {"hover-line"}>
                        <NavLink  to="/products" activeClassName = {"underline"}>
                            Products
                        </NavLink>
                    </Box>
                    {authMember ? (
                        <Box className = {"hover-line"}>
                            <NavLink  to="/orders" activeClassName = {"underline"}>
                                Orders
                            </NavLink>
                        </Box>
                    ):null}
                    {authMember ? (
                        <Box className = {"hover-line"}>
                            <NavLink  to="/member-page" activeClassName = {"underline"}>
                                My Page
                            </NavLink>
                        </Box>
                    ):null}
                    <Box className = {"hover-line"}>
                        <NavLink  to="/help" activeClassName = {"underline"}>
                            Help
                        </NavLink>
                    </Box>
                </Stack>
                {/* Basket */}
                <Basket 
                    cartItems = {cartItems} 
                    onAdd = {onAdd} 
                    onRemove = {onRemove} 
                    onDelete = {onDelete} 
                    onDeleteAll = {onDeleteAll}
                    />
                {!authMember ? (
                        <Box>
                            <Button
                            variant="contained"
                            className="login-button"
                            onClick={() => setLoginOpen(true)}
                            >                                
                                Login
                            </Button>
                        </Box>
                    ) : (
                        <img
                        className="user-avatar"
                        src={
                          authMember?.memberImage
                            ? `${serverAPI}/${authMember?.memberImage}`
                            : "/icons/default-user.svg"
                        }
                        aria-haspopup={"true"}
                        onClick={handleLogoutClick}
                      />
                      )}
                      <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className="burger"
            onClick={toggleDrawer}
            >
                <MenuIcon />
            </IconButton>
            </Stack>
        </Container>
    </div>
    )
}