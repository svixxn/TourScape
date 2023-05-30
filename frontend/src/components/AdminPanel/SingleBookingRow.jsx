/* eslint-disable react/prop-types */
const SingleBookingRow = ({element}) => {
  return (
    <tr>
      <td className="px-6 py-4 text-center"> {element.num} </td>
      <td className="px-6 py-4 text-center"> {element.avgPrice.toFixed(2)} </td>
      <td className="px-6 py-4 text-center"> {element.minPrice} </td>
      <td className="px-6 py-4 text-center"> {element.maxPrice} </td>
      <td className="px-6 py-4 text-center"> {element.averagePeople} </td>
      <td className="px-6 py-4 text-center"> {element.maxPeople} </td>
      <td className="px-6 py-4 text-center"> {element.minPeople} </td>
    </tr>
  )
}

export default SingleBookingRow