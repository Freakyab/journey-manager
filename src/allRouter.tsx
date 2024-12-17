import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Package from "./components/package";
import Admin from "./components/admin";
const AllRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/package/:id" element={<Package />}>
      </Route>
    </Routes>
  </BrowserRouter>
  );
};

export default AllRouter;
