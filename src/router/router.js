import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "../pages/Homepage";
import InputDataPenukar from "../pages/Penukaran/InputDataPenukar";
import ScanQRPenukar from "../pages/Penukaran/ScanQRPenukar";
import Success from "../pages/Penukaran/Success";

const AllRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/mitra/scan-qr-penukar" element={<ScanQRPenukar />} />
        <Route
          path="/mitra/input-data-penukar"
          element={<InputDataPenukar />}
        />
        <Route path="/mitra/penukaran-berhasil" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoute;
