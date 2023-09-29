interface PackageListProps {
    list: PackageItem[];
    update: React.Dispatch<React.SetStateAction<PackageItem[]>>;
  }


  interface PackageItem {
    name: string;
    description:string,
    npmLink?:string,
    reason:string,
  }


  export type {
    PackageItem,
    PackageListProps
  }