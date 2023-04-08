import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {createStyles} from "@mantine/core";

const useStyles = createStyles({
    container: {
        width: '100%',
        height: '20rem',
        overflow: 'hidden'
    }
})

export type MapProps = {
    position: [number, number],
    zoom: number,
    scrollWheelZoom: boolean
}
export default function CustomMap({position = [59.56, 30.18], zoom = 13, scrollWheelZoom = false}: MapProps) {
    const {classes} = useStyles()

    return <div className={classes.container}>
        <MapContainer center={position} zoom={zoom} scrollWheelZoom={scrollWheelZoom}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    </div>
}