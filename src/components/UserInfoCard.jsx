import { Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react"

import getUserWeather from "../lib/getUserWeather.js"
import dayjs from "dayjs"

export default function UserInfoCard({ userLocation }) {
    const [loading, setLoading] = useState(true)
    const [userLocationData, setUserLocationData] = useState({})

    useEffect(() => {
        getUserWeather({ userLocation })
            .then(res => {
                let now = dayjs(new Date()).format("HH:mm DD/MM/YYYY")
                let newUserLocationData = {
                    currentTime: now,
                    ...res,
                }
                setUserLocationData(newUserLocationData)
                return res
            })
            .then(() => {
                setLoading(false)
            })
    }, [])

    return (
        <Card sx={{ maxWidth: 345 }}>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <CardContent>
                        {" "}
                        <Typography variant="body1" color="text.first">
                            {userLocationData.current.weather[0].main}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Current time {userLocationData.currentTime}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Current Temperature{" "}
                            {(userLocationData.current.temp - 273.15).toFixed(
                                1
                            )}{" "}
                            Deg C
                        </Typography>
                    </CardContent>
                </div>
            )}
        </Card>
    )
}
