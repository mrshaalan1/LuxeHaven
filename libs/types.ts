export interface ICar {
  CarId: number;
  CarName: String;
  CarDescription: String;
  CarPicUrl: string;
  CarBrand: String;
  CarPrice: Number;
  CarRentalFrom: String;
  CarRentalTo: String;
}

export interface IMenu {
  RestaurantItemId: number;
  RestaurantItemName: String;
  RestaurantItemDescription: String;
  RestaurantItemIngredient: String;
  RestaurantItemType: string;
  RestaurantItemPrice: Number;
  RestaurantItempPicUrl: String;
}

export interface IRoom {
  RoomId: number;
  RoomType: String;
  RoomNumber: number;
  RoomDescription: String;
  RoomPicUrl: string;
  RoomPrice: Number;
  RoomRentalFrom: String;
  RoomRentalTo: String;
  RoomRating: Number;
}
