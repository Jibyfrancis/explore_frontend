export interface Booking {
  _id:string,
  propertyName: string;
  propertyAddress: string;
  adult:number,
  children:number,
  image: string;
  checkIn: Date;
  checkOut: Date;
  paymentStatus: string;
  totalPrice: number;
  bookingStatus:string

}
