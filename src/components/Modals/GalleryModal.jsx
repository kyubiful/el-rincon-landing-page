import { Button, Modal } from "@heroui/react";
import { useEffect, useState } from "react";

export const GalleryModal = ({ imageOpenId, images, isOpen, handleClose }) => {
  const [modalImageOpenId, setModalImageOpenId] = useState(0);
  const lastIamgeId = images[images.length - 1].id;

  useEffect(() => {
    setModalImageOpenId(imageOpenId);
  }, [imageOpenId]);

  const handleNextImage = () => {
    let nextImageId = modalImageOpenId + 1;
    if (nextImageId > lastIamgeId) nextImageId = 0;
    setModalImageOpenId(nextImageId);
  };

  const handlePrevImage = () => {
    let prevImageId = modalImageOpenId - 1;
    if (prevImageId < 0) prevImageId = lastIamgeId;
    setModalImageOpenId(prevImageId);
  };

  return (
    <Modal.Backdrop
      isOpen={isOpen}
      onOpenChange={(open) => { if (!open) handleClose() }}
      variant="blur"
    >
      <Modal.Container className="max-w-lg" placement="bottom">
        <Modal.CloseTrigger className="bg-white" />
        <div className="p-0">
          <img
            alt="Imagen de la casa rural"
            className="w-full object-cover rounded-xl max-h-[80vh]"
            src={images[modalImageOpenId].url}
          />
        </div>
        <div className="flex justify-end gap-2 p-4">
          <Button variant="tertiary" onPress={handlePrevImage}>Anterior</Button>
          <Button variant="tertiary" onPress={handleNextImage}>Siguiente</Button>
        </div>
      </Modal.Container>
    </Modal.Backdrop>
  );
};
