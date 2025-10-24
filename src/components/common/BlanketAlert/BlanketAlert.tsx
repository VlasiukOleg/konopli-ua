import { useState } from "react";

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

const title = "Цікаво знати";
const description =
  "Всі наші ковдри ручної роботи та всередині мають конопляне волокно яке має багато корисних властивостей";

export const BlanketAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Alert
        description={description}
        isVisible={isVisible}
        title={title}
        variant="bordered"
        hideIcon
        onClose={() => setIsVisible(false)}
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
            onPress={() => setIsVisible(false)}
          >
            Закрити
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
