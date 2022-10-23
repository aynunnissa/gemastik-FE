import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "../pages/Homepage";
import HomepagePenabung from "../pages/HomepagePenabung/HomepagePenabung";

const AllRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/penabung" element={<HomepagePenabung />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoute;
