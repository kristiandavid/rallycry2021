import React, { useRef } from "react"
import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from "react-helmet"
import Layout from "../components/Layout";
import { MapContainer, TileLayer, GeoJSON, FeatureGroup } from "react-leaflet"
import L from "leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"
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
  const createPopups = (feature = {}, layer) => {
    const { properties = {} } = feature
    const { name, address, slug, categories } = properties
    const popup = L.popup()
    const html = `
      <div class="popup-container">
        <h3 class="popup-header">${name}</h3>
        <h4 class="popup-subheader">${address}</h4>
        <ul class="popup-cats">
          ${categories.map(cat => {
            return `<li><a href="/category/${cat.slug}">${cat.name}</a>`
          }).join('')}
        </ul>
        <div class="popup-moreInfo"><a href="business/${slug}">More info</a></div>
      </div>
      `
    popup.setContent(html)
    layer.bindPopup(popup)
  }

  // Get locations from Contentful
  const allLocations = useStaticQuery(
    graphql`
      query {
        allContentfulBusiness(sort: {fields: name, order: ASC}) {
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
              coordinates {
                lat
                lon
              }
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
  );

  const edges = allLocations.allContentfulBusiness.edges;

  const result = edges.map(edge => {
    const { name, address, slug, categories } = edge.node;
    return {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [edge.node.coordinates.lon, edge.node.coordinates.lat]
      },
      "properties": {
        name,
        address,
        slug,
        categories
      }
    }
  });

  const geodata = (result) => {
    return {
      "type": "FeatureCollection",
      "features": result
    }
  }

  return (
    <Layout>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Helmet>
      <MapContainer
        center={[43.251705,-79.830643]}
        zoom={14}
        style={{ height: "94vh" }}
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
            <GeoJSON data={geodata(result)} onEachFeature={createPopups} />
          </MarkerClusterGroup>
        </FeatureGroup>
        <AddLocate />
      </MapContainer>
    </Layout>
  )
}

export default Map
