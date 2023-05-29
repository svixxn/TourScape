/* eslint-disable react/prop-types */
import React from 'react'

const SingleTourRow = ({element}) => {
  return (
    <tr>
      <td className="px-6 py-4 text-center"> {element._id} </td>
      <td className="px-6 py-4 text-center"> {element.num} </td>
      <td className="px-6 py-4 text-center"> {element.numRatings} </td>
      <td className="px-6 py-4 text-center"> {element.avgRating} </td>
      <td className="px-6 py-4 text-center"> {element.avgPrice} </td>
      <td className="px-6 py-4 text-center"> {element.minPrice} </td>
      <td className="px-6 py-4 text-center"> {element.maxPrice} </td>
    </tr>
  )
}

export default SingleTourRow