import mongoose from "mongoose";

export interface ICar {
  CarId: number;
  CarName: String;
  CarDescription: String;
  CarPicUrl: string;
  CarBrand: String;
  CarPrice: Number;
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
  RoomRating: Number;
}

export interface IReservation {
  _id: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  room: mongoose.Types.ObjectId;
  menuItem: mongoose.Types.ObjectId;
  CarId: mongoose.Types.ObjectId;
  reservationFrom: Date;
  reservationTo: Date;
  CarRentalTo: Date;
  CarRentalFrom: Date;
  spa: boolean;
  gym: boolean;
 }
 