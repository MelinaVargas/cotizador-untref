import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function Historial() {
  const [historialCotizaciones, sethistorialCotizaciones] = useState(
    JSON.parse(localStorage.getItem("historialCotizaciones")) || []
  );

  const borrarLocal = () => {
    localStorage.removeItem("historialCotizaciones");
  };

  return (
    <div>
      <h1 className="center separador">Ver Historial 📋</h1>
      <div className=" center div-cotizador">
        <table>
          <thead>
            <tr>
              <th>Fecha de cotización</th>
              <th>Propiedad</th>
              <th>Ubicación</th>
              <th>Metros cuadrados</th>
              <th>Póliza mensual</th>
            </tr>
          </thead>
          <tbody>
            {historialCotizaciones &&
              historialCotizaciones.length > 0 &&
              historialCotizaciones.map((cotizacion, id) => (
                <tr key={id}>
                  <td>{cotizacion.fechaCotizacion}</td>
                  <td>{cotizacion.propiedad}</td>
                  <td>{cotizacion.ubicacion}</td>
                  <td>{cotizacion.metros2}</td>
                  <td>{cotizacion.poliza}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="center separador">
          <a href="/">
            <button className="button button-outline">VOLVER</button>
          </a>
        </div>
        <div>
          <button onClick={borrarLocal}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

//   return (
//     <>
//       <h1 className="center separador">Ver Historial 📋</h1>
//       <div className=" center div-cotizador">
//         <table>
//           <thead>
//             <tr>
//               <th>Fecha de cotización</th>
//               <th>Propiedad</th>
//               <th>Ubicación</th>
//               <th>Metros cuadrados</th>
//               <th>Póliza mensual</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Aquí</td>
//               <td>verás</td>
//               <td>las</td>
//               <td>cotizaciones</td>
//               <td>realizadas</td>
//             </tr>
//           </tbody>
//         </table>
//         <div className="center separador">
//           <a href="index.html">
//             <button className="button button-outline">VOLVER</button>
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }
