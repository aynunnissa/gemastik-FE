import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "../pages/Homepage";
import HomepagePenjemput from "../pages/HomepagePenjemput/HomepagePenjemput";
import InputDataPenukar from "../pages/Penukaran/InputDataPenukar";

const AllRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/penjemput" element={<HomepagePenjemput />} />
        <Route
          path="/penukaran/input-data-penukar"
          element={<InputDataPenukar />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoute;
