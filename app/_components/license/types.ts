export interface DigitalWork {
  id: string;
  nftId: string;
  title: string;
  description: string;
  workType: string;
  category: string;
  tags: string[];
  ipfsHash: string;
  ipfsUrl: string;
  metadataUrl: string;
  registrationDate: string;
  contractAddress: string;
  ownerAddress: string;
  imageUrl?: string;
}

export interface License {
  id: string;
  workId: string;
  licenseType: 'commercial' | 'non-commercial' | 'event-based';
  price: number;
  priceUnit: 'ETH' | 'USDC' | 'USDT';
  duration: number;
  durationUnit: 'days' | 'months' | 'years';
  description: string;
  terms: string;
  isActive: boolean;
  createdAt: string;
  contractAddress: string;
  tokenId?: string;
}

export interface LicensePurchase {
  id: string;
  licenseId: string;
  buyerAddress: string;
  sellerAddress: string;
  amount: number;
  currency: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'failed';
  royaltyAmount?: number;
}

export interface LicenseTransaction {
  id: string;
  type: 'purchase' | 'royalty';
  licenseId: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  currency: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface LicenseFormData {
  workId: string;
  licenseType: 'commercial' | 'non-commercial' | 'event-based';
  price: number;
  priceUnit: 'ETH' | 'USDC' | 'USDT';
  duration: number;
  durationUnit: 'days' | 'months' | 'years';
  description: string;
  terms: string;
}

export interface CreateLicenseRequest {
  formData: LicenseFormData;
  onSuccess: (license: License) => void;
  onError: (error: string) => void;
}

export interface PurchaseLicenseRequest {
  licenseId: string;
  onSuccess: (purchase: LicensePurchase) => void;
  onError: (error: string) => void;
}
