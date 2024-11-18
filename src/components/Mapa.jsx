import React, { useEffect } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Style, Fill, Stroke } from 'ol/style';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';

function Mapa() {
  useEffect(() => {
    // Crear el mapa
    const map = new Map({
      target: 'map', // Elemento donde se renderiza el mapa
      layers: [
        new TileLayer({
          source: new OSM(), // Capa de OpenStreetMap
        }),
        new VectorLayer({
          source: new VectorSource({
            url: 'https://raw.githubusercontent.com/PhantomJS/geojson-mexico/master/mexico-states.geojson', // Ruta al archivo GeoJSON de estados de México
            format: new GeoJSON(),
          }),
          style: function (feature) {
            return new Style({
              fill: new Fill({
                color: 'rgba(255, 255, 255, 0.6)', // Color de relleno de los estados
              }),
              stroke: new Stroke({
                color: 'black', // Borde negro para los estados
                width: 2, // Ancho del borde
              }),
            });
          },
        }),
      ],
      view: new View({
        center: fromLonLat([-102.5528, 23.6345]), // Coordenadas de México
        zoom: 5,
      }),
    });


    // Asegurarse de que el mapa se limpia correctamente al desmontarse el componente
    return () => {
      map.setTarget(null);
    };
  }, []);

  return (
    <div style={{justifyContent:'center', display:'flex'}}>
        <div id="map"  style={{ width: '70%', height: '500px'}}/>
    </div>
    
  );
}

export default Mapa;
