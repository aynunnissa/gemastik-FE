import React from "react";
import { Card, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Map.css";

const CardMap = ({ location, latitude, longitude }) => {
  return (
    <div className="card-map-container">
      <Box className="col">
        <Card variant="outlined" className="card-pickup">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Lokasi Pick-Up
          </Typography>
          <p>{location}</p>
          {location === "Pilih Lokasi Pick-Up" && (
            <Button variant="contained" disabled className="button-ajukan">
              Konfirmasi Alamat
            </Button>
          )}
          {location !== "Pilih Lokasi Pick-Up" && (
            <Link
              to="/form-penjemputan"
              state={{ address: location, lat: latitude, long: longitude }}
            >
              <Button variant="contained" className="button-ajukan">
                Konfirmasi Alamat
              </Button>
            </Link>
          )}
        </Card>
      </Box>
    </div>
  );
};

export default CardMap;
