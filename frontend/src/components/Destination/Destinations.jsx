import { useState, useEffect } from "react"
import { TourState } from "../../context/TourProvider"

function Destinations() {
  const {destinations, setDestinations} = TourState()

  
  return (
    <div className="">{JSON.stringify(destinations)}</div>
  )
}

export default Destinations