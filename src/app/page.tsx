import Hero from "@/sections/Hero";
import PopularCategories from "@/sections/PopularCategories";
import Advantages from "@/sections/Advantages";
import Reviews from "@/sections/Reviews";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularCategories />
      <div className="xl:flex">
        <Advantages />
        <Reviews />
      </div>
    </>
  );
}
