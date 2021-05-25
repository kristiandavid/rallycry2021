// import React from "react";


// import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";

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

// import L from "leaflet";
// import { Marker, useMap } from "react-leaflet";
// import { promiseToFlyTo, getCurrentLocation } from "../lib/map";
// import Map from "../components/Map";

// const LOCATION = {
//   lat: 38.9072,
//   lng: -77.0369,
// };
// const CENTER = [LOCATION.lat, LOCATION.lng];
// const DEFAULT_ZOOM = 2;
// const ZOOM = 10;
//
// const timeToZoom = 2000;
// const timeToOpenPopupAfterZoom = 4000;
// const timeToUpdatePopupAfterZoom = timeToOpenPopupAfterZoom + 3000;
//
// const popupContentHello = `<p>Hello 👋</p>`;
// const popupContentGatsby = `
//   <div class="popup-gatsby">
//     <div class="popup-gatsby-content">
//       <h1>Gatsby Leaflet Starter</h1>
//       <p>Welcome to your new Gatsby site. Now go build something great!</p>
//     </div>
//   </div>
// `;
//
// /**
//  * MapEffect
//  * @description This is an example of creating an effect used to zoom in and set a popup on load
//  */
//
// const MapEffect = ({ markerRef }) => {
//   const map = useMap();
//
//   useEffect(() => {
//     if (!markerRef.current || !map) return;
//
//     (async function run() {
//       const popup = L.popup({
//         maxWidth: 800,
//       });
//
//       const location = await getCurrentLocation().catch(() => LOCATION);
//
//       const { current: marker } = markerRef || {};
//
//       marker.setLatLng(location);
//       popup.setLatLng(location);
//       popup.setContent(popupContentHello);
//
//       setTimeout(async () => {
//         await promiseToFlyTo(map, {
//           zoom: ZOOM,
//           center: location,
//         });
//
//         marker.bindPopup(popup);
//
//         setTimeout(() => marker.openPopup(), timeToOpenPopupAfterZoom);
//         setTimeout(
//           () => marker.setPopupContent(popupContentGatsby),
//           timeToUpdatePopupAfterZoom
//         );
//       }, timeToZoom);
//     })();
//   }, [map, markerRef]);
//
//   return null;
// };
//
// const MapTestPage = () => {
//   const markerRef = useRef();
//
//   const mapSettings = {
//     center: CENTER,
//     defaultBaseMap: "OpenStreetMap",
//     zoom: DEFAULT_ZOOM,
//   };
//
//   return (
//     <>
//       <Map {...mapSettings}>
//         <MapEffect markerRef={markerRef} />
//         <Marker ref={markerRef} position={CENTER} />
//       </Map>
//     </>
//   );
// };
//
// export default MapTestPage;
