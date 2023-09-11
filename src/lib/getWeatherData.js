import axios from "axios"

export const variables = {
    11: {
        id: 1,
        name: "airtInst",
        unit: "Deg C",
        longName: "Air Temp.",
    },
    21: {
        id: 2,
        name: "avgAirtemp",
        unit: "Deg C",
        longName: "Air Temp.",
    },
    31: {
        id: 3,
        name: "airtInst",
        unit: "Deg C",
        longName: "Air Temp.",
    },
    91: {
        id: 9,
        name: "airtInst",
        unit: "Deg C",
        longName: "Air Temp.",
    },
    102: {
        id: 10,
        name: "airtInst",
        unit: "Deg C",
        longName: "Air Temp.",
    },
    12: {
        id: 1,
        name: "ghiInist",
        unit: "W/m^2",
        longName: "Solar Irrad.",
    },
    22: {
        id: 2,
        name: "avgWm2",
        unit: "W/m^2",
        longName: "Solar Irrad.",
    },
    32: {
        id: 3,
        name: "ghiInist",
        unit: "W/m^2",
        longName: "Solar Irrad.",
    },
    41: {
        id: 4,
        name: "ghiInist",
        unit: "W/m^2",
        longName: "Solar Irrad.",
    },
    51: {
        id: 5,
        name: "ghiInist",
        unit: "W/m^2",
        longName: "Solar Irrad.",
    },
    61: {
        id: 6,
        name: "ghiInist",
        unit: "W/m^2",
        longName: "Solar Irrad.",
    },
    92: {
        id: 9,
        name: "ghiInist",
        unit: "W/m^2",
        longName: "Solar Irrad.",
    },
    101: {
        id: 10,
        name: "ghiInist",
        unit: "W/m^2",
        longName: "Solar Irrad.",
    },
    72: {
        id: 7,
        name: "wdAvg",
        unit: "Deg",
        longName: "Wind Dir. Avg.",
    },
    82: {
        id: 8,
        name: "wdAvg",
        unit: "Deg",
        longName: "Wind Dir. Avg.",
    },
    71: {
        id: 7,
        name: "wsAvg",
        unit: "m/s",
        longName: "Wind Speed Avg.",
    },
    81: {
        id: 8,
        name: "wsAvg",
        unit: "m/s",
        longName: "Wind Speed Avg.",
    },
}

export async function getWeatherData() {
    return axios({
        method: "get",
        url: "http://localhost:5038/weatherdata",
    })
        .then(res => res.data)
        .catch(e => {
            console.log(e)
        })
}
