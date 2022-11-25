import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import TopNav from "./components/TopNav";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <TopNav />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
