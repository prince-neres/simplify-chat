import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Chat from "../pages/Chat";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat/:username" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
