import Image from "next/image";
import ProfileImage from "../../../public/images/hero/banner_Lifetakt.jpg";

const Hero: React.FC = ({}) => {
  return (
    <section className="py-5">
      <div className="container">
        <p className="text-center font-semibold">
          Health, nutrition & lifestyle{" "}
        </p>
        <Image alt="Alt" src={ProfileImage} sizes="100vw" />
        <p className="text-lightGrey text-center font-semibold">
          Ваше життя. Ваш ритм. Ваше гарне самопочуття.
        </p>
        <p className="text-lightGrey text-center text-sm">
          Завдяки цілістному підходу LR LIFETAKT пропонує комплексні рішення ,
          які підтримують вас на кожному етапі життя , враховуючи індивідуальні
          потреби
        </p>
      </div>
    </section>
  );
};

export default Hero;
