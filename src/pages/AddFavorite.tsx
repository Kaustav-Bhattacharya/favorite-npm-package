import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "../common/functions";

// Define the debounce function


const AddFavorite: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [favReason, setFavReason] = useState("");
  const [error, setError] = useState("");
  
  const fetchNpmPackages = async () => {
    try {
      const response = await axios.get(`https://api.npms.io/v2/search?q=${searchQuery}`);
      setSearchResults(response.data.results);
    } catch (error) {
      setError("Error fetching npm packages.");
      setSearchResults([]);
    }
  };

  const delayedFetchNpmPackages = debounce(fetchNpmPackages, 1000);

  useEffect(() => {
    delayedFetchNpmPackages();
  }, [searchQuery]);


  const handleAddFavorite = () => {
    if (!selectedPackage || favReason.trim() === "") {
      setError("Please select a package and provide a favorite reason.");
      return;
    }

    const packageId = selectedPackage.package.name;
    const favPackageList = JSON.parse(localStorage.getItem("FAV_PACKAGE_LIST")) || [];

    if (favPackageList.find((pkg: any) => pkg.packageId === packageId)) {
      setError("This package is already in your favorites list.");
      return;
    }

    const newFavPackage = {
      packageId,
      reason: favReason,
      uniqueId: Date.now().toString(),
    };

    favPackageList.push(newFavPackage);
    localStorage.setItem("FAV_PACKAGE_LIST", JSON.stringify(favPackageList));

    setError("");
    setFavReason("");
    setSelectedPackage(null);

    alert("Package added to favorites successfully!");
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <input
        type="text"
        placeholder="Search for an npm package"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />
      <button onClick={fetchNpmPackages} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Search
      </button>

      {searchResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Search Results:</h3>
          <div className="max-h-40 overflow-y-auto mt-2">
            {searchResults.map((pkg: any) => (
              <div
                key={pkg.package.name}
                className={`package-item p-2 cursor-pointer hover:bg-gray-100 ${
                  pkg === selectedPackage ? "bg-blue-200" : ""
                }`}
                onClick={() => setSelectedPackage(pkg)}
              >
                {pkg.package.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPackage && (
        <div className="mt-4">
          <textarea
            placeholder="Why is this your favorite package?"
            value={favReason}
            onChange={(e) => setFavReason(e.target.value)}
            className="w-full p-2 border rounded-lg"
          ></textarea>
          <button
            onClick={handleAddFavorite}
            className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Add to Favorites
          </button>
        </div>
      )}

      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
};

export  {AddFavorite};
