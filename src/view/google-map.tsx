import { useRef, useEffect } from "react";
import { LatLng } from "./types";
import { createLogger } from "../utils/logger.utils";

const log = createLogger("GoogleMap -->");

interface Props {
  latlng: LatLng;
  zoom: number;
}

export function GoogleMap({ latlng, zoom }: Props) {
  const mapDiv = useRef<HTMLDivElement | null>(null);
  const map = useRef<google.maps.Map | null>(null);
  
  async function createMap() {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

    map.current = new Map(mapDiv.current as HTMLDivElement, {
      center: latlng,
      zoom,
    });
  }

  useEffect( () => {
    createMap();
  }, []);

  useEffect(() => {
    log("useEffect, latlng:",latlng);
    if (map.current) {
      map.current.setCenter(latlng);
    }
  }, [latlng]);

  useEffect(() => {
    log("useEffect zoom:", zoom);
    if (map.current) {
      map.current.setZoom(zoom);
    }
  }, [zoom]);

  return <div ref={mapDiv} className="map-box" />;
}

