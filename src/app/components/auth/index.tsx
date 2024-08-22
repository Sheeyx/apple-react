import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Messages } from "../../../lib/config";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    borderRadius: "10px",
    width: "400px",
    maxWidth: "90%",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  actionButton: {
    marginTop: theme.spacing(3),
    width: "100%",
    fontSize: "16px", // Adjust font size
    padding: theme.spacing(1.5, 0), // Increase padding top/bottom for larger button
    borderRadius: "8px", // Rounded corners
    boxShadow: "none", // Remove default box shadow
    textTransform: "none", // Prevent uppercase text
  },
}));

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberNick(e.target.value);
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberPhone(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberPassword(e.target.value);
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest();
    }
  };

  const handleSignupRequest = async () => {
    try {
      if (!memberNick || !memberPhone || !memberPassword) {
        throw new Error(Messages.error3);
      }

      const signupInput: MemberInput = {
        memberNick,
        memberPhone,
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);
      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.error("Signup Error:", err);
      sweetErrorHandling(err);
      handleSignupClose();
    }
  };

  const handleLoginRequest = async () => {
    try {
      if (!memberNick || !memberPassword) {
        throw new Error(Messages.error3);
      }

      const loginInput: LoginInput = {
        memberNick,
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);
      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.error("Login Error:", err);
      sweetErrorHandling(err);
      handleLoginClose();
    }
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={signupOpen || loginOpen}
        onClose={signupOpen ? handleSignupClose : handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen || loginOpen}>
          <div className={classes.paper}>
            <Stack
              className={classes.formContainer}
              component="form"
              spacing={2}
              onSubmit={signupOpen ? handleSignupRequest : handleLoginRequest}
            >
              <h2 className={classes.formTitle}>
                {signupOpen ? "Signup Form" : "Login Form"}
              </h2>
              <TextField
                className={classes.textField}
                id="outlined-basic-username"
                label="Username"
                variant="outlined"
                onChange={handleUsername}
                required
              />
              {signupOpen && (
                <TextField
                  className={classes.textField}
                  id="outlined-basic-phone"
                  label="Phone Number"
                  variant="outlined"
                  onChange={handlePhone}
                  required
                />
              )}
              <TextField
                className={classes.textField}
                id="outlined-basic-password"
                label="Password"
                variant="outlined"
                type="password"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
                required
              />
              <Fab
                className={classes.actionButton}
                variant="extended"
                color="primary"
                onClick={signupOpen ? handleSignupRequest : handleLoginRequest}
                style={{ width: "300px" }} // Change background color to a beautiful color
                >
                <LoginIcon />
                {signupOpen ? "Signup" : "Login"}
              </Fab>
            </Stack>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
