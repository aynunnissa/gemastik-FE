import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import classes from "./login.module.css";

import useInput from "../../hooks/use-input";
import RegisterImg from "../../images/Auth/register.png";
import { Link } from "react-router-dom";

const isNotEmpty = value => value.trim() !== "";
const isEmail = value => value.includes("@");
const isNumber = value => !Number.isNaN(Number(value));
const isValidPassword = value =>
  value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");

  const handleChangeRole = event => {
    setRole(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const {
    value: fullNameValue,
    isValid: fullNameIsValid,
    hasError: fullNameHasError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
    reset: resetFullName,
  } = useInput(isNotEmpty);

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

  const {
    value: passwordConfirmValue,
    isValid: passwordConfirmIsValid,
    hasError: passwordConfirmHasError,
    valueChangeHandler: passwordConfirmChangeHandler,
    inputBlurHandler: passwordConfirmBlurHandler,
    reset: resetPasswordConfirm,
  } = useInput(isValidPassword);

  let isFormValid = false;
  let passwordEqual = false;

  if (passwordValue === passwordConfirmValue) {
    passwordEqual = true;
  } else {
    passwordEqual = false;
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
            color="white"
            component="h1"
          >
            Daftar Akun
          </Typography>
          <Box textAlign="center">
            <img src={RegisterImg} width="50%" alt="Login page" />
          </Box>
          <Box
            component="form"
            autoComplete="off"
            mt={3}
            //   onSubmit={loginSubmitHandler}
          >
            <Stack rowGap={3}>
              <TextField
                id="full_name"
                label="Nama Lengkap"
                variant="outlined"
                size="small"
                required
                value={fullNameValue}
                onChange={fullNameChangeHandler}
                onBlur={fullNameBlurHandler}
                error={fullNameHasError}
                helperText={
                  fullNameHasError && "Nama lengkap tidak boleh kosong"
                }
              />
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
              <FormControl size="small">
                <InputLabel id="demo-simple-select-helper-label">
                  Peran
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={role}
                  label="Peran"
                  onChange={handleChangeRole}
                >
                  <MenuItem value={1}>Penabung</MenuItem>
                  <MenuItem value={2}>Mitra</MenuItem>\
                </Select>
              </FormControl>
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
                size="small"
                helperText={passwordHasError && "Password tidak boleh kosong"}
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
              <TextField
                id="password-confirm"
                label="Konfirmasi Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                required
                value={passwordConfirmValue}
                onChange={passwordConfirmChangeHandler}
                onBlur={passwordConfirmBlurHandler}
                error={passwordConfirmHasError}
                size="small"
                helperText={
                  passwordConfirmHasError && "Password tidak boleh kosong"
                }
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
                  Daftar
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
              <Typography
                component="p"
                variant="caption"
                textAlign="center"
                mb={4}
              >
                Sudah memiliki akun?{" "}
                <Link to="/auth/login" style={{ color: "#26BAEE" }}>
                  Masuk
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
