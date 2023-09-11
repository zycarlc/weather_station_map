import {
    Card,
    CardContent,
    Typography,
    CardActionArea,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material"
import { useEffect, useState } from "react"
import dayjs from "dayjs"

import { variables, getWeatherData } from "./getWeatherData"

export default function InfoCard(station) {
    const [weatherData, setWeatherData] = useState([])
    const [loading, setLoading] = useState(true)
    const [anchorEl, setAnchorEl] = useState(null)
    const [selectedTime, setSelectedTime] = useState(0)
    const [displayWeatherData, setDisplayWeatherData] = useState([])
    const open = Boolean(anchorEl)

    const handleDisplayWeatherData = weatherData => {
        let stationVariables = Object.values(variables).filter(
            variable => variable.id === station.id
        )
        let newDisplayWeatherData = []
        stationVariables.forEach(stationVariable => {
            newDisplayWeatherData.push({
                value: weatherData[stationVariable.name],
                ...stationVariable,
            })
        })
        setDisplayWeatherData(newDisplayWeatherData)
    }

    const handleClickListItem = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuItemClick = (event, index) => {
        setSelectedTime(index)
        setAnchorEl(null)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        getWeatherData()
            .then(res => {
                // filter weather data to target station
                let filteredResult = res.filter(({ stationId }) => {
                    return stationId == station.id
                })
                // sorted weather data by time
                filteredResult.sort((a, b) => {
                    return dayjs(a.timestamp).isBefore(dayjs(b.timestamp))
                        ? 1
                        : -1
                })
                return filteredResult
            })
            .then(res => {
                setWeatherData(res)
                setLoading(false)
                return res
            })
            .then(res => {
                handleDisplayWeatherData(res[selectedTime])
            })
            .catch(e => {
                console.log(e)
            })
    }, [selectedTime])

    return (
        <Card sx={{ maxWidth: 345, boxShadow: 0 }}>
            <Typography gutterBottom variant="h6" component="div">
                {station.wsName}
            </Typography>
            <Typography variant="body4" color="text.secondary">
                {"Site: "}
                {station.site}
                <br />
                {"Portfolio: "}
                {station.portfolio}
            </Typography>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <CardContent>
                        <Typography variant="body4" color="text.secondary">
                            {displayWeatherData.map(data => {
                                return (
                                    <div key={data.name}>
                                        <Typography
                                            gutterBottom
                                            variant="body1"
                                            component="div"
                                        >
                                            {data.longName}
                                        </Typography>
                                        <Typography
                                            variant="body4"
                                            color="text.secondary"
                                        >
                                            {data.value}{" "}
                                        </Typography>
                                        <Typography
                                            variant="body4"
                                            color="text.secondary"
                                        >
                                            {data.unit}
                                        </Typography>
                                    </div>
                                )
                            })}
                        </Typography>
                    </CardContent>{" "}
                    <CardContent>
                        <Typography variant="body1" component="div">
                            Record time:
                        </Typography>
                    </CardContent>
                    <CardActionArea>
                        <List
                            component="nav"
                            aria-label="Device settings"
                            sx={{ bgcolor: "background.paper" }}
                        >
                            <ListItem
                                id="lock-button"
                                aria-haspopup="listbox"
                                aria-controls="lock-menu"
                                aria-label="when device is locked"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClickListItem}
                            >
                                <ListItemText
                                    secondary={dayjs(
                                        weatherData[selectedTime].timestamp
                                    ).format("DD/MM/YYYY HH:mm:ss")}
                                />
                            </ListItem>
                        </List>
                        <Menu
                            id="lock-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "lock-button",
                                role: "listbox",
                            }}
                        >
                            {weatherData.map(({ timestamp }, index) => (
                                <MenuItem
                                    key={index}
                                    selected={index === selectedTime}
                                    onClick={event =>
                                        handleMenuItemClick(event, index)
                                    }
                                >
                                    {dayjs(timestamp).format(
                                        "DD/MM/YYYY HH:mm:ss"
                                    )}
                                </MenuItem>
                            ))}
                        </Menu>
                    </CardActionArea>
                </div>
            )}
        </Card>
    )
}
