import React, {useState} from "react"
import Grafico1 from "./Grafico1";
import datos from "../datos/datos.js";
import Grafico2 from "./Grafico2.jsx";

function RealTime(){
  const listaDeAñosYTotales = datos.map(item => ({
    año: item.Año,
    total: item.Total
  }));

  const [estado, setEstado]=useState("Aguascalientes");
  const listaDeEstadoYTotal = datos.map(item => ({
    año: item.Año,
    total: item[estado]
  }));
  console.log(listaDeAñosYTotales);

  return (
    <div>
      <div className="justify-content-center text-center">
        <p className=" m-2"><b>Cars in México</b> by Year </p>
        <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:'80%', height:'400px'}}>
            <Grafico1 data={listaDeAñosYTotales}/>
        </div>
        <p className=" m-2"><b>Cars in {estado}</b> by Year</p>
        <form onChange={(e) => setEstado(e.target.value)}>
          <select name="nation" id="nation">
              <option value="Aguascalientes">Aguascalientes</option>
              <option value="Baja California">Baja California</option>
              <option value="Baja California Sur">Baja California Sur</option>
              <option value="Campeche">Campeche</option>
              <option value="Coahuila de Zaragoza">Coahuila</option>
              <option value="Colima">Coahuila</option>
              <option value="Chiapas">Chiapas</option>
              <option value="Chihuahua">Chihuahua</option>
              <option value="Ciudad de México">Cuidad de Mexico</option>
              <option value="Durango">Durango</option>
              <option value="Guanajuato">Guanajuato</option>
              <option value="Guerrero">Guerrero</option>
              <option value="Hidalgo">Hidalgo</option>
              <option value="Jalisco">Jalisco</option>
              <option value="Mexico">Estado de Mexico</option>
              <option value="Michoacán de Ocampo">Michoacan</option>
              <option value="Morelos">Morelos</option>
              <option value="Nayarit">Nayarit</option>
              <option value="Nuevo León">Nuevo Leon</option>
              <option value="Oaxaca">Oaxaca</option>
              <option value="Puebla">Puebla</option>
              <option value="Querétaro">Queretaro</option>
              <option value="Quintana Roo">Quintana Roo</option>
              <option value="San Luis Potosí">San Luis Potosi</option>
              <option value="Sinaloa">Sinaloa</option>
              <option value="Sonora">Sonora</option>
              <option value="Tabasco">Tabasco</option>
              <option value="Tamaulipas">Tamaulipas</option>
              <option value="Tlaxcala">Tlaxcala</option>
              <option value="Veracruz de Ignacio de la Llave">Veracruz</option>
              <option value="Yucatán">Yucatan</option>
              <option value="Zacatecas">Zacatecas</option>
          </select>
        </form>
        <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:'80%', height:'400px'}}>
            <Grafico2 data={listaDeEstadoYTotal}/>
        </div>
      </div>
    </div>
  );
}

export default RealTime;