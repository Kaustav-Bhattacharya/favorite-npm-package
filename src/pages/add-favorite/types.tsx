interface PackageItem {
    _id:string | undefined;
    name: string | undefined;
    reason: string | undefined;
    description: string | undefined;
    npmLink?: string | undefined;
  }
  
  interface ViewPackageModalProps {
    packageItem: PackageItem | undefined;
    onClose: () => void;
  }

export type {
    PackageItem,
    ViewPackageModalProps,
}