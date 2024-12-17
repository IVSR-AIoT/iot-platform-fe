import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
})

L.Marker.prototype.options.icon = DefaultIcon
export default function Map() {
  return (
    <MapContainer
      center={[21.005453, 105.8451935]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-[300px] h-[200px] rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[21.005453, 105.8451935]}>
        <Popup>ROOM E-722</Popup>
      </Marker>
    </MapContainer>
  )
}
