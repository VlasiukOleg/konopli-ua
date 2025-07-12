"use client";

import { Button } from "@heroui/react";

import styles from "./HeroSection.module.css";
import heroSectionData from "@/data/heroSection.json";
import { FaArrowRight } from "react-icons/fa";

const Hero: React.FC = ({}) => {
  return (
    <section className={`py-5 ${styles.bgHero}`}>
      <div className="container">
        <p className="text-center text-black font-bold text-[36px] mb-5">
          {heroSectionData.title}
        </p>
        <p className="text-grey text-center text-sm font-semibold mb-5">
          {heroSectionData.text}
        </p>
        <div className="text-center">
          <Button
            size="md"
            radius="none"
            className="bg-accent font-semibold text-white text-center"
          >
            В КАТАЛОГ
            <FaArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
