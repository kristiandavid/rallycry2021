import React, { useRef } from "react"
import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from "react-helmet"
import { MapContainer, TileLayer, GeoJSON, FeatureGroup } from "react-leaflet"
import L from "leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"
import geojson from "../data/geojson.json"
import AddLocate from "../lib/add-locate"
import "react-leaflet-markercluster/dist/styles.min.css"
import "../lib/map.css"

const Map = () => {
  // REFS
  // Initiate refs to the feature group and cluster group
  const groupRef = useRef();
  const clusterRef = useRef();

  // Handle creation of clusters and change styles
  const createClusters = (cluster) => {
    const childCount = cluster.getChildCount()
    let size = ""
    if (childCount < 10) {
      size = "small"
    } else if (childCount < 25) {
      size = "medium"
    } else {
      size = "large"
    }
    return L.divIcon({
      html: `<div><span><b>${childCount}</b></span></div>`,
      className: `custom-marker-cluster custom-marker-cluster-${size}`,
      iconSize: new L.point(40, 40),
    })
  }

  // Creating popups for the map
  // Copy and paste before your return inside Map component
  const createPopups = (feature = {}, layer) => {
    const { properties = {} } = feature
    const { address, price, bedrooms, bathrooms } = properties
    const popup = L.popup()
    const html = `
      <div class="popup-container">
      <h3 class="popup-header">${address.street}</h3>
      <ul>
      <li><strong>Price:</strong> ${price.toString()}</li>
      <li><strong>Bedrooms:</strong> ${bedrooms.toString()}</li>
      <li><strong>Bathrooms:</strong>${bathrooms.toString()}</li>
      </div>
      `
    popup.setContent(html)
    layer.bindPopup(popup)
  }

  const test = useStaticQuery(
    graphql`
      query mapLocations {
        locationsQuery: allContentfulBusiness(sort: {fields: name, order: ASC}) {
          edges {
            node {
              id
              name
              slug
              featuredImage {
                gatsbyImageData
              }
              openForBusiness
              address
              categories {
                id
                name
                slug
              }
            }
          }
        }
      }
    `
  )

  console.log("test: ", test);

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Helmet>
      <MapContainer
        center={[43.256531, -79.874420]}
        zoom={14}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FeatureGroup ref={groupRef} name="Homes">
          <MarkerClusterGroup
            ref={clusterRef}
            iconCreateFunction={createClusters}
          >
            <GeoJSON data={geojson} onEachFeature={createPopups} />
          </MarkerClusterGroup>
        </FeatureGroup>
        <AddLocate />
      </MapContainer>
    </>
  )
}

export default Map
