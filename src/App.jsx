import {
    GoogleMap,
    Marker,
    useLoadScript,
    InfoWindow,
} from "@react-google-maps/api"
import "./App.css"
import { useEffect, useState } from "react"
import { getUserLocation, getStationsLocation } from "./components/getLocations"

function App() {
    //init map
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    })

    return <div>{isLoaded ? <Map /> : <div>Loading</div>}</div>
}

function Map() {
    const [stations, setStations] = useState([])
    const [userLocation, setUserLocation] = useState({
        lat: -38.0063,
        lng: 145.2733,
    })
    const [activeMarker, setActiveMarker] = useState(null)
    // get station list
    useEffect(() => {
        getUserLocation().then(res => setUserLocation(res))
        getStationsLocation().then(res => setStations(res))
    }, [])

    return (
        <GoogleMap
            zoom={8}
            center={userLocation}
            mapContainerClassName="map-container"
        >
            {stations.map(station => {
                return (
                    <Marker
                        key={station.id}
                        position={{
                            lat: station.latitude,
                            lng: station.longitude,
                        }}
                        onClick={() => {
                            setActiveMarker(station.id)
                        }}
                    >
                        {activeMarker === station.id ? (
                            <InfoWindow
                                onCloseClick={() => setActiveMarker(null)}
                            >
                                <div>
                                    <h1>{station.site}</h1>
                                </div>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                )
            })}
        </GoogleMap>
    )
}

export default App
