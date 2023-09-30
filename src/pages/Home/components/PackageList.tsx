import React, { useState } from "react";
import { PackageItem, PackageListProps } from "../types";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../../add-favorite/components/ConfirmationModal";
import { ViewPackageModal } from "../../add-favorite/components/ViewDetails";
import { Delete, Edit, View } from "../../../common/components/Actions";
import { PrimaryButton } from "../../../common/components/Buttons";

const PackageList: React.FC<PackageListProps> = ({ list, update }) => {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<
    PackageItem | undefined
  >();
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null
  );

  const onDelete = (id: string) => {
    setSelectedPackageId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedPackageId) {
      update(selectedPackageId);
      setShowDeleteModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const navigateAdd = () => {
    navigate("/add-favorite");
  };

  const onShowDetails = (npmPackage: PackageItem) => {
    setSelectedPackage(npmPackage);
    setShowViewModal(true);
  };

  const onViewModalClose = () => {
    setSelectedPackage(undefined);
    setShowViewModal(false);
  };

  const renderPackageList = () => {
    return list.map((packageItem) => (
      <tr key={packageItem._id}>
        <td className="border p-2 text-left">{packageItem.name}</td>
        <td className="border p-2 flex flex-row justify-evenly items-center">
          <View onShow={() => onShowDetails(packageItem)} />
          <Edit />
          <Delete onClick={() => onDelete(packageItem._id)} />
        </td>
      </tr>
    ));
  };

  return (
    <div className="w-[80vw] m-0">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-left pl-4 my-8">
          <strong>Welcome to Favorite NPM Package</strong>
        </h2>
        <PrimaryButton onClick={navigateAdd}>Add Fav</PrimaryButton>
      </div>
      <div className="mt-6">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Package Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>{renderPackageList()}</tbody>
        </table>
        {showDeleteModal && (
          <ConfirmationModal
            onCancel={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
          />
        )}
        {showViewModal && (
          <ViewPackageModal
            packageItem={selectedPackage}
            onClose={onViewModalClose}
          />
        )}
      </div>
    </div>
  );
};

export { PackageList };
