import React from "react"
import Grafico1 from "./Grafico1";

function RealTime(){
  return (
    <div>
      <div className="justify-content-center text-center">
        <p className=" m-2"><b>Cars in México</b> by Year</p>
        <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:'80%', height:'400px'}}>
            <Grafico1 />
        </div>
      </div>
    </div>
  );
}

export default RealTime;