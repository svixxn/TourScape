/* eslint-disable react/prop-types */
const SingleReviewRow = ({element}) => {
   return (
     <tr>
       <td className="px-6 py-4 text-center"> {element.totalReviews} </td>
       <td className="px-6 py-4 text-center"> {element.averageRating.toFixed(2)} </td>
       <td className="px-6 py-4 text-center"> {element.minRating} </td>
       <td className="px-6 py-4 text-center"> {element.maxRating} </td>
     </tr>
   )
 }
 
 export default SingleReviewRow