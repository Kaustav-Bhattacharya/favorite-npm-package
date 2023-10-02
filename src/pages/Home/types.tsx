interface PackageListProps {
  list: PackageItem[];
  update: (updatedList: PackageItem[]) => void;
}

interface PackageItem {
  _id: string;
  name: string;
  description: string;
  npmLink?: string;
  reason: string;
}

interface EditProps {
  packageItem: PackageItem | undefined;
  onClose: () => void;
  update: (updatedList: PackageItem[]) => void;
}

interface ViewPackageModalProps {
  packageItem: PackageItem | undefined;
  onClose: () => void;
}
export type { PackageItem, PackageListProps, EditProps, ViewPackageModalProps };
