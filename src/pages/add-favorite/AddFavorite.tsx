import React, { useState, useEffect } from "react";
import { useDebouncedValue } from "../../common/hooks/useDebounce";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DangerButton, PrimaryButton } from "../../common/components/Buttons";
import { PackageItem } from "../Home/types";
import { Loader } from "../../common/components/Loader";

const AddFavorite: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [favReason, setFavReason] = useState("");
  const [loading, setLoading] = useState(false);
  const { debouncedValue, debouncing } = useDebouncedValue(searchQuery);

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
        setLoading(false);
      } else {
        setSearchResults(response.data.results);
        setLoading(false);
      }
    } catch (error: any) {
      setSearchResults([]);
      setLoading(false);
      alert(error.message);
    }
  };

  useEffect(() => {
    if (!debouncing && debouncedValue) fetchNpmPackages();
  }, [debouncedValue]);

  const navigateHome = () => {
    navigate("/");
  };

  const handleAddFav = () => {
    if (!selectedPackage || favReason.trim() === "") {
      alert("Please select a package and provide a reason.");
      return;
    }

    const favPackageListString = localStorage.getItem("FAV_PACKAGE_LIST");
    const favPackageList = favPackageListString
      ? JSON.parse(favPackageListString)
      : [];

    if (
      favPackageList.find(
        (pkg: any) => pkg.name === selectedPackage.package.name
      )
    ) {
      alert("This package is already in your favorites list.");
      return;
    }

    const newFavorite: PackageItem = {
      _id: Date.now().toString(),
      name: selectedPackage.package.name,
      description: selectedPackage.package.description,
      npmLink: selectedPackage.package.links.npm,
      reason: favReason,
    };

    favPackageList.push(newFavorite);
    localStorage.setItem("FAV_PACKAGE_LIST", JSON.stringify(favPackageList));

    setFavReason("");
    setSelectedPackage(null);
    setSearchQuery("");
    setSearchResults([]);

    alert("Package added to favorites successfully!");
    navigateHome();
  };

  return (
    <div>
      <div className="text-right">
        <DangerButton onClick={navigateHome}>X</DangerButton>
      </div>
      <div className="container mx-auto mt-8 p-4">
        <h2 className="text-left">
          <strong>Add Fav. Package</strong>
        </h2>
        <div className="flex flex-row gap-3 mt-6">
          <input
            type="text"
            placeholder="Search Package..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                  className={`text-left package-item p-2 cursor-pointer hover:bg-gray-300 ${
                    pkg === selectedPackage ? "bg-blue-200" : ""
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
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
          debouncedValue &&
          !loading && (
            <div className="mt-10 text-center transform scale-100 translate-y-0 transition-opacity ease-in duration-500 bg-yellow-100 border border-yellow-300 rounded-lg p-4 animate-fade-in">
              <strong>Found Nothing! Please check spelling or Try again</strong>
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
              className="w-full p-2 border rounded bg-slate-200 "
            ></textarea>
          </div>
        )}
        {favReason.trim() !== "" && (
          <div className="mt-5 text-right">
            <PrimaryButton onClick={handleAddFav}>Add</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

export { AddFavorite };
