import React, { useRef, useEffect } from "react"
// import { graphql, useStaticQuery } from 'gatsby'
import Layout from "../components/Layout";
import { Helmet } from "react-helmet"

import L from "leaflet"
import { Marker, useMap } from "react-leaflet";
// import { MapContainer, TileLayer, GeoJSON, FeatureGroup } from "react-leaflet"
// import AddLocate from "../lib/add-locate"
// import MarkerClusterGroup from "react-leaflet-markercluster"
import { promiseToFlyTo, getCurrentLocation } from "../lib/map";
import Map from "../components/Map";

import "react-leaflet-markercluster/dist/styles.min.css"
import "../lib/map.css"

const LOCATION = {
  lat: 38.9072,
  lng: -77.0369,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;
const ZOOM = 10;

const timeToZoom = 2000;
const timeToOpenPopupAfterZoom = 4000;
const timeToUpdatePopupAfterZoom = timeToOpenPopupAfterZoom + 3000;

const popupContentHello = `<p>Hello 👋</p>`;
const popupContentGatsby = `
  <div class="popup-gatsby">
    <div class="popup-gatsby-content">
      <h1>Gatsby Leaflet Starter</h1>
      <p>Welcome to your new Gatsby site. Now go build something great!</p>
    </div>
  </div>
`;

/**
 * MapEffect
 * @description This is an example of creating an effect used to zoom in and set a popup on load
 */

const MapEffect = ({ markerRef }) => {
  const map = useMap();

  useEffect(() => {
    if (!markerRef.current || !map) return;

    (async function run() {
      const popup = L.popup({
        maxWidth: 800,
      });

      const location = await getCurrentLocation().catch(() => LOCATION);

      const { current: marker } = markerRef || {};

      marker.setLatLng(location);
      popup.setLatLng(location);
      popup.setContent(popupContentHello);

      setTimeout(async () => {
        await promiseToFlyTo(map, {
          zoom: ZOOM,
          center: location,
        });

        marker.bindPopup(popup);

        setTimeout(() => marker.openPopup(), timeToOpenPopupAfterZoom);
        setTimeout(
          () => marker.setPopupContent(popupContentGatsby),
          timeToUpdatePopupAfterZoom
        );
      }, timeToZoom);
    })();
  }, [map, markerRef]);

  return null;
};

const MapPage = () => {

  const markerRef = useRef();

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
    height: "94vh"
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings}>
        <MapEffect markerRef={markerRef} />
        <Marker ref={markerRef} position={CENTER} />
      </Map>
    </Layout>
  );
  // const [showMap, setShowMap] = useState(false);
  // useEffect(() => {
  //   setShowMap(true);
  // },[showMap]);
  //
  // // REFS
  // // Initiate refs to the feature group and cluster group
  // const groupRef = useRef();
  // const clusterRef = useRef();
  //
  // // Handle creation of clusters and change styles
  // const createClusters = (cluster) => {
  //   const childCount = cluster.getChildCount()
  //   let size = ""
  //   if (childCount < 10) {
  //     size = "small"
  //   } else if (childCount < 25) {
  //     size = "medium"
  //   } else {
  //     size = "large"
  //   }
  //
  //   return L.divIcon({
  //     html: `<div><span><b>${childCount}</b></span></div>`,
  //     className: `custom-marker-cluster custom-marker-cluster-${size}`,
  //     iconSize: new L.point(40, 40),
  //   })
  // }
  //
  // // Creating popups for the map
  // const createPopups = (feature = {}, layer) => {
  //   const { properties = {} } = feature
  //   const { name, address, slug, categories } = properties
  //   const popup = L.popup()
  //   const html = `
  //     <div class="popup-container">
  //       <h3 class="popup-header">${name}</h3>
  //       <h4 class="popup-subheader">${address}</h4>
  //       <ul class="popup-cats">
  //         ${categories.map(cat => {
  //           return `<li><a href="/category/${cat.slug}">${cat.name}</a>`
  //         }).join('')}
  //       </ul>
  //       <div class="popup-moreInfo"><a href="business/${slug}">More info</a></div>
  //     </div>
  //     `
  //   popup.setContent(html)
  //   layer.bindPopup(popup)
  // }
  //
  // // Get locations from Contentful
  // const allLocations = useStaticQuery(
  //   graphql`
  //     query {
  //       allContentfulBusiness(sort: {fields: name, order: ASC}) {
  //         edges {
  //           node {
  //             id
  //             name
  //             slug
  //             featuredImage {
  //               gatsbyImageData
  //             }
  //             openForBusiness
  //             address
  //             coordinates {
  //               lat
  //               lon
  //             }
  //             categories {
  //               id
  //               name
  //               slug
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `
  // );
  //
  // const edges = allLocations.allContentfulBusiness.edges;
  //
  // const result = edges.map(edge => {
  //   const { name, address, slug, categories } = edge.node;
  //   return {
  //     "type": "Feature",
  //     "geometry": {
  //       "type": "Point",
  //       "coordinates": [edge.node.coordinates.lon, edge.node.coordinates.lat]
  //     },
  //     "properties": {
  //       name,
  //       address,
  //       slug,
  //       categories
  //     }
  //   }
  // });
  //
  // const geodata = (result) => {
  //   return {
  //     "type": "FeatureCollection",
  //     "features": result
  //   }
  // }
  //
  // return (
  //   <Layout>
  //     <Helmet>
  //       <link
  //         rel="stylesheet"
  //         href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  //       />
  //     </Helmet>
  //
  //     {showMap && (
  //       <MapContainer
  //         center={[43.251705,-79.830643]}
  //         zoom={14}
  //         style={{ height: "94vh" }}
  //       >
  //         <TileLayer
  //           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //         />
  //
  //         <GeoJSON data={geodata(result)} onEachFeature={createPopups} />
  //
  //       </MapContainer>
  //     )}
  //   </Layout>
  // )
}

export default MapPage;
