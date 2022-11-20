import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./Map.css";
import { Box, Typography } from "@mui/material";
import CardMap from "./CardMap";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxmbm1zIiwiYSI6ImNsYWxrdjIwdzA2dmEzbnBlZDg4MjhseHEifQ.xEaEAB-r-ISe7YIkuvRpaA";

const MITRALOCATIONS = [
  {
    lng: 106.8298274603269,
    lat: -6.36488353137041,
  },
  {
    lng: 106.83019224075304,
    lat: -6.3608316878468685,
  },
  {
    lng: 106.83039251192383,
    lat: -6.362750319789356,
  },
  {
    lng: 106.82773176058163,
    lat: -6.363667315328513,
  },
];

const Map = () => {
  const mapContainerRef = useRef(null);
  const [lat, setLat] = useState(-6.36452);
  const [long, setLong] = useState(106.82854);
  const [address, setAddress] = useState("Pilih Lokasi Pick-Up");
  const [mitraLocs, setMitraLocs] = useState(MITRALOCATIONS);
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

  const handleClickMarker = loc => {
    console.log(loc);
  };

  useEffect(() => {
    setIsLoading(true);
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [long, lat],
      zoom: 15,
    });

    let c = mitraLocs;
    createMarker();

    // Create a default Marker and add it to the map.
    var marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([long, lat])
      .addTo(map)
      .on("click", () => console.log([long, lat]));

    function createMarker() {
      for (var i = 0; i < c.length; i++) {
        const marker = new mapboxgl.Marker({})
          .setLngLat([c[i].lng, c[i].lat])
          .addTo(map);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div>
      {!isLoading && (
        <div>
          <Box
            px={2}
            py={2}
            zIndex={5}
            position="absolute"
            sx={{ backgroundColor: "white", borderRadius: "10px" }}
            top="10px"
            right="20px"
            left="20px"
            textAlign="center"
          >
            <Typography component="h1" variant="subtitle1" fontWeight={700}>
              Persebaran Mitra di Daerahmu
            </Typography>
          </Box>
          <div className="map__container" ref={mapContainerRef} />
        </div>
      )}
    </div>
  );
};

export default Map;
