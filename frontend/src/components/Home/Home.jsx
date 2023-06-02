import React, { Suspense } from "react"
import HomeCarousel from './HomeCarousel'
import WorkWithUs from './WorkWithUs'
import Top4Tours from '../Tour/Top4Tours'
const Video = React.lazy(() => import("./Video"))
import LatestReviews from './LatestReviews'



function Home() {
  return <>
    <HomeCarousel />
    <WorkWithUs />
    <Suspense fallback={<div>Loading</div>}>
      <Video />
    </Suspense>
    <Top4Tours />
    <LatestReviews />
  </>
}

export default Home