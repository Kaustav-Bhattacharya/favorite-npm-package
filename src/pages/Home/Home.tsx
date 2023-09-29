import React, { useState, useEffect } from "react";
import { PrimaryButton } from "../../common/components/Buttons";
import { PackageList } from "./components/PackageList";
import { PackageItem } from "./types";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [packageList, setPackageList] = useState<PackageItem[]>(() => {
    const storedData = localStorage.getItem("FAV_PACKAGE_LIST");
    return storedData ? JSON.parse(storedData) : [];
  });

  // return packageList.length > 0 ? (
  //   <PackageList list={packageList} update={setPackageList} />
  // ) : (
  //   <NoFavs />
  // );
  return <NoFavs/> 
};

const NoFavs: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/add-favorite");
  };
  return (
    <div className="flex flex-col h-[80vh] w-[80vw] items-center bg-white">
      <h2 className="text-left pl-4 my-8"><strong>Welcome to Favorite NPM Package</strong></h2>
      <div className="border h-[80%] w-[80%] border-black p-4 text-center flex flex-col items-center justify-evenly">
        <p>You do not have any favs yet. Please add</p>
        <PrimaryButton onClick={handleNavigate}>Add Fav</PrimaryButton>
      </div>
    </div>
  );
};

export { Home };
