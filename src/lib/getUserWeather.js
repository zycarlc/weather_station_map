import axios from "axios"

export default async function getUserWeather({ userLocation }) {
    return axios({
        method: "get",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${
            userLocation.lat
        }&lon=${userLocation.lng}&exclude=minutely,daily&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
        }`,
    })
        .then(res => res.data)
        .catch(e => {
            console.log(e)
        })
}
