import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  IconButton,
  Grid,
  InputAdornment,
  Modal,
} from "@mui/material";
import { useLocation, useNavigate, Link } from "react-router-dom";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./PenjemputanForm.css";
import { toast } from "react-toastify";
import { client } from "../../lib/client";
import Webcam from "react-webcam";
import FotoButton from "./button.png";
import useInput from "../../hooks/use-input";

const isNotEmpty = value => value.trim() !== "";

const PenjemputanForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { address, lat, long } = location.state;
  let urlImage = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+EA4335(${long},${lat})/${long},${lat},14/360x220?access_token=pk.eyJ1IjoiYWxmbm1zIiwiYSI6ImNsYWxrdjIwdzA2dmEzbnBlZDg4MjhseHEifQ.xEaEAB-r-ISe7YIkuvRpaA`;

  const [user, setUser] = useState({});
  const [picture, setPicture] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function handleOpen() {
    setOpen(true);
  }

  async function captureit() {
    capture();
    await sleep(800);
    handleClose();
  }
  const handleClose = () => setOpen(false);
  const videoConstraints = {
    width: 465,
    height: 700,
    facingMode: "environment",
  };
  const webcamRef = React.useRef(null);
  const capture = () => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
    handleClose();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 465,
    boxShadow: 24,
    p: 40,
  };

  const {
    value: beratValue,
    isValid: beratIsValid,
    hasError: beratHasError,
    valueChangeHandler: beratChangeHandler,
    inputBlurHandler: beratBlurHandler,
  } = useInput(isNotEmpty);

  let isFormValid = false;

  if (beratIsValid) {
    isFormValid = true;
  }

  async function getUserData() {
    const { data: userData, status } = await client.get("/api/resource");
    if (status === 200) {
      setUser(userData[0]);
    } else {
      toast.error("Gagal mengambil data pengguna");
    }
    setIsLoading(false);
  }

  async function requestSubmitHandler(event) {
    setIsSubmitting(true);
    event.preventDefault();
    if (!isFormValid || beratValue < 10) {
      setIsSubmitting(false);
      return;
    }

    console.log(picture);
    const { data, status } = await client.postFile(
      "/api/create-request-penjemputan",
      {
        alamat: address,
        latitude: lat,
        longitude: long,
        foto_sampah: document.getElementById('file'),
        berat: beratValue,
        status: "Menunggu Konfirmasi",
      }
    );

    if (status === 201) {
      toast.success("Berhasil Membuat Request");
      setIsSubmitting(true);
      navigate("/request-sucess");
    } else {
      toast.error("Gagal Membuat Request");
      setIsSubmitting(false);
    }
    setIsSubmitting(false);
  }

  useEffect(() => {
    getUserData();
  }, []);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="form-penjemputan-container">
      {!isLoading && (
        <div>
          <div style={{ marginBottom: "30px" }}>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                <ArrowBackIcon
                  style={{ marginTop: "4px" }}
                  onClick={() => navigate(-1)}
                />
              </Grid>
              <Grid item xs={11}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Input Request Penjemputan
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 2, width: "40ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={requestSubmitHandler}
          >
            <Card sx={{ minWidth: 275 }} variant="outlined">
              <CardContent>
                <TextField
                  disabled
                  label="ID Penukar"
                  defaultValue={user.idPengguna}
                  variant="standard"
                  fullWidth
                />
                <TextField
                  disabled
                  label="Nama Penukar"
                  defaultValue={user.nama}
                  variant="standard"
                  fullWidth
                />
                <TextField
                  disabled
                  label="Nomor Telepon Penukar"
                  defaultValue={user.noTelp}
                  variant="standard"
                  fullWidth
                />
                <TextField
                  disabled
                  label="Alamat"
                  variant="standard"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <div>
                        <p>{address}</p>
                        <img src={urlImage} class="unselectable"></img>
                      </div>
                    ),
                  }}
                />
                <TextField
                  label="Berat Limbah"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: { min: 10, max: 100 },
                    endAdornment: (
                      <InputAdornment position="end">kg</InputAdornment>
                    ),
                  }}
                  variant="standard"
                  placeholder="10"
                  value={beratValue}
                  onChange={beratChangeHandler}
                  onBlur={beratBlurHandler}
                  error={beratHasError}
                  helperText={
                    beratHasError && "Berat sampah tidak boleh kosong"
                  }
                  fullWidth
                />
                <TextField
                  disabled
                  label="Foto Sampah"
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <div>
                        {picture === "" ? (
                          <IconButton
                            aria-label="delete"
                            size="large"
                            onClick={handleOpen}
                          >
                            <AddCircleRoundedIcon
                              style={{ color: "#1976D2" }}
                              sx={{ fontSize: "50px" }}
                            />
                          </IconButton>
                        ) : (
                          <img id="file" src={picture} width={120}></img>
                        )}
                      </div>
                    ),
                  }}
                />
              </CardContent>
            </Card>
            <div className="form-penjemputan-button">
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12}>
                  {!isSubmitting && (
                    <Button variant="contained" type="submit">
                      REQUEST PENJEMPUTAN
                    </Button>
                  )}
                  {isSubmitting && (
                    <Button variant="contained">Loading... </Button>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Link to="/">
                    <Button>BATALKAN REQUEST</Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Box>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="foto-container">
            <div className="box">
              {picture == "" ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              ) : (
                <img src={picture} />
              )}
            </div>
            <div className="box stack-top">
              <div onClick={captureit} className="button-foto">
                <img width={80} src={FotoButton}></img>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PenjemputanForm;
