export interface PropertyInterface {
  _id:string;
  name: string;
  description: string;
  roomType: string;
  location: {
    lat: number;
    long: number;
  };
  address: {
    address: string;
  };
  price: number;
  guest: number;
  bedroom: number;
  bathrooms: number;
  kitchen: number;
  balcony: number;
  amenities: string[];
  userId: string;
  imageUrl:string[]
}
