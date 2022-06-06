import * as React from "react";
import PropTypes from 'prop-types'
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import geojson from "../data/geojson.json"

Leaflet.propTypes = {
    markerText: PropTypes.string,
    position: PropTypes.array,
    zoom: PropTypes.number,
    
}

function Leaflet(props) {
    const { position = [43.247704, -79.817719], zoom = 13, markerText } = props;
    if (typeof window !== 'undefined') {
        return (
            <MapContainer center={position} zoom={zoom} style={{ height: "50vh" }}>
            <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <GeoJSON data={geojson} />
            {/* {markerText !== "" &&
            <Marker position={position}>
                <Popup>{markerText}</Popup>
            </Marker>
            } */}
            </MapContainer>
        );
    }
}

export default Leaflet;