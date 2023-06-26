export interface CheckoutItem {
  _id: string;
  propertyName: string;
  propertyAddress: string;
  image: string;
  adult: number;
  children: number;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
}
