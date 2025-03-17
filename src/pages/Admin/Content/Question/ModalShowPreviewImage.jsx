import React from "react";
import "./ModalShowPreviewImage.scss";

const ModalShowPreviewImage = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>
          ×
        </span>
        <img src={imageUrl} alt="Large Preview" className="modal-image" />
      </div>
    </div>
  );
};

export default ModalShowPreviewImage;
