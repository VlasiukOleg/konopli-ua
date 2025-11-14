import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";

import { useAlert } from "@/store/alert";

const title = "Цікаво знати";
const description =
  "Всі наші ковдри ручної роботи та всередині мають конопляне волокно яке має багато корисних властивостей";

export const BlanketAlert: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { isAlertShow, removeAlert } = useAlert();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAlertClose = () => {
    removeAlert();
  };

  if (!isMounted || !isAlertShow || !isVisible) return null;

  return (
    <>
      <Alert
        description={description}
        isVisible={true}
        title={title}
        variant="bordered"
        hideIcon
        onClose={handleClose}
        classNames={{
          title: "mb-1",
          description: "text-xs",
        }}
        className="mb-4 p-2"
        radius="none"
      >
        <div className="flex gap-4">
          <Button
            color="warning"
            size="sm"
            variant="solid"
            className="mt-2"
            onPress={onOpen}
          >
            Детальніше
          </Button>
          <Button
            color="warning"
            size="sm"
            variant="bordered"
            className="mt-2"
            onPress={handleAlertClose}
          >
            Більше не показувати
          </Button>
        </div>
      </Alert>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-sm">
                Властивості конопляного волокна
              </ModalHeader>
              <ModalBody className="text-sm">
                <ul className="list-disc pl-5 space-y-1 marker:text-accent">
                  <li>
                    виготовлено з екологічно чистого натурального матеріалу
                  </li>
                  <li>дозволяє тілу «дихати»</li>
                  <li>антибактеріальна</li>
                  <li>антиалергенна</li>
                  <li>вбирає вологу і попереджає потовиділення</li>
                  <li>дуже міцна і зносостійка</li>
                  <li>завдяки порожнистим волокнам добре зберігає тепло</li>
                  <li>захищає від пилових кліщів, бактерій і грибків</li>
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-accent"
                  variant="light"
                  onPress={onClose}
                >
                  Закрити
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BlanketAlert;
