"use client";

import { Button, Link } from "@heroui/react";

import styles from "./HeroSection.module.css";
import heroSectionData from "@/data/heroSection.json";
import { Pages } from "@/@types";
import { FaArrowRight } from "react-icons/fa";

const Hero: React.FC = ({}) => {
  return (
    <section className={`section ${styles.bgHero}`}>
      <div className="container text-center">
        <div className="xl:flex">
          <div className="flex justify-center items-center xl:w-[50%]">
            <p className="font-montserrat font-semibold  text-green-700 text-[30px] mb-5 max-w-[400px] xl:mb-0 xl:text-[50px]  [text-shadow:_3px_3px_6px_rgb(0_0_0_/_40%),_0_0_15px_rgb(255_255_255_/_60%)]">
              {heroSectionData.title}
            </p>
          </div>
          <div className="mb-5 xl:w-[50%] xl:mb-0">
            <p className="text-grey  text-sm font-semibold  md:text-base xl:text-xl xl:mb-10">
              {heroSectionData.text}
            </p>
            <div className="hidden xl:block">
              <Button
                as={Link}
                size="lg"
                href={Pages.CATALOG}
                radius="none"
                className="bg-accent font-semibold text-white "
              >
                В КАТАЛОГ
                <FaArrowRight />
              </Button>
            </div>
          </div>
        </div>

        <div className="xl:hidden">
          <Button
            as={Link}
            size="md"
            href={Pages.CATALOG}
            radius="none"
            className="bg-accent font-semibold text-white "
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
