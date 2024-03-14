import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutAdmin from "./components/BarraNavegacion/LayoutAdmin";
import "./App.css";
import { Structure } from "./components/StructureOpenPage/Structure";
import { Perfil } from "./components/Perfil/Perfil";
import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import Sidebar from "./components/BarraNavegacion/SideBar";
import Info from "./components/Perfil/Info";
import { Login } from "./components/StructureOpenPage/Login";
import Usuarios from "./components/Usuarios/Usuarios";
import DashBoard from "./components/Usuarios/DashBoard";

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Structure.jsx" element={<Structure />} />
          <Route path="/LayoutAdmin" element={<LayoutAdmin />}>
            <Route path="Info" element={<Info />} />
            <Route path="Perfil/:id" element={<Perfil />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="dashboard" element={<DashBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
