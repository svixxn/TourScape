import React, { Suspense } from "react"
import HomeCarousel from './HomeCarousel'
import WorkWithUs from './WorkWithUs'
const Video = React.lazy(() => import("./Video"))
import LatestReviews from './LatestReviews'



function Home() {
  return <>
    <HomeCarousel />
    <WorkWithUs />
    <Suspense fallback={<div>Loading</div>}>
      <Video />
    </Suspense>
    <LatestReviews />
  </>
}

export default Home