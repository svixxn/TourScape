/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapBox = (props) => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null)

  useEffect(() => {
    if (map.current) return;
    try {
      map.current = new mapboxgl.Map({
        scrollZoom: { ctrlKey: true },
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [props.coords.coordinates[1], props.coords.coordinates[0]],
        zoom: 8
      });
    } catch(err){
      console.log(err)
    }

    
    marker.current = new mapboxgl.Marker({ color: "#d12eb9" })
      .setLngLat([props.coords.coordinates[1], props.coords.coordinates[0]])
      .addTo(map.current);

    map.current.on("wheel", event => {
      if (event.originalEvent.ctrlKey) return;
      if (event.originalEvent.metaKey) return;
      if (event.originalEvent.altKey) return;
      event.preventDefault();
    });

    map.current.addControl(new mapboxgl.NavigationControl());
  });

  return (
    <div>
      <div ref={mapContainer} className="h-[40rem] rounded-none md:rounded-xl mx-1 md:mx-10 mb-5" />
    </div>
  )
}

export default MapBox