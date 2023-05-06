import { useState, useEffect } from "react"
import DestinationCard from "./DestinationCard"
import axios from "axios"

function Destinations() {
  const [destinations, setDestinations] = useState()
  const [results, setResults] = useState(0)

  useEffect(() => {
    (async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.get(
          "/api/destinations",
          config
        );
        setDestinations(data.data.data)
        setResults(data.results)
      } catch (error) {
        console.log(error)
      }

    })();
  }, [])

  if (!destinations || !results) return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  )


  return (
    <>
      <div className="container mx-auto mb-16 mt-6">
        <span className="text-gray-700 font-bold">Number of results: {results}</span>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-4">
          {destinations.map((destination, index) => (
            <DestinationCard key={index} destination={destination} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Destinations