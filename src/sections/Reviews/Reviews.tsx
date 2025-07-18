"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCube } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cube";

import styles from "./Reviews.module.css";

const reviews = [
  { id: 1, image: "/images/rewiews/rewiew-1.png" },
  { id: 2, image: "/images/rewiews/rewiew-2.png" },
  { id: 3, image: "/images/rewiews/rewiew-3.png" },
  { id: 4, image: "/images/rewiews/rewiew-4.png" },
  { id: 5, image: "/images/rewiews/rewiew-5.png" },
  { id: 6, image: "/images/rewiews/rewiew-6.png" },
  { id: 7, image: "/images/rewiews/rewiew-7.png" },
];

const Reviews: React.FC = () => {
  return (
    <section className={`py-5 ${styles.bgReviews}`}>
      <div className="container">
        <h2 className="text-xl text-grey mb-6">
          Реальні відгуки наших покупців:
        </h2>
        <div className="max-w-4xl mx-auto">
          <Swiper
            grabCursor={true}
            effect={"cube"}
            cubeEffect={{
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }}
            modules={[Navigation, Pagination, Autoplay, EffectCube]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="h-full">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={review.image}
                      alt="Скрін відгука з соцмереж"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
