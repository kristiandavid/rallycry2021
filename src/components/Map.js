import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
//
// function MyMap(props) {
//   <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
//   <TileLayer
//     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   />
//   <Marker position={[51.505, -0.09]}>
//     <Popup>
//       A pretty CSS3 popup. <br /> Easily customizable.
//     </Popup>
//   </Marker>
// </MapContainer>
// }
//
// export default MyMap



// import PropTypes from "prop-types";
// import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
//
// <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
//   <TileLayer
//     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   />
//   <Marker position={[51.505, -0.09]}>
//     <Popup>
//       A pretty CSS3 popup. <br /> Easily customizable.
//     </Popup>
//   </Marker>
// </MapContainer>

// import { useConfigureLeaflet, useMapServices } from "../hooks";
// import { isDomAvailable } from "../lib/util";
//
// const DEFAULT_MAP_SERVICE = "OpenStreetMap";
//
// const Map = (props) => {
//   const {
//     children,
//     className,
//     defaultBaseMap = DEFAULT_MAP_SERVICE,
//     ...rest
//   } = props;
//
//   useConfigureLeaflet();
//
//   const services = useMapServices({
//     names: [...new Set([defaultBaseMap, DEFAULT_MAP_SERVICE])],
//   });
//   const basemap = services.find((service) => service.name === defaultBaseMap);
//
//   let mapClassName = `map`;
//
//   if (className) {
//     mapClassName = `${mapClassName} ${className}`;
//   }
//
//   if (!isDomAvailable()) {
//     return (
//       <div className={mapClassName}>
//         <p className="map-loading">Loading map...</p>
//       </div>
//     );
//   }
//
//   const mapSettings = {
//     className: "map-base",
//     zoomControl: false,
//     ...rest,
//   };
//
//   return (
//     <div className={mapClassName}>
//       <MapContainer {...mapSettings}>
//         {children}
//         {basemap && <TileLayer {...basemap} />}
//         <ZoomControl position="bottomright" />
//       </MapContainer>
//     </div>
//   );
// };
//
// Map.propTypes = {
//   children: PropTypes.node,
//   className: PropTypes.string,
//   defaultBaseMap: PropTypes.string,
// };
//
// export default Map;
