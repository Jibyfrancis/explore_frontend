interface Amenity {
  _id: string;
  name: string;
  imageUrl: string;
  __v: number;
}

interface Address {
  address: string;
}

interface User {
  userName: string;
}

export interface PropertyDetailsInterface {
  _id: string;
  name: string;
  description: string;
  roomType: string;
  address: Address;
  price: number;
  guest: number;
  bedroom: number;
  bathrooms: number;
  kitchen: number;
  balcony: number;
  imageUrl: string[];
  'amenity-details': Amenity[];
  user: User[];
}
