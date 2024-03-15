import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutAdmin from "./components/BarraNavegacion/LayoutAdmin";
import "./App.css";
import { Perfil } from "./components/Perfil/Perfil";
import BarraNavegacion from "./components/BarraNavegacion/Navbar";
import Sidebar from "./components/BarraNavegacion/SideBar";
import Info from "./components/Perfil/Info";
import { Login } from "./components/StructureOpenPage/Login";
import Usuarios from "./components/Usuarios/User";
import DashBoard from "./components/Usuarios/DashBoard";
import Roll from "./components/Usuarios/Roll";
import { Logs } from "./components/Usuarios/Logs";
import Pages from "./components/Usuarios/Pages";
import Register from "./components/StructureOpenPage/Register";


function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register.jsx" element={<Register />} />
          <Route path="/LayoutAdmin" element={<LayoutAdmin />}>
            <Route path="Info" element={<Info />} />
            <Route path="Perfil/:id" element={<Perfil />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="roll" element={<Roll />} />
            <Route path="logs" element={<Logs />} />
            <Route path="pages" element={<Pages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
