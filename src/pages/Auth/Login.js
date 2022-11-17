import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import classes from "./login.module.css";

import useInput from "../../hooks/use-input";
import LoginImg from "../../images/Auth/login.png";
import { Link } from "react-router-dom";

const isNotEmpty = value => value.trim() !== "";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isNotEmpty);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);

  let isFormValid = false;

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <Box component="main" className="gradient-bg" pt={3}>
      <Grid container justifyContent="center">
        <Grid item xs={11} sm={10}>
          <Typography
            variant="h4"
            fontWeight={500}
            color="white"
            component="h1"
          >
            Masuk{" "}
          </Typography>
          <Box textAlign="center">
            <img src={LoginImg} width="50%" alt="Login page" />
          </Box>
          <Box
            component="form"
            autoComplete="off"
            mt={3}
            //   onSubmit={loginSubmitHandler}
          >
            <Stack rowGap={3}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                required
                value={emailValue}
                autoComplete="chrome-off"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                error={emailHasError}
                helperText={emailHasError && "Email tidak boleh kosong"}
                size="small"
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                required
                value={passwordValue}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                error={passwordHasError}
                helperText={passwordHasError && "Password tidak boleh kosong"}
                size="small"
                autoComplete="off"
                aria-autocomplete="none"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  classes: {
                    adornedEnd: classes.adornedEnd,
                  },
                }}
              />
              {!isSubmitting && (
                <Button
                  variant="contained"
                  type="submit"
                  // sx={{ backgroundColor: `${theme.palette.primary.dark}` }}
                >
                  Login
                </Button>
              )}
              {/* {isSubmitting && (
                <LoadingButton
                  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                >
                  Memproses
                </LoadingButton>
              )} */}
              <Typography component="p" variant="caption" textAlign="center">
                Belum memiliki akun?{" "}
                <Link to="/auth/register" style={{ color: "#26BAEE" }}>
                  Daftar
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
