import React from "react";
import { Button, Grid, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Truck from "./Pick up truck-pana 1.png";

const RequestSuccess = () => {
  return (
    <div >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        paddingTop="100px"
        paddingBottom="100px"
      >
        <img src={Truck}></img>
        <Box m={2} pt={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Request Penjemputan
            <br /> Sampah Kain Selesai
          </Typography>
          <Typography variant="caption">
            Berhasil melakukan request penukaran sampah kain
            <br />
            Tunggu konfirmasi lanjutan dari Penjemput.
          </Typography>
        </Box>
        <Grid
          container
          marginTop="10px"
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Link to="/">
              <Button variant="contained" type="submit">
                KEMBALI KE BERANDA
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Link to="/">
              <Button>TRACKING PENJEMPUTAN</Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default RequestSuccess;
