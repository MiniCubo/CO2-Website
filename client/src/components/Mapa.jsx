import React, { useEffect, useState, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Style, Fill, Stroke, Text} from 'ol/style';
import { GeoJSON } from 'ol/format';
import { fromLonLat} from 'ol/proj';
import instance from "../api/axios";
import Overlay from 'ol/Overlay';
import { Popover } from 'bootstrap';
import {getCenter} from 'ol/extent';
import { useNavigate } from "react-router-dom";

function Mapa() {
  const [datos, setDatos] = useState([]);
  // var year = 1980;
  const [year, setYear] = useState(Number(1980));
  const [geojsonData, setGeojsonData] = useState(null);
  const co2Emmisions = 4.6;
  const navigate = useNavigate(); // Hook para redirigir.

  useEffect(()=>{
    instance.get("/geojson").then((response)=>{
      setGeojsonData(response.data);
    });

    instance.get("/datos").then((response)=>{
      setDatos(response.data.datos);
    }).catch((error)=>{
      console.error("Full Error Object:", error.toJSON ? error.toJSON() : error);
      navigate("/Error");
    });
  }, []);

  const popupRef = useRef(null);
  var map = null

  useEffect(() => {
    if (!geojsonData || !datos) return;
    var info = datos.find((dato) => Number(dato.Año) === year);
    if(!info) info = datos[0];
    if (!popupRef.current) {
      popupRef.current = document.createElement("div");
      popupRef.current.id = "popup";
      document.body.appendChild(popupRef.current); 
    }
    try{
      const map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: new VectorSource({
              features: new GeoJSON().readFeatures(geojsonData, {
                featureProjection: "EPSG:3857",
              }),
            }),
            style: function (feature) {
              const properties = feature.getProperties();
      
              // Dynamic color logic for polygons
              const color = info[properties.name] > info.Total * 0.03
                ? "rgba(255,0,0,0.4)"
                : "rgba(0,255,0,0.4)";
      
              // Return a combined style with a circle for each feature
              return new Style({
                fill: new Fill({
                  color: color,
                }),
                stroke: new Stroke({
                  color: "rgba(0, 0, 139, 0.7)",
                  width: 1.5,
                }),
                text: new Text({
                  font: "20px Calibri,sans-serif",
                  fill: new Fill({
                    color: "#000",
                  }),
                  stroke: new Stroke({
                    color: "#fff",
                    width: 2,
                  }),
                  text: properties.name + "\nClick on Me" || "Click on Me",
                }),
              });
            },
          }),
        ],
        view: new View({
          center: fromLonLat([-102.5528, 23.6345]),
          zoom: 5,
        }),
      });

      const popup = new Overlay({
        element: popupRef.current, // Attach popup to the map
      });
      map.addOverlay(popup);
  
      map.on("click", (evt) => {
        const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
  
        if (feature) {
          const properties = feature.getProperties();
          const name = properties.name || "";
          const coordinate = evt.coordinate;
  
          popup.setPosition(coordinate);
  
          let popover = Popover.getInstance(popupRef.current);
          if (popover) {
            popover.dispose();
          }
  
          popover = new Popover(popupRef.current, {
            animation: true,
            container: popupRef.current,
            content: `<p>You clicked on:</p><strong>${name}</strong><br/><p>In the year ${year} it had: ${info[name].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vehicles registered</p><br/><p>Generating ${Math.round(co2Emmisions*info[name]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} tons of CO2 in that year.</p>`,
            html: true,
            placement: "top",
            title: "State Vehicles data",
          });
          popover.show();
        } else {
          let popover = Popover.getInstance(popupRef.current);
          if (popover) {
            popover.dispose();
          }
        }
      });
  
      return () => {
        map.setTarget(null);
        if (popupRef.current) {
          popupRef.current = null;
        }
      };
    }
    catch(error){
      console.error("Full Error Object:", error.toJSON ? error.toJSON() : error);
      navigate("/Error");
    }
  }, [geojsonData, year, datos]);

  const years = Array.from({ length: 2023 - 1980 + 1 }, (_, i) => 1980 + i);

  function yearSet(e){
    // year = Number(e.target.value);
    setYear(Number(e.target.value));
  }

  function centerState(e){
    const selectedState = e.target.value;
    const layers = map.getLayers().getArray();
    const vector = layers.find(layer => layer instanceof VectorLayer);
    const feature = vector.getSource().getFeatures().find((f) => {
      return f.get('name') === selectedState; 
    });
    if (feature) {
      const geometry = feature.getGeometry();
      const extent = geometry.getExtent();
      const center = getCenter(extent);
  
      map.getView().setCenter(center);
      map.getView().setZoom(6); 
  
  }
}
  return (
    <div style={{justifyContent:'center', display:'flex', flexDirection:"column", alignItems:"center"}}>
      <div style={{width:"70%"}}>
        <select name="year" id="year" style={{width: '50%'}} onChange={yearSet}>
        {years.map((year) => (
            <option key={year} value={year} style={{textAlign:"center"}}>
              {year}
            </option>
          ))}
          </select>
          <select name="state" id="state" style={{width: '50%', textAlign:"center"}} onChange={centerState}>
          <option value="Aguascalientes">Aguascalientes</option>
              <option value="Baja California">Baja California</option>
              <option value="Baja California Sur">Baja California Sur</option>
              <option value="Campeche">Campeche</option>
              <option value="Coahuila">Coahuila de Zaragoza</option>
              <option value="Colima">Coahuila</option>
              <option value="Chiapas">Chiapas</option>
              <option value="Chihuahua">Chihuahua</option>
              <option value="Ciudad de México">Cuidad de Mexico</option>
              <option value="Durango">Durango</option>
              <option value="Guanajuato">Guanajuato</option>
              <option value="Guerrero">Guerrero</option>
              <option value="Hidalgo">Hidalgo</option>
              <option value="Jalisco">Jalisco</option>
              <option value="México">Estado de Mexico</option>
              <option value="Michoacán">Michoacan</option>
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
              <option value="Veracruz">Veracruz</option>
              <option value="Yucatán">Yucatan</option>
              <option value="Zacatecas">Zacatecas</option>
          </select>
      </div>
      
        <div id="map"  style={{ width: '70%', height: '500px'}}/>
        <div id="popup"></div>
    </div>
    
  );
}

export default Mapa;
