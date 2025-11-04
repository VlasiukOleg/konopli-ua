"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { sendGTMEvent } from '@next/third-parties/google'

const Thanks: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  useEffect(() => {
    onOpen();

    sendGTMEvent({
    event: 'thanks',
  });
  }, [onOpen]);

  return (
    <>
      <section className="py-5 md:py-10 w-full">
        <div className="container">
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={() => router.push(`/`)}
            placement="center"
            className="max-w-[80%]"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody>
                    <div className="px-4 pb-8 rounded-md max-w-[320px] md:max-w-[526px] md:px-10 md:pb-10 xl:max-w-[677px] xl:px-[102px]  text-center">
                      {" "}
                      <h3 className="mb-4 pt-[72px] text-center  text-[18px] font-bold leading-[1.15] text-[#3B433E] md:pt-[88px] md:text-lightLarge md:leading-[1.15] xl:text-3xl xl:leading-[1.15]">
                        Дякую за заявку!
                      </h3>
                      <p className="mb-8 text-center  text-light font-light tracking-[-0.02em] text-[#3B433E] xl:text-medium">
                        Ваші дані були успішно відправлені. Будь ласка,
                        очікуйте, ми зв&apos;яжемося з вами найближчим часом для
                        обговорення деталей.
                      </p>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      size="md"
                      radius="none"
                      variant="bordered"
                      className="font-semibold text-accent border-accent w-full"
                      onPress={() => {
                        onClose();
                        router.push(`/`);
                      }}
                    >
                      На головну
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </section>
    </>
  );
};

export default Thanks;
