import { useState } from "react";
import { connect } from "react-redux";
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
import { client } from "../../lib/client";
import { login } from "../../store/actions/action";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const isNotEmpty = value => value.trim() !== "";
const isNumber = value => !Number.isNaN(Number(value));

const Login = ({ login }) => {
  const push = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput(isNumber);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);

  let isFormValid = false;

  if (passwordIsValid && phoneIsValid) {
    isFormValid = true;
  }

  async function loginSubmitHandler(event) {
    event.preventDefault();

    setIsSubmitting(true);

    if (!isFormValid) {
      setIsSubmitting(false);
      return;
    }

    const { data, status } = await client.post("/api/token", {
      no_telp: phoneValue,
      password: passwordValue,
    });
    if (status === 200) {
      toast.success("Login berhasil");
      const user = {
        token: data.access,
      };
      login(user);
      push("/");
    } else {
      console.log("MASUK");
      toast.error("Gagal Login");
    }
    setIsSubmitting(false);
  }

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
            component="h1"
            sx={{ color: "white" }}
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
            onSubmit={loginSubmitHandler}
          >
            <Stack rowGap={3}>
              <TextField
                id="phone"
                label="No Telepon"
                variant="outlined"
                required
                size="small"
                value={phoneValue}
                onChange={phoneChangeHandler}
                onBlur={phoneBlurHandler}
                error={phoneHasError}
                helperText={
                  phoneHasError &&
                  "No. HP tidak boleh kosong dan harus berupa angka"
                }
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
                <Button variant="contained" type="submit">
                  Login
                </Button>
              )}
              {isSubmitting && (
                <Button disabled variant="contained" sx={{ color: "white" }}>
                  Loading...
                </Button>
              )}
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

export default connect(null, { login })(Login);
