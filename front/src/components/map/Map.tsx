import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import {Container, createStyles} from "@mantine/core";
import {useCallback, useEffect, useRef, useState} from "react";

const useStyles = createStyles({
    container: {
        width: '100%',
        height: '20rem',
        overflow: 'hidden'
    }
})

export type Position = [number, number]

export type MapProps = {
    position: Position,
    zoom: number,
    setPosition: (Position) => void
}
export default function CustomMap({
                                      position = [59.56, 30.18],
                                      zoom = 13,
        setPosition
}: MapProps) {
    const {classes} = useStyles()

    const [currentPosition, setCurrentPosition] = useState<Position>(position)
    const onMapClick = (event) => {
        const coords = event.get('coords')
        setCurrentPosition(coords)
        setPosition(coords)
    }

    const mapRef = useCallback(ref => {
        if (ref !== null) {
            ref.events.add('click', onMapClick)
        }
    },[onMapClick])

    return <Container className={classes.container}>
        <YMaps>
            <Map defaultState={{center: position, zoom: zoom}} instanceRef={mapRef}>
                <Placemark geometry={currentPosition}/>
            </Map>
        </YMaps>
    </Container>
}