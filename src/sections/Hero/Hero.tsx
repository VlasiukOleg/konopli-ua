import Image from "next/image";

import heroSectionData from "@/data/heroSection.json";

const Hero: React.FC = ({}) => {
  return (
    <section className="py-5">
      <div className="container">
        <p className="text-center font-semibold">{heroSectionData.title}</p>
        <Image
          alt="Alt"
          src={heroSectionData.src}
          width={2250}
          height={994}
          sizes="50vw"
        />
        <p className="text-lightGrey text-center font-semibold">
          {heroSectionData.subtitle}
        </p>
        <p className="text-lightGrey text-center text-sm">
          {heroSectionData.text}
        </p>
      </div>
    </section>
  );
};

export default Hero;
