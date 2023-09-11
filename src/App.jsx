import { useLoadScript } from "@react-google-maps/api"
import { useState } from "react"

import "./App.css"
import Map from "./components/Map"
import FilterButton from "./components/FilterButton"

function App() {
    //init map
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        language: "en-AU",
    })

    const [states, setStates] = useState(["VIC", "SA", "NSW", "QLD"])

    return (
        <div>
            {isLoaded ? (
                <div>
                    <Map states={states} />
                    <FilterButton states={states} setStates={setStates} />
                </div>
            ) : (
                <div>Loading</div>
            )}
        </div>
    )
}

export default App
