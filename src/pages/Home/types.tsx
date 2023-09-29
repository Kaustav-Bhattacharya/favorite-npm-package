interface PackageListProps {
  list: PackageItem[];
  update: React.Dispatch<React.SetStateAction<PackageItem[]>>;
}

interface PackageItem {
  _id: string;
  name: string;
  description: string;
  npmLink?: string;
  reason: string;
}

export type { PackageItem, PackageListProps };
