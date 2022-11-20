import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import OnBoarding from "../pages/OnBoarding";
import HomepagePenjemput from "../pages/HomepagePenjemput/HomepagePenjemput";
import InputDataPenukar from "../pages/Penukaran/InputDataPenukar";
import ScanQRPenukar from "../pages/Penukaran/ScanQRPenukar";
import Success from "../pages/Penukaran/Success";
import HomepagePenabung from "../pages/HomepagePenabung/HomepagePenabung";
import RequestPenjemputan from "../pages/RequestPenjemputan/RequestPenjemputan";
import PenjemputanForm from "../pages/RequestPenjemputan/PenjemputanForm";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Tracking from "../pages/Penukaran/Tracking";
import History from "../pages/User/History";
import Profile from "../pages/User/Profile";
import { connect } from "react-redux";
import HomepageMitra from "../pages/Homepage Mitra/HomepageMitra";
import RequestSuccess from "../pages/RequestSuccess/RequestSuccess";
import JemputSampah from "../pages/JemputSampah/JemputSampah";
import PersebaranMitra from "../pages/PersebaranMitra";
import PersebaranPenabung from "../pages/PersebaranPenabung";

const AllRoute = ({ auth }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          auth.role === "Penabung" ? (
            <HomepagePenabung />
          ) : auth.role === "Mitra" ? (
            <HomepageMitra />
          ) : (
            <HomepagePenjemput />
          )
        }
      />

      {/* Authentication */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      <Route path="/on-boarding" element={<OnBoarding />} />
      <Route path="/penukaran/tracking" element={<Tracking />} />

      <Route path="/persebaran/mitra" element={<PersebaranMitra />} />
      <Route path="/persebaran/penabung" element={<PersebaranPenabung />} />

      <Route path="/mitra/scan-qr-penukar" element={<ScanQRPenukar />} />
      <Route
        path="/mitra/input-data-penukar/:idPengguna"
        element={<InputDataPenukar />}
      />
      <Route path="/mitra/penukaran-berhasil" element={<Success />} />
      <Route path="/request-penjemputan" element={<RequestPenjemputan />} />
      <Route path="/form-penjemputan" element={<PenjemputanForm />} />
      <Route path="/user/history" element={<History />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/request-sucess" element={<RequestSuccess />} />
      <Route path="/jemput-sampah/:idRequest" element={<JemputSampah />} />
      <Route path="/penjemput/riwayat" element={<JemputSampah />} />
    </Routes>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(AllRoute);
