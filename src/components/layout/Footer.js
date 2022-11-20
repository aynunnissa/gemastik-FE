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
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  menu: {
    minWidth: 0,
    padding: 0,
    "& .Mui-selected, & .MuiBottomNavigationAction-label": {
      fontSize: "10px",
      marginTop: "5px",
    },
  },
}));

const Footer = ({ logout, auth }) => {
  const [value, setValue] = React.useState(0);
  const push = useNavigate();
  const classes = useStyles();

  return (
    <Paper
      elevation={3}
      sx={{ borderRadius: "10px 10px 0px 0px", padding: "0.3rem 0rem" }}
    >
      <BottomNavigation
        sx={{ position: "relative", borderRadius: "10px 10px 0px 0px" }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          className={classes.menu}
          sx={{ fontSize: "10px !important" }}
          label="Beranda"
          icon={<HomeIcon />}
          onClick={() => {
            push("/");
          }}
        />
        <BottomNavigationAction
          className={classes.menu}
          sx={{ fontSize: "10px !important" }}
          label="Riwayat"
          icon={<LibraryBooksIcon />}
          onClick={() => {
            push("/user/history");
          }}
        />
        <BottomNavigationAction
          className={classes.menu}
          label="Riwayat"
          icon={<LibraryBooksIcon />}
          sx={{ opacity: 0, backgroundColor: "red", fontSize: "10px" }}
          onClick={() => {
            push("/user/history");
          }}
        />
        <Box
          position="absolute"
          display="flex"
          onClick={() => {
            setValue(null);
            if (auth.role === "Mitra") {
              push("/mitra/scan-qr-penukar");
            } else if (auth.role === "Penabung") {
              push("/user/profile");
            }
          }}
          sx={{
            backgroundColor: "#1976D2",
            top: "-50%",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "10px !important",
          }}
          p={3}
        >
          <QrCodeScannerIcon sx={{ color: "white" }} fontSize="medium" />
        </Box>
        <BottomNavigationAction
          className={classes.menu}
          label="Akun"
          onClick={() => {
            push("/user/profile");
          }}
          icon={<AccountCircleIcon />}
          sx={{ fontSize: "10px !important" }}
        />
        <BottomNavigationAction
          className={classes.menu}
          sx={{ fontSize: "10px !important" }}
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

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logout })(Footer);
