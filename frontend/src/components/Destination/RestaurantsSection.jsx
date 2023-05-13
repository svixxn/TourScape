/* eslint-disable react/prop-types */
import React from 'react'

const RestaurantsSection = (props) => {
  return (
    <div className="mb-5">
      <h1 className='text-5xl text-primary font-bold'>Restaurants</h1>
      {props.restaurants.length === 0 ? (<h1 className='text-3xl font-semibold'>There are no available restaurants.</h1>) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-4">
          {/* {props.tours.map((tour, index) => (
                  <SingleTourCard key={index} tour={tour} />
               ))} */}
        </div>
      )}
    </div>
  )
}

export default RestaurantsSection