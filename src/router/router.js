import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import OnBoarding from "../pages/OnBoarding";
import HomepagePenjemput from "../pages/HomepagePenjemput/HomepagePenjemput";
import InputDataPenukar from "../pages/Penukaran/InputDataPenukar";
import ScanQRPenukar from "../pages/Penukaran/ScanQRPenukar";
import Success from "../pages/Penukaran/Success";
import HomepagePenabung from "../pages/HomepagePenabung/HomepagePenabung";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Tracking from "../pages/Penukaran/Tracking";
import History from "../pages/User/History";
import Profile from "../pages/User/Profile";
import { connect } from "react-redux";
import HomepageMitra from "../pages/Homepage Mitra/HomepageMitra";

const AllRoute = ({ auth }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          auth.role === "Penabung" ? (
            <HomepagePenabung />
          ) : (
            auth.role === "Mitra" && <HomepageMitra />
          )
        }
      />

      {/* Authentication */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      <Route path="/on-boarding" element={<OnBoarding />} />
      <Route path="/penukaran/tracking" element={<Tracking />} />

      <Route path="/penjemput" element={<HomepagePenjemput />} />
      <Route path="/mitra/scan-qr-penukar" element={<ScanQRPenukar />} />
      <Route
        path="/mitra/input-data-penukar/:idPengguna"
        element={<InputDataPenukar />}
      />
      <Route path="/mitra/penukaran-berhasil" element={<Success />} />

      <Route path="/user/history" element={<History />} />
      <Route path="/user/profile" element={<Profile />} />
      {/* <Route path="/penabung" element={<HomepagePenabung />} /> */}
    </Routes>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(AllRoute);
