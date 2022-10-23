import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "../pages/Homepage";
import InputDataPenukar from "../pages/Penukaran/InputDataPenukar";
import ScanQRPenukar from "../pages/Penukaran/ScanQRPenukar";

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
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoute;
