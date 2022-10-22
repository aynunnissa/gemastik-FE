import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "../pages/Homepage";

const AllRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoute;
