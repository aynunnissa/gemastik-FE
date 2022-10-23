import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "../pages/Homepage";
import HomepagePenjemput from "../pages/HomepagePenjemput/HomepagePenjemput";

const AllRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/penjemput" element={<HomepagePenjemput />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoute;
