import axios from "axios"

export async function getUserLocation() {
    return axios
        .post(
            "https://www.googleapis.com/geolocation/v1/geolocate?key=" +
                import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        )
        .then(res => res.data.location)
        .catch(e => {
            console.log(e)
        })
}

export async function getStationsLocation() {
    return axios({
        method: "get",
        url: "http://localhost:5038/stations",
    })
        .then(res => res.data)
        .catch(e => {
            console.log(e)
        })
}
