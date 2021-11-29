export enum Size {
  SMALL,
  MEDIUM,
  LARGE,
  HUGE
}

export enum Status {
  SENT,
  IN_TRANSIT,
  DELIVERED,
  WAITING_FOR_REVIEW
}

export enum Role {
  ADMIN,
  USER,
  TRANSPORTER
}

export class Location {
  longitude: number;
  latitude: number;
  address: string;
}

export class Order {
  id: string;
  name: string;
  userID: string;
  transporterID: string;
  from: Location;
  to: Location;
  creationDate: string;
  deadline: string;
  price: number;
  weight: number;
  size: Size;
  status: Status;
}

export class User{
  id: string;
  role: Role;
  username: string;
  password: string;
  email: string;
  telephone: string;
  size: Size;
}

export class Review{
  id: string;
  transporterID: string;
  packageID: string;
  customerUsername: string;
  time: string;
  rating: number;
  description: string;
}

export class Orders {
  orders: Order[] = [];
}

export class Users {
  users: User[] = [];
}

export class Reviews {
  reviews: Review[] = [];
}
