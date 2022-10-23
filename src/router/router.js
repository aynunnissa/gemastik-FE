import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "../pages/Homepage";
import HomepagePenjemput from "../pages/HomepagePenjemput/HomepagePenjemput";
import InputDataPenukar from "../pages/Penukaran/InputDataPenukar";
import ScanQRPenukar from "../pages/Penukaran/ScanQRPenukar";
import Success from "../pages/Penukaran/Success";
import HomepagePenabung from "../pages/HomepagePenabung/HomepagePenabung";

const AllRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/penjemput" element={<HomepagePenjemput />} />
        <Route path="/mitra/scan-qr-penukar" element={<ScanQRPenukar />} />
        <Route
          path="/mitra/input-data-penukar"
          element={<InputDataPenukar />}
        />
        <Route path="/mitra/penukaran-berhasil" element={<Success />} />
        <Route path="/penabung" element={<HomepagePenabung />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoute;
