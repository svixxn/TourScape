const Video = () => {
  return (
    <div className="relative h-[30rem]">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 z-0 w-full h-full object-cover"
        id="bg-video"
      >
        <source
          src="https://res.cloudinary.com/myenv/video/upload/v1683554251/TourScape/Static/sea-6399_rflndm_w01cpa.mp4"
          type="video/mp4"
        />
      </video>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-4xl font-bold text-white uppercase">
          Experience the Beauty of the World
        </h1>
        <p className="text-lg font-medium text-white mt-4">
          Discover unforgettable destinations and create memories that will last
          a lifetime
        </p>
      </div>
    </div>
  );
};

export default Video;
