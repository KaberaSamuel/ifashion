import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../css/home.css";
import { Simulate } from "react-dom/test-utils";

function Home() {
  return (
    <div className="home">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        loop={true}
        className="topSlider"
      >
        <SwiperSlide>
          <img src="src\assets\shirts-large.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src\assets\caps-large.webp" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src\assets\backpack-large.webp" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src\assets\denim-large.webp" />
        </SwiperSlide>
      </Swiper>

      <div className="orders">
        <p>free returns on all orders</p>

        <div className="drops">
          <p>new drops</p>
          <div className="products">
            <div className="product">
              <div className="product-image">
                <img src="src\assets\metal-monkey-4.jpg" />
              </div>
              <div className="description">
                <p className="label">um training</p>
                <p className="price">rwf 1350</p>
              </div>
            </div>

            <div className="product">
              <div className="product-image">
                <img src="src\assets\metal-monkey-4.jpg" />
              </div>
              <div className="description">
                <p className="label">um training</p>
                <p className="price">rwf 1350</p>
              </div>
            </div>

            <div className="product">
              <div className="product-image">
                <img src="src\assets\metal-monkey-4.jpg" />
              </div>
              <div className="description">
                <p className="label">um training</p>
                <p className="price">rwf 1350</p>
              </div>
            </div>

            <div className="product">
              <div className="product-image">
                <img src="src\assets\metal-monkey-4.jpg" />
              </div>
              <div className="description">
                <p className="label">um training</p>
                <p className="price">rwf 1350</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ad">
        <Link to={"shop"}>View All</Link>

        <div>
          <img src="src\assets\adCap.webp" />
          <img src="src\assets\adInsta.webp" />
          <img src="src\assets\adShirt.webp" />
        </div>
      </div>

      <div className="community">
        <img src="src\assets\Community.png" />
        <p>SINCE 2024</p>
        <p className="bold">
          HELPING OUR COMMUNITY EXPLORE THEIR INNER STREET ARTIST
        </p>
        <p>
          Our aim is to build the biggest self-sustaining community by
          empowering various artists and athletes.
        </p>

        <Link to={"shop"}>Get your drip</Link>
      </div>

      <div className="collaborators">
        <p>OUR COLLABORATORS</p>

        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          navigation={{ clickable: true }}
          slidesPerView={4}
          spaceBetween={25}
          loop={true}
          className="bottomSlider"
          style={{
            "--swiper-navigation-size": "1rem",
            "--swiper-navigation-color": "black",
          }}
        >
          <SwiperSlide>
            <img src="src\assets\monkey1.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="src\assets\monkey2.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="src\assets\monkey3.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="src\assets\monkey4.svg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="src\assets\monkey5.svg" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Home;
