import { useState, useRef, MouseEvent } from "react";
import { TopBar } from "./top-bar";
import { GoogleMap } from "./google-map";
import { LatLng } from "./types";
import { createLogger } from "../utils/logger.utils";

const log = createLogger("App -->");

export function App() {

  const input = useRef<HTMLInputElement>(null);

  const [latlng, setLatlng] = useState<LatLng>({
    lat: -34.397,
    lng: 150.644
  });

  const [zoom, setZoom] = useState(8);

  function reposition(event: MouseEvent) {
    const city = (event.target as HTMLElement).dataset.city;
    switch (city) {
      case "tel aviv":
        setLatlng({ lat: 32.0042938, lng: 34.7615399 });
        break;
      case "london":
        setLatlng({ lat: 51.528308, lng: -0.3817828 });
        break;
      case "paris":
        setLatlng({ lat: 48.8587741, lng: 2.2069754 });
        break;
      default:
        alert("Location not supported");
    }
  }

  // const updateZoom = (event: ChangeEvent) => {
  // const z = (event.target as HTMLInputElement).value;
  function updateZoom() {
    const z = (input.current as HTMLInputElement).value;
    log({ z });
    setZoom(Number(z)); // parseInt(zoom); // +zoom;
  };

  return (
    <div className="app">
      <TopBar>Google Maps Example in React</TopBar>
      <div className="hbox mb20">
        <button data-city="tel aviv" onClick={reposition}>Tel Aviv</button>
        <button data-city="paris" onClick={reposition}>Paris</button>
        <button data-city="london" onClick={reposition}>London</button>
        <input ref={input}
          type="number"
          min="8"
          max="16"
          placeholder="8"
          onChange={updateZoom} />
      </div>
      <GoogleMap latlng={latlng} zoom={zoom}/>
    </div>
  );

}