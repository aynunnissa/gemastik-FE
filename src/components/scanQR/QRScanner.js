import { Typography } from "@mui/material";
import React, { useState, useRef, ReactDOM } from "react";
// import QrReader from "react-qr-reader";
import QrReader from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./QRScanner.module.css";

const QRScanner = () => {
  const push = useNavigate();
  const [result, setResult] = useState("No result");

  const handleError = err => {
    console.err(err);
  };

  const handleScan = result => {
    if (result) {
      setResult(result);
      push("/mitra/input-data-penukar");
    }
  };

  const previewStyle = {
    height: 240,
    width: 300,
    maxWidth: "100%",
  };

  return (
    <div className={styles.container}>
      <QrReader
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      <Typography
        component="p"
        color="#FFFFFF"
        variant="subtitle2"
        fontWeight={700}
        textAlign="center"
        sx={{ marginTop: "80px" }}
      >
        Scanning code...
      </Typography>
    </div>
  );
};

export default QRScanner;
