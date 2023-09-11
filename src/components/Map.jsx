import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api"
import { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import NearMeIcon from "@mui/icons-material/NearMe"

import { getUserLocation, getStationsLocation } from "../lib/getLocations.js"
import InfoCard from "./InfoCard"
import UserInfoCard from "./UserInfoCard"

export default function Map({ states }) {
    const [map, setMapLoaded] = useState(false)
    const [stations, setStations] = useState([])
    const [showUserInfo, setShowUserInfo] = useState(false)
    const [userLocation, setUserLocation] = useState({
        lat: -38.0063,
        lng: 145.2733,
    })

    const [activeMarker, setActiveMarker] = useState(null)
    const handleActiveMarker = marker => {
        if (marker === activeMarker) {
            return
        }
        setActiveMarker(marker)
    }

    const setCenter = () => {
        map.setCenter(userLocation)
    }

    useEffect(() => {
        // get user location
        getUserLocation().then(res => setUserLocation(res))
        // get stations list
        getStationsLocation()
            .then(stations => {
                return stations.filter(station => {
                    return states.indexOf(station.state) > -1
                })
            })
            .then(res => setStations(res))
    }, [states])

    useEffect(() => {
        if (map && stations.length >= 1) {
            const bounds = new window.google.maps.LatLngBounds()
            stations.forEach(marker => {
                bounds.extend({
                    lat: marker.latitude,
                    lng: marker.longitude,
                })
            })
            map.fitBounds(bounds)
        }
    }, [map, stations])

    return (
        <GoogleMap
            zoom={8}
            mapContainerClassName="map-container"
            onLoad={map => {
                setMapLoaded(map)
            }}
        >
            {stations.map(station => {
                return (
                    <MarkerF
                        key={station.id}
                        position={{
                            lat: station.latitude,
                            lng: station.longitude,
                        }}
                        onClick={() => {
                            handleActiveMarker(station.id)
                        }}
                    >
                        {activeMarker === station.id ? (
                            <InfoWindowF
                                onCloseClick={() => setActiveMarker(null)}
                            >
                                <InfoCard {...station} />
                            </InfoWindowF>
                        ) : null}
                    </MarkerF>
                )
            })}
            <MarkerF
                position={userLocation}
                onClick={() => {
                    setShowUserInfo(true)
                }}
                icon={"/src/assets/person_pin.svg"}
            >
                {showUserInfo && (
                    <InfoWindowF
                        position={userLocation}
                        onCloseClick={() => {
                            setShowUserInfo(false)
                        }}
                    >
                        <UserInfoCard userLocation={userLocation} />
                    </InfoWindowF>
                )}
            </MarkerF>
            <CenterButton setCenter={setCenter} />
        </GoogleMap>
    )
}

function CenterButton({ setCenter }) {
    return (
        <div>
            <Box
                sx={{
                    position: "fixed",
                    top: "12px",
                    right: "60px",
                }}
            >
                <Button
                    sx={{ bgcolor: "rgba(50,154,233,0.3)" }}
                    onClick={setCenter}
                >
                    <NearMeIcon />
                </Button>
            </Box>
        </div>
    )
}
