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
    <section className="py-5">
      <div className="container">
        <h2 className="text-xl text-grey mb-6">{reviewsData.title}</h2>
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
