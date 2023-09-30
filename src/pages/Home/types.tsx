interface PackageListProps {
  list: PackageItem[];
  update: (id: string) => void;
}

interface PackageItem {
  _id: string;
  name: string;
  description: string;
  npmLink?: string;
  reason: string;
}

export type { PackageItem, PackageListProps };
