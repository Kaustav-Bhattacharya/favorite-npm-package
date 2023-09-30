import React from "react";
import { ViewPackageModalProps } from "../types";
import { DangerButton } from "../../../common/components/Buttons";

const ViewPackageModal: React.FC<ViewPackageModalProps> = ({
  packageItem,
  onClose,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-300 p-4 rounded-md shadow-lg">
        <div className="modal-overlay">
          <div className="modal-content">
            <h1>{packageItem?.name}</h1>
            <div className="mt-6">
              <p>
                <strong>Reason for being favorite:</strong>{" "}
                {packageItem?.reason}
              </p>
              <p>
                <strong>Description:</strong> {packageItem?.description}
              </p>
              <p>
                <strong>Package Link:</strong>{" "}
                <a
                  href={packageItem?.npmLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {packageItem?.npmLink}
                </a>
              </p>
            </div>
            <div className="mt-6">
              <DangerButton onClick={onClose}>Close</DangerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ViewPackageModal };
