import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cotizador from "./components/Cotizador";
import Historial from "./components/Historial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta cotizador principal */}
        <Route path="/" element={<Cotizador />} />

        {/* Ruta historial */}
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
