import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DangerButton,
  PrimaryButton,
} from "../../../common/components/Buttons";
import { Loader } from "../../../common/components/Loader";
import { useDebouncedValue } from "../../../common/hooks/useDebounce";
import { EditProps, PackageItem } from "../types";

const EditFav: React.FC<EditProps> = ({ packageItem, onClose, update }) => {
  const navigate = useNavigate();

  // States
  const [searchQuery, setSearchQuery] = useState<any>(packageItem?.name || "");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [favReason, setFavReason] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [packageChanged, setPackageChanged] = useState(false);

  const { debouncedValue, debouncing } = useDebouncedValue(searchQuery);

  useEffect(() => {
    setSelectedPackage(packageItem?.name);
    setFavReason(packageItem?.reason);
    fetchNpmPackages();
  }, [searchQuery]);

  const fetchNpmPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.npms.io/v2/search?q=${debouncedValue}`
      );
      if (response.data.total === 0) {
        setSearchResults([]);
        setSelectedPackage(null);
        setFavReason("");
      } else {
        setSearchResults(response.data.results);
      }
    } catch (error) {
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePackageChange = (pkg: any) => {
    setSelectedPackage(pkg);
    setPackageChanged(true);
  };

  const handleAddFav = () => {
    const favPackageListString = localStorage.getItem("FAV_PACKAGE_LIST");
    const favPackageList = favPackageListString
      ? JSON.parse(favPackageListString)
      : [];

    const updatedData = favPackageList.map((item: PackageItem) => {
      if (item._id === packageItem?._id) {
        return {
          ...item,
          name: selectedPackage.package.name,
          description: selectedPackage.package.description,
          npmLink: selectedPackage.package.links.npm,
          reason: packageChanged ? favReason : item.reason,
        };
      }
      return item;
    });

    update(updatedData);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-300 p-4 rounded-md shadow-lg">
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="container mx-auto mt-8 p-4">
              <h2 className="text-left">
                <strong>Edit Fav. Package</strong>
              </h2>
              <div className="flex flex-row gap-3 mt-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Package..."
                  className="w-full p-2 border rounded bg-slate-200"
                />
                <PrimaryButton
                  disabled={debouncing || !debouncedValue}
                  onClick={fetchNpmPackages}
                >
                  Search
                </PrimaryButton>
              </div>
              {loading && <Loader />}
              {searchResults.length > 0 ? (
                <div className="mt-10">
                  <p className="text-left">
                    <strong>Search Results:</strong>
                  </p>
                  <div className="max-h-40 overflow-y-auto mt-2 no-scrollbar">
                    {searchResults.map((pkg: any) => (
                      <div
                        key={pkg.package.name}
                        className={`text-left package-item p-2 cursor-pointer hover:bg-gray-400 ${
                          pkg === selectedPackage ||
                          pkg.package.name === selectedPackage
                            ? "bg-blue-200"
                            : ""
                        }`}
                        onClick={() => handlePackageChange(pkg)}
                      >
                        {pkg.package.name}
                      </div>
                    ))}
                  </div>
                  {searchResults.length > 4 && (
                    <p className="m-0 p-0 text-center">
                      <strong>. . .</strong>
                    </p>
                  )}
                </div>
              ) : (
                debouncedValue && (
                  <div className="mt-10 text-center transform scale-100 translate-y-0 transition-opacity ease-in duration-500 bg-yellow-100 border border-yellow-300 rounded-lg p-4 animate-fade-in">
                    <strong>
                      Found Nothing! Please check spelling or Try again
                    </strong>
                  </div>
                )
              )}

              {selectedPackage && (
                <div className="mt-10">
                  <p className="text-left mb-1">
                    <strong>Why is this your favorite?</strong>
                  </p>
                  <textarea
                    value={favReason}
                    onChange={(e) => setFavReason(e.target.value)}
                    className="w-full p-2 border rounded bg-slate-200"
                  />
                </div>
              )}
            </div>
            <div className="mt-6 flex flex-row justify-end gap-3">
              {favReason.trim() !== "" && (
                <PrimaryButton onClick={handleAddFav}>Save</PrimaryButton>
              )}
              <DangerButton onClick={onClose}>Close</DangerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFav;
