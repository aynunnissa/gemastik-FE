import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Akun from "./Akun.svg";
import Beranda from "./Beranda.svg";
import Barcode from "./Barcode.svg";
import Riwayat from "./Riwayat.svg";
import Logout from "./Logout.svg";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { connect } from "react-redux";
import { logout } from "../../store/actions/action";

const Footer = ({ logout }) => {
  const [value, setValue] = React.useState(0);
  const push = useNavigate();
  return (
    <Paper elevation={3} sx={{ borderRadius: "10px 10px 0px 0px" }}>
      <BottomNavigation
        sx={{ position: "relative", borderRadius: "10px 10px 0px 0px" }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Beranda"
          icon={<HomeIcon />}
          onClick={() => {
            push("/");
          }}
        />
        <BottomNavigationAction
          label="Riwayat"
          icon={<LibraryBooksIcon />}
          onClick={() => {
            push("/user/history");
          }}
        />
        <BottomNavigationAction
          label="Riwayat"
          icon={<LibraryBooksIcon />}
          sx={{ opacity: 0, backgroundColor: "red" }}
          onClick={() => {
            push("/user/history");
          }}
        />
        <Box
          position="absolute"
          display="flex"
          onClick={() => {
            setValue(null);
            push("/mitra/scan-qr-penukar");
          }}
          sx={{
            backgroundColor: "#1976D2",
            top: "-50%",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          p={3}
        >
          <QrCodeScannerIcon sx={{ color: "white" }} fontSize="large" />
        </Box>
        <BottomNavigationAction
          label="Akun"
          onClick={() => {
            push("/user/profile");
          }}
          icon={<AccountCircleIcon />}
        />
        <BottomNavigationAction
          label="Logout"
          icon={<LogoutIcon />}
          onClick={() => {
            logout();
            push("/auth/login");
          }}
        />
        {/* <Link to="">
                <img src={Beranda} alt="Daftarkan-toko" className="investor-card-menu" />
            </Link>
            <Link to="">
                <img src={Riwayat} alt="Daftarkan-toko" className="investor-card-menu" />
            </Link>
            <Link to="">
                <img src={Barcode} alt="Daftarkan-toko" className="investor-card-menu" />
            </Link>
            <Link to="">
                <img src={Akun} alt="Daftarkan-toko" className="investor-card-menu" />
            </Link>
            <Link to="">
                <img src={Logout} alt="Daftarkan-toko" className="investor-card-menu" />
            </Link> */}
      </BottomNavigation>
    </Paper>
  );
};

export default connect(null, { logout })(Footer);
