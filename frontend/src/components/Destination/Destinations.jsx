import { useState, useEffect } from "react"
import DestinationCard from "./DestinationCard"
import axios from "axios"
import LineWithText from "../Utils/LineWithText"
import { RotatingLines } from "react-loader-spinner"

function Destinations() {
  const [destinations, setDestinations] = useState()
  const [results, setResults] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
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
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }

    })();
  }, [])


  return (
    <>
      <div className="container mx-auto mb-16 mt-6">
        <LineWithText content={`Results (${results})`} />
        {isLoading ? (
          <div className="flex flex-row justify-center mt-2">
            <RotatingLines
              strokeColor="pink"
              strokeWidth="5"
              animationDuration="0.75"
              width="42"
              visible={true}
            />
          </div>
        ) :
          (
            <div className="px-8 md:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
              {destinations?.map((destination, index) => (
                <DestinationCard key={index} destination={destination} />
              ))}
            </div>
          )}
        </div>
    </>
  )
}

export default Destinations;