import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import datos from "../components/datos.json";

export default function Cotizador() {
  const [data, setData] = useState({
    fechaCotizacion: "",
    propiedad: "",
    factorPropiedad: 0,
    ubicacion: "",
    factorUbicacion: 0.0,
    metros2: 0.0,
    costoM2: 35.86,
    poliza: "0.00",
  });

  const [historial, setHistorial] = useState(
    JSON.parse(localStorage.getItem("historialCotizaciones")) || []
  );

  const [propiedades, setPropiedades] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);

  const cotizarPoliza = () => {
    const poliza = (
      data.factorPropiedad *
      data.factorUbicacion *
      data.metros2 *
      data.costoM2
    ).toFixed(2);
    const cotizacion = {
      ...data,
      poliza: poliza,
      fechaCotizacion: new Date().toLocaleString(),
    };
    setData(cotizacion);
    guardarHistorial(cotizacion);
  };

  const setFactorPropiedad = (e) => {
    setData({
      ...data,
      factorPropiedad: e.target.value,
      propiedad: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text,
    });
  };

  const setFactorUbicacion = (e) => {
    setData({
      ...data,
      factorUbicacion: e.target.value,
      ubicacion: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text,
    });
  };

  const setFactorMt2 = (e) => {
    setData({ ...data, metros2: e.target.value });
  };

  const guardarHistorial = (cotizacion) => {
    const nuevoHistorial = [...historial, cotizacion];
    setHistorial(nuevoHistorial);
    localStorage.setItem(
      "historialCotizaciones",
      JSON.stringify(nuevoHistorial)
    );
  };

  useEffect(() => {
    // Filtra los datos de propiedades y ubicaciones a partir del archivo JSON
    const propiedadesFiltradas = datos.filter(
      (item) => item.categoria === "propiedad"
    );
    const ubicacionesFiltradas = datos.filter(
      (item) => item.categoria === "ubicacion"
    );

    // Actualiza el estado con los datos filtrados
    setPropiedades(propiedadesFiltradas);
    setUbicaciones(ubicacionesFiltradas);

    console.log("Propiedades:", propiedadesFiltradas);
    console.log("Ubicaciones:", ubicacionesFiltradas);
  }, []);

  return (
    <div>
      <div className="historial">
        <a href="Historial">
          <span title="Ver Historial">📋</span>
        </a>
      </div>
      <h1 className="center separador">Seguros del hogar 🏡</h1>
      <div className=" center div-cotizador">
        <h2 className="center separador">Completa los datos solicitados</h2>
        <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
        <select defaultValue="" id="propiedad" onChange={setFactorPropiedad}>
          <option value="" disabled>
            {" "}
            ...{" "}
          </option>
          {propiedades.map(({ factor, tipo }, id) => (
            <option key={id} value={factor}>
              {tipo}
            </option>
          ))}
        </select>

        <label htmlFor="ubicacion">Selecciona su ubicación</label>
        <select defaultValue="" id="ubicacion" onChange={setFactorUbicacion}>
          <option value="" disabled>
            {" "}
            ...{" "}
          </option>
          {ubicaciones.map(({ factor, tipo }, id) => (
            <option key={id} value={factor}>
              {tipo}
            </option>
          ))}
        </select>
        <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
        <input
          onChange={setFactorMt2}
          type="number"
          id="metros2"
          min="20"
          max="500"
          required
        />

        <div className="center separador">
          <button onClick={cotizarPoliza} className="button button-outline">
            Cotizar
          </button>
        </div>
        <div className="center separador">
          <p className="importe">
            Precio estimado: $<span id="valorPoliza">{data.poliza}</span>
            {data.poliza > 0 && (
              <span className="guardar" title="Guardar en historial">
                💾
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
