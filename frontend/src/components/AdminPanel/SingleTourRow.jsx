/* eslint-disable react/prop-types */
const SingleTourRow = ({element}) => {
  return (
    <tr>
      <td className="px-6 py-4 text-center"> {element._id} </td>
      <td className="px-6 py-4 text-center"> {element.num} </td>
      <td className="px-6 py-4 text-center"> {element.numRatings} </td>
      <td className="px-6 py-4 text-center"> {element.avgRating.toFixed(2)} </td>
      <td className="px-6 py-4 text-center"> {element.avgPrice} </td>
      <td className="px-6 py-4 text-center"> {element.minPrice} </td>
      <td className="px-6 py-4 text-center"> {element.maxPrice} </td>
    </tr>
  )
}

export default SingleTourRow