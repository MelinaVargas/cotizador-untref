import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function Cotizador() {
  const [data, setData] = useState({
    propiedad: 0,
    ubicacion: 0,
    metros2: 20,
    costoM2: 35.86,
    poliza: 0,
    factorPropiedad: 1, // Factor por defecto
    factorUbicacion: 1, // Factor por defecto
  });

  useEffect(() => {
    fetch("/public/datos.json")
      .then((response) => response.json())
      .then((jsonData) => {
        const propiedades = jsonData.filter(
          (item) => item.categoria === "propiedad"
        );
        const ubicaciones = jsonData.filter(
          (item) => item.categoria === "ubicacion"
        );

        setData({
          ...data,
          propiedades,
          ubicaciones,
        });
      });
  }, []);

  const cotizarPoliza = () => {
    const poliza =
      data.costoM2 * data.factorPropiedad * data.factorUbicacion * data.metros2;
    setData({ ...data, poliza: poliza });
  };

  return (
    <>
      <div className="historial">
        <a href="historial.html">
          <span title="Ver Historial">📋</span>
        </a>
      </div>
      <h1 className="center separador">Seguros del hogar 🏡</h1>
      <div className="center div-cotizador">
        <h2 className="center separador">Completa los datos solicitados</h2>
        <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
        <select defaultValue="" id="propiedad">
          <option disabled>...</option>
        </select>
        <label htmlFor="ubicacion">Selecciona su ubicación</label>
        <select defaultValue="" id="ubicacion">
          <option disabled>...</option>
        </select>
        <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
        <input
          type="number"
          value={data.metros2}
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
            Precio estimado: $
            <span id="valorPoliza">{data.poliza.toFixed(2)}</span>
            <span className="guardar ocultar" title="Guardar en historial">
              💾
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
