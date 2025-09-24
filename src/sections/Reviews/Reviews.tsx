"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCube } from "swiper/modules";
import Image from "next/image";

import reviewsData from "@/data/reviews.json";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cube";

const Reviews: React.FC = () => {
  return (
    <section className="section xl:w-[50%] xl:bg-sectionBg">
      <div className="container">
        <h2 className="section-title mb-6">{reviewsData.title}</h2>
        <div className="mx-auto">
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
            className="w-[80%] md:w-[50%] xl:w-[60%] mx-auto"
          >
            {reviewsData.images.map((review) => (
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
