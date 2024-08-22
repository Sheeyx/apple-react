import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const VideoSlider = () => {
  const videos = [
    {
      id: 1,
      url: `${process.env.PUBLIC_URL}/video/apple.mp4`,
      title: '',
      type: 'local',
    },
  ];

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Navigation, Pagination, Autoplay]}
      className="mySwiper"  
      style={{marginTop: "30px"}}
    >
      {videos.map((video) => (
        <SwiperSlide key={video.id}>
          <div className="video-container">
            {video.type === 'local' ? (
              <video autoPlay muted loop style={{height:"80vh",width: "90%", marginLeft: "70px"}}>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                width="100%"
                height="100px"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
            <h3>{video.title}</h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VideoSlider;
