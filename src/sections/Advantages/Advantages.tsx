"use client";

import { Accordion, AccordionItem } from "@heroui/react";

import { SiLeaflet } from "react-icons/si";
import { FaShieldVirus } from "react-icons/fa";
import { RiMentalHealthFill } from "react-icons/ri";
import { FaShieldAlt } from "react-icons/fa";
import { MdDryCleaning } from "react-icons/md";

import advantagesData from "@/data/advantages.json";

const Advantages: React.FC = () => {
  const iconComponents: Record<string, React.ElementType> = {
    SiLeaflet,
    FaShieldVirus,
    RiMentalHealthFill,
    FaShieldAlt,
    MdDryCleaning,
  };

  return (
    <section className="py-5 bg-sectionBg">
      <div className="container">
        <h2 className="text-xl text-grey mb-4">{advantagesData.title}</h2>
        <Accordion variant="light" defaultExpandedKeys={["1"]}>
          {advantagesData.advantagesList.map((advantage) => {
            const IconComponent = iconComponents[advantage.icon];

            return (
              <AccordionItem
                key={advantage.id}
                aria-label={advantage.title}
                title={advantage.title}
                startContent={
                  IconComponent && (
                    <IconComponent className="size-6 text-accent mr-2" />
                  )
                }
              >
                <div className="">
                  {advantage.items.map((item, index) => (
                    <p key={index} className="text-sm text-grey mb-3 last:mb-0">
                      <span className="font-semibold block">
                        {item.itemTitle}
                      </span>
                      {item.itemText}
                    </p>
                  ))}
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export default Advantages;
