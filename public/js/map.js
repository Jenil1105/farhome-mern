const API_KEY = api;

async function geocodeAddress() {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    address
  )}&limit=1&apiKey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  if (!data.features.length) return;

  const [lon, lat] = data.features[0].geometry.coordinates;

  const map = L.map("map", {
    zoomControl: true,
  }).setView([lat, lon], 14);

  L.tileLayer(
    `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${API_KEY}`,
    {
      attribution: "© OpenStreetMap © Geoapify",
    }
  ).addTo(map);

  map.scrollWheelZoom.enable();
  map.touchZoom.enable();
  map.doubleClickZoom.enable();

  L.marker([lat, lon])
    .addTo(map)
    .bindPopup(address)
    .openPopup();
}

geocodeAddress();
