import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./Map.css";
import { Box } from "@mui/material";
import CardMap from "./CardMap";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const Map = () => {
  const mapContainerRef = useRef(null);
  const [lat, setLat] = useState(-6.36452);
  const [long, setLong] = useState(106.82854);
  const [address, setAddress] = useState("Pilih Lokasi Pick-Up");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAddress = async (longitude, latitude) => {
    try {
      let addressToFetch = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
      );
      setAddress(addressToFetch.data.features[0].place_name);
    } catch (err) {
      alert("Terjadi kesalahan saat fetching address");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [long, lat],
      zoom: 15,
    });

    let geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      countries: "id",
      placeholder: "Masukan Lokasi Penjemputan",
    });

    map.addControl(geocoder, "top-left");

    let marker = new mapboxgl.Marker({ draggable: true, color: "red" });

    geocoder.on("result", function (e) {
      setLat(e.result.geometry.coordinates[1]);
      setLong(e.result.geometry.coordinates[0]);
      fetchAddress(
        e.result.geometry.coordinates[0],
        e.result.geometry.coordinates[1]
      );
      marker.setLngLat(e.result.center).addTo(map);
      geocoder.clear();
      marker.on("dragend", function (e) {
        let lngLat = e.target.getLngLat();
        setLat(lngLat["lat"]);
        setLong(lngLat["lng"]);
        fetchAddress(lngLat["lng"], lngLat["lat"]);
      });
    });
    setIsLoading(false);
  }, []);

  return (
    <div>
      {!isLoading && (
        <div>
          <Box pt={3}>
            <CardMap location={address} latitude={lat} longitude={long} />
          </Box>
          <div className="map__container" ref={mapContainerRef} />
        </div>
      )}
    </div>
  );
};

export default Map;
