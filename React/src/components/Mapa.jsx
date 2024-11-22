import React, { useEffect, useState } from 'react';
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
import Overlay from 'ol/Overlay.js';
import { Popover } from 'bootstrap';
import {getCenter} from 'ol/extent';

function Mapa() {
  const [datos, setDatos] = useState([]);
  var year = 1980;
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(()=>{
    instance.get("/geojson").then((response)=>{
      setGeojsonData(response.data);
    });

    instance.get("/datos").then((response)=>{
      setDatos(response.data.datos);
    }).catch((error)=>{
      console.error("Full Error Object:", error.toJSON ? error.toJSON() : error);
    });
  }, []);

  var map = null;

  useEffect(() => {
    if (!geojsonData) return;
    // Crear el mapa
    map = new Map({
      target: 'map', // Elemento donde se renderiza el mapa
      layers: [
        new TileLayer({
          source: new OSM(), // Capa de OpenStreetMap
        }),
        new VectorLayer({
          source: new VectorSource({
            // url: '/datos/mexicoHigh.json', // Ruta al archivo GeoJSON de estados de México
            // format: new GeoJSON(),
            features: new GeoJSON().readFeatures(geojsonData, {
              featureProjection:'EPSG:3857',
            })
          }),
          style: function (feature) {
            const properties = feature.getProperties(); // Access feature properties
            return new Style({
              fill: new Fill({
                color: 'rgba(100, 150, 237, 0.4)', // Light blue fill
              }),
              stroke: new Stroke({
                color: 'rgba(0, 0, 139, 0.7)', // Dark blue stroke
                width: 1.5,
              }),
              text: new Text({
                font: '12px Calibri,sans-serif',
                fill: new Fill({
                  color: '#000', // Black text color
                }),
                stroke: new Stroke({
                  color: '#fff', // White outline
                  width: 2,
                }),
                text: properties.name || '', // Use the 'name' property for the label
              }),
            });
          },
          renderBuffer: 1000,
        }),
      ],
      view: new View({
        center: fromLonLat([-102.5528, 23.6345]), // Coordenadas de México
        zoom: 5,
      }),
    });

    const popup = new Overlay({
      element: document.getElementById('popup'),
    });
    map.addOverlay(popup);
    const element = popup.getElement();    

    map.on('click', function (evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);

  if (feature) {
    try {
      // Get properties of the clicked feature
      const properties = feature.getProperties();

      // Example: Displaying a property like `name` (if exists in your GeoJSON)
      const name = properties.name || 'Unknown Feature';

      // Get the clicked coordinate
      const coordinate = evt.coordinate;

      // Position the popup at the clicked location
      popup.setPosition(coordinate);

      // Re-initialize the popover each time
      const info = datos.find((dato) => {
        return Number(dato.Año) === year;
      });

      let popover = Popover.getInstance(element);
      if (popover) {
        popover.dispose();
      }

      popover = new Popover(element, {
        animation: false,
        container: element,
        content: `<p>You clicked on:</p><strong>${name}</strong><br/><p>${info[name]}</p>`,
        html: true,
        placement: 'top',
        title: 'Feature Information',
      });
      popover.show();

    } catch (error) {
      console.error(error);
    }
            

  } else {
    // Hide the popup if no feature is clicked
    let popover = Popover.getInstance(element);
    if (popover) {
    }
  }
});



    // Asegurarse de que el mapa se limpia correctamente al desmontarse el componente
    return () => {
      map.setTarget(null);
    };
  }, [geojsonData]);

  const years = Array.from({ length: 2023 - 1980 + 1 }, (_, i) => 1980 + i);

  function yearSet(e){
    year = Number(e.target.value);
  }

  function centerState(e){
    const selectedState = e.target.value;
    const layers = map.getLayers().getArray();
    const vector = layers.find(layer => layer instanceof VectorLayer);
    const feature = vector.getSource().getFeatures().find((f) => {
      return f.get('name') === selectedState; // Match based on the 'name' property
    });
    if (feature) {
      // Get the geometry and center the map
      const geometry = feature.getGeometry();
      const extent = geometry.getExtent();
      const center = getCenter(extent);
  
      map.getView().setCenter(center);
      map.getView().setZoom(7); // Adjust zoom level as needed
  
  }
}

function divRender(){
  return(
    <div id="popup"></div>
  );
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
        {divRender()}
    </div>
    
  );
}

export default Mapa;
