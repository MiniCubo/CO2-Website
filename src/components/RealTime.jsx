import React, {useState} from "react"
import Grafico1 from "./Grafico1";
import datos from "../datos/datos.js";

function RealTime(){
  const listaDeAñosYTotales = datos.map(item => ({
    año: item.Año,
    total: item.Total
  }));

  console.log(listaDeAñosYTotales);
  return (
    <div>
      <div className="justify-content-center text-center">
        <p className=" m-2"><b>Cars in México</b> by Year (expressed in Millions)</p>
        <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:'80%', height:'400px'}}>
            <Grafico1 data={listaDeAñosYTotales}/>
        </div>
      </div>
    </div>
  );
}

export default RealTime;