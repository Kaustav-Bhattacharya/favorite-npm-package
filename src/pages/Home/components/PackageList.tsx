import React , { useState } from "react";
import { PackageListProps } from "../types";
import { PrimaryButton } from "../../../common/components/Buttons";
import { Delete, Edit, Veiw } from "../../../common/components/Actions";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../../../common/components/ConfirmationModal";

const PackageList: React.FC<PackageListProps> = ({ list, update }) => {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

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
          <tbody>
            {list.map((packageItem) => (
              <tr key={packageItem._id}>
                <td className="border p-2 text-left">{packageItem.name}</td>
                <td className="border p-2 flex flex-row justify-evenly items-center">
                  <Veiw />
                  <Edit />
                  <Delete onClick={() => onDelete(packageItem._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showDeleteModal && (
          <ConfirmationModal
            onCancel={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </div>
  );
};

export { PackageList };
