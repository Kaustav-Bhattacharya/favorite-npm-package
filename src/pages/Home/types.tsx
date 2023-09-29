interface PackageListProps {
    list: PackageItem[];
    update: React.Dispatch<React.SetStateAction<PackageItem[]>>;
  }


  interface PackageItem {
    name: string;
    version: string;
  }


  export type {
    PackageItem,
    PackageListProps
  }