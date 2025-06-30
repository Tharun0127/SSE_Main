export type EnquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  projectDetails?: string;
};

export type ProductEnquiry = {
  productId: number;
  productName: string;
  productImage: string;
  unit: 'SFT' | 'Each Piece';
  quantity: number;
  displayValue: string;
  measurement?: string;
  description?: string;
};
