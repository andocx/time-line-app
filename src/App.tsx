import { Routes, Route } from "react-router";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import CardDisplay from "./pages/CardDisplay";
import Closure from "./pages/Closure";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="card/:id" element={<CardDisplay />} />
        <Route path="closure" element={<Closure />} /> {/* New route for Closure */}
      </Route>
    </Routes>
  );
};

export default App;